import {test} from 'node:test';
import assert from 'node:assert/strict';
import './dist/planner-geometry.js';
import './dist/aircraft-3d.js';
const {models}=globalThis.KBOX5Geometry,{mesh}=globalThis.KBOX5Aircraft3D;
const model=id=>models.find(m=>m.id===id);
test('every catalog aircraft has a finite cached 3D mesh with ground-contact wheels',()=>{
 for(const m of models){const faces=mesh(m);assert.ok(faces.length>300,m.name);assert.equal(mesh(m),faces);assert.ok(faces.every(f=>f.points.length>=3&&f.points.every(p=>p.length===3&&p.every(Number.isFinite))));const points=faces.flatMap(f=>f.points);assert.ok(Math.min(...points.map(p=>p[2]))>=-1e-8,m.name);assert.equal(Math.min(...faces.filter(f=>f.kind==='wheel').flatMap(f=>f.points.map(p=>p[2]))),0);}
});
test('Vision uses a rising V-tail and dorsal engine without a vertical fin',()=>{
 const f=mesh(model('vision'));assert.ok(!f.some(p=>p.kind==='fin'));assert.ok(f.some(p=>p.kind==='dorsal-engine'));const tail=f.filter(p=>p.kind==='tailplane').flatMap(p=>p.points);assert.ok(Math.max(...tail.map(p=>p[2]))-Math.min(...tail.map(p=>p[2]))>4);
});
test('B200 and PC-12 have high tails while the C90 retains its lower tail',()=>{
 const tail=id=>Math.max(...mesh(model(id)).filter(p=>p.kind==='tailplane').flatMap(p=>p.points.map(p=>p[2])));
 assert.ok(tail('king200')>14);assert.ok(tail('pc12')>13);assert.ok(tail('king')<9);
});
test('taildraggers have aft tailwheels and high-wing Cessnas have lift struts',()=>{
 for(const id of ['cessna','mustang']){const m=model(id),wheels=mesh(m).filter(f=>f.kind==='wheel').flatMap(f=>f.points);assert.ok(wheels.some(p=>p[1]>m.length*.4));assert.ok(!wheels.some(p=>p[1]<-m.length*.28));}
 for(const id of ['cessna','cessna206'])assert.ok(mesh(model(id)).some(f=>f.kind==='wing-strut'));
 for(const id of ['bravo','phenom'])assert.ok(mesh(model(id)).some(f=>f.kind==='intake'));
});
