const CONTACT = { whatsapp: '525585598022', socials: [] };
const wa = message => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
document.querySelectorAll('[data-wa]').forEach(link => {
  link.href = wa(link.dataset.wa); link.target = '_blank'; link.rel = 'noopener noreferrer';
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Functional line icons: visual identifiers for the practice selector.
const icons = {
 ball:'<circle cx="32" cy="32" r="21"/><path d="M14 22c12 8 24 8 36 0M13 42c13-8 25-8 38 0M32 11c-9 14-9 28 0 42M32 11c9 14 9 28 0 42"/>',
 silks:'<path d="M23 7v15c0 13-9 20-7 28 2 9 30 9 32 0 2-8-7-15-7-28V7M23 20c1 14 17 14 18 0M16 49c11-11 21-11 32 0"/>',
 bench:'<path d="M15 29h34v7H15zM19 36l-6 20M45 36l6 20M26 29v-8h12v8M11 56h9M44 56h9"/>',
 chair:'<path d="M19 8v29h28M19 37v19M44 37v19M19 12h22v19M16 56h7M41 56h7"/>',
 whale:'<path d="M9 48c0-29 46-29 46 0ZM15 48c0-20 34-20 34 0M9 55h46"/>',
 hoop:'<circle cx="32" cy="36" r="20"/><path d="M32 4v12M19 23c-8 8-8 18-1 25"/>',
 floor:'<rect x="13" y="9" width="38" height="47" rx="4"/><path d="M18 17h28M18 48h28M27 31l5-5 5 5-5 5Z"/>',
 couple:'<circle cx="22" cy="19" r="6"/><circle cx="42" cy="19" r="6"/><path d="M10 47c0-23 24-23 24 0M30 47c0-23 24-23 24 0M10 47h44M25 35l7 5 7-5"/>'
};
const svg = name => `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
const styles = [
 {name:'Yoga con pelota',tag:'EQUILIBRIO · ESTABILIDAD',icon:'ball',text:'Explora el equilibrio y la coordinación con el apoyo de una pelota. Una forma dinámica de descubrir cómo se mueve tu cuerpo y construir confianza en cada postura.'},
 {name:'Yoga en telas',tag:'LIGEREZA · CONFIANZA',icon:'silks',text:'Descubre nuevas formas de moverte con el apoyo de telas suspendidas. Una práctica para explorar el espacio, trabajar la confianza y avanzar paso a paso con acompañamiento.'},
 {name:'Yoga en banco',tag:'FUERZA · NUEVAS PERSPECTIVAS',icon:'bench',text:'El banco es un apoyo para explorar nuevas posturas e inversiones de manera progresiva. Cada movimiento se adapta a tu experiencia y se realiza con la orientación del estudio.'},
 {name:'Yoga en silla',tag:'APOYO · MOVILIDAD',icon:'chair',text:'La silla abre otras posibilidades para tu práctica. Explora posturas, movilidad y equilibrio con un punto de apoyo que te permite concentrarte en tu propio proceso.'},
 {name:'Yoga con ballena',tag:'APERTURA · EXPLORACIÓN',icon:'whale',text:'Explora el movimiento con un soporte curvo, también conocido como ballena o whale bench. Consulta con el estudio cómo se incorpora este elemento a las clases.'},
 {name:'Yoga con aro',tag:'AIRE · EXPRESIÓN',icon:'hoop',text:'Un aro suspendido invita a explorar fuerza, coordinación y expresión corporal. Descubre esta práctica y pregunta qué clase es la adecuada para empezar.'},
 {name:'Yoga a piso',tag:'RAÍZ · CONEXIÓN',icon:'floor',text:'Vuelve a la base: tu cuerpo, tu respiración y el contacto con el suelo. Construye una práctica que conecte movimiento, atención y progreso personal.'},
 {name:'Yoga en pareja',tag:'ENCUENTRO · COMUNIDAD',icon:'couple',text:'Comparte la práctica, encuentra apoyo y construye confianza a través del movimiento en compañía. Una invitación a escuchar, colaborar y crecer juntos.'}
];
const grid = document.querySelector('#style-grid');
grid.innerHTML = styles.map((s,i)=>`<button class="style-card" data-style="${i}" aria-haspopup="dialog"><span class="style-orb">${svg(s.icon)}<span class="orb-plus">+</span></span><h3>${s.name}</h3><p>${s.tag}</p></button>`).join('');
const dialog = document.querySelector('#style-dialog');
grid.addEventListener('click', event => {
 const button = event.target.closest('[data-style]'); if (!button) return;
 const style = styles[Number(button.dataset.style)];
 document.querySelector('#dialog-title').textContent = style.name;
 document.querySelector('#dialog-description').textContent = style.text;
 document.querySelector('#dialog-symbol').innerHTML = svg(style.icon);
 const cta = document.querySelector('#dialog-cta');
 cta.href = wa(`Hola, me interesa ${style.name.toLowerCase()}. Quisiera apartar mi clase gratis. ¿Tienen disponibilidad?`);
 cta.target = '_blank'; cta.rel = 'noopener noreferrer'; dialog.showModal();
 document.body.style.overflow = 'hidden';
});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>document.body.style.overflow='');
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
const menu = document.querySelector('.menu');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');document.querySelector('#navigation').classList.toggle('open',open);});
document.querySelectorAll('#navigation a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');document.querySelector('#navigation').classList.remove('open');}));
let photo=0;
const galleryPhotos=[{cls:'group',caption:'El camino se disfruta en compañía.',label:'EL PODER DE COMPARTIR'},{cls:'silks',caption:'Una nueva forma de descubrirte.',label:'EXPLORA TU MOVIMIENTO'},{cls:'meditation',caption:'Un momento para volver a ti.',label:'HAZ ESPACIO PARA TI'}];
document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{photo=(photo+Number(button.dataset.gallery)+galleryPhotos.length)%galleryPhotos.length;const item=galleryPhotos[photo];document.querySelector('.gallery-photo').className=`gallery-photo scene ${item.cls}`;document.querySelector('.gallery-photo').setAttribute('aria-label',`Imagen conceptual: ${item.caption}`);document.querySelector('.gallery-caption p').textContent=item.caption;document.querySelector('.gallery-caption .eyebrow').textContent=item.label;document.querySelector('.gallery-count').textContent=`0${photo+1} / 03`;}));

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const journey = document.querySelector('.journey');
const hero = document.querySelector('.hero');
const layers = [...document.querySelectorAll('.hero-image')];
const chapterButtons = [...document.querySelectorAll('[data-chapter]')];
const copy = [
 ['Hay una fuerza<br>que nace <em>en ti.</em>','Un espacio para moverte, descubrirte<br>y crecer en comunidad.'],
 ['Suelta el miedo.<br><em>Encuentra tu vuelo.</em>','Descubre nuevas formas de moverte.<br>Confía en tu cuerpo, un paso a la vez.'],
 ['Otra mirada.<br><em>La misma fuerza.</em>','Cada pequeño avance abre<br>una nueva posibilidad en ti.'],
 ['Tu camino.<br><em>Nuestra comunidad.</em>','Conecta contigo y con quienes<br>también eligen seguir creciendo.']
];
let chapter=-1, queued=false;
const clamp=(n,min=0,max=1)=>Math.max(min,Math.min(max,n));
function renderJourney(){
 queued=false;
 const travel=Math.max(1,journey.offsetHeight-hero.offsetHeight);
 const progress=reduced.matches?0:clamp(-journey.getBoundingClientRect().top/travel);
 const step=progress*3.8;
 const next=Math.min(3,Math.floor(step));
 if(next!==chapter){chapter=next;document.querySelector('h1').innerHTML=copy[chapter][0];document.querySelector('.hero-description').innerHTML=copy[chapter][1];chapterButtons.forEach((b,i)=>{b.classList.toggle('active',i===chapter);b.setAttribute('aria-current',i===chapter?'step':'false');});}
 const fades=[1-clamp((step-.65)/.35),clamp((step-.65)/.35)*(1-clamp((step-1.75)/.3)),clamp((step-1.75)/.3)*(1-clamp((step-2.8)/.25)),clamp((step-2.8)/.25)*(1-clamp((step-3.25)/.35)),clamp((step-3.25)/.35)];
 layers.forEach((layer,i)=>{layer.style.opacity=fades[i];layer.style.transform=i===0?`scale(${1+progress*.28})`:i===1?`translateY(${(1-clamp((step-.65)/.35))*-90}px) scale(1.02)`:i===3?`scale(${1+clamp(step-3)*.18})`:'none';});
 const bench=layers[2];const frame=Math.min(2,Math.floor(clamp((step-2)/.65)*3));bench.style.backgroundPosition=`${frame*50}% center`;
 document.querySelector('.hero-progress').style.width=`${progress*100}%`;
}
const requestRender=()=>{if(!queued){queued=true;requestAnimationFrame(renderJourney);}};
window.addEventListener('scroll',requestRender,{passive:true});window.addEventListener('resize',requestRender);reduced.addEventListener('change',requestRender);
chapterButtons.forEach(button=>button.addEventListener('click',()=>{const p=Number(button.dataset.chapter)/3.8+.015;window.scrollTo({top:journey.offsetTop+p*(journey.offsetHeight-hero.offsetHeight),behavior:reduced.matches?'instant':'smooth'});}));
renderJourney();
