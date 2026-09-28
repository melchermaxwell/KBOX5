import {test} from 'node:test';
import assert from 'node:assert/strict';
import './dist/planner-geometry.js';
import './dist/planner-share.js';
const {models}=globalThis.KBOX5Geometry;
const {encode,decode,link}=globalThis.KBOX5Share;
const wrap=data=>btoa(JSON.stringify(data)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
test('share links restore duplicates, precise positions, rotations and all twelve planes',()=>{
 const planes=Array.from({length:12},(_,i)=>({id:i+1,model:models[i%models.length],x:13.125+i,y:19.75+i,angle:271.234}));
 const url=new URL(link(planes,'https://example.amplifyapp.com/?ref=test#details'));
 assert.equal(url.hash,'#planner');assert.equal(url.searchParams.get('ref'),'test');
 assert.deepEqual(decode(url.searchParams.get('layout'),models),planes);
});
test('empty layouts remain empty, and links work with local files',()=>{
 const url=new URL(link([],'file:///tmp/KBOX5/index.html'));
 assert.deepEqual(decode(url.searchParams.get('layout'),models),[]);
 assert.equal(url.hash,'#planner');
});
test('untrusted layouts reject invalid versions, models, coordinates and oversized payloads',()=>{
 for(const value of ['%', 'a'.repeat(8001),wrap({v:2,p:[]}),wrap({v:1,p:Array(13).fill(['king',1,2,0])}),wrap({v:1,p:[['unknown',0,0,0]]}),wrap({v:1,p:[['king','0',0,0]]}),wrap({v:1,p:[['king',null,0,0]]}),wrap({v:1,p:[['king',1e9,0,0]]}),wrap({v:1,p:[['king',1,2,0],['bad',1,2,0]]})])assert.throws(()=>decode(value,models));
});
test('negative rotations are normalized and shared links replace old state',()=>{
 const planes=[{model:models[0],x:0,y:0,angle:-15}];
 const url=new URL(link(planes,'https://example.com/?layout=old#details'));
 assert.equal(url.searchParams.getAll('layout').length,1);
 assert.equal(decode(url.searchParams.get('layout'),models)[0].angle,345);
});
