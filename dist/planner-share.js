(() => {
'use strict';
const title='Check out this KBOX5 hangar.';
function encode(planes){return btoa(JSON.stringify({v:1,p:planes.map(p=>[p.model.id,p.x,p.y,p.angle])})).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
function decode(value,models){
 if(typeof value!=='string'||value.length>8000||!/^[A-Za-z0-9_-]+$/.test(value))throw Error('Invalid layout link');
 const data=JSON.parse(atob(value.replace(/-/g,'+').replace(/_/g,'/')));
 if(data?.v!==1||!Array.isArray(data.p)||data.p.length>12)throw Error('Unsupported layout');
 return data.p.map((row,i)=>{
  if(!Array.isArray(row)||row.length!==4)throw Error('Invalid aircraft');
  const [id,x,y,angle]=row,model=models.find(m=>m.id===id);
  if(!model||![x,y,angle].every(Number.isFinite)||Math.abs(x)>10000||Math.abs(y)>10000||Math.abs(angle)>100000)throw Error('Invalid aircraft');
  return {id:i+1,model,x,y,angle:angle>=0&&angle<360?angle:((angle%360)+360)%360};
 });
}
function link(planes,base){const url=new URL(base);url.searchParams.set('layout',encode(planes));url.hash='planner';return url.href;}
globalThis.KBOX5Share=Object.freeze({title,encode,decode,link});
})();
