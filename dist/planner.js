(() => {
'use strict';
const {models,parts,assess,aircraftMarkup,restroom} = globalThis.KBOX5Geometry;
const $=id=>document.getElementById(id), svg=$('hangar-canvas'),layer=$('aircraft-layer');
const room=$('restroom-layer');
room.innerHTML=`<title>Restroom, 10 feet along the back wall and 6 feet deep</title><rect x="${restroom.x}" y="${restroom.y}" width="${restroom.width}" height="${restroom.depth}" fill="#435968" stroke="#b2c2c9" stroke-width=".35"/><g fill="#eef3f5" text-anchor="middle" font-family="sans-serif"><text x="5" y="2.6" font-size="1.15">RESTROOM</text><text x="5" y="4.3" font-size=".95">10′ × 6′</text></g><path d="M6.3 6H9.3" stroke="#435968" stroke-width=".5"/><path d="M9.3 6V9M6.3 6A3 3 0 0 0 9.3 9" fill="none" stroke="#b2c2c9" stroke-width=".15"/>`;
let planes=[],selected=null,serial=0,gesture=null,view3d=false;
$('view-3d').addEventListener('click',()=>{
 const button=$('view-3d');
 if(!view3d){
  view3d=true;gesture=null;svg.hidden=true;$('hangar-3d').hidden=false;$('door-toggle').hidden=false;
  document.querySelector('.aircraft-sidebar').inert=true;$('clear-planes').disabled=true;
  button.textContent='Return to Top View';button.setAttribute('aria-pressed','true');
  $('view-hint').textContent='View only · click the door to open it. Heights and aircraft volumes are illustrative.';
  $('planner-help').hidden=true;globalThis.KBOX5View3D.enter(planes);
 }else{
  button.disabled=true;$('door-toggle').hidden=true;
  globalThis.KBOX5View3D.leave(()=>{view3d=false;svg.hidden=false;$('hangar-3d').hidden=true;
   document.querySelector('.aircraft-sidebar').inert=false;$('clear-planes').disabled=false;
   button.disabled=false;button.textContent='3D Door View';button.setAttribute('aria-pressed','false');
   $('view-hint').textContent='Edit your layout from above.';$('planner-help').hidden=false;render();
  });
 }
});
function thumbnail(model){const size=Math.max(model.span,model.length)*1.1;return `<svg viewBox="${-size/2} ${-size/2} ${size} ${size}" aria-hidden="true">${aircraftMarkup(model)}</svg>`;}
models.forEach(model=>{const card=document.createElement('button');card.className='aircraft-card';card.draggable=false;card.setAttribute('aria-label',`Add ${model.name}`);card.innerHTML=`${thumbnail(model)}<span><strong>${model.name}</strong><small>${model.type}</small><small>${model.dimensions}</small></span><b aria-hidden="true">+</b>`;let cardDrag=null,suppressClick=false;
card.addEventListener('click',()=>{if(suppressClick){suppressClick=false;return;}add(model);});
card.addEventListener('pointerdown',e=>{if(e.button!==0)return;suppressClick=false;cardDrag={id:e.pointerId,x:e.clientX,y:e.clientY,ghost:null};card.setPointerCapture(e.pointerId);});
card.addEventListener('pointermove',e=>{if(!cardDrag||cardDrag.id!==e.pointerId)return;if(!cardDrag.ghost&&Math.hypot(e.clientX-cardDrag.x,e.clientY-cardDrag.y)>6){const ghost=card.cloneNode(true);ghost.classList.add('aircraft-drag-preview');ghost.setAttribute('aria-hidden','true');document.body.append(ghost);cardDrag.ghost=ghost;}if(cardDrag.ghost){e.preventDefault();cardDrag.ghost.style.left=`${e.clientX+12}px`;cardDrag.ghost.style.top=`${e.clientY+12}px`;}});
card.addEventListener('pointerup',e=>{if(!cardDrag)return;if(cardDrag.ghost){suppressClick=true;cardDrag.ghost.remove();const r=svg.getBoundingClientRect();if(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom){const pos=point(e);add(model,pos.x,pos.y);}}cardDrag=null;});
card.addEventListener('pointercancel',()=>{cardDrag?.ghost?.remove();cardDrag=null;});$('aircraft-catalog').append(card);});
function point(event){const p=new DOMPoint(event.clientX,event.clientY);return p.matrixTransform(svg.getScreenCTM().inverse());}
function add(model,x=32.5,y=30){if(view3d)return;if(planes.length>=12){$('layout-status').textContent='Up to 12 aircraft can be compared at once. Remove one to add another.';return;}const plane={id:++serial,model,x,y,angle:180};planes.push(plane);selected=plane.id;render();}
function current(){return planes.find(p=>p.id===selected);}
function render(){const checks=assess(planes);layer.innerHTML=planes.map((plane,i)=>{const active=plane.id===selected,bad=checks[i].outside||checks[i].overlap||checks[i].obstruction;return `<g class="placed-aircraft${active?' selected':''}" data-plane="${plane.id}" transform="translate(${plane.x} ${plane.y}) rotate(${plane.angle})" tabindex="0" role="button" aria-label="${plane.model.name} ${plane.id}, ${Math.round(plane.angle)} degrees${bad?', layout conflict':''}">${aircraftMarkup(plane.model,{selected:active,conflict:bad})}<text y="${plane.model.length*.13}" text-anchor="middle" font-size="1.2" font-weight="600" fill="#142c3c" pointer-events="none">${plane.id}</text>${active?`<path d="M0 ${-plane.model.length/2}v-3" stroke="#fff" stroke-width=".18"/><circle class="rotate-handle" data-rotate="true" cy="${-plane.model.length/2-3}" r="1.25" fill="#fff" stroke="#edc34f" stroke-width=".35"/>`:''}</g>`;}).join('');
$('planner-empty').style.display=planes.length?'none':'';$('plane-count').textContent=`${planes.length} aircraft`;
const select=$('selected-plane');select.replaceChildren();if(!planes.length)select.add(new Option('No aircraft selected',''));for(const p of planes)select.add(new Option(`${p.id}. ${p.model.name}`,String(p.id)));select.value=String(selected??'');
const p=current();for(const id of ['plane-angle','rotate-left','rotate-right','remove-plane'])$(id).disabled=!p;
$('plane-angle').value=p?Math.round(p.angle):0;$('angle-value').value=`${p?Math.round(p.angle):0}°`;
const c=p?checks[planes.indexOf(p)]:null;$('selected-status').textContent=!p?'Select an aircraft to move or rotate it.':`${p.model.dimensions}${c.outside?' · Crosses hangar boundary':''}${c.overlap?' · Overlaps another footprint':''}${c.obstruction?' · Overlaps restroom':''}`;
const outside=checks.filter(c=>c.outside).length,overlap=checks.filter(c=>c.overlap).length,obstruction=checks.filter(c=>c.obstruction).length;
$('layout-status').classList.toggle('has-conflict',outside+overlap+obstruction>0);$('layout-status').textContent=!planes.length?'Your hangar is ready. Add an aircraft from the selection.':outside||overlap||obstruction?`${outside?`${outside} aircraft crossing the boundary. `:''}${overlap?`${overlap} aircraft with overlapping footprints. `:''}${obstruction?`${obstruction} aircraft overlapping the restroom.`:''}`:'All illustrated footprints are inside the hangar without overlap.';
}
svg.addEventListener('dragover',e=>{e.preventDefault();e.dataTransfer.dropEffect='copy';});svg.addEventListener('drop',e=>{e.preventDefault();const model=models.find(m=>m.id===e.dataTransfer.getData('text/plain'));if(model){const p=point(e);add(model,p.x,p.y);}});
svg.addEventListener('pointerdown',e=>{if(view3d)return;if(e.button!==0)return;const target=e.target.closest('[data-plane]');if(!target)return;const rotating=e.target.hasAttribute('data-rotate');selected=Number(target.dataset.plane);const p=current(),pos=point(e);gesture={id:e.pointerId,rotate:rotating,dx:pos.x-p.x,dy:pos.y-p.y};svg.setPointerCapture(e.pointerId);e.preventDefault();render();});
svg.addEventListener('pointermove',e=>{if(!gesture||gesture.id!==e.pointerId)return;const p=current(),pos=point(e);if(!p)return;if(gesture.rotate)p.angle=(Math.atan2(pos.y-p.y,pos.x-p.x)*180/Math.PI+90+360)%360;else{p.x=Math.max(-3,Math.min(68,pos.x-gesture.dx));p.y=Math.max(-3,Math.min(63,pos.y-gesture.dy));}render();});
function endDrag(){gesture=null;}svg.addEventListener('pointerup',endDrag);svg.addEventListener('pointercancel',endDrag);svg.addEventListener('lostpointercapture',endDrag);
svg.addEventListener('keydown',e=>{if(view3d)return;const target=e.target.closest('[data-plane]');if(!target)return;selected=Number(target.dataset.plane);const p=current();const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','r','R','Delete','Backspace','Enter',' '];if(!keys.includes(e.key))return;e.preventDefault();if(e.key==='ArrowLeft')p.x-=1;if(e.key==='ArrowRight')p.x+=1;if(e.key==='ArrowUp')p.y-=1;if(e.key==='ArrowDown')p.y+=1;if(e.key.toLowerCase()==='r')p.angle=(p.angle+(e.shiftKey?345:15))%360;if(e.key==='Delete'||e.key==='Backspace')remove();else render();layer.querySelector(`[data-plane="${selected}"]`)?.focus();});
$('selected-plane').addEventListener('change',e=>{selected=Number(e.target.value);render();});
$('plane-angle').addEventListener('input',e=>{if(current()){current().angle=Number(e.target.value);render();}});
function rotate(amount){if(current()){current().angle=(current().angle+amount+360)%360;render();}}
$('rotate-left').addEventListener('click',()=>rotate(-15));$('rotate-right').addEventListener('click',()=>rotate(15));
function remove(){planes=planes.filter(p=>p.id!==selected);selected=planes.at(-1)?.id??null;render();}
$('remove-plane').addEventListener('click',remove);$('clear-planes').addEventListener('click',()=>{planes=[];selected=null;render();});
const share=globalThis.KBOX5Share,dialog=$('share-dialog');
let previewURL=null,previewGeneration=0;
function loadSharedLayout(){
 const value=new URL(location.href).searchParams.get('layout');
 if(value===null)return false;
 try{
  const restored=share.decode(value,models);
  planes=restored;serial=restored.length;selected=null;render();
  document.title=share.title;
  requestAnimationFrame(()=>$('planner').scrollIntoView({behavior:'instant',block:'start'}));
 }catch{
  if(!planes.length)add(models[0]);
  $('layout-status').textContent='This shared layout could not be opened. You can create a new layout below.';
  $('layout-status').classList.add('has-conflict');
 }
 return true;
}
window.addEventListener('popstate',loadSharedLayout);
function previewSVG(){
 const clone=svg.cloneNode(true);
 clone.querySelectorAll('.rotate-handle').forEach(el=>{el.previousElementSibling?.remove();el.remove();});
 clone.querySelectorAll('[tabindex]').forEach(el=>el.removeAttribute('tabindex'));
 clone.setAttribute('x','560');clone.setAttribute('y','35');clone.setAttribute('width','600');clone.setAttribute('height','560');
 // The embedding script substitutes the local hero photo as a data URL.
 const hero='__SHARE_HERO_DATA__';
 return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#142b3b"/><path d="M565 40V590" stroke="#344b59"/><image href="${hero}" x="40" y="258" width="495" height="270" preserveAspectRatio="xMidYMid slice"/><g font-family="Arial,sans-serif"><text x="40" y="70" font-size="23" letter-spacing="4" fill="#edc34f">KBOX5 · KBAZ</text><text x="40" y="135" font-size="42" fill="#ffffff"><tspan x="40">Check out this</tspan><tspan x="40" dy="51">KBOX5 hangar.</tspan></text><text x="40" y="226" font-size="21" fill="#c2cfd6">65′ × 60′ · 63′ door · ${planes.length} aircraft</text><text x="40" y="555" font-size="14" letter-spacing="1.5" fill="#c2cfd6">PRIVATE HANGARS · NEW BRAUNFELS, TX</text><text x="40" y="590" font-size="14" fill="#94aab8">Architectural rendering · layout is illustrative</text></g>${clone.outerHTML}</svg>`;
}
$('share-layout').addEventListener('click',()=>{
 $('share-url').value=share.link(planes,location.href);
 $('share-note').textContent=location.protocol==='file:'?'This local link works on this computer. Publish the site and share from its web address to send a link others can open.':'The link restores this exact layout. Save the preview image to attach it to your message.';
 $('share-status').textContent='';$('download-layout').disabled=true;
 if(previewURL)URL.revokeObjectURL(previewURL);
 previewURL=URL.createObjectURL(new Blob([previewSVG()],{type:'image/svg+xml'}));
 $('share-preview').src=previewURL;
 const generation=++previewGeneration,img=new Image();
 img.onload=()=>{
  if(generation!==previewGeneration)return;
  try{const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=630;canvas.getContext('2d').drawImage(img,0,0);canvas.toBlob(blob=>{
   if(generation!==previewGeneration||!blob)return;
   URL.revokeObjectURL(previewURL);previewURL=URL.createObjectURL(blob);$('share-preview').src=previewURL;$('download-layout').disabled=false;
  },'image/png');}catch{$('share-status').textContent='Image preview could not be saved. You can still copy the layout link.';}
 };
 img.onerror=()=>{$('share-status').textContent='Image preview could not be saved. You can still copy the layout link.';};img.src=previewURL;
 dialog.showModal();
});
$('close-share').addEventListener('click',()=>dialog.close());
$('copy-layout').addEventListener('click',async()=>{
 try{await navigator.clipboard.writeText($('share-url').value);$('share-status').textContent='Layout link copied.';}
 catch{$('share-url').focus();$('share-url').select();$('share-status').textContent='Select Copy from your browser, or press Ctrl+C / ⌘C to copy the link.';}
});
$('download-layout').addEventListener('click',()=>{if(!previewURL)return;const a=document.createElement('a');a.href=previewURL;a.download='kbox5-hangar-layout.png';a.click();});
if(!loadSharedLayout())add(models[0]);

})();
