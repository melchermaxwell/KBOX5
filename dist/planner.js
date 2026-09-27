(() => {
'use strict';
const {models,parts,assess,aircraftMarkup} = globalThis.KBOX5Geometry;
const $=id=>document.getElementById(id), svg=$('hangar-canvas'),layer=$('aircraft-layer');
let planes=[],selected=null,serial=0,gesture=null;
function thumbnail(model){const size=Math.max(model.span,model.length)*1.1;return `<svg viewBox="${-size/2} ${-size/2} ${size} ${size}" aria-hidden="true">${aircraftMarkup(model)}</svg>`;}
models.forEach(model=>{const card=document.createElement('button');card.className='aircraft-card';card.draggable=false;card.setAttribute('aria-label',`Add ${model.name}`);card.innerHTML=`${thumbnail(model)}<span><strong>${model.name}</strong><small>${model.type}</small><small>${model.dimensions}</small></span><b aria-hidden="true">+</b>`;let cardDrag=null,suppressClick=false;
card.addEventListener('click',()=>{if(suppressClick){suppressClick=false;return;}add(model);});
card.addEventListener('pointerdown',e=>{if(e.button!==0)return;suppressClick=false;cardDrag={id:e.pointerId,x:e.clientX,y:e.clientY,ghost:null};card.setPointerCapture(e.pointerId);});
card.addEventListener('pointermove',e=>{if(!cardDrag||cardDrag.id!==e.pointerId)return;if(!cardDrag.ghost&&Math.hypot(e.clientX-cardDrag.x,e.clientY-cardDrag.y)>6){const ghost=card.cloneNode(true);ghost.classList.add('aircraft-drag-preview');ghost.setAttribute('aria-hidden','true');document.body.append(ghost);cardDrag.ghost=ghost;}if(cardDrag.ghost){e.preventDefault();cardDrag.ghost.style.left=`${e.clientX+12}px`;cardDrag.ghost.style.top=`${e.clientY+12}px`;}});
card.addEventListener('pointerup',e=>{if(!cardDrag)return;if(cardDrag.ghost){suppressClick=true;cardDrag.ghost.remove();const r=svg.getBoundingClientRect();if(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom){const pos=point(e);add(model,pos.x,pos.y);}}cardDrag=null;});
card.addEventListener('pointercancel',()=>{cardDrag?.ghost?.remove();cardDrag=null;});$('aircraft-catalog').append(card);});
function point(event){const p=new DOMPoint(event.clientX,event.clientY);return p.matrixTransform(svg.getScreenCTM().inverse());}
function add(model,x=32.5,y=30){if(planes.length>=12){$('layout-status').textContent='Up to 12 aircraft can be compared at once. Remove one to add another.';return;}const plane={id:++serial,model,x,y,angle:0};planes.push(plane);selected=plane.id;render();}
function current(){return planes.find(p=>p.id===selected);}
function render(){const checks=assess(planes);layer.innerHTML=planes.map((plane,i)=>{const active=plane.id===selected,bad=checks[i].outside||checks[i].overlap;return `<g class="placed-aircraft${active?' selected':''}" data-plane="${plane.id}" transform="translate(${plane.x} ${plane.y}) rotate(${plane.angle})" tabindex="0" role="button" aria-label="${plane.model.name} ${plane.id}, ${Math.round(plane.angle)} degrees${bad?', layout conflict':''}">${aircraftMarkup(plane.model,{selected:active,conflict:bad})}<text y="${plane.model.length*.13}" text-anchor="middle" font-size="1.2" font-weight="600" fill="#142c3c" pointer-events="none">${plane.id}</text>${active?`<path d="M0 ${-plane.model.length/2}v-3" stroke="#fff" stroke-width=".18"/><circle class="rotate-handle" data-rotate="true" cy="${-plane.model.length/2-3}" r="1.25" fill="#fff" stroke="#edc34f" stroke-width=".35"/>`:''}</g>`;}).join('');
$('planner-empty').style.display=planes.length?'none':'';$('plane-count').textContent=`${planes.length} aircraft`;
const select=$('selected-plane');select.replaceChildren();if(!planes.length)select.add(new Option('No aircraft selected',''));for(const p of planes)select.add(new Option(`${p.id}. ${p.model.name}`,String(p.id)));select.value=String(selected??'');
const p=current();for(const id of ['plane-angle','rotate-left','rotate-right','remove-plane'])$(id).disabled=!p;
$('plane-angle').value=p?Math.round(p.angle):0;$('angle-value').value=`${p?Math.round(p.angle):0}°`;
const c=p?checks[planes.indexOf(p)]:null;$('selected-status').textContent=!p?'Select an aircraft to move or rotate it.':`${p.model.dimensions}${c.outside?' · Crosses hangar boundary':''}${c.overlap?' · Overlaps another footprint':''}`;
const outside=checks.filter(c=>c.outside).length,overlap=checks.filter(c=>c.overlap).length;
$('layout-status').classList.toggle('has-conflict',outside+overlap>0);$('layout-status').textContent=!planes.length?'Your hangar is ready. Add an aircraft from the selection.':outside||overlap?`${outside?`${outside} aircraft crossing the boundary. `:''}${overlap?`${overlap} aircraft with overlapping footprints.`:''}`:'All illustrated footprints are inside the hangar without overlap.';
}
svg.addEventListener('dragover',e=>{e.preventDefault();e.dataTransfer.dropEffect='copy';});svg.addEventListener('drop',e=>{e.preventDefault();const model=models.find(m=>m.id===e.dataTransfer.getData('text/plain'));if(model){const p=point(e);add(model,p.x,p.y);}});
svg.addEventListener('pointerdown',e=>{if(e.button!==0)return;const target=e.target.closest('[data-plane]');if(!target)return;const rotating=e.target.hasAttribute('data-rotate');selected=Number(target.dataset.plane);const p=current(),pos=point(e);gesture={id:e.pointerId,rotate:rotating,dx:pos.x-p.x,dy:pos.y-p.y};svg.setPointerCapture(e.pointerId);e.preventDefault();render();});
svg.addEventListener('pointermove',e=>{if(!gesture||gesture.id!==e.pointerId)return;const p=current(),pos=point(e);if(!p)return;if(gesture.rotate)p.angle=(Math.atan2(pos.y-p.y,pos.x-p.x)*180/Math.PI+90+360)%360;else{p.x=Math.max(-3,Math.min(68,pos.x-gesture.dx));p.y=Math.max(-3,Math.min(63,pos.y-gesture.dy));}render();});
function endDrag(){gesture=null;}svg.addEventListener('pointerup',endDrag);svg.addEventListener('pointercancel',endDrag);svg.addEventListener('lostpointercapture',endDrag);
svg.addEventListener('keydown',e=>{const target=e.target.closest('[data-plane]');if(!target)return;selected=Number(target.dataset.plane);const p=current();const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','r','R','Delete','Backspace','Enter',' '];if(!keys.includes(e.key))return;e.preventDefault();if(e.key==='ArrowLeft')p.x-=1;if(e.key==='ArrowRight')p.x+=1;if(e.key==='ArrowUp')p.y-=1;if(e.key==='ArrowDown')p.y+=1;if(e.key.toLowerCase()==='r')p.angle=(p.angle+(e.shiftKey?345:15))%360;if(e.key==='Delete'||e.key==='Backspace')remove();else render();layer.querySelector(`[data-plane="${selected}"]`)?.focus();});
$('selected-plane').addEventListener('change',e=>{selected=Number(e.target.value);render();});
$('plane-angle').addEventListener('input',e=>{if(current()){current().angle=Number(e.target.value);render();}});
function rotate(amount){if(current()){current().angle=(current().angle+amount+360)%360;render();}}
$('rotate-left').addEventListener('click',()=>rotate(-15));$('rotate-right').addEventListener('click',()=>rotate(15));
function remove(){planes=planes.filter(p=>p.id!==selected);selected=planes.at(-1)?.id??null;render();}
$('remove-plane').addEventListener('click',remove);$('clear-planes').addEventListener('click',()=>{planes=[];selected=null;render();});
add(models[0]);

})();
