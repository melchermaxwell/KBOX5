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
// Pixel landmarks in the supplied B200 drawing: nose (394,245), tail (37,245),
// wingtips y=25/465. Convert the side-facing drawing to our nose-up coordinates.
const b200Plan=points=>points.map(([longitudinal,lateral])=>[(245-lateral)/440,(215.5-longitudinal)/357]);
// Nose-up landmarks from the user's September 28 King Air reference.
const c90Plan=points=>points.map(([x,y])=>[(x-440)/823,(y-557.5)/609]);
// Phenom reference: nose y=0, tail y=309, full span x=0..315.
const phenomPlan=points=>points.map(([x,y])=>[(x-157.5)/315,(y-154.5)/309]);
// TBM top-view landmarks from the user reference, normalized to catalog dimensions.
const tbmPlan=points=>points.map(([x,y])=>[(x-440)/830,(y-480.5)/687]);
// PC-12 top-view landmarks: nose y=100, tail y=928, span x=48..974.
const pc12Plan=points=>points.map(([x,y])=>[(x-511)/926,(y-514)/828]);
const profiles = {
 // C90B: new reference planform scaled to the catalog span and length.
 king: {body:[[-.5,0],[-.475,.010],[-.423,.022],[-.357,.035],[-.30,.045],[-.244,.049],[-.160,.051],[-.066,.047],[.030,.039],[.14,.030],[.255,.023],[.334,.014],[.41,.007],[.477,.005],[.5,0]],wing:c90Plan([[480,391],[583,390],[625,405],[845,413],[851,418],[851,456],[599,503],[482,503]]).map(([x,y])=>[x*823/822,y]),tail:c90Plan([[446,762],[575,817],[581,822],[582,832],[582,850],[579,853],[450,836],[443,834]]),engines:[[-.154,-.439,.023,.311],[.154,-.439,.023,.311]],props:[[-.154,-.412,.082],[.154,-.412,.082]],cockpit:-.30,windows:4},
 // B200 planform traced proportionally from the supplied September 28 three-view diagram.
 king200: {body:[[-.5,0],[-.486,.012],[-.447,.027],[-.374,.039],[-.29,.045],[-.055,.045],[.015,.040],[.16,.028],[.30,.018],[.37,.010],[.46,.006],[.5,0]],wing:b200Plan([[292,225],[293,162],[285,146],[280,32],[278,26],[271,25],[255,25],[234,161],[234,218],[229,224]]),tail:b200Plan([[89,239],[60,172],[56,171],[43,171],[45,237],[45,245],[84,245]]),engines:[[-.158,-.414,.025,.321],[.158,-.414,.025,.321]],props:[[-.158,-.390,.063],[.158,-.390,.063]],cockpit:-.321,windows:6},
 // Citation Bravo planform refined against the supplied top-down reference.
 bravo: {body:[[-.5,0],[-.493,.011],[-.473,.023],[-.44,.034],[-.40,.044],[-.345,.050],[-.27,.052],[-.08,.053],[.06,.052],[.13,.046],[.22,.029],[.31,.016],[.36,.010],[.43,.006],[.5,0]],wing:[[.045,-.083],[.49,-.041],[.5,-.037],[.5,.023],[.486,.03],[.083,.097],[.046,.094]],tail:[[.007,.349],[.177,.38],[.190,.387],[.193,.4],[.190,.433],[.026,.452],[.010,.428]],engines:[[-.084,.051,.024,.166],[.084,.051,.024,.166]],cockpit:-.326,windows:6},
 // Phenom 300-family planform refined from Embraer's three-view brochure.
 phenom: {body:[[-.5,0],[-.49,.012],[-.465,.022],[-.43,.032],[-.38,.045],[-.33,.053],[-.22,.055],[-.09,.055],[.015,.053],[.065,.041],[.115,.029],[.21,.022],[.32,.012],[.42,.006],[.49,.003],[.5,0]],wing:phenomPlan([[174.5,113],[181,120],[303,182],[308,187],[310,197],[315,211],[307,204],[211,177],[180,175],[171,181]]),tail:phenomPlan([[159,262],[208,287],[213,292],[215,297],[217,308],[210,307],[161,295],[157.5,297]]),engines:[[-.0905,.07,.028,.176],[.0905,.07,.028,.176]],winglets:true,cockpit:-.34,windows:5},

 // TBM 850 planform from the supplied general-arrangement drawing, nose-up.
 tbm: {body:[[-.5,0],[-.488,.006],[-.46,.013],[-.44,.017],[-.408,.030],[-.369,.041],[-.315,.047],[-.263,.050],[-.19,.052],[-.13,.057],[-.059,.058],[.014,.057],[.10,.051],[.19,.040],[.28,.028],[.36,.016],[.407,.010],[.47,.004],[.5,0]],wing:tbmPlan([[489,380],[819,386],[831,388],[837,394],[842,411],[855,468],[848,461],[840,459],[489,488]]),tail:tbmPlan([[449,747],[582,750],[596,752],[599,759],[599,780],[596,801],[441,819],[441,776]]),props:[[0,-.442,.087]],cockpit:-.19,windows:3},
 pc12: {body:[[-.5,0],[-.49,.006],[-.462,.016],[-.435,.022],[-.392,.029],[-.33,.041],[-.28,.050],[-.225,.054],[-.12,.054],[.095,.054],[.13,.052],[.21,.039],[.295,.025],[.365,.013],[.405,.008],[.47,.004],[.5,0]],wing:pc12Plan([[560,382],[932,398],[940,400],[941,389],[944,375],[949,370],[954,375],[957,385],[955,403],[950,414],[960,435],[974,457],[974,478],[958,466],[940,464],[560,504]]),tail:pc12Plan([[521,825],[641,841],[646,848],[661,879],[660,893],[512,902],[512,880]]),props:[[0,-.425,.053]],winglets:true,cockpit:-.28,windows:5},
 // Vision Jet proportions refined against the user's supplied top-view drawing.
 vision: {body:[[-.5,0],[-.47,.013],[-.425,.025],[-.35,.043],[-.26,.060],[-.14,.069],[-.015,.067],[.105,.047],[.215,.030],[.30,.016],[.39,.010],[.485,.006],[.5,0]],wing:[[.057,-.136],[.456,-.090],[.478,-.087],[.491,-.074],[.499,-.040],[.5,.035],[.457,.036],[.058,.052]],tail:[[.008,.313],[.172,.408],[.174,.482],[.010,.456]],dorsal:true,cockpit:-.258,windows:3},
 // C185: straight high wing, compact cabin and 10 ft 10 in horizontal tail.
 cessna: {body:[[-.5,0],[-.485,.01],[-.465,.019],[-.439,.026],[-.402,.034],[-.33,.040],[-.265,.047],[-.17,.050],[-.065,.047],[.025,.040],[.15,.027],[.30,.015],[.405,.007],[.49,.003],[.5,0]],wing:[[.037,-.23],[.445,-.23],[.474,-.222],[.489,-.21],[.499,-.191],[.5,-.070],[.495,-.05],[.481,-.039],[.458,-.038],[.037,-.038]],tail:[[.007,.314],[.125,.326],[.144,.337],[.151,.352],[.151,.390],[.144,.403],[.127,.413],[.007,.422]],props:[[0,-.458,.098]],cockpit:-.30,windows:2,highWing:true},

 // Cessna 206: broad high wing and cabin roof from the supplied top view.
 cessna206: {body:[[-.5,0],[-.482,.013],[-.447,.025],[-.43,.040],[-.35,.045],[-.26,.050],[-.10,.048],[-.035,.040],[.02,.045],[.09,.034],[.23,.021],[.32,.012],[.46,.004],[.5,0]],wing:[[.045,-.277],[.21,-.277],[.48,-.255],[.494,-.263],[.5,-.25],[.5,-.102],[.49,-.093],[.48,-.108],[.22,-.052],[.21,-.045],[.195,-.066],[.041,-.067]],tail:[[.012,.273],[.14,.298],[.15,.294],[.153,.308],[.153,.397],[.14,.404],[.025,.419],[.010,.367]],props:[[0,-.478,.102]],cockpit:-.29,windows:0,highWing:true},
 // P-51D planform follows the supplied nose-right drawing, rotated nose-up.
 mustang: {body:[[-.5,0],[-.495,.009],[-.48,.021],[-.458,.026],[-.44,.031],[-.36,.035],[-.25,.037],[-.16,.038],[-.06,.037],[.075,.034],[.22,.024],[.32,.017],[.41,.008],[.48,.003],[.5,0]],wing:[[.032,-.235],[.045,-.227],[.054,-.213],[.16,-.195],[.34,-.18],[.475,-.17],[.487,-.164],[.496,-.151],[.5,-.132],[.496,-.102],[.487,-.069],[.480,-.052],[.06,.043],[.043,.054],[.033,.076]],tail:[[.016,.296],[.16,.322],[.170,.328],[.175,.341],[.177,.36],[.174,.385],[.166,.403],[.012,.432]],props:[[0,-.456,.142]],canopy:true,cockpit:-.14,windows:0}

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
 if(model.id==='phenom')for(const sign of [-1,1])add('pylon',[[sign*.028,.103],[sign*.081,.119],[sign*.081,.222],[sign*.029,.254]]);
 add('body',bodyPolygon(profile.body));
 if(profile.highWing){const wing=components.splice(0,2);components.push(...wing);}
 for(const [x,y,w,length] of profile.engines||[]){
  if(model.id==='bravo'||model.id==='phenom')add('engine',[[x-w*.60,y],[x+w*.60,y],[x+w*.9,y+.009],[x+w,y+length*.30],[x+w*.9,y+length*.70],[x+w*.58,y+length*.98],[x,y+length],[x-w*.58,y+length*.98],[x-w*.9,y+length*.70],[x-w,y+length*.30],[x-w*.9,y+.009]]);
  else if(model.id==='king200')add('engine',[[x,y],[x+w*.48,y+.011],[x+w*.66,y+.042],[x+w*.98,y+.052],[x+w,y+.091],[x+w*.71,y+.098],[x+w*.71,y+.16],[x+w*.60,y+.225],[x+w*.30,y+.285],[x,y+length],[x-w*.30,y+.285],[x-w*.60,y+.225],[x-w*.71,y+.16],[x-w*.71,y+.098],[x-w,y+.091],[x-w*.98,y+.052],[x-w*.66,y+.042],[x-w*.48,y+.011]]);
  else if(model.id==='king')add('engine',[[x,y],[x+w*.30,y+.008],[x+w*.52,y+.026],[x+w*.64,y+.046],[x+w*.78,y+.076],[x+w*.90,y+.109],[x+w*.94,y+.160],[x+w*.86,y+.216],[x+w*.61,y+.267],[x+w*.30,y+.299],[x,y+length],[x-w*.30,y+.299],[x-w*.61,y+.267],[x-w*.86,y+.216],[x-w*.94,y+.160],[x-w*.90,y+.109],[x-w*.78,y+.076],[x-w*.64,y+.046],[x-w*.52,y+.026],[x-w*.30,y+.008]]);
  else add('engine',nacelle(x,y,w,length));
 }
 if(profile.dorsal)add('engine',[[-.028,.020],[.028,.020],[.025,.14],[.016,.25],[.007,.265],[-.007,.265],[-.016,.25],[-.025,.14]]);
 // Stationary propeller silhouette; swept propeller clearance is not modeled.
 for(const [x,y,r] of profile.props||[]){
  if(model.id==='tbm')for(const sign of [-1,1]){
   add('prop',[[sign*.016,y],[sign*.031,y-.012],[sign*.052,y-.018],[sign*.071,y-.015],[sign*r,y-.003],[sign*r,y+.009],[sign*.066,y+.004],[sign*.040,y+.001]]);
   add('prop',[[sign*.034,y+.023],[sign*.047,y+.032],[sign*.058,y+.049],[sign*.052,y+.065],[sign*.044,y+.051]]);
  }else add('prop',[[x-r,y-.005],[x-r*.92,y-.012],[x+r*.94,y-.008],[x+r,y+.003],[x+r*.91,y+.01],[x-r*.94,y+.009]]);
 }
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
function aircraftMarkup(model, {selected=false,conflict=false,overlap=false}={}) {
 const {profile,components}=anatomy(model),color=conflict?'#e78e7d':overlap?'#e9a23b':model.color;
 const outline=selected?'#edf6fa':'#203c4b';
 const polygon=({kind,points})=>`<polygon class="aircraft-${kind}" points="${points.map(p=>p.join(',')).join(' ')}" fill="${kind==='prop'?'#344d5b':color}" stroke="${outline}" stroke-width="${kind==='prop'?.055:.095}" stroke-linejoin="round"/>`;
 const x=v=>v*model.span,y=v=>v*model.length;
 let details='';
 if(model.id==='king'){
  details+=`<path d="M${x(-.041)} ${y(-.281)}L${x(-.039)} ${y(-.303)}Q0 ${y(-.333)} ${x(.039)} ${y(-.303)}L${x(.041)} ${y(-.281)}Q0 ${y(-.29)} ${x(-.041)} ${y(-.281)}Z" fill="#243e51"/><path d="M0 ${y(-.324)}V${y(-.285)}" stroke="${color}" stroke-width=".12"/>`;
  for(const sign of [-1,1]){
   for(const [wy,wx] of [[-.246,.046],[-.180,.047],[-.132,.047],[-.095,.046],[.030,.035]])details+=`<ellipse cx="${x(sign*wx)}" cy="${y(wy)}" rx="${x(.004)}" ry="${y(.012)}" fill="#294654"/>`;
   details+=`<path d="M${x(sign*.136)} ${y(-.269)}H${x(sign*.172)}M${x(sign*.154)} ${y(-.267)}V${y(-.14)}M${x(sign*.021)} ${y(.325)}L${x(sign*.009)} ${y(.11)}Q0 ${y(.01)} ${x(-sign*.009)} ${y(.11)}" fill="none" stroke="#294654" stroke-width=".075" opacity=".6"/>`;
  }
 }
 else if(model.id==='king200'){
  details+=`<path d="M0 ${y(.05)}Q${x(.009)} ${y(.23)} ${x(.012)} ${y(.405)}L0 ${y(.49)}L${x(-.012)} ${y(.405)}Q${x(-.009)} ${y(.23)} 0 ${y(.05)}Z" fill="${color}" stroke="#294654" stroke-width=".075"/><ellipse cx="0" cy="${y(.441)}" rx="${x(.009)}" ry="${y(.057)}" fill="${color}" stroke="#294654" stroke-width=".065"/>`;
  for(const sign of [-1,1]){
   details+=`<path d="M${x(sign*.007)} ${y(-.349)}L${x(sign*.032)} ${y(-.34)}L${x(sign*.034)} ${y(-.310)}L${x(sign*.009)} ${y(-.313)}Z" fill="#243e51"/>`;
   for(let i=0;i<6;i++){const wy=-.213+i*.038,wx=.043;details+=`<rect x="${x(sign>0?wx-.004:-wx-.004)}" y="${y(wy)}" width="${x(.008)}" height="${y(.021)}" rx=".09" fill="#294654"/>`;}
   details+=`<path d="M${x(sign*.144)} ${y(-.337)}H${x(sign*.174)}M${x(sign*.144)} ${y(-.29)}H${x(sign*.174)}M${x(sign*.159)} ${y(-.264)}V${y(-.11)}" stroke="#294654" stroke-width=".07" opacity=".6"/>`;
  }
 }
 else if(model.id==='phenom'){
  // The continuous curved windshield band, separate entry door and rounded side windows.
  details+=`<path d="M${x(-.050)} ${y(-.295)}L${x(-.047)} ${y(-.34)}Q${x(-.034)} ${y(-.383)} 0 ${y(-.382)}Q${x(.034)} ${y(-.383)} ${x(.047)} ${y(-.34)}L${x(.050)} ${y(-.295)}L${x(.039)} ${y(-.312)}Q${x(.032)} ${y(-.338)} 0 ${y(-.339)}Q${x(-.032)} ${y(-.338)} ${x(-.039)} ${y(-.312)}Z" fill="#203c4e"/>`;
  details+=`<path d="M${x(-.052)} ${y(-.24)}H${x(-.030)}Q${x(-.024)} ${y(-.24)} ${x(-.024)} ${y(-.233)}V${y(-.204)}Q${x(-.024)} ${y(-.196)} ${x(-.032)} ${y(-.196)}H${x(-.054)}" fill="none" stroke="#243e50" stroke-width=".085"/>`;
  for(const sign of [-1,1]){
   for(let i=sign<0?1:0;i<5;i++)details+=`<rect x="${x(sign>0?.042:-.055)}" y="${y(-.226+i*.044)}" width="${x(.013)}" height="${y(.025)}" rx=".18" fill="#243e50"/>`;
   details+=`<path d="M${x(sign*.028)} ${y(.085)}L${x(sign*.015)} ${y(.34)}L${x(sign*.008)} ${y(.425)}M${x(sign*.067)} ${y(.089)}Q${x(sign*.0905)} ${y(.082)} ${x(sign*.114)} ${y(.089)}M${x(sign*.07)} ${y(.232)}H${x(sign*.111)}" fill="none" stroke="#294654" stroke-width=".09" opacity=".75"/>`;
  }
  details+=`<path d="M0 ${y(.102)}L${x(.005)} ${y(.316)}L0 ${y(.478)}L${x(-.005)} ${y(.316)}Z" fill="${color}" stroke="#294654" stroke-width=".075"/>`;
 }
 else if(model.id==='bravo'){
  details+=`<path d="M${x(-.049)} ${y(-.293)}L${x(-.05)} ${y(-.328)}Q${x(-.044)} ${y(-.365)} 0 ${y(-.363)}Q${x(.044)} ${y(-.365)} ${x(.05)} ${y(-.328)}L${x(.049)} ${y(-.293)}L${x(.028)} ${y(-.318)}Q0 ${y(-.339)} ${x(-.028)} ${y(-.318)}Z" fill="#203a4a"/><path d="M0 ${y(-.362)}V${y(-.328)}" stroke="${color}" stroke-width=".09"/>`;
  for(const sign of [-1,1]){
   details+=`<path d="M${x(sign*.043)} ${y(-.423)}L${x(sign*.024)} ${y(-.421)}L${x(sign*.028)} ${y(-.375)}L${x(sign*.048)} ${y(-.371)}" fill="none" stroke="#294654" stroke-width=".075"/>`;
   for(let i=0;i<6;i++)details+=`<rect x="${x(sign>0?.040:-.052)}" y="${y(-.20+i*.035)}" width="${x(.012)}" height="${y(.021)}" rx=".10" fill="#294654"/>`;
   details+=`<path d="M${x(sign*.060)} ${y(.06)}H${x(sign*.108)}M${x(sign*.013)} ${y(.08)}L${x(sign*.009)} ${y(.35)}" stroke="#294654" stroke-width=".07" opacity=".7"/>`;
  }
 }
 else if(model.id==='pc12'){
  details+=`<path d="M${x(-.047)} ${y(-.284)}Q0 ${y(-.326)} ${x(.047)} ${y(-.284)}L${x(.034)} ${y(-.247)}Q0 ${y(-.272)} ${x(-.034)} ${y(-.247)}Z" fill="#243e51"/><path d="M0 ${y(-.305)}V${y(-.262)}M${x(-.04)} ${y(-.278)}L${x(-.033)} ${y(-.246)}M${x(.04)} ${y(-.278)}L${x(.033)} ${y(-.246)}" stroke="${color}" stroke-width=".12"/>`;
  details+=`<path d="M${x(-.052)} ${y(-.225)}H${x(.052)}M${x(-.052)} ${y(-.21)}H${x(-.034)}Q${x(-.03)} ${y(-.21)} ${x(-.03)} ${y(-.2)}V${y(-.168)}Q${x(-.03)} ${y(-.163)} ${x(-.037)} ${y(-.163)}H${x(-.054)}M${x(-.052)} ${y(-.012)}H${x(-.032)}V${y(.087)}H${x(-.052)}M${x(-.052)} ${y(.094)}H${x(.052)}" fill="none" stroke="#294654" stroke-width=".08"/>`;
  for(const sign of [-1,1])for(const wy of [-.16,-.107,-.051,.001,.056])details+=`<rect x="${x(sign>0?.046:-.056)}" y="${y(wy)}" width="${x(.01)}" height="${y(.023)}" rx=".13" fill="#294654"/>`;
  details+=`<path d="M0 ${y(.099)}Q${x(-.011)} ${y(.20)} ${x(-.01)} ${y(.345)}L0 ${y(.448)}L${x(.01)} ${y(.345)}Q${x(.011)} ${y(.20)} 0 ${y(.099)}Z" fill="none" stroke="#294654" stroke-width=".075"/><path d="M${x(-.016)} ${y(-.46)}H${x(.016)}" stroke="#294654" stroke-width=".075"/>`;
  for(const wy of [-.205,-.188,-.171,-.113,-.056,.057])details+=`<ellipse cx="0" cy="${y(wy)}" rx="${x(.004)}" ry="${y(.006)}" fill="#294654" opacity=".6"/>`;
 }
 else if(model.id==='tbm'){
  details+=`<path d="M${x(-.049)} ${y(-.199)}Q${x(-.031)} ${y(-.224)} 0 ${y(-.224)}Q${x(.031)} ${y(-.224)} ${x(.049)} ${y(-.199)}L${x(.043)} ${y(-.149)}Q0 ${y(-.173)} ${x(-.043)} ${y(-.149)}Z" fill="#243e51"/><path d="M0 ${y(-.224)}V${y(-.161)}" stroke="${color}" stroke-width=".12"/>`;
  for(const sign of [-1,1]){
   details+=`<path d="M${x(sign*.048)} ${y(-.146)}L${x(sign*.051)} ${y(-.11)}V${y(-.072)}L${x(sign*.044)} ${y(-.073)}V${y(-.132)}Z" fill="#294654"/>`;
   for(const [wy,wx] of [[-.071,.052],[-.015,.052],[.042,.049],[.099,.044]])details+=`<rect x="${x(sign>0?wx-.004:-wx-.004)}" y="${y(wy)}" width="${x(.008)}" height="${y(.027)}" rx=".12" fill="#294654"/>`;
   details+=`<path d="M${x(sign*.058)} ${y(-.14)}V${y(.01)}M${x(sign*.051)} ${y(.022)}L${x(sign*.052)} ${y(.070)}L${x(sign*.045)} ${y(.071)}M${x(sign*.016)} ${y(.40)}L${x(sign*.006)} ${y(.096)}Q0 ${y(.059)} ${x(-sign*.006)} ${y(.096)}" fill="none" stroke="#294654" stroke-width=".07" opacity=".65"/>`;
  }
  details+=`<path d="M${x(-.014)} ${y(-.441)}H${x(.014)}M0 ${y(.29)}V${y(.486)}" fill="none" stroke="#294654" stroke-width=".07" opacity=".7"/>`;
 }
 else if(model.id==='vision'){
  details+=`<path d="M${x(-.059)} ${y(-.228)}Q${x(-.054)} ${y(-.328)} 0 ${y(-.34)}Q${x(.054)} ${y(-.328)} ${x(.059)} ${y(-.228)}L${x(.046)} ${y(-.216)}Q0 ${y(-.275)} ${x(-.046)} ${y(-.216)}Z" fill="#243e51"/><path d="M0 ${y(-.338)}V${y(-.252)}" stroke="${color}" stroke-width=".08"/>`;
  for(const sign of [-1,1])for(const [wx,wy] of [[.061,-.17],[.063,-.096],[.059,-.022]])details+=`<ellipse cx="${x(sign*wx)}" cy="${y(wy)}" rx="${x(.008)}" ry="${y(.028)}" fill="#294654"/>`;
  details+=`<path d="M${x(-.026)} ${y(.027)}H${x(.026)}M0 ${y(.028)}V${y(.25)}" stroke="#294654" stroke-width=".085" opacity=".65"/>`;
 }
 else if(model.id==='cessna'){
  details+=`<path d="M${x(-.043)} ${y(-.24)}L${x(-.038)} ${y(-.295)}Q0 ${y(-.346)} ${x(.038)} ${y(-.295)}L${x(.043)} ${y(-.24)}Q0 ${y(-.264)} ${x(-.043)} ${y(-.24)}Z" fill="#243e51"/><path d="M0 ${y(-.325)}V${y(-.254)}" stroke="${color}" stroke-width=".10"/><path d="M${x(-.036)} ${y(-.225)}H${x(.036)}L${x(.034)} ${y(-.067)}Q0 ${y(-.045)} ${x(-.034)} ${y(-.067)}Z" fill="${color}" stroke="#294654" stroke-width=".06"/><path d="M${x(-.037)} ${y(-.025)}L${x(-.032)} ${y(-.045)}Q0 ${y(-.027)} ${x(.032)} ${y(-.045)}L${x(.037)} ${y(-.025)}L${x(.029)} ${y(.016)}Q0 ${y(.026)} ${x(-.029)} ${y(.016)}Z" fill="#294654"/><path d="M0 ${y(-.028)}V${y(.023)}" stroke="${color}" stroke-width=".08"/>`;
  for(const sign of [-1,1])details+=`<path d="M${x(sign*.013)} ${y(-.411)}V${y(-.346)}L${x(sign*.034)} ${y(-.336)}M${x(sign*.041)} ${y(.047)}L${x(sign*.017)} ${y(.25)}M${x(sign*.004)} ${y(.203)}L${x(sign*.008)} ${y(.353)}L0 ${y(.48)}" fill="none" stroke="#294654" stroke-width=".065" opacity=".6"/>`;
 }
 else if(model.id==='cessna206'){
  details+=`<path d="M${x(-.046)} ${y(-.28)}Q${x(-.043)} ${y(-.355)} 0 ${y(-.355)}Q${x(.043)} ${y(-.355)} ${x(.046)} ${y(-.28)}Q0 ${y(-.307)} ${x(-.046)} ${y(-.28)}Z" fill="#243e51"/><path d="M0 ${y(-.35)}V${y(-.298)}" stroke="${color}" stroke-width=".09"/><path d="M${x(-.033)} ${y(-.26)}Q0 ${y(-.278)} ${x(.033)} ${y(-.26)}L${x(.026)} ${y(-.106)}L0 ${y(-.085)}L${x(-.026)} ${y(-.106)}Z" fill="none" stroke="#294654" stroke-width=".065"/><path d="M${x(-.035)} ${y(-.047)}L${x(-.027)} ${y(-.079)}L0 ${y(-.062)}L${x(.027)} ${y(-.079)}L${x(.035)} ${y(-.047)}L${x(.028)} ${y(-.005)}Q0 ${y(.012)} ${x(-.028)} ${y(-.005)}Z" fill="#243e51"/><path d="M0 ${y(-.06)}V${y(.005)}" stroke="${color}" stroke-width=".09"/>`;
  for(const sign of [-1,1])details+=`<path d="M${x(sign*.014)} ${y(-.436)}V${y(-.367)}L${x(sign*.04)} ${y(-.361)}M${x(sign*.022)} ${y(.085)}L${x(sign*.008)} ${y(.302)}" fill="none" stroke="#294654" stroke-width=".07"/>`;
 }
 else if(profile.canopy){
  details+=`<path d="M${x(-.031)} ${y(-.16)}L${x(-.021)} ${y(-.177)}H${x(.021)}L${x(.031)} ${y(-.16)}L${x(.031)} ${y(-.13)}Q${x(.032)} ${y(.027)} ${x(.013)} ${y(.065)}Q0 ${y(.083)} ${x(-.013)} ${y(.065)}Q${x(-.032)} ${y(.027)} ${x(-.031)} ${y(-.13)}Z" fill="#253f50"/><path d="M${x(-.03)} ${y(-.13)}Q0 ${y(-.12)} ${x(.03)} ${y(-.13)}M${x(-.018)} ${y(-.17)}L${x(-.016)} ${y(-.129)}M${x(.018)} ${y(-.17)}L${x(.016)} ${y(-.129)}" fill="none" stroke="${color}" stroke-width=".08"/><path d="M${x(-.018)} ${y(-.10)}Q${x(-.019)} ${y(.015)} ${x(-.008)} ${y(.047)}" fill="none" stroke="#b8d5df" stroke-width=".16" opacity=".6"/><path d="M${x(-.029)} ${y(-.437)}V${y(-.203)}Q0 ${y(-.174)} ${x(.029)} ${y(-.203)}V${y(-.437)}M0 ${y(.19)}V${y(.478)}" fill="none" stroke="#294654" stroke-width=".07"/>`;
 }

 else {const cy=profile.cockpit,w=model.id==='vision'?.056:.033;
  details+=`<path d="M${x(-w)} ${y(cy+.017)}L${x(-w*.73)} ${y(cy-.035)}Q0 ${y(cy-.058)} ${x(w*.73)} ${y(cy-.035)}L${x(w)} ${y(cy+.017)}Q0 ${y(cy-.008)} ${x(-w)} ${y(cy+.017)}Z" fill="#243e51"/><path d="M0 ${y(cy-.047)}V${y(cy+.001)}" stroke="${color}" stroke-width=".07"/>`;
  for(let i=0;i<(profile.highWing?0:profile.windows);i++){const wy=cy+.09+i*.052;for(const sign of [-1,1])details+=`<rect x="${x(sign>0?.028:-.042)}" y="${y(wy)}" width="${x(.014)}" height="${y(.024)}" rx=".10" fill="#294654" opacity=".85"/>`;}
 }
 for(const sign of [-1,1]){
  const w=profile.wing;const outer=w[Math.floor(w.length/2)],inner=w[w.length-1];
  if(model.id==='pc12'){details+=`<path d="M${x(sign*.058)} ${y(-.15)}L${x(sign*.464)} ${y(-.130)}V${y(-.060)}M${x(sign*.060)} ${y(-.05)}L${x(sign*.347)} ${y(-.078)}V${y(-.037)}M${x(sign*.363)} ${y(-.142)}V${y(-.049)}M${x(sign*.012)} ${y(.384)}L${x(sign*.139)} ${y(.406)}V${y(.438)}H${x(sign*.012)}" fill="none" stroke="#243e50" stroke-width=".07" opacity=".65"/>`;}else if(model.id==='phenom'){details+=`<path d="M${x(sign*.064)} ${y(-.098)}L${x(sign*.464)} ${y(.111)}L${x(sign*.472)} ${y(.159)}M${x(sign*.09)} ${y(.068)}L${x(sign*.174)} ${y(.066)}L${x(sign*.466)} ${y(.158)}M${x(sign*.177)} ${y(.048)}V${y(.067)}M${x(sign*.33)} ${y(.102)}V${y(.12)}M${x(sign*.014)} ${y(.368)}L${x(sign*.177)} ${y(.456)}M${x(sign*.012)} ${y(.412)}L${x(sign*.181)} ${y(.484)}" fill="none" stroke="#243e50" stroke-width=".065" opacity=".55"/>`;}else if(model.id==='cessna'){details+=`<path d="M${x(sign*.051)} ${y(-.212)}H${x(sign*.451)}M${x(sign*.051)} ${y(-.075)}H${x(sign*.46)}M${x(sign*.238)} ${y(-.227)}V${y(-.04)}M${x(sign*.465)} ${y(-.22)}V${y(-.045)}M${x(sign*.064)} ${y(-.11)}H${x(sign*.209)}V${y(-.192)}H${x(sign*.064)}ZM${x(sign*.016)} ${y(.39)}L${x(sign*.139)} ${y(.378)}M${x(sign*.125)} ${y(.33)}V${y(.403)}" fill="none" stroke="#243e50" stroke-width=".06" opacity=".6"/><circle cx="${x(sign*.15)}" cy="${y(-.164)}" r=".23" fill="none" stroke="#243e50" stroke-width=".06"/>`;}else if(model.id==='mustang'){details+=`<path d="M${x(sign*.053)} ${y(-.20)}V${y(.034)}M${x(sign*.167)} ${y(-.192)}V${y(.015)}M${x(sign*.425)} ${y(-.173)}V${y(-.039)}M${x(sign*.477)} ${y(-.163)}V${y(-.077)}M${x(sign*.055)} ${y(-.022)}L${x(sign*.478)} ${y(-.077)}M${x(sign*.20)} ${y(-.022)}L${x(sign*.20)} ${y(-.05)}L${x(sign*.367)} ${y(-.083)}M${x(sign*.008)} ${y(.375)}H${x(sign*.169)}M${x(sign*.154)} ${y(.329)}V${y(.40)}" fill="none" stroke="#243e50" stroke-width=".065" opacity=".6"/>`;}else if(model.id==='cessna206'){details+=`<path d="M${x(sign*.055)} ${y(-.255)}H${x(sign*.205)}V${y(-.073)}M${x(sign*.06)} ${y(-.10)}H${x(sign*.20)}L${x(sign*.48)} ${y(-.143)}M${x(sign*.48)} ${y(-.251)}V${y(-.11)}M${x(sign*.12)} ${y(-.15)}L${x(sign*.16)} ${y(-.20)}H${x(sign*.203)}M${x(sign*.02)} ${y(.323)}L${x(sign*.136)} ${y(.334)}V${y(.385)}L${x(sign*.03)} ${y(.38)}M${x(sign*.025)} ${y(.399)}L${x(sign*.142)} ${y(.389)}" fill="none" stroke="#243e50" stroke-width=".065" opacity=".6"/><circle cx="${x(sign*.128)}" cy="${y(-.203)}" r=".3" fill="none" stroke="#243e50" stroke-width=".065"/>`;}else if(model.id==='tbm'){details+=`<path d="M${x(sign*.067)} ${y(-.135)}L${x(sign*.455)} ${y(-.126)}V${y(-.137)}M${x(sign*.287)} ${y(-.115)}V${y(-.031)}M${x(sign*.39)} ${y(-.11)}V${y(-.091)}M${x(sign*.012)} ${y(.451)}L${x(sign*.178)} ${y(.446)}V${y(.401)}M${x(sign*.017)} ${y(.396)}H${x(sign*.177)}" fill="none" stroke="#243e50" stroke-width=".065" opacity=".55"/>`;}else if(model.id==='bravo'){details+=`<path d="M${x(sign*.101)} ${y(-.078)}V${y(.079)}M${x(sign*.475)} ${y(-.04)}V${y(.029)}M${x(sign*.105)} ${y(.069)}L${x(sign*.446)} ${y(.016)}V${y(.036)}M${x(sign*.282)} ${y(.042)}V${y(.064)}M${x(sign*.012)} ${y(.412)}H${x(sign*.174)}L${x(sign*.175)} ${y(.394)}" fill="none" stroke="#243e50" stroke-width=".07" opacity=".55"/>`;}else if(model.id==='king200'){details+=`<path d="M${x(sign*.065)} ${y(-.057)}L${x(sign*.18)} ${y(-.06)}L${x(sign*.48)} ${y(-.12)}M${x(sign*.48)} ${y(-.168)}V${y(-.119)}M${x(sign*.008)} ${y(.453)}L${x(sign*.163)} ${y(.461)}" fill="none" stroke="#243e50" stroke-width=".065" opacity=".55"/>`;}else if(model.id==='king'){details+=`<path d="M${x(sign*.057)} ${y(-.116)}H${x(sign*.192)}L${x(sign*.488)} ${y(-.18)}M${x(sign*.193)} ${y(-.255)}V${y(-.09)}M${x(sign*.488)} ${y(-.228)}V${y(-.169)}M${x(sign*.01)} ${y(.411)}L${x(sign*.162)} ${y(.453)}" fill="none" stroke="#243e50" stroke-width=".07" opacity=".55"/>`;}else if(model.id==='vision'){details+=`<path d="M${x(sign*.075)} ${y(.029)}L${x(sign*.464)} ${y(.020)}M${x(sign*.464)} ${y(-.087)}L${x(sign*.466)} ${y(.034)}" fill="none" stroke="#243e50" stroke-width=".065" opacity=".5"/>`;}else details+=`<path d="M${x(sign*.11)} ${y(inner[1]-.025)}L${x(sign*.455)} ${y(outer[1]+.004)}" fill="none" stroke="#243e50" stroke-width=".065" opacity=".45"/>`;
  if(model.id==='pc12')details+=`<path d="M${x(sign*.463)} ${y(-.127)}V${y(-.063)}L${x(sign*.495)} ${y(-.049)}" fill="none" stroke="#f2f7fa" stroke-width=".13"/>`;else if(model.id==='phenom')details+=`<path d="M${x(sign*.478)} ${y(.110)}L${x(sign*.482)} ${y(.155)}L${x(sign*.499)} ${y(.182)}" stroke="#f2f7fa" stroke-width=".15"/>`;else if(profile.winglets)details+=`<path d="M${x(sign*.49)} ${y(outer[1]-.018)}L${x(sign*.49)} ${y(outer[1]+.024)}" stroke="#f2f7fa" stroke-width=".16"/>`;
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
const bodyPartsCache = new WeakMap();
function worldBody(plane) {
 if(!bodyPartsCache.has(plane.model))bodyPartsCache.set(plane.model,anatomy(plane.model).components.filter(c=>c.kind==='body').flatMap(c=>triangulate(c.points)));
 const angle=plane.angle*Math.PI/180,c=Math.cos(angle),s=Math.sin(angle);
 return bodyPartsCache.get(plane.model).map(p=>p.map(([x,y])=>[plane.x+x*c-y*s,plane.y+x*s+y*c]));
}
function assess(planes) {
 const shapes=planes.map(worldParts),bodies=planes.map(worldBody);
 const checks=shapes.map(shape=>({obstruction:shape.some(part=>overlaps(part,restroomPolygon)),outside:shape.flat().some(([x,y])=>x<0||x>65||y<0||y>60),overlap:false,fuselageOverlap:false,sameModelOverlap:false}));
 for(let i=0;i<planes.length;i++)for(let j=i+1;j<planes.length;j++){
  if(!shapes[i].some(a=>shapes[j].some(b=>overlaps(a,b))))continue;
  const fuselage=bodies[i].some(a=>bodies[j].some(b=>overlaps(a,b))),sameModel=planes[i].model.id===planes[j].model.id;
  for(const k of [i,j]){checks[k].overlap=true;checks[k].fuselageOverlap ||= fuselage;checks[k].sameModelOverlap ||= sameModel;}
 }
 return checks;
}

globalThis.KBOX5Geometry = Object.freeze({models,parts,worldParts,overlaps,assess,anatomy,aircraftMarkup,restroom});
})();
