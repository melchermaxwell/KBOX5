(() => {
'use strict';
// Original, illustrative meshes. References and variant limitations: docs/aircraft-3d-references.md.
// Side stations: normalized length, centerline height (ft), vertical half-depth (ft).
const specs={
 king:{side:[[-.5,4.8,0],[-.47,4.8,.60],[-.405,4.9,1.15],[-.34,5.2,1.6],[-.28,5.8,2.25],[-.22,5.9,2.45],[.065,5.9,2.45],[.22,6.2,1.75],[.37,6.9,.75],[.5,7.3,0]],wing:3.8,dihedral:.065,flatWing:9.5,tail:7.8,fin:[[.16,7.7],[.35,14.3],[.46,14.3],[.49,7.1]],engineZ:5.1,blades:4,propR:3.75,track:7.7,mainY:-.10,noseY:-.40,wheel:.83,dualMain:true,windows:4,roundWindows:true,windowPositions:[-.18,-.132,-.085,.03],glass:[-.34,-.275],windowStart:-.18},
 king200:{side:[[-.5,4.7,0],[-.47,4.8,.65],[-.41,4.9,1.3],[-.34,5.5,1.95],[-.28,5.7,2.35],[-.02,5.7,2.35],[.13,5.9,2.15],[.29,6.35,1.30],[.43,6.8,.42],[.5,7,0]],wing:3.6,dihedral:.07,flatWing:9.4,tail:14.6,fin:[[.21,7.6],[.335,14.5],[.479,14.5],[.38,7.8],[.36,6.9]],engineZ:5.1,blades:3,propR:3.88,track:8.4,mainY:-.095,noseY:-.38,wheel:.8,dualMain:true,windows:6,roundWindows:true,glass:[-.34,-.275],windowStart:-.20},
 bravo:{side:[[-.5,4.2,0],[-.43,4.3,1],[-.35,5.6,2.3],[-.24,5.8,2.65],[.17,5.8,2.6],[.32,6.7,1.6],[.5,7.6,0]],wing:3,dihedral:.05,tail:10.2,fin:[[.22,6.7],[.38,15],[.45,15],[.49,7.5]],engineZ:7.2,jet:true,track:6.2,mainY:.03,noseY:-.37,wheel:.76,windows:6,glass:[-.365,-.29],windowStart:-.20},
 phenom:{side:[[-.5,3.8,0],[-.43,4.2,1],[-.32,5.3,2.6],[-.22,5.6,2.9],[.16,5.6,2.8],[.32,6.8,1.6],[.5,8.2,0]],wing:2.8,dihedral:.055,tail:16.4,fin:[[.22,6.5],[.38,16.75],[.46,16.75],[.49,8]],engineZ:7.4,jet:true,winglets:3.1,track:6.2,mainY:.08,noseY:-.37,wheel:.8,windows:5,windowPositions:[-.226,-.182,-.138,-.094,-.05],glass:[-.38,-.295],windowStart:-.226},
 tbm:{side:[[-.5,5.2,0],[-.42,5.1,1.15],[-.30,5.1,1.5],[-.19,5.9,2.5],[.10,5.9,2.5],[.30,6.6,1.1],[.5,7.1,0]],wing:3.5,dihedral:.07,tail:7.5,fin:[[.15,7],[.37,14.3],[.45,14.3],[.49,7.1]],engineZ:5.2,blades:4,propR:3.8,track:6.35,mainY:.025,noseY:-.35,wheel:.7,windows:3,glass:[-.26,-.17],windowStart:-.12},
 pc12:{side:[[-.5,5.4,0],[-.42,5.4,1.3],[-.32,5.8,1.7],[-.24,6.3,2.6],[-.12,6.3,2.85],[.16,6.3,2.8],[.32,7.6,1.2],[.5,8.2,0]],wing:3.4,dihedral:.07,tail:13.6,fin:[[.20,7.8],[.37,14],[.45,14],[.49,8.1]],engineZ:5.4,blades:5,propR:4.375,winglets:1.1,track:7.4,mainY:.07,noseY:-.30,wheel:.85,windows:5,glass:[-.30,-.22],windowStart:-.15},
 vision:{side:[[-.5,3.3,0],[-.40,3.4,1],[-.29,4.2,2.2],[-.14,4.4,2.7],[.04,4.4,2.5],[.23,4.9,1.2],[.5,5.1,0]],wing:2.5,dihedral:.055,tail:5.15,vtail:true,dorsal:true,track:4.6,mainY:.08,noseY:-.31,wheel:.55,windows:3,glass:[-.33,-.20],windowStart:-.13},
 sr22:{side:[[-.5,4.2,0],[-.43,4.2,1],[-.34,4.3,1.35],[-.26,4.8,1.9],[-.17,4.8,2.2],[-.04,4.8,2.15],[.10,4.5,1.5],[.28,4.4,.7],[.5,4.6,0]],wing:2.75,dihedral:.045,tail:4.65,fin:[[.22,4.8],[.40,8.9167],[.49,8.9167],[.47,4.6]],engineZ:4.2,blades:3,propR:3.25,track:4.35,mainY:-.01,noseY:-.34,wheel:.58,fairings:true,windows:2,windowRanges:[[-.18,-.06],[-.01,.085]],glass:[-.30,-.195],windowStart:-.18},
 cessna:{side:[[-.5,5.7,0],[-.43,5.6,1.1],[-.33,5.5,1.4],[-.21,5.5,2],[.015,4.9,1.8],[.20,3.5,1],[.5,1.8,0]],wing:7.4,dihedral:.018,tail:2.25,fin:[[.23,3],[.35,7.9],[.43,7.9],[.49,2]],engineZ:5.7,blades:3,propR:3.35,track:4.3,mainY:-.20,wheel:.88,tailwheel:true,struts:true,windows:2,glass:[-.32,-.23],windowStart:-.17},
 cessna206:{side:[[-.5,4.4,0],[-.43,4.4,1.05],[-.33,4.5,1.5],[-.24,5.2,2],[.05,5.2,2],[.25,4.5,1.1],[.5,4.5,0]],wing:7.1,dihedral:.018,tail:4.65,fin:[[.23,5],[.37,9.3],[.45,9.3],[.49,4.5]],engineZ:4.4,blades:3,propR:3,track:4.6,mainY:-.03,noseY:-.36,wheel:.72,struts:true,windows:3,glass:[-.35,-.27],windowStart:-.20},
 mustang:{side:[[-.5,6,0],[-.44,5.9,1.25],[-.29,5.7,1.7],[-.16,5.4,1.65],[.05,4.8,1.7],[.24,3.5,.9],[.5,2.1,0]],wing:3.6,dihedral:.09,tail:2.65,fin:[[.20,3.5],[.36,11],[.43,10.8],[.49,2.5]],engineZ:6,blades:4,propR:5.55,track:5.2,mainY:-.16,wheel:1.05,tailwheel:true,canopy:true,windows:0,glass:[-.18,.06]}
};
const cache=new WeakMap(),pi=Math.PI;
function interpolate(stations,t){let i=1;while(i<stations.length-1&&t>stations[i][0])i++;const a=stations[i-1],b=stations[i],f=Math.max(0,Math.min(1,(t-a[0])/(b[0]-a[0])));return a.slice(1).map((v,j)=>v+(b[j+1]-v)*f);}
function mesh(model){
 if(cache.has(model))return cache.get(model);
 if(model.id==='king'){const result=Object.freeze(c90Mesh(model));cache.set(model,result);return result;}
 const {profile,components}=globalThis.KBOX5Geometry.anatomy(model),q=specs[model.id],faces=[];
 const white=model.id==='mustang'?'#c4cdd3':'#e8edf0',dark='#233d50',trim=model.color;
 const shade=(hex,f)=>'#'+hex.slice(1).match(/../g).map(v=>Math.max(0,Math.min(255,Math.round(parseInt(v,16)*f))).toString(16).padStart(2,'0')).join('');
 function face(points,color,kind){if(points.some(p=>!p.every(Number.isFinite)))throw Error('Invalid mesh');faces.push({points,color,kind});}
 function skin(rings,color,kind){for(let j=1;j<rings.length;j++)for(let i=0;i<rings[j].length;i++){const k=(i+1)%rings[j].length,f=.77+.23*Math.sin((i+.5)*2*pi/rings[j].length);face([rings[j-1][i],rings[j][i],rings[j][k],rings[j-1][k]],shade(color,f),kind);}}
 function loft(x,y,z,rx,rz,length,color,kind,cap=true){const rings=[0,.08,.22,.7,.93,1].map((f,j)=>Array.from({length:20},(_,i)=>{const a=i*pi/10,r=[.7,.94,1,.97,.77,.6][j];return [x+rx*r*Math.cos(a),y+length*f,z+rz*r*Math.sin(a)];}));skin(rings,color,kind);if(cap){face(rings[0],dark,kind);face(rings.at(-1),dark,kind);}return rings;}
 function tube(a,b,r,color,kind){const d=b.map((v,i)=>v-a[i]),len=Math.hypot(...d),n=d.map(v=>v/len),ref=Math.abs(n[2])<.9?[0,0,1]:[0,1,0],u=[n[1]*ref[2]-n[2]*ref[1],n[2]*ref[0]-n[0]*ref[2],n[0]*ref[1]-n[1]*ref[0]],ul=Math.hypot(...u);u.forEach((v,i)=>u[i]/=ul);const v=[n[1]*u[2]-n[2]*u[1],n[2]*u[0]-n[0]*u[2],n[0]*u[1]-n[1]*u[0]];skin([a,b].map(p=>Array.from({length:8},(_,i)=>p.map((c,j)=>c+r*(u[j]*Math.cos(i*pi/4)+v[j]*Math.sin(i*pi/4))))),color,kind);}
 function plate(points,thick,color,kind){const a=points.map(([x,y,z])=>[x,y,z+thick/2]),b=points.map(([x,y,z])=>[x,y,z-thick/2]);face(a,color,kind);face([...b].reverse(),shade(color,.67),kind);for(let i=0;i<a.length;i++){const j=(i+1)%a.length;face([a[i],a[j],b[j],b[i]],shade(color,.8),kind);}}
 function bodyAt(t,a,extra=0){const [w]=interpolate(profile.body,t),[z,rz]=interpolate(q.side,t);return [(w*model.span+extra)*Math.cos(a),t*model.length,z+(rz+extra)*Math.sin(a)];}
 // Glazing and stripes are materials on the fuselage mesh itself. Floating
 // overlay quads cut through a curved hull and caused white gaps as it rotated.
 const noseStart=profile.props?.length===1?-.43:-.5;
 const windowRanges=q.windowRanges||Array.from({length:q.windows},(_,i)=>[(q.windowPositions?.[i]??q.windowStart+i*.059),(q.windowPositions?.[i]??q.windowStart+i*.059)+.026]);
 const stationCount=model.id==='sr22'?161:57,angleCount=model.id==='sr22'?65:33;
 const stations=[...new Set([...Array.from({length:stationCount},(_,i)=>noseStart+(.5-noseStart)*i/(stationCount-1)),...profile.body.map(p=>p[0]),...q.side.map(p=>p[0]),...q.glass,...windowRanges.flat(),-.33,.264].filter(t=>t>=noseStart&&t<=.5))].sort((a,b)=>a-b);
 const angles=[...new Set([...Array.from({length:angleCount},(_,i)=>i*2*pi/(angleCount-1)),.10,.18,.65,pi-.65,pi-.18,pi-.10,pi/2-.025,pi/2+.025,.04,2*pi-.04,pi-.04,pi+.04])].sort((a,b)=>a-b);
 const rings=stations.map(t=>angles.slice(0,-1).map(a=>bodyAt(t,a)));
 const sr22Windows=[
  [[-.239,5.25],[-.208,6.42],[-.141,6.43],[-.121,6.23],[-.151,5.28],[-.176,5.14],[-.227,5.13]],
  [[-.104,6.15],[-.055,6.02],[-.006,5.73],[.005,5.45],[-.012,5.20],[-.12,5.17]]
 ];
 const sr22Door=[[-.247,4.25],[-.255,4.4],[-.218,6.55],[-.205,6.66],[-.125,6.62],[-.10,6.39],[-.113,5.8],[-.15,4.4],[-.17,4.25]];
 const inPanel=(t,z,polygon)=>{let inside=false;for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){const a=polygon[i],b=polygon[j];if((a[1]>z)!==(b[1]>z)&&t<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])inside=!inside;}return inside;};
 const nearPanel=(t,z,polygon)=>polygon.some(([ay,az],i)=>{const [by,bz]=polygon[(i+1)%polygon.length],dy=(by-ay)*model.length,dz=bz-az,py=(t-ay)*model.length,pz=z-az,f=Math.max(0,Math.min(1,(py*dy+pz*dz)/(dy*dy+dz*dz)));return Math.hypot(py-f*dy,pz-f*dz)<.045;});

 for(let j=1;j<stations.length;j++)for(let i=0;i<angles.length-1;i++){
  const t=(stations[j-1]+stations[j])/2,a=(angles[i]+angles[i+1])/2;
  const cockpit=!q.canopy&&t>q.glass[0]&&t<q.glass[1]&&a>.18&&a<pi-.18&&Math.abs(a-pi/2)>.025;
  let sideWindow=windowRanges.some(([from,to])=>q.roundWindows?((t-(from+to)/2)/((to-from)/2))**2+((Math.min(a,Math.abs(pi-a))-.375)/.275)**2<1:t>from&&t<to)&&((a>.10&&a<.65)||(a>pi-.65&&a<pi-.10));
  const sr22Side=model.id==='sr22'&&Math.abs(Math.cos(a))>.45,skinZ=bodyAt(t,a)[2];
  if(model.id==='sr22')sideWindow=sr22Side&&sr22Windows.some(p=>inPanel(t,skinZ,p));
  const doorSeam=sr22Side&&nearPanel(t,skinZ,sr22Door);
  const belt=t>-.33&&t<.264&&(a<.04||a>2*pi-.04||Math.abs(a-pi)<.04);
  const color=cockpit||sideWindow?dark:doorSeam?'#82929d':belt?trim:shade(white,.77+.23*Math.sin(a)),kind=cockpit?'cockpit':sideWindow?'window':doorSeam?'door-seam':belt?'livery':'fuselage';
  const k=(i+1)%rings[j].length;
  face([rings[j-1][i],rings[j][i],rings[j][k]],color,kind);
  face([rings[j-1][i],rings[j][k],rings[j-1][k]],color,kind);
 }
 if(profile.props?.length===1){const [w]=interpolate(profile.body,noseStart),[,rz]=interpolate(q.side,noseStart);const front=angles.slice(0,-1).map(a=>[w*model.span*.72*Math.cos(a),-.455*model.length+.04,q.engineZ+rz*.72*Math.sin(a)]);skin([front,rings[0]],white,'cowling');face(front,white,'cowling');}
 if(q.canopy){const cr=Array.from({length:15},(_,j)=>{const t=q.glass[0]+(q.glass[1]-q.glass[0])*j/14,f=Math.sin(j*pi/14),[z,rz]=interpolate(q.side,t);return Array.from({length:13},(_,i)=>{const a=i*pi/12;return [1.1*f*Math.cos(a),t*model.length,z+rz*.8+1.5*f*Math.sin(a)];});});skin(cr,dark,'canopy');}
 for(const c of components){if(c.kind!=='wing'&&c.kind!=='tail')continue;const tail=c.kind==='tail';const pts=c.points.map(([x,y])=>[x,y,tail?q.tail+(q.vtail?Math.abs(x)*.84:Math.abs(x)*.015):q.wing+Math.max(0,Math.abs(x)-(q.flatWing||0))*q.dihedral]);plate(pts,tail?.10:.22,white,tail?'tailplane':'wing');}
 if(model.id==='phenom')for(const c of components.filter(c=>c.kind==='pylon'))plate(c.points.map(([x,y])=>[x,y,q.engineZ-.25]),.18,white,'engine-pylon');
 if(q.fin){const pts=q.fin.map(([y,z])=>[.085,y*model.length,z]);face(pts,trim,'fin');face(pts.map(([x,y,z])=>[-x,y,z]).reverse(),shade(trim,.78),'fin');for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];face([a,b,[-b[0],b[1],b[2]],[-a[0],a[1],a[2]]],white,'fin');}}
 if(q.winglets)for(const sign of [-1,1]){const x=sign*model.span*.485,y=model.length*profile.wing[Math.floor(profile.wing.length/2)][1],z=q.wing+Math.max(0,Math.abs(x)-(q.flatWing||0))*q.dihedral;if(model.id==='phenom')plate([[sign*model.span*.462,model.length*.103,z],[sign*model.span*.477,model.length*.116,z+q.winglets],[sign*model.span*.5,model.length*.182,z+q.winglets*.8],[sign*model.span*.474,model.length*.160,z]],.09,white,'winglet');else plate([[x,y-.4,z],[x+sign*.3,y+.5,z+q.winglets],[x+sign*.4,y+1.3,z+q.winglets],[x,y+1.6,z]],.09,trim,'winglet');}
 for(const [x,y,w,l] of profile.engines||[]){const rx=q.jet?w*model.span*1.12:w*model.span;if(model.id==='king200'||model.id==='king'){
 const stations=[[0,.08],[.06,.50],[.14,.82],[.24,1],[.42,1],[.58,.84],[.74,.64],[.90,.31],[1,.015]];
 const nr=stations.map(([t,r])=>Array.from({length:24},(_,i)=>{const a=i*pi/12;return [x*model.span+rx*r*Math.cos(a),(y+l*t)*model.length,q.engineZ+rx*r*Math.sin(a)];}));skin(nr,white,'nacelle');
 }else loft(x*model.span,y*model.length,q.engineZ,rx,rx*(q.jet?1:1.1),l*model.length,white,'nacelle');if(q.jet){const ey=y*model.length;loft(x*model.span,ey-.02,q.engineZ,rx*.75,rx*.75,.18,'#677b87','intake');}else loft(x*model.span,y*model.length-.35,q.engineZ,rx*.38,rx*.38,.6,trim,'spinner');}
 if(q.dorsal){loft(0,-.015*model.length,7.2,1.05,1.1,model.length*.25,white,'dorsal-engine');loft(0,-.015*model.length-.04,7.2,.78,.83,.2,dark,'intake');}
 for(const [px,py] of profile.props||[]){const x=px*model.span,y=(profile.props.length===1?-.455:py)*model.length,z=q.engineZ,r=q.propR;for(let i=0;i<q.blades;i++){const a=i*2*pi/q.blades+.3;const p=(radius,offset)=>[x+radius*Math.sin(a)+offset*Math.cos(a),y,z+radius*Math.cos(a)-offset*Math.sin(a)];face([p(.3,-.10),p(r*.75,-.20),p(r,-.09),p(r,.09),p(r*.6,.22),p(.3,.12)],'#283843','propeller');face([p(r*.89,-.11),p(r,-.09),p(r,.09),p(r*.89,.14)],trim,'propeller-tip');}const hub=Array.from({length:20},(_,i)=>[x+.4*Math.cos(i*pi/10),y+.08,z+.4*Math.sin(i*pi/10)]);for(let i=0;i<20;i++)face([[x,y-.65,z],hub[i],hub[(i+1)%20]],shade(white,.85+.15*Math.sin(i*pi/10)),'spinner');}
 function wheel(x,y,r,attachX,attachZ){const width=r*.55,rings=[x-width/2,x+width/2].map(v=>Array.from({length:16},(_,i)=>[v,y+r*Math.cos(i*pi/8),r+r*Math.sin(i*pi/8)]));skin(rings,'#263039','wheel');face(rings[0],'#263039','wheel');face(rings[1],'#263039','wheel');for(const side of [-1,1])face(Array.from({length:16},(_,i)=>[x+side*(width/2+.01),y+r*.4*Math.cos(i*pi/8),r+r*.4*Math.sin(i*pi/8)]),'#a6b0b5','hub');tube([x,y,r],[attachX,y,attachZ],.10,'#7b8a93','gear');
 if(q.fairings){const fairing=Array.from({length:15},(_,j)=>{const t=j/14,scale=Math.sin(pi*t);return Array.from({length:20},(_,i)=>{const a=i*pi/10;return [x+r*.65*scale*Math.cos(a),y-r*1.9+t*r*4.2,r*1.45+r*.85*scale*Math.sin(a)];});});skin(fairing,white,'wheel-fairing');}
 }
 for(const sign of [-1,1])for(const offset of q.dualMain?[-.32,.32]:[0])wheel(sign*q.track+offset,q.mainY*model.length,q.wheel,sign*(q.struts?1.3:q.track*.9),q.wing);
 if(q.tailwheel)wheel(0,model.length*.44,.32,0,1.8);else wheel(0,q.noseY*model.length,q.wheel*.72,0,interpolate(q.side,q.noseY)[0]-1);
 if(q.struts)for(const sign of [-1,1])tube([sign*1.4,-.04*model.length,3],[sign*model.span*.30,-.12*model.length,q.wing+model.span*.30*q.dihedral],.09,white,'wing-strut');
 if(q.canopy)loft(0,model.length*.02,3,1, .6,model.length*.17,'#9aaab4','radiator');
 const result=Object.freeze(faces);cache.set(model,result);return result;
}
// Dedicated C90B surfaces: independent of the approved 2D footprint.
function c90Mesh(model){
 const faces=[],white='#e8edf0',navy='#253e52',glass='#173c50',gold='#c6a052',metal='#9eafb9';
 const shade=(hex,f)=>'#'+hex.slice(1).match(/../g).map(v=>Math.round(Math.min(255,parseInt(v,16)*f)).toString(16).padStart(2,'0')).join('');
 function face(p,color,kind){if(p.some(v=>!v.every(Number.isFinite)))throw Error('Invalid C90 mesh');const a=p[1].map((v,i)=>v-p[0][i]),b=p[2].map((v,i)=>v-p[0][i]);if(Math.hypot(a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0])<1e-10)return;faces.push({points:p,color,kind});}
 function quad(p,color,kind){face([p[0],p[1],p[2]],color,kind);face([p[0],p[2],p[3]],color,kind);}
 function smooth(rows,t){let i=1;while(i<rows.length-1&&t>rows[i][0])i++;const a=rows[i-1],b=rows[i],prev=rows[Math.max(0,i-2)],next=rows[Math.min(rows.length-1,i+1)],d=b[0]-a[0],u=Math.max(0,Math.min(1,(t-a[0])/d));return a.slice(1).map((v,k)=>{k++;const m0=(b[k]-prev[k])/(b[0]-prev[0]),m1=(next[k]-a[k])/(next[0]-a[0]);return Math.max(Math.min(v,b[k]),Math.min(Math.max(v,b[k]),(2*u**3-3*u*u+1)*v+(u**3-2*u*u+u)*d*m0+(-2*u**3+3*u*u)*b[k]+(u**3-u*u)*d*m1));});}
 // Long radome, raised cockpit roof, constant cabin section and a rising tailcone.
 const body=[[-.5,0,4.9,0],[-.485,.38,4.94,.35],[-.45,.95,4.96,.82],[-.39,1.52,5.02,1.2],[-.335,1.89,5.16,1.32],[-.315,1.97,5.20,1.40],[-.285,2.15,5.80,2.14],[-.23,2.42,5.8,2.35],[-.075,2.42,5.8,2.35],[.10,2.30,5.95,2.22],[.245,1.52,6.25,1.56],[.37,.80,6.77,.86],[.465,.25,7.24,.30],[.5,0,7.36,0]];
 const hull=(t,a)=>{const [w,z,h]=smooth(body,t);return [w*Math.cos(a),t*model.length,z+h*Math.sin(a)];};
 // Clip material regions into the hull tessellation, so window edges are crisp
 // and cannot intersect the fuselage as floating decals would.
 function half(poly,a,b,inside){const side=p=>(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0]);const out=[];for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length],dp=side(p),dq=side(q),pin=inside?dp>=-1e-10:dp<=1e-10,qin=inside?dq>=-1e-10:dq<=1e-10;if(pin)out.push(p);if(pin!==qin){const f=dp/(dp-dq);out.push([p[0]+f*(q[0]-p[0]),p[1]+f*(q[1]-p[1])]);}}return out;}
 const masks=[];
 function mask(poly,color,kind){const area=poly.reduce((s,p,i)=>{const q=poly[(i+1)%poly.length];return s+p[0]*q[1]-q[0]*p[1];},0);if(area<0)poly=[...poly].reverse();masks.push({poly,color,kind,lo:[Math.min(...poly.map(p=>p[0])),Math.min(...poly.map(p=>p[1]))],hi:[Math.max(...poly.map(p=>p[0])),Math.max(...poly.map(p=>p[1]))]});}
 function pair(poly,color,kind){mask(poly,color,kind);mask(poly.map(([t,a])=>[t,pi-a]),color,kind);}
 function ellipse(t,a,ry,ra,color,kind){pair(Array.from({length:24},(_,i)=>[t+ry*Math.cos(i*pi/12),a+ra*Math.sin(i*pi/12)]),color,kind);}
 // Subtle two-tone belly and parallel pinstripes, mirrored on the cabin sides.
 mask([[-.39,pi+.07],[.30,pi+.07],[.30,2*pi-.07],[-.39,2*pi-.07]],navy,'livery');
 pair([[-.405,.015],[.34,.075],[.34,.11],[-.405,.050]],gold,'livery');
 pair([[-.38,.080],[.31,.145],[.31,.178],[-.38,.113]],navy,'livery');
 // Narrow port entry-door seams preserve the underlying shading and livery.
 const doorOuter=[[.15,pi-.38],[.25,pi-.38],[.265,pi+.48],[.15,pi+.48]],doorInner=[[.152,pi-.37],[.248,pi-.37],[.263,pi+.47],[.152,pi+.47]];
 for(let i=0;i<4;i++){const k=(i+1)%4;mask([doorOuter[i],doorOuter[k],doorInner[k],doorInner[i]],'#71828f','door-seam');}
 for(const t of [-.17,-.065,.04,.195]){ellipse(t,.385,.016,.185,metal,'window-frame');ellipse(t,.385,.0135,.158,glass,'window');}
 // Match the approved 2D windshield: a shallow curved band, two front panes,
 // a narrow center mullion, and compact side glazing behind white corner posts.
 // Map its plan-view Bezier boundaries onto the hull instead of extending
 // angular masks over the cockpit roof.
 const windshieldPoint=(u,rear)=>{const t=rear?-.2855+.0045*u*u:-.318+.015*u*u,x=u*(rear?.041:.039)*model.span;return [t,Math.acos(Math.min(1,x/smooth(body,t)[0]))];};
 const center=.06/(.039*model.span);
 for(let i=0;i<16;i++){const u=center+(1-center)*i/16,v=center+(1-center)*(i+1)/16;pair([windshieldPoint(u,false),windshieldPoint(v,false),windshieldPoint(v,true),windshieldPoint(u,true)],glass,'cockpit');}
 pair([[-.273,.25],[-.227,.25],[-.229,.82],[-.273,.92]],glass,'cockpit');
 function hullCell(poly,a){let pieces=[{poly,color:shade(white,.78+.22*Math.sin(a)),kind:'fuselage'}];const lo=[Math.min(...poly.map(p=>p[0])),Math.min(...poly.map(p=>p[1]))],hi=[Math.max(...poly.map(p=>p[0])),Math.max(...poly.map(p=>p[1]))];for(const m of masks){if(hi[0]<m.lo[0]||lo[0]>m.hi[0]||hi[1]<m.lo[1]||lo[1]>m.hi[1])continue;const next=[];for(const piece of pieces){let remaining=piece.poly;for(let j=0;j<m.poly.length&&remaining.length>=3;j++){const p=m.poly[j],q=m.poly[(j+1)%m.poly.length],outside=half(remaining,p,q,false);if(outside.length>=3)next.push({...piece,poly:outside});remaining=half(remaining,p,q,true);}if(remaining.length>=3)next.push({poly:remaining,color:m.color,kind:m.kind});}pieces=next;}for(const p of pieces){const v=p.poly.map(([t,a])=>hull(t,a));for(let i=1;i<v.length-1;i++)face([v[0],v[i],v[i+1]],p.color,p.kind);}}
 const ts=[...new Set([...Array.from({length:91},(_,i)=>-.5+i/90),...body.map(s=>s[0])])].sort((a,b)=>a-b),na=48;
 for(let j=1;j<ts.length;j++)for(let i=0;i<na;i++){const a=i*2*pi/na,b=(i+1)*2*pi/na;hullCell([[ts[j-1],a],[ts[j],a],[ts[j],b],[ts[j-1],b]],(a+b)/2);}
 // Rounded airfoil sections replace the old flat slabs, including the low tail.
 function airfoil(rows,vertical,kind){const samples=[];for(let j=1;j<rows.length;j++)for(let i=0;i<4;i++){const f=i/4;samples.push(rows[j-1].map((v,k)=>v+(rows[j][k]-v)*f));}samples.push(rows.at(-1));const n=16;
  const point=(s,u,side)=>{const [r,front,rear,z,h]=s,f=(1-Math.cos(pi*u))/2,th=10*h*(.2969*Math.sqrt(f)-.126*f-.3516*f*f+.2843*f**3-.1036*f**4),c=.035*Math.sin(pi*f);return vertical?[side*th,front+(rear-front)*f,r]:[r,front+(rear-front)*f,z+c+side*th];};
  for(let j=1;j<samples.length;j++)for(let i=0;i<n;i++)for(const side of [-1,1]){const u=i/n,v=(i+1)/n,chord=(1-Math.cos(pi*(u+v)/2))/2;let color=side>0?white:'#a4b3bd';if(vertical)color=chord>.77?navy:white;else if(kind==='wing'&&chord<.06)color='#344550';else if(chord>.76&&chord<.79)color='#9cacb5';quad([point(samples[j-1],u,side),point(samples[j],u,side),point(samples[j],v,side),point(samples[j-1],v,side)],color,kind);}
  for(const s of [samples[0],samples.at(-1)])for(let i=0;i<n;i++)quad([point(s,i/n,1),point(s,(i+1)/n,1),point(s,(i+1)/n,-1),point(s,i/n,-1)],'#b0bec7',kind);
 }
 for(const sign of [-1,1]){
  airfoil([[0,-9.3,-2.8,3.8,.55],[3,-9.3,-2.8,3.8,.55],[9.5,-9.0,-2.8,3.8,.43],[24.5,-8.05,-5.18,4.78,.16],[model.span/2,-7.87,-5.42,4.82,.018]].map(([x,...v])=>[x*sign,...v]),false,'wing');
  airfoil([[0,12.1,16.7,7.8,.18],[1.1,12.3,16.75,7.8,.18],[8.3,15.3,17.2,7.93,.09],[8.55,15.55,17.12,7.94,.015]].map(([x,...v])=>[x*sign,...v]),false,'tailplane');
 }
 airfoil([[7.3,6.0,17.2,0,.22],[8.9,7.3,17.0,0,.22],[13.9,12.1,16.0,0,.10],[14.3,12.5,15.85,0,.045]],true,'fin');
 function radialLoft(x,rows,color,kind,n=32){const rings=rows.map(([y,z,rx,rz])=>Array.from({length:n},(_,i)=>[x+rx*Math.cos(i*2*pi/n),y,z+rz*Math.sin(i*2*pi/n)]));for(let j=1;j<rings.length;j++)for(let i=0;i<n;i++){const k=(i+1)%n;quad([rings[j-1][i],rings[j][i],rings[j][k],rings[j-1][k]],shade(color,.78+.22*Math.sin((i+.5)*2*pi/n)),kind);}face(rings[0],color,kind);face(rings.at(-1),color,kind);}
 function tube(a,b,r,color,kind){const d=b.map((v,i)=>v-a[i]),len=Math.hypot(...d),n=d.map(v=>v/len),ref=Math.abs(n[2])<.9?[0,0,1]:[0,1,0],u=[n[1]*ref[2]-n[2]*ref[1],n[2]*ref[0]-n[0]*ref[2],n[0]*ref[1]-n[1]*ref[0]],ul=Math.hypot(...u);u.forEach((v,i)=>u[i]/=ul);const v=[n[1]*u[2]-n[2]*u[1],n[2]*u[0]-n[0]*u[2],n[0]*u[1]-n[1]*u[0]],rings=[a,b].map(p=>Array.from({length:12},(_,i)=>p.map((c,j)=>c+r*(u[j]*Math.cos(i*pi/6)+v[j]*Math.sin(i*pi/6)))));for(let i=0;i<12;i++){const k=(i+1)%12;quad([rings[0][i],rings[1][i],rings[1][k],rings[0][k]],shade(color,.82+.15*Math.cos(i*pi/6)),kind);}face(rings[0],color,kind);face(rings[1],'#26333b',kind);}
 for(const sign of [-1,1]){const x=sign*7.74,py=-14.63,z=5.1;
  const sections=[[-14.35,5.1,.77,.81],[-13.85,5.1,1.02,1.03],[-12.5,5.05,1.17,1.16],[-10.4,5.0,1.16,1.13],[-8.5,4.95,.96,.93],[-6.6,4.75,.63,.65],[-4.7,4.48,.08,.12]];
  const dense=[];for(let j=1;j<sections.length;j++)for(let k=0;k<4;k++){const y=sections[j-1][0]+(sections[j][0]-sections[j-1][0])*k/4;dense.push([y,...smooth(sections,y)]);}dense.push(sections.at(-1));radialLoft(x,dense,white,'nacelle');
  radialLoft(x,[[-14.42,4.25,.45,.23],[-14.08,4.25,.52,.30],[-13.30,4.24,.38,.22]],white,'intake-fairing');
  face(Array.from({length:24},(_,i)=>[x+.38*Math.cos(i*pi/12),-14.445,4.25+.16*Math.sin(i*pi/12)]),'#1b2932','intake');
  tube([x+sign*.9,-12.55,5.12],[x+sign*1.5,-11.98,4.9],.22,'#677884','exhaust');
  radialLoft(x,[[py-.72,z,.015,.015],[py-.58,z,.25,.25],[py-.30,z,.44,.44],[py+.10,z,.48,.48]],'#cbd5dc','spinner');
  for(let blade=0;blade<4;blade++){const a=blade*pi/2+.24,p=(r,t,dy)=>[x+r*Math.sin(a)+t*Math.cos(a),py+dy,z+r*Math.cos(a)-t*Math.sin(a)],outline=[[.35,-.12],[1.0,-.21],[2.55,-.25],[3.48,-.13],[3.75,.02],[3.68,.16],[2.48,.30],[.9,.20]],front=outline.map(([r,t])=>p(r,t,-.035)),back=outline.map(([r,t])=>p(r,t,.035));face(front,'#26333e','propeller');face([...back].reverse(),'#465461','propeller');for(let i=0;i<front.length;i++){const k=(i+1)%front.length;quad([front[i],back[i],back[k],front[k]],'#33434d','propeller');}face([p(3.47,-.125,-.04),p(3.75,.02,-.04),p(3.68,.16,-.04),p(3.45,.19,-.04)],'#e7d6a3','propeller-tip');}
 }
 function wheel(x,y,r,w){const n=28,rings=[[-.5,.83],[-.36,.98],[.0,1],[.36,.98],[.5,.83]].map(([a,b])=>Array.from({length:n},(_,i)=>[x+w*a,y+r*b*Math.cos(i*2*pi/n),r+r*b*Math.sin(i*2*pi/n)]));for(let j=1;j<rings.length;j++)for(let i=0;i<n;i++){const k=(i+1)%n;quad([rings[j-1][i],rings[j][i],rings[j][k],rings[j-1][k]],j===2||j===3?'#202930':'#34414a','wheel');}face(rings[0],'#34414a','wheel');face(rings.at(-1),'#34414a','wheel');for(const side of [-1,1]){face(Array.from({length:n},(_,i)=>[x+side*w*.51,y+r*.49*Math.cos(i*2*pi/n),r+r*.49*Math.sin(i*2*pi/n)]),metal,'hub');for(let i=0;i<6;i++){const a=i*pi/3;face(Array.from({length:8},(_,j)=>[x+side*w*.515,y+r*.30*Math.cos(a)+r*.07*Math.cos(j*pi/4),r+r*.30*Math.sin(a)+r*.07*Math.sin(j*pi/4)]),'#465761','hub');}}}
 for(const sign of [-1,1]){const x=sign*7.74,y=-3.65;for(const offset of [-.32,.32])wheel(x+offset,y,.83,.43);tube([x,y,.83],[x,y,4.3],.13,metal,'gear');tube([x,y,1.65],[x-sign*.55,y-.5,3.8],.08,metal,'gear');tube([x,y-.30,1.30],[x,y+.24,2.1],.085,'#d1dae0','gear');quad([[x-.28,y-.6,2.4],[x-.28,y+.65,2.4],[x-.28,y+.65,4.2],[x-.28,y-.6,4.2]],white,'gear-door');}
 wheel(0,-14.1,.60,.39);tube([0,-14.1,.6],[0,-14.4,3.82],.11,metal,'gear');tube([0,-14.2,1.35],[0,-13.45,3.55],.075,metal,'gear');
 // Small roof aerials and wingtip navigation-light housings complete the outline.
 face([[0,.4,8.15],[0,1.1,9.05],[0,1.35,8.10]],white,'antenna');
 for(const sign of [-1,1])radialLoft(sign*24.93,[[-6.4,4.85,.11,.09],[-5.9,4.85,.12,.09],[-5.55,4.85,.035,.04]],sign<0?'#ba5452':'#528c77','navigation-light',12);
 return faces;
}
globalThis.KBOX5Aircraft3D=Object.freeze({mesh,specs});
})();
