import {test} from 'node:test';
import assert from 'node:assert/strict';
import './dist/planner-geometry.js';
const {models,parts,worldParts,assess,anatomy} = globalThis.KBOX5Geometry;
const plane=(model,x=32.5,y=30,angle=0)=>({model,x,y,angle});
test('all schematic dimensions match published extents',()=>{for(const model of models){const points=parts(model).flat(),xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);assert.ok(Math.abs(Math.max(...xs)-Math.min(...xs)-model.span)<1e-8);assert.ok(Math.abs(Math.max(...ys)-Math.min(...ys)-model.length)<1e-8);}});
test('all catalog aircraft fit individually at center and flag wall crossings when moved',()=>{for(const model of models){assert.deepEqual(assess([plane(model)]),[{outside:false,overlap:false,obstruction:false,fuselageOverlap:false,sameModelOverlap:false}]);assert.equal(assess([plane(model,0,0)])[0].outside,true);}});
test('movement and rotation transform dimensions consistently',()=>{const points=worldParts(plane(models[0],10,20,90)).flat();assert.ok(Math.abs(Math.max(...points.map(p=>p[0]))-Math.min(...points.map(p=>p[0]))-models[0].length)<1e-8);assert.equal(assess([plane(models[0],0,0)])[0].outside,true);});
test('overlap detection handles identical and separated aircraft',()=>{assert.ok(assess([plane(models.find(m=>m.id==='cessna')),plane(models.find(m=>m.id==='cessna'))]).every(s=>s.overlap));assert.ok(assess([plane(models.find(m=>m.id==='cessna'),32.5,14),plane(models.find(m=>m.id==='cessna'),32.5,45)]).every(s=>!s.overlap&&!s.outside));});

test('collision triangles cover each refined silhouette without losing concave features',()=>{
 const area=p=>Math.abs(p.reduce((n,a,i)=>{const b=p[(i+1)%p.length];return n+a[0]*b[1]-b[0]*a[1];},0))/2;
 for(const model of models){
  const original=anatomy(model).components.reduce((n,c)=>n+area(c.points),0);
  const triangles=parts(model);assert.ok(triangles.every(p=>p.length===3&&area(p)>0));
  assert.ok(Math.abs(triangles.reduce((n,p)=>n+area(p),0)-original)<1e-7,model.name);
 }
});

test('restroom collision detects aircraft within hangar and clears after moving away',()=>{
 const model=models.find(m=>m.id==='cessna');
 const blocked=assess([plane(model,13,18,270)])[0];
 assert.equal(blocked.outside,false);
 assert.equal(blocked.overlap,false);
 assert.equal(blocked.obstruction,true);
 assert.equal(assess([plane(model,32.5,30)])[0].obstruction,false);
 assert.equal(assess([plane(model,13,18,90)])[0].obstruction,false);
});

 test('fuselage and same-model overlaps are conflicts; mixed-model wing overlaps remain advisory',()=>{
 const cessna=models.find(m=>m.id==='cessna'),vision=models.find(m=>m.id==='vision');
 for(const angle of [0,45,180])assert.ok(assess([plane(cessna),plane(vision,32.5,30,angle)]).every(c=>c.fuselageOverlap&&!c.sameModelOverlap));
 assert.ok(assess([plane(cessna,20,30),plane(cessna,44,30)]).every(c=>c.overlap&&c.sameModelOverlap&&!c.fuselageOverlap));
 assert.ok(assess([plane(cessna,20,30),plane(vision,44,30)]).every(c=>c.overlap&&!c.sameModelOverlap&&!c.fuselageOverlap));
 assert.ok(assess([plane(cessna,20,14),plane(vision,44,48)]).every(c=>!c.overlap&&!c.sameModelOverlap&&!c.fuselageOverlap));
 });

test('B200 horizontal stabilizer has the reference straight trailing edge and broad root',()=>{
 const m=models.find(m=>m.id==='king200'),tail=anatomy(m).components.find(c=>c.kind==='tail').points;
 const root=tail.filter(([x])=>Math.abs(x)<m.span*.02),tip=tail.filter(([x])=>x>m.span*.15);
 const range=pts=>Math.max(...pts.map(p=>p[1]))-Math.min(...pts.map(p=>p[1]));
 assert.ok(range(root)>range(tip)*2,'root chord must be substantially broader than tip chord');
 assert.ok(Math.abs(Math.max(...root.map(p=>p[1]))-Math.max(...tip.map(p=>p[1])))<.3,'trailing edge stays nearly straight across the span');
});
