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
    "id": "cessna206",
    "name": "Cessna 206",
    "type": "T206H · Turbo Stationair HD",
    "shape": "single",
    "span": 36,
    "length": 28.25,
    "color": "#b5c9df",
    "dimensions": "36′ span · 28′ 3″ long",
    "source": "https://cessna.txtav.com/-/media/cessna/files/product-cards/piston/turbo_stationair_hd_product_card.pdf"
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
 // C90B planform refined against the user's supplied top-view drawing.
 king: {body:[[-.5,0],[-.482,.013],[-.45,.026],[-.39,.039],[-.32,.044],[-.12,.047],[-.035,.041],[.095,.027],[.23,.014],[.32,.007],[.42,.004],[.5,0]],wing:[[.041,-.257],[.185,-.257],[.232,-.231],[.49,-.231],[.5,-.227],[.5,-.166],[.19,-.065],[.041,-.063]],tail:[[.004,.322],[.145,.425],[.146,.494],[.129,.488],[.008,.423],[.004,.415]],engines:[[-.164,-.443,.025,.353],[.164,-.443,.025,.353]],props:[[-.164,-.425,.074],[.164,-.425,.074]],cockpit:-.32,windows:4},
 // B200 proportions from the supplied side-facing plan, rotated nose-up.
 king200: {body:[[-.5,0],[-.481,.012],[-.448,.024],[-.397,.035],[-.333,.042],[-.255,.046],[-.10,.044],[.055,.037],[.18,.025],[.30,.013],[.383,.006],[.463,.004],[.5,0]],wing:[[.038,-.21],[.176,-.207],[.208,-.182],[.485,-.17],[.498,-.16],[.5,-.111],[.482,-.102],[.18,-.044],[.036,-.041]],tail:[[.005,.365],[.155,.419],[.166,.426],[.166,.485],[.143,.488],[.007,.416]],engines:[[-.159,-.416,.021,.315],[.159,-.416,.021,.315]],props:[[-.159,-.397,.061],[.159,-.397,.061]],cockpit:-.321,windows:6},
 // Citation Bravo planform refined against the supplied top-down reference.
 bravo: {body:[[-.5,0],[-.493,.011],[-.473,.023],[-.44,.034],[-.40,.044],[-.345,.050],[-.27,.052],[-.08,.053],[.06,.052],[.13,.046],[.22,.029],[.31,.016],[.36,.010],[.43,.006],[.5,0]],wing:[[.045,-.083],[.49,-.041],[.5,-.037],[.5,.023],[.486,.03],[.083,.097],[.046,.094]],tail:[[.007,.349],[.177,.38],[.190,.387],[.193,.4],[.190,.433],[.026,.452],[.010,.428]],engines:[[-.084,.051,.024,.166],[.084,.051,.024,.166]],cockpit:-.326,windows:6},
 phenom: {body:[[-.5,0],[-.48,.012],[-.425,.028],[-.34,.044],[-.23,.048],[.16,.047],[.30,.037],[.40,.019],[.495,.006],[.5,0]],wing:[[.039,-.10],[.15,-.06],[.488,.164],[.5,.176],[.5,.217],[.474,.216],[.14,.072],[.039,.067]],tail:[[.006,.354],[.175,.417],[.191,.439],[.185,.484],[.018,.460],[.006,.446]],engines:[[-.089,.176,.025,.18],[.089,.176,.025,.18]],winglets:true,cockpit:-.33,windows:5},
 // TBM 850 planform from the supplied general-arrangement drawing, nose-up.
 tbm: {body:[[-.5,0],[-.474,.013],[-.438,.022],[-.42,.040],[-.375,.050],[-.25,.053],[-.16,.058],[.035,.057],[.14,.043],[.26,.027],[.39,.013],[.48,.005],[.5,0]],wing:[[.048,-.15],[.455,-.145],[.49,-.144],[.5,-.132],[.499,-.069],[.488,-.041],[.28,-.011],[.061,.028]],tail:[[.010,.391],[.157,.389],[.170,.399],[.171,.452],[.160,.48],[.014,.468]],props:[[0,-.428,.067]],cockpit:-.17,windows:3},
 pc12: {body:[[-.5,0],[-.48,.013],[-.44,.023],[-.355,.032],[-.25,.047],[-.13,.052],[.12,.05],[.27,.032],[.40,.014],[.49,.006],[.5,0]],wing:[[.036,-.075],[.17,-.07],[.478,.047],[.5,.063],[.5,.094],[.482,.11],[.19,.090],[.032,.097]],tail:[[.007,.347],[.155,.386],[.161,.404],[.157,.455],[.014,.447],[.007,.435]],props:[[0,-.46,.090]],winglets:true,cockpit:-.27,windows:5},
 // Vision Jet proportions refined against the user's supplied top-view drawing.
 vision: {body:[[-.5,0],[-.47,.013],[-.425,.025],[-.35,.043],[-.26,.060],[-.14,.069],[-.015,.067],[.105,.047],[.215,.030],[.30,.016],[.39,.010],[.485,.006],[.5,0]],wing:[[.057,-.136],[.456,-.090],[.478,-.087],[.491,-.074],[.499,-.040],[.5,.035],[.457,.036],[.058,.052]],tail:[[.008,.313],[.172,.408],[.174,.482],[.010,.456]],dorsal:true,cockpit:-.258,windows:3},
 cessna: {body:[[-.5,0],[-.47,.014],[-.42,.027],[-.32,.040],[-.18,.048],[.015,.044],[.13,.031],[.35,.013],[.48,.005],[.5,0]],wing:[[.029,-.22],[.442,-.22],[.482,-.202],[.5,-.18],[.5,-.06],[.480,-.042],[.03,-.042]],tail:[[.006,.306],[.164,.322],[.18,.341],[.18,.387],[.165,.407],[.006,.416]],props:[[0,-.465,.098]],cockpit:-.31,windows:2,highWing:true},
 // Cessna 206: broad high wing and cabin roof from the supplied top view.
 cessna206: {body:[[-.5,0],[-.482,.013],[-.447,.025],[-.43,.040],[-.35,.045],[-.26,.050],[-.10,.048],[-.035,.040],[.02,.045],[.09,.034],[.23,.021],[.32,.012],[.46,.004],[.5,0]],wing:[[.045,-.277],[.21,-.277],[.48,-.255],[.494,-.263],[.5,-.25],[.5,-.102],[.49,-.093],[.48,-.108],[.22,-.052],[.21,-.045],[.195,-.066],[.041,-.067]],tail:[[.012,.273],[.14,.298],[.15,.294],[.153,.308],[.153,.397],[.14,.404],[.025,.419],[.010,.367]],props:[[0,-.478,.102]],cockpit:-.29,windows:0,highWing:true},
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
 if(model.id==='bravo')for(const sign of [-1,1])add('pylon',[[sign*.037,.125],[sign*.084,.15],[sign*.063,.245],[sign*.028,.263]]);
 if(model.id==='phenom')for(const sign of [-1,1])add('pylon',[[sign*.035,.23],[sign*.10,.255],[sign*.10,.302],[sign*.035,.283]]);
 add('body',bodyPolygon(profile.body));
 if(profile.highWing){const wing=components.splice(0,2);components.push(...wing);}
 for(const [x,y,w,length] of profile.engines||[]){
  if(model.id==='bravo')add('engine',[[x-w*.60,y],[x+w*.60,y],[x+w*.9,y+.009],[x+w,y+length*.30],[x+w*.9,y+length*.70],[x+w*.58,y+length*.98],[x,y+length],[x-w*.58,y+length*.98],[x-w*.9,y+length*.70],[x-w,y+length*.30],[x-w*.9,y+.009]]);
  else if(model.id==='king200')add('engine',[[x,y],[x+w*.52,y+.018],[x+w*.72,y+.050],[x+w*.77,y+.115],[x+w,y+.157],[x+w*.92,y+.205],[x+w*.54,y+length*.93],[x,y+length],[x-w*.54,y+length*.93],[x-w*.92,y+.205],[x-w,y+.157],[x-w*.77,y+.115],[x-w*.72,y+.050],[x-w*.52,y+.018]]);
  else if(model.id==='king')add('engine',[[x,y],[x+w*.55,y+.019],[x+w*.72,y+.07],[x+w*.66,y+.13],[x+w,y+.18],[x+w*.85,y+length*.76],[x+w*.42,y+length*.94],[x,y+length],[x-w*.42,y+length*.94],[x-w*.85,y+length*.76],[x-w,y+.18],[x-w*.66,y+.13],[x-w*.72,y+.07],[x-w*.55,y+.019]]);
  else add('engine',nacelle(x,y,w,length));
 }
 if(profile.dorsal)add('engine',[[-.028,.020],[.028,.020],[.025,.14],[.016,.25],[.007,.265],[-.007,.265],[-.016,.25],[-.025,.14]]);
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
 if(model.id==='king'){
  for(const sign of [-1,1]){
   details+=`<path d="M${x(sign*.007)} ${y(-.339)}L${x(sign*.026)} ${y(-.34)}L${x(sign*.033)} ${y(-.306)}L${x(sign*.008)} ${y(-.307)}Z" fill="#243e51"/>`;
   for(let i=0;i<5;i++)details+=`<rect x="${x(sign>0?.039:-.048)}" y="${y(-.234+i*.045)}" width="${x(.009)}" height="${y(.019)}" rx=".05" fill="#294654"/>`;
   details+=`<path d="M${x(sign*.162)} ${y(-.27)}V${y(-.10)}M${x(sign*.143)} ${y(-.335)}H${x(sign*.184)}" stroke="#294654" stroke-width=".075" opacity=".6"/>`;
  }
 }
 else if(model.id==='king200'){
  for(const sign of [-1,1]){
   details+=`<path d="M${x(sign*.007)} ${y(-.349)}L${x(sign*.032)} ${y(-.34)}L${x(sign*.034)} ${y(-.310)}L${x(sign*.009)} ${y(-.313)}Z" fill="#243e51"/>`;
   for(let i=0;i<6;i++){const wy=-.255+i*.053,wx=.040-Math.max(0,wy+.09)*.063;details+=`<rect x="${x(sign>0?wx-.004:-wx-.004)}" y="${y(wy)}" width="${x(.008)}" height="${y(.021)}" rx=".09" fill="#294654"/>`;}
   details+=`<path d="M${x(sign*.144)} ${y(-.337)}H${x(sign*.174)}M${x(sign*.144)} ${y(-.29)}H${x(sign*.174)}M${x(sign*.159)} ${y(-.264)}V${y(-.11)}" stroke="#294654" stroke-width=".07" opacity=".6"/>`;
  }
 }
 else if(model.id==='bravo'){
  details+=`<path d="M${x(-.049)} ${y(-.293)}L${x(-.05)} ${y(-.328)}Q${x(-.044)} ${y(-.365)} 0 ${y(-.363)}Q${x(.044)} ${y(-.365)} ${x(.05)} ${y(-.328)}L${x(.049)} ${y(-.293)}L${x(.028)} ${y(-.318)}Q0 ${y(-.339)} ${x(-.028)} ${y(-.318)}Z" fill="#203a4a"/><path d="M0 ${y(-.362)}V${y(-.328)}" stroke="${color}" stroke-width=".09"/>`;
  for(const sign of [-1,1]){
   details+=`<path d="M${x(sign*.043)} ${y(-.423)}L${x(sign*.024)} ${y(-.421)}L${x(sign*.028)} ${y(-.375)}L${x(sign*.048)} ${y(-.371)}" fill="none" stroke="#294654" stroke-width=".075"/>`;
   for(let i=0;i<6;i++)details+=`<rect x="${x(sign>0?.040:-.052)}" y="${y(-.20+i*.035)}" width="${x(.012)}" height="${y(.021)}" rx=".10" fill="#294654"/>`;
   details+=`<path d="M${x(sign*.060)} ${y(.06)}H${x(sign*.108)}M${x(sign*.013)} ${y(.08)}L${x(sign*.009)} ${y(.35)}" stroke="#294654" stroke-width=".07" opacity=".7"/>`;
  }
 }
 else if(model.id==='tbm'){
  details+=`<path d="M${x(-.053)} ${y(-.14)}L${x(-.052)} ${y(-.19)}Q0 ${y(-.231)} ${x(.052)} ${y(-.19)}L${x(.053)} ${y(-.14)}Q0 ${y(-.177)} ${x(-.053)} ${y(-.14)}Z" fill="#243e51"/><path d="M0 ${y(-.21)}V${y(-.158)}M${x(-.05)} ${y(-.348)}H${x(.05)}M${x(-.052)} ${y(-.263)}H${x(.052)}" fill="none" stroke="#294654" stroke-width=".075"/>`;
  for(const sign of [-1,1]){
   for(const wy of [-.107,-.048,.023])details+=`<rect x="${x(sign>0?.042:-.057)}" y="${y(wy)}" width="${x(.015)}" height="${y(.026)}" rx=".10" fill="#294654"/>`;
   details+=`<path d="M${x(sign*.041)} ${y(-.092)}L${x(sign*.036)} ${y(-.095)}V${y(-.026)}L${x(sign*.053)} ${y(-.025)}M${x(sign*.016)} ${y(.235)}L${x(sign*.008)} ${y(.425)}" fill="none" stroke="#294654" stroke-width=".07" opacity=".65"/>`;
  }
 }
 else if(model.id==='vision'){
  details+=`<path d="M${x(-.059)} ${y(-.228)}Q${x(-.054)} ${y(-.328)} 0 ${y(-.34)}Q${x(.054)} ${y(-.328)} ${x(.059)} ${y(-.228)}L${x(.046)} ${y(-.216)}Q0 ${y(-.275)} ${x(-.046)} ${y(-.216)}Z" fill="#243e51"/><path d="M0 ${y(-.338)}V${y(-.252)}" stroke="${color}" stroke-width=".08"/>`;
  for(const sign of [-1,1])for(const [wx,wy] of [[.061,-.17],[.063,-.096],[.059,-.022]])details+=`<ellipse cx="${x(sign*wx)}" cy="${y(wy)}" rx="${x(.008)}" ry="${y(.028)}" fill="#294654"/>`;
  details+=`<path d="M${x(-.026)} ${y(.027)}H${x(.026)}M0 ${y(.028)}V${y(.25)}" stroke="#294654" stroke-width=".085" opacity=".65"/>`;
 }
 else if(model.id==='cessna206'){
  details+=`<path d="M${x(-.046)} ${y(-.28)}Q${x(-.043)} ${y(-.355)} 0 ${y(-.355)}Q${x(.043)} ${y(-.355)} ${x(.046)} ${y(-.28)}Q0 ${y(-.307)} ${x(-.046)} ${y(-.28)}Z" fill="#243e51"/><path d="M0 ${y(-.35)}V${y(-.298)}" stroke="${color}" stroke-width=".09"/><path d="M${x(-.033)} ${y(-.26)}Q0 ${y(-.278)} ${x(.033)} ${y(-.26)}L${x(.026)} ${y(-.106)}L0 ${y(-.085)}L${x(-.026)} ${y(-.106)}Z" fill="none" stroke="#294654" stroke-width=".065"/><path d="M${x(-.035)} ${y(-.047)}L${x(-.027)} ${y(-.079)}L0 ${y(-.062)}L${x(.027)} ${y(-.079)}L${x(.035)} ${y(-.047)}L${x(.028)} ${y(-.005)}Q0 ${y(.012)} ${x(-.028)} ${y(-.005)}Z" fill="#243e51"/><path d="M0 ${y(-.06)}V${y(.005)}" stroke="${color}" stroke-width=".09"/>`;
  for(const sign of [-1,1])details+=`<path d="M${x(sign*.014)} ${y(-.436)}V${y(-.367)}L${x(sign*.04)} ${y(-.361)}M${x(sign*.022)} ${y(.085)}L${x(sign*.008)} ${y(.302)}" fill="none" stroke="#294654" stroke-width=".07"/>`;
 }
 else if(profile.canopy){details+=`<ellipse cx="0" cy="${y(-.11)}" rx="${x(.032)}" ry="${y(.105)}" fill="#253f50"/><ellipse cx="${x(-.008)}" cy="${y(-.137)}" rx="${x(.010)}" ry="${y(.06)}" fill="#b8d5df" opacity=".7"/>`;}
 else {const cy=profile.cockpit,w=model.id==='vision'?.056:.033;
  details+=`<path d="M${x(-w)} ${y(cy+.017)}L${x(-w*.73)} ${y(cy-.035)}Q0 ${y(cy-.058)} ${x(w*.73)} ${y(cy-.035)}L${x(w)} ${y(cy+.017)}Q0 ${y(cy-.008)} ${x(-w)} ${y(cy+.017)}Z" fill="#243e51"/><path d="M0 ${y(cy-.047)}V${y(cy+.001)}" stroke="${color}" stroke-width=".07"/>`;
  for(let i=0;i<(profile.highWing?0:profile.windows);i++){const wy=cy+.09+i*.052;for(const sign of [-1,1])details+=`<rect x="${x(sign>0?.028:-.042)}" y="${y(wy)}" width="${x(.014)}" height="${y(.024)}" rx=".10" fill="#294654" opacity=".85"/>`;}
 }
 for(const sign of [-1,1]){
  const w=profile.wing;const outer=w[Math.floor(w.length/2)],inner=w[w.length-1];
  if(model.id==='cessna206'){details+=`<path d="M${x(sign*.055)} ${y(-.255)}H${x(sign*.205)}V${y(-.073)}M${x(sign*.06)} ${y(-.10)}H${x(sign*.20)}L${x(sign*.48)} ${y(-.143)}M${x(sign*.48)} ${y(-.251)}V${y(-.11)}M${x(sign*.12)} ${y(-.15)}L${x(sign*.16)} ${y(-.20)}H${x(sign*.203)}M${x(sign*.02)} ${y(.323)}L${x(sign*.136)} ${y(.334)}V${y(.385)}L${x(sign*.03)} ${y(.38)}M${x(sign*.025)} ${y(.399)}L${x(sign*.142)} ${y(.389)}" fill="none" stroke="#243e50" stroke-width=".065" opacity=".6"/><circle cx="${x(sign*.128)}" cy="${y(-.203)}" r=".3" fill="none" stroke="#243e50" stroke-width=".065"/>`;}else if(model.id==='tbm'){details+=`<path d="M${x(sign*.07)} ${y(.009)}L${x(sign*.478)} ${y(-.056)}M${x(sign*.48)} ${y(-.14)}V${y(-.055)}M${x(sign*.293)} ${y(-.106)}V${y(-.025)}M${x(sign*.395)} ${y(-.128)}V${y(-.042)}M${x(sign*.019)} ${y(.45)}L${x(sign*.156)} ${y(.46)}M${x(sign*.149)} ${y(.4)}V${y(.461)}" fill="none" stroke="#243e50" stroke-width=".065" opacity=".55"/>`;}else if(model.id==='bravo'){details+=`<path d="M${x(sign*.101)} ${y(-.078)}V${y(.079)}M${x(sign*.475)} ${y(-.04)}V${y(.029)}M${x(sign*.105)} ${y(.069)}L${x(sign*.446)} ${y(.016)}V${y(.036)}M${x(sign*.282)} ${y(.042)}V${y(.064)}M${x(sign*.012)} ${y(.412)}H${x(sign*.174)}L${x(sign*.175)} ${y(.394)}" fill="none" stroke="#243e50" stroke-width=".07" opacity=".55"/>`;}else if(model.id==='king200'){details+=`<path d="M${x(sign*.065)} ${y(-.057)}L${x(sign*.18)} ${y(-.06)}L${x(sign*.48)} ${y(-.12)}M${x(sign*.48)} ${y(-.168)}V${y(-.119)}M${x(sign*.022)} ${y(.407)}L${x(sign*.156)} ${y(.474)}" fill="none" stroke="#243e50" stroke-width=".065" opacity=".55"/>`;}else if(model.id==='king'){details+=`<path d="M${x(sign*.07)} ${y(-.079)}L${x(sign*.189)} ${y(-.079)}L${x(sign*.483)} ${y(-.175)}M${x(sign*.483)} ${y(-.229)}V${y(-.175)}M${x(sign*.017)} ${y(.399)}L${x(sign*.133)} ${y(.467)}" fill="none" stroke="#243e50" stroke-width=".07" opacity=".55"/>`;}else if(model.id==='vision'){details+=`<path d="M${x(sign*.075)} ${y(.029)}L${x(sign*.464)} ${y(.020)}M${x(sign*.464)} ${y(-.087)}L${x(sign*.466)} ${y(.034)}" fill="none" stroke="#243e50" stroke-width=".065" opacity=".5"/>`;}else details+=`<path d="M${x(sign*.11)} ${y(inner[1]-.025)}L${x(sign*.455)} ${y(outer[1]+.004)}" fill="none" stroke="#243e50" stroke-width=".065" opacity=".45"/>`;
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
// Restroom footprint: 10 feet along the rear wall, 6 feet into the hangar.
const restroom = Object.freeze({x:0,y:0,width:10,depth:6});
const restroomPolygon = [[0,0],[restroom.width,0],[restroom.width,restroom.depth],[0,restroom.depth]];
function assess(planes) {
 const shapes=planes.map(worldParts);return planes.map((plane,i)=>({obstruction:shapes[i].some(part=>overlaps(part,restroomPolygon)),outside:shapes[i].flat().some(([x,y])=>x<0||x>65||y<0||y>60),overlap:shapes.some((other,j)=>i!==j&&shapes[i].some(a=>other.some(b=>overlaps(a,b))))}));
}

globalThis.KBOX5Geometry = Object.freeze({models,parts,worldParts,overlaps,assess,anatomy,aircraftMarkup,restroom});
})();
