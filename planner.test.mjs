import {test} from 'node:test';
import assert from 'node:assert/strict';
import './dist/planner-geometry.js';
const {models,parts,worldParts,assess,anatomy} = globalThis.KBOX5Geometry;
const plane=(model,x=32.5,y=30,angle=0)=>({model,x,y,angle});
test('all schematic dimensions match published extents',()=>{for(const model of models){const points=parts(model).flat(),xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);assert.ok(Math.abs(Math.max(...xs)-Math.min(...xs)-model.span)<1e-8);assert.ok(Math.abs(Math.max(...ys)-Math.min(...ys)-model.length)<1e-8);}});
test('all catalog aircraft fit individually at center and flag wall crossings when moved',()=>{for(const model of models){assert.deepEqual(assess([plane(model)]),[{outside:false,overlap:false}]);assert.equal(assess([plane(model,0,0)])[0].outside,true);}});
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
