(() => {
'use strict';
const models = [
  {
    "id": "king",
    "name": "King Air C90B",
    "type": "Twin turboprop",
    "shape": "twin",
    "span": 50.25,
    "length": 35.5,
    "color": "#edc34f",
    "dimensions": "50′ 3″ span · 35′ 6″ long",
    "source": "https://aeroresourcesinc.com/uploads/200305-2003%2520Beech%2520King%2520Air%2520C90B.pdf"
  },
  {
    "id": "king200",
    "name": "King Air 200",
    "type": "B200 · twin turboprop",
    "shape": "twin",
    "span": 54.5,
    "length": 43.75,
    "color": "#e3b76a",
    "dimensions": "54′ 6″ span · 43′ 9″ long",
    "source": "https://www.aopa.org/news-and-media/all-news/2020/september/pilot/turbine-quick-look-beechraft-king-air-200"
  },
  {
    "id": "bravo",
    "name": "Citation Bravo",
    "type": "Cessna · light jet",
    "shape": "straight-jet",
    "span": 52.166666666666664,
    "length": 47.166666666666664,
    "color": "#97b8d2",
    "dimensions": "52′ 2″ span · 47′ 2″ long",
    "source": "https://www.aopa.org/news-and-media/all-news/1996/june/pilot/turbine-pilot-(3)"
  },
  {
    "id": "phenom",
    "name": "Phenom 300",
    "type": "Embraer · light jet",
    "shape": "jet",
    "span": 52.166666666666664,
    "length": 51.333333333333336,
    "color": "#a9aeda",
    "dimensions": "52′ 2″ span · 51′ 4″ long",
    "source": "https://www.embraer.com/media/b4lchr5u/phenom-300e-electronic.pdf"
  },
  {
    "id": "tbm",
    "name": "TBM 850",
    "type": "Single-engine turboprop",
    "shape": "single",
    "span": 41.583333333333336,
    "length": 34.916666666666664,
    "color": "#c2c990",
    "dimensions": "41′ 7″ span · 34′ 11″ long",
    "source": "https://www.aopa.org/news-and-media/all-news/2020/march/flight-training-magazine/ol-ramp-appeal-tbm"
  },
  {
    "id": "pc12",
    "name": "Pilatus PC-12",
    "type": "PC-12 NG · single turboprop",
    "shape": "single",
    "span": 53.333333333333336,
    "length": 47.25,
    "color": "#91c4c9",
    "dimensions": "53′ 4″ span · 47′ 3″ long",
    "source": "https://airmen.ch/wp-content/uploads/2018/03/Pilatus-Aircraft-Ltd-PC-12NG-Factsheet.pdf"
  },
  {
    "id": "vision",
    "name": "Cirrus Vision Jet",
    "type": "SF50 · single-engine jet",
    "shape": "vision",
    "span": 38.7,
    "length": 30.7,
    "color": "#d5b7c9",
    "dimensions": "38.7′ span · 30.7′ long",
    "source": "https://cirrusaircraft.com/wp-content/uploads/2018/06/N1WA-Spec-Sheet.pdf"
  },
  {
    "id": "cessna",
    "name": "Cessna 185F",
    "type": "Skywagon · tailwheel",
    "shape": "single",
    "span": 35.833333333333336,
    "length": 25.625,
    "color": "#9ac7b3",
    "dimensions": "35′ 10″ span · 25′ 7½″ long",
    "source": "https://www.aopa.org/news-and-media/all-news/2015/june/pilot/f_185"
  },
  {
    "id": "mustang",
    "name": "P-51D Mustang",
    "type": "Warbird · tailwheel",
    "shape": "single",
    "span": 37,
    "length": 32.25,
    "color": "#bdc5ce",
    "dimensions": "37′ span · 32′ 3″ long",
    "source": "https://www.nationalmuseum.af.mil/Visit/Museum-Exhibits/Fact-Sheets/Display/Article/196263/north-american-p-51d-mustang/"
  }
];
// Normalized top-view geometry. Stations are [longitudinal position, half width].
// Wings/tails are right-side planforms, mirrored for the left side. These are
// recognizable illustrations, not engineering drawings or clearance envelopes.
const profiles = {
 king: {body:[[-.5,0],[-.475,.014],[-.42,.027],[-.31,.043],[-.17,.049],[.10,.047],[.24,.031],[.39,.014],[.49,.007],[.5,0]],wing:[[.035,-.19],[.20,-.175],[.475,-.105],[.5,-.08],[.5,-.035],[.47,-.018],[.20,.035],[.035,.055]],tail:[[.008,.285],[.195,.385],[.208,.410],[.205,.454],[.03,.426],[.008,.425]],engines:[[-.185,-.305,.030,.335],[.185,-.305,.030,.335]],props:[[-.185,-.30,.075],[.185,-.30,.075]],cockpit:-.30,windows:4},
 king200: {body:[[-.5,0],[-.474,.012],[-.41,.026],[-.30,.041],[-.16,.047],[.12,.045],[.28,.029],[.42,.013],[.495,.006],[.5,0]],wing:[[.035,-.18],[.21,-.155],[.478,-.082],[.5,-.058],[.5,-.012],[.479,.002],[.21,.045],[.035,.06]],tail:[[.008,.36],[.17,.402],[.18,.420],[.175,.465],[.012,.462]],engines:[[-.174,-.292,.027,.28],[.174,-.292,.027,.28]],props:[[-.174,-.285,.072],[.174,-.285,.072]],cockpit:-.32,windows:6},
 bravo: {body:[[-.5,0],[-.48,.014],[-.438,.028],[-.366,.041],[-.28,.047],[.235,.047],[.32,.038],[.42,.018],[.49,.005],[.5,0]],wing:[[.037,-.055],[.16,-.035],[.48,.040],[.5,.066],[.5,.104],[.48,.12],[.16,.113],[.037,.115]],tail:[[.007,.322],[.18,.403],[.194,.424],[.187,.470],[.020,.449],[.007,.438]],engines:[[-.091,.178,.025,.19],[.091,.178,.025,.19]],cockpit:-.34,windows:6},
 phenom: {body:[[-.5,0],[-.48,.012],[-.425,.028],[-.34,.044],[-.23,.048],[.16,.047],[.30,.037],[.40,.019],[.495,.006],[.5,0]],wing:[[.039,-.10],[.15,-.06],[.488,.164],[.5,.176],[.5,.217],[.474,.216],[.14,.072],[.039,.067]],tail:[[.006,.354],[.175,.417],[.191,.439],[.185,.484],[.018,.460],[.006,.446]],engines:[[-.089,.176,.025,.18],[.089,.176,.025,.18]],winglets:true,cockpit:-.33,windows:5},
 tbm: {body:[[-.5,0],[-.478,.012],[-.446,.024],[-.35,.036],[-.235,.049],[-.08,.057],[.10,.047],[.24,.029],[.38,.014],[.49,.006],[.5,0]],wing:[[.040,-.10],[.20,-.072],[.48,.015],[.5,.041],[.498,.073],[.475,.089],[.20,.084],[.035,.09]],tail:[[.009,.305],[.171,.36],[.18,.38],[.176,.432],[.015,.409],[.008,.404]],props:[[0,-.462,.104]],cockpit:-.225,windows:3},
 pc12: {body:[[-.5,0],[-.48,.013],[-.44,.023],[-.355,.032],[-.25,.047],[-.13,.052],[.12,.05],[.27,.032],[.40,.014],[.49,.006],[.5,0]],wing:[[.036,-.075],[.17,-.07],[.478,.047],[.5,.063],[.5,.094],[.482,.11],[.19,.090],[.032,.097]],tail:[[.007,.347],[.155,.386],[.161,.404],[.157,.455],[.014,.447],[.007,.435]],props:[[0,-.46,.090]],winglets:true,cockpit:-.27,windows:5},
 vision: {body:[[-.5,0],[-.48,.025],[-.43,.051],[-.35,.068],[-.24,.078],[-.08,.071],[.10,.050],[.24,.024],[.40,.011],[.5,0]],wing:[[.05,-.03],[.19,-.015],[.48,.100],[.5,.12],[.5,.159],[.473,.175],[.20,.131],[.043,.128]],tail:[[.009,.21],[.163,.372],[.191,.437],[.167,.475],[.020,.342],[.007,.316]],dorsal:true,cockpit:-.345,windows:2},
 cessna: {body:[[-.5,0],[-.47,.014],[-.42,.027],[-.32,.040],[-.18,.048],[.015,.044],[.13,.031],[.35,.013],[.48,.005],[.5,0]],wing:[[.029,-.22],[.442,-.22],[.482,-.202],[.5,-.18],[.5,-.06],[.480,-.042],[.03,-.042]],tail:[[.006,.306],[.164,.322],[.18,.341],[.18,.387],[.165,.407],[.006,.416]],props:[[0,-.465,.098]],cockpit:-.31,windows:2,highWing:true},
 mustang: {body:[[-.5,0],[-.478,.016],[-.438,.030],[-.29,.041],[-.17,.050],[-.045,.053],[.09,.043],[.22,.030],[.39,.015],[.49,.008],[.5,0]],wing:[[.038,-.13],[.13,-.13],[.471,-.034],[.493,-.012],[.5,.010],[.490,.042],[.469,.057],[.155,.109],[.052,.14]],tail:[[.009,.315],[.166,.37],[.176,.39],[.173,.423],[.149,.438],[.011,.425]],props:[[0,-.463,.15]],canopy:true,cockpit:-.18,windows:0}
};
const geometryCache = new WeakMap();
const mirror = polygon => polygon.map(([x,y])=>[-x,y]).reverse();
function bodyPolygon(stations) {
 return [...stations.map(([y,x])=>[x,y]),...stations.slice(1,-1).reverse().map(([y,x])=>[-x,y])];
}
function nacelle(x,y,w,length){return [[x,y],[x+w*.7,y+.012],[x+w,y+.04],[x+w,y+length*.78],[x+w*.65,y+length],[x-w*.65,y+length],[x-w,y+length*.78],[x-w,y+.04],[x-w*.7,y+.012]];}
function anatomy(model) {
 if(geometryCache.has(model))return geometryCache.get(model);
 const profile=profiles[model.id];
 const components=[];
 const add=(kind,points)=>components.push({kind,points:points.map(([x,y])=>[x*model.span,y*model.length])});
 add('wing',profile.wing);add('wing',mirror(profile.wing));
 add('tail',profile.tail);add('tail',mirror(profile.tail));
 if(['bravo','phenom'].includes(model.id))for(const sign of [-1,1])add('pylon',[[sign*.035,.23],[sign*.10,.255],[sign*.10,.302],[sign*.035,.283]]);
 add('body',bodyPolygon(profile.body));
 if(profile.highWing){const wing=components.splice(0,2);components.push(...wing);}
 for(const [x,y,w,length] of profile.engines||[])add('engine',nacelle(x,y,w,length));
 if(profile.dorsal)add('engine',nacelle(0,-.055,.029,.265));
 // Stationary propeller silhouette; swept propeller clearance is not modeled.
 for(const [x,y,r] of profile.props||[])add('prop',[[x-r,y-.005],[x-r*.92,y-.012],[x+r*.94,y-.008],[x+r,y+.003],[x+r*.91,y+.01],[x-r*.94,y+.009]]);
 const result={profile,components};geometryCache.set(model,result);return result;
}
const cross=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
function triangulate(polygon) {
 const vertices=polygon.map(p=>[...p]);
 const area=vertices.reduce((sum,p,i)=>{const q=vertices[(i+1)%vertices.length];return sum+p[0]*q[1]-q[0]*p[1];},0);
 if(area<0)vertices.reverse();
 const triangles=[];
 while(vertices.length>3){let found=false;
  for(let i=0;i<vertices.length;i++){const a=vertices[(i+vertices.length-1)%vertices.length],b=vertices[i],c=vertices[(i+1)%vertices.length];if(cross(a,b,c)<=1e-10)continue;
   if(vertices.some(p=>p!==a&&p!==b&&p!==c&&cross(a,b,p)>=-1e-10&&cross(b,c,p)>=-1e-10&&cross(c,a,p)>=-1e-10))continue;
   triangles.push([a,b,c]);vertices.splice(i,1);found=true;break;
  }
  if(!found)throw new Error('Invalid aircraft silhouette polygon');
 }
 triangles.push(vertices);return triangles;
}
const partsCache = new WeakMap();
function parts(model) {
 if(!partsCache.has(model))partsCache.set(model,anatomy(model).components.flatMap(c=>triangulate(c.points)));
 return partsCache.get(model);
}
// Render the exact polygon outlines used by collision tests without internal
// triangle seams. Cockpit glazing, panel lines and windows are decorative only.
function aircraftMarkup(model, {selected=false,conflict=false}={}) {
 const {profile,components}=anatomy(model),color=conflict?'#e78e7d':model.color;
 const outline=selected?'#edf6fa':'#203c4b';
 const polygon=({kind,points})=>`<polygon class="aircraft-${kind}" points="${points.map(p=>p.join(',')).join(' ')}" fill="${kind==='prop'?'#344d5b':color}" stroke="${outline}" stroke-width="${kind==='prop'?.055:.095}" stroke-linejoin="round"/>`;
 const x=v=>v*model.span,y=v=>v*model.length;
 let details='';
 if(profile.canopy){details+=`<ellipse cx="0" cy="${y(-.11)}" rx="${x(.032)}" ry="${y(.105)}" fill="#253f50"/><ellipse cx="${x(-.008)}" cy="${y(-.137)}" rx="${x(.010)}" ry="${y(.06)}" fill="#b8d5df" opacity=".7"/>`;}
 else {const cy=profile.cockpit,w=model.id==='vision'?.056:.033;
  details+=`<path d="M${x(-w)} ${y(cy+.017)}L${x(-w*.73)} ${y(cy-.035)}Q0 ${y(cy-.058)} ${x(w*.73)} ${y(cy-.035)}L${x(w)} ${y(cy+.017)}Q0 ${y(cy-.008)} ${x(-w)} ${y(cy+.017)}Z" fill="#243e51"/><path d="M0 ${y(cy-.047)}V${y(cy+.001)}" stroke="${color}" stroke-width=".07"/>`;
  for(let i=0;i<(profile.highWing?0:profile.windows);i++){const wy=cy+.09+i*.052;for(const sign of [-1,1])details+=`<rect x="${x(sign>0?.028:-.042)}" y="${y(wy)}" width="${x(.014)}" height="${y(.024)}" rx=".10" fill="#294654" opacity=".85"/>`;}
 }
 for(const sign of [-1,1]){
  const w=profile.wing;const outer=w[Math.floor(w.length/2)],inner=w[w.length-1];
  details+=`<path d="M${x(sign*.11)} ${y(inner[1]-.025)}L${x(sign*.455)} ${y(outer[1]+.004)}" fill="none" stroke="#243e50" stroke-width=".065" opacity=".45"/>`;
  if(profile.winglets)details+=`<path d="M${x(sign*.49)} ${y(outer[1]-.018)}L${x(sign*.49)} ${y(outer[1]+.024)}" stroke="#f2f7fa" stroke-width=".16"/>`;
 }
 for(const [ex,ey,ew,el] of profile.engines||[])details+=`<path d="M${x(ex-ew*.65)} ${y(ey+el*.83)}H${x(ex+ew*.65)}" stroke="#243e50" stroke-width=".16" opacity=".7"/>`;
 details+=`<path d="M0 ${y(.34)}V${y(.482)}" stroke="#294654" stroke-width=".12" opacity=".6"/>`;
 return `<g class="aircraft-silhouette">${components.map(polygon).join('')}</g><g class="aircraft-detail" pointer-events="none">${details}</g>`;
}

function worldParts(plane) {const angle=plane.angle*Math.PI/180,c=Math.cos(angle),s=Math.sin(angle);return parts(plane.model).map(p=>p.map(([x,y])=>[plane.x+x*c-y*s,plane.y+x*s+y*c]));}
function overlaps(a,b) {
 for(const poly of [a,b]) for(let i=0;i<poly.length;i++) {const j=(i+1)%poly.length,axis=[-(poly[j][1]-poly[i][1]),poly[j][0]-poly[i][0]];const project=p=>p.map(([x,y])=>x*axis[0]+y*axis[1]);const pa=project(a),pb=project(b);if(Math.max(...pa)<Math.min(...pb)-1e-7||Math.max(...pb)<Math.min(...pa)-1e-7)return false;}
 return true;
}
function assess(planes) {
 const shapes=planes.map(worldParts);return planes.map((plane,i)=>({outside:shapes[i].flat().some(([x,y])=>x<0||x>65||y<0||y>60),overlap:shapes.some((other,j)=>i!==j&&shapes[i].some(a=>other.some(b=>overlaps(a,b))))}));
}

globalThis.KBOX5Geometry = Object.freeze({models,parts,worldParts,overlaps,assess,anatomy,aircraftMarkup});
})();
