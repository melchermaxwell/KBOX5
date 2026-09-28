(() => {
'use strict';
const {anatomy,restroom}=globalThis.KBOX5Geometry;
const canvas=document.getElementById('hangar-3d'),ctx=canvas.getContext('2d');
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
let planes=[],tilt=0,door=0,active=false,frame=0,doorFaces=[];
const height=18; // Concept height only; no verified vertical clearances.
function project(p){
 const cy=30+110*tilt,cz=130-110*tilt,ty=30-5*tilt,tz=5*tilt;
 const dy=ty-cy,dz=tz-cz,len=Math.hypot(dy,dz),fy=dy/len,fz=dz/len;
 const py=p[1]-cy,pz=p[2]-cz,depth=py*fy+pz*fz;
 return [500+(p[0]-32.5)*1000/depth,330-(py*fz-pz*fy)*1000/depth,depth];
}
function draw(){
 if(!ctx)return;
 const scale=canvas.width/1000;ctx.setTransform(scale,0,0,scale,0,0);
 const sky=ctx.createLinearGradient(0,0,0,660);sky.addColorStop(0,'#9baebc');sky.addColorStop(1,'#e7e8e3');ctx.fillStyle=sky;ctx.fillRect(0,0,1000,660);
 const faces=[];doorFaces=[];
 function face(points,color,stroke='#50606a',doorPart=false){const p=points.map(project);if(p.some(v=>v[2]<=1))return;faces.push({p,color,stroke,depth:points.every(v=>v[2]<=.02)?10000-points[0][2]*100:p.reduce((a,v)=>a+v[2],0)/p.length,doorPart});}
 function box(x,y,z,w,d,h,color){const a=[x,y,z],b=[x+w,y,z],c=[x+w,y+d,z],e=[x,y+d,z],A=[x,y,z+h],B=[x+w,y,z+h],C=[x+w,y+d,z+h],E=[x,y+d,z+h];face([a,b,B,A],color);face([b,c,C,B],color);face([c,e,E,C],color);face([e,a,A,E],color);face([A,B,C,E],color);}
 face([[-30,-10,-.12],[95,-10,-.12],[95,125,-.12],[-30,125,-.12]],'#879594');
 face([[0,0,0],[65,0,0],[65,60,0],[0,60,0]],'#b9c2c3','#74838a');
 for(let x=0;x<=65;x+=5)face([[x,0,.01],[x+.035,0,.01],[x+.035,60,.01],[x,60,.01]],'#98a7aa','#98a7aa');
 for(let y=0;y<=60;y+=5)face([[0,y,.01],[65,y,.01],[65,y+.035,.01],[0,y+.035,.01]],'#98a7aa','#98a7aa');
 box(-.4,-.5,0,65.8,.5,20,'#d6dcde');box(-.5,0,0,.5,60,20,'#adbcc4');box(65,0,0,.5,60,20,'#bbc8ce');
 for(let y=0;y<=60;y+=15){box(0,y,0,.35,.35,20,'#7e919e');box(64.65,y,0,.35,.35,20,'#7e919e');face([[0,y,20],[65,y,20],[65,y+.25,20],[0,y+.25,20]],'#708590');}
 box(restroom.x,restroom.y,0,restroom.width,restroom.depth,9,'#e2e6df');box(6.3,6.02,0,3,.06,7,'#677f89');box(8.75,6.12,3,.13,.1,.13,'#edc34f');
 planes.forEach(plane=>{
  const a=plane.angle*Math.PI/180,c=Math.cos(a),s=Math.sin(a);
  for(const part of globalThis.KBOX5Aircraft3D.mesh(plane.model)){
   const points=part.points.map(([x,y,z])=>[plane.x+x*c-y*s,plane.y+x*s+y*c,z]);
   // Small surface quads are shaded without wireframe seams.
   face(points,part.color,null);
  }
 });
 // Two equal leaves: fixed upper hinge, outward knee, lower edge rising vertically.
 const angle=door*Math.PI*.47,kneeY=60+height/2*Math.sin(angle),kneeZ=height-height/2*Math.cos(angle),bottomZ=height-height*Math.cos(angle);
 const top=[[1,60,height],[64,60,height],[64,kneeY,kneeZ],[1,kneeY,kneeZ]],bottom=[[1,kneeY,kneeZ],[64,kneeY,kneeZ],[64,60,bottomZ],[1,60,bottomZ]];
 face(top,'#c6d0d4','#657c8a',true);face(bottom,'#b3c2ca','#657c8a',true);
 for(let x=2;x<64;x+=2){face([[x,60.02,height],[x+.035,60.02,height],[x+.035,kneeY+.02,kneeZ],[x,kneeY+.02,kneeZ]],'#8fa2ad','#8fa2ad');face([[x,kneeY+.02,kneeZ],[x+.035,kneeY+.02,kneeZ],[x+.035,60.02,bottomZ],[x,60.02,bottomZ]],'#8fa2ad','#8fa2ad');}
 box(0,60,0,1,.6,20,'#dce1e1');box(64,60,0,1,.6,20,'#dce1e1');box(0,60,18,65,.6,2,'#e7e9e4');
 faces.sort((a,b)=>b.depth-a.depth).forEach(f=>{ctx.beginPath();f.p.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fillStyle=f.color;ctx.fill();ctx.strokeStyle=f.stroke||f.color;ctx.lineWidth=f.stroke?.45:.55;ctx.lineJoin="round";ctx.stroke();if(f.doorPart)doorFaces.push(f.p);});
 const label=project([5,6.15,8]);if(door>.8){ctx.fillStyle='#304b5b';ctx.font='bold 11px Arial';ctx.textAlign='center';ctx.fillText('RESTROOM',label[0],label[1]);}
 ctx.textAlign='left';ctx.fillStyle='#203848';ctx.font='14px Arial';ctx.fillText('63′ BIFOLD DOOR  /  65′ × 60′ HANGAR',24,625);
}
function animate(key,to,done){cancelAnimationFrame(frame);const from=key==='tilt'?tilt:door,start=performance.now(),duration=reduced()?0:1100;function tick(now){const t=duration?Math.min(1,(now-start)/duration):1,e=t*t*(3-2*t);if(key==='tilt')tilt=from+(to-from)*e;else door=from+(to-from)*e;draw();if(t<1)frame=requestAnimationFrame(tick);else done?.();}frame=requestAnimationFrame(tick);}
function toggleDoor(){if(!active||tilt<.999)return;const open=door<.5;document.getElementById('door-toggle').textContent=open?'Close bifold door':'Open bifold door';document.getElementById('door-toggle').setAttribute('aria-expanded',String(open));animate('door',open?1:0);}
canvas.addEventListener('click',e=>{const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*1000/r.width,y=(e.clientY-r.top)*660/r.height;const inside=poly=>{let hit=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])hit=!hit;}return hit;};if(doorFaces.some(inside))toggleDoor();});
document.getElementById('door-toggle').addEventListener('click',toggleDoor);
globalThis.KBOX5View3D={enter(layout){planes=layout;active=true;tilt=0;draw();animate('tilt',1);},leave(done){active=false;animate('tilt',0,done);}};
})();
