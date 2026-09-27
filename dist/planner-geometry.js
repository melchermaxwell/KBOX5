export const models = [
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
// Convex schematic components; outer wing and nose/tail extents match published dimensions.
export function parts(model) {
 const jet=['jet','straight-jet','vision'].includes(model.shape), swept=['jet','vision'].includes(model.shape), single=['single','vision'].includes(model.shape);
 const shapes=[
 [[0,-.5],[.045,-.43],[.065,-.25],[.055,.2],[.018,.5],[-.018,.5],[-.055,.2],[-.065,-.25],[-.045,-.43]],
 swept ? [[-.06,-.05],[-.5,.2],[-.5,.27],[-.05,.12]] : [[-.055,-.17],[-.5,-.1],[-.5,.035],[-.055,.065]],
 swept ? [[.06,-.05],[.5,.2],[.5,.27],[.05,.12]] : [[.055,-.17],[.5,-.1],[.5,.035],[.055,.065]],
 [[-.025,.30],[-.21,.40],[-.21,.46],[-.02,.43]], [[.025,.30],[.21,.40],[.21,.46],[.02,.43]]
 ];
 if(model.shape==='vision'){shapes[3]=[[-.018,.27],[-.19,.44],[-.17,.49],[-.015,.42]];shapes[4]=shapes[3].map(([x,y])=>[-x,y]);shapes.push([[-.035,.06],[.035,.06],[.035,.30],[-.035,.30]]);}
 if(!single) for(const sign of [-1,1]) {const x=sign*(jet?.09:.18), y=jet?.22:-.24;shapes.push([[x-.026,y],[x+.026,y],[x+.026,y+.23],[x-.026,y+.23]]);}
 return shapes.map(p=>p.map(([x,y])=>[x*model.span,y*model.length]));
}
export function worldParts(plane) {const angle=plane.angle*Math.PI/180,c=Math.cos(angle),s=Math.sin(angle);return parts(plane.model).map(p=>p.map(([x,y])=>[plane.x+x*c-y*s,plane.y+x*s+y*c]));}
export function overlaps(a,b) {
 for(const poly of [a,b]) for(let i=0;i<poly.length;i++) {const j=(i+1)%poly.length,axis=[-(poly[j][1]-poly[i][1]),poly[j][0]-poly[i][0]];const project=p=>p.map(([x,y])=>x*axis[0]+y*axis[1]);const pa=project(a),pb=project(b);if(Math.max(...pa)<Math.min(...pb)-1e-7||Math.max(...pb)<Math.min(...pa)-1e-7)return false;}
 return true;
}
export function assess(planes) {
 const shapes=planes.map(worldParts);return planes.map((plane,i)=>({outside:shapes[i].flat().some(([x,y])=>x<0||x>65||y<0||y>60),overlap:shapes.some((other,j)=>i!==j&&shapes[i].some(a=>other.some(b=>overlaps(a,b))))}));
}
