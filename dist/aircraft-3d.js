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
 cessna:{side:[[-.5,5.7,0],[-.43,5.6,1.1],[-.33,5.5,1.4],[-.21,5.5,2],[.015,4.9,1.8],[.20,3.5,1],[.5,1.8,0]],wing:7.4,dihedral:.018,tail:2.25,fin:[[.23,3],[.35,7.9],[.43,7.9],[.49,2]],engineZ:5.7,blades:3,propR:3.35,track:4.3,mainY:-.20,wheel:.88,tailwheel:true,struts:true,windows:2,glass:[-.32,-.23],windowStart:-.17},
 cessna206:{side:[[-.5,4.4,0],[-.43,4.4,1.05],[-.33,4.5,1.5],[-.24,5.2,2],[.05,5.2,2],[.25,4.5,1.1],[.5,4.5,0]],wing:7.1,dihedral:.018,tail:4.65,fin:[[.23,5],[.37,9.3],[.45,9.3],[.49,4.5]],engineZ:4.4,blades:3,propR:3,track:4.6,mainY:-.03,noseY:-.36,wheel:.72,struts:true,windows:3,glass:[-.35,-.27],windowStart:-.20},
 mustang:{side:[[-.5,6,0],[-.44,5.9,1.25],[-.29,5.7,1.7],[-.16,5.4,1.65],[.05,4.8,1.7],[.24,3.5,.9],[.5,2.1,0]],wing:3.6,dihedral:.09,tail:2.65,fin:[[.20,3.5],[.36,11],[.43,10.8],[.49,2.5]],engineZ:6,blades:4,propR:5.55,track:5.2,mainY:-.16,wheel:1.05,tailwheel:true,canopy:true,windows:0,glass:[-.18,.06]}
};
const cache=new WeakMap(),pi=Math.PI;
function interpolate(stations,t){let i=1;while(i<stations.length-1&&t>stations[i][0])i++;const a=stations[i-1],b=stations[i],f=Math.max(0,Math.min(1,(t-a[0])/(b[0]-a[0])));return a.slice(1).map((v,j)=>v+(b[j+1]-v)*f);}
function mesh(model){
 if(cache.has(model))return cache.get(model);
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
 const windowRanges=Array.from({length:q.windows},(_,i)=>[(q.windowPositions?.[i]??q.windowStart+i*.059),(q.windowPositions?.[i]??q.windowStart+i*.059)+.026]);
 const stations=[...new Set([...Array.from({length:57},(_,i)=>noseStart+(.5-noseStart)*i/56),...profile.body.map(p=>p[0]),...q.side.map(p=>p[0]),...q.glass,...windowRanges.flat(),-.33,.264].filter(t=>t>=noseStart&&t<=.5))].sort((a,b)=>a-b);
 const angles=[...new Set([...Array.from({length:33},(_,i)=>i*pi/16),.10,.18,.65,pi-.65,pi-.18,pi-.10,pi/2-.025,pi/2+.025,.04,2*pi-.04,pi-.04,pi+.04])].sort((a,b)=>a-b);
 const rings=stations.map(t=>angles.slice(0,-1).map(a=>bodyAt(t,a)));
 for(let j=1;j<stations.length;j++)for(let i=0;i<angles.length-1;i++){
  const t=(stations[j-1]+stations[j])/2,a=(angles[i]+angles[i+1])/2;
  const cockpit=!q.canopy&&t>q.glass[0]&&t<q.glass[1]&&a>.18&&a<pi-.18&&Math.abs(a-pi/2)>.025;
  const sideWindow=windowRanges.some(([from,to])=>q.roundWindows?((t-(from+to)/2)/((to-from)/2))**2+((Math.min(a,Math.abs(pi-a))-.375)/.275)**2<1:t>from&&t<to)&&((a>.10&&a<.65)||(a>pi-.65&&a<pi-.10));
  const belt=t>-.33&&t<.264&&(a<.04||a>2*pi-.04||Math.abs(a-pi)<.04);
  const color=cockpit||sideWindow?dark:belt?trim:shade(white,.77+.23*Math.sin(a)),kind=cockpit?'cockpit':sideWindow?'window':belt?'livery':'fuselage';
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
 function wheel(x,y,r,attachX,attachZ){const width=r*.55,rings=[x-width/2,x+width/2].map(v=>Array.from({length:16},(_,i)=>[v,y+r*Math.cos(i*pi/8),r+r*Math.sin(i*pi/8)]));skin(rings,'#263039','wheel');face(rings[0],'#263039','wheel');face(rings[1],'#263039','wheel');for(const side of [-1,1])face(Array.from({length:16},(_,i)=>[x+side*(width/2+.01),y+r*.4*Math.cos(i*pi/8),r+r*.4*Math.sin(i*pi/8)]),'#a6b0b5','hub');tube([x,y,r],[attachX,y,attachZ],.10,'#7b8a93','gear');}
 for(const sign of [-1,1])for(const offset of q.dualMain?[-.32,.32]:[0])wheel(sign*q.track+offset,q.mainY*model.length,q.wheel,sign*(q.struts?1.3:q.track*.9),q.wing);
 if(q.tailwheel)wheel(0,model.length*.44,.32,0,1.8);else wheel(0,q.noseY*model.length,q.wheel*.72,0,interpolate(q.side,q.noseY)[0]-1);
 if(q.struts)for(const sign of [-1,1])tube([sign*1.4,-.04*model.length,3],[sign*model.span*.30,-.12*model.length,q.wing+model.span*.30*q.dihedral],.09,white,'wing-strut');
 if(q.canopy)loft(0,model.length*.02,3,1, .6,model.length*.17,'#9aaab4','radiator');
 const result=Object.freeze(faces);cache.set(model,result);return result;
}
globalThis.KBOX5Aircraft3D=Object.freeze({mesh,specs});
})();
