/* ===== demo guide: a floating checklist so a reviewer can walk every flow without getting lost ===== */
// route, title, what to look at, [role to switch to first]
const TOUR=[
 ['Business journey',[
  ['home','Home page','The pitch: search, featured creators and how payment protection works'],
  ['explore','Find a creator','Filter by category, city, language and budget'],
  ['creator~c1','Creator profile','Portfolio, audience, reviews and fixed-price packages'],
  ['order~c1~1','Order a video','5-step checkout: package, brief, files, delivery and a simulated payment'],
  ['track~BP-24117','Review & approve','Watch the draft, then approve it to release payment','biz'],
  ['dash~biz~home','Business dashboard','Orders, campaigns, payments and messages in one place']]],
 ['Creator journey',[
  ['dash~creator~home','Creator dashboard','New order requests, earnings and deadlines'],
  ['dash~creator~earnings','Earnings & payouts','The 80/20 split and withdrawals to bKash or bank'],
  ['verify','Get verified','Step-by-step creator verification']]],
 ['BitPromo admin',[
  ['dash~admin~overview','Admin overview','Marketplace revenue, commission and activity'],
  ['dash~admin~verification','Approve creators','Review new creator applications'],
  ['dash~admin~disputes','Resolve disputes','Step in when an order goes wrong']]]];
const TSTEPS=TOUR.flatMap(([,items])=>items);
// progress is a per-browser convenience; the guide works the same if storage is blocked
const store={get:k=>{try{return localStorage.getItem(k);}catch(e){return null;}},set:(k,v)=>{try{localStorage.setItem(k,v);}catch(e){}}};
const GD={open:false,pulse:false,seen:new Set()};
try{JSON.parse(store.get('bp-tour')||'[]').forEach(r=>GD.seen.add(r));}catch(e){}

function guideHTML(){const n=TSTEPS.filter(s=>GD.seen.has(s[0])).length,total=TSTEPS.length,next=TSTEPS.find(s=>!GD.seen.has(s[0]));let k=0;
 const role=s=>s[3]?`data-role="${s[3]}"`:'';
 return `<div class="guide-panel" id="guide-panel" role="dialog" aria-label="Demo guide" ${GD.open?'':'hidden'}>
 <div class="guide-head"><div><b>Demo guide</b><p>A clickable prototype of BitPromo. Follow the steps to see every part of the product.</p></div><button class="iconbtn" data-act="tour" aria-label="Close demo guide">${ic('x')}</button></div>
 <div class="guide-prog"><div class="guide-bar"><i style="width:${n/total*100}%"></i></div><span>${n} of ${total} viewed</span></div>
 <div class="guide-list">${TOUR.map(([h,items])=>`<div class="guide-grp"><small>${h}</small>${items.map(s=>{k++;const done=GD.seen.has(s[0]),here=ROUTE===s[0];
  return `<button class="guide-step ${done?'done':''} ${here?'here':''}" data-act="tourGo" data-r="${s[0]}" ${role(s)}><span class="guide-dot">${done?ic('check'):k}</span><span class="grow"><b>${s[1]}${here?'<em>You are here</em>':''}</b><span>${s[2]}</span></span>${ic('chevr')}</button>`;}).join('')}</div>`).join('')}</div>
 <div class="guide-foot">${next?`<button class="btn btn-pri btn-block" data-act="tourGo" data-r="${next[0]}" ${role(next)}>Next: ${next[1]} ${ic('arrow')}</button>`:`<div class="protect">${ic('check')}<span>You’ve seen every part of the prototype.</span></div>`}
 <p class="small muted">All people, brands, orders and payments are fictional. Payments are simulated.${n?` <button class="btn-link small" data-act="tourReset">Reset progress</button>`:''}</p></div></div>
 <button class="guide-btn ${GD.pulse?'pulse':''}" data-act="tour" aria-expanded="${GD.open}" aria-controls="guide-panel">${ic('compass')}<span class="gl">Demo guide</span><span class="guide-n">${n}/${total}</span></button>`;}

// called from render(): tick off the page being viewed and redraw
function guideSync(){if(TSTEPS.some(s=>s[0]===ROUTE)&&!GD.seen.has(ROUTE)){GD.seen.add(ROUTE);store.set('bp-tour',JSON.stringify([...GD.seen]));}
 const el=$('#guide');if(el)el.innerHTML=guideHTML();}
function guideOpen(v){GD.open=v;GD.pulse=false;store.set('bp-tour-intro','1');guideSync();
 if(v&&window.gsap&&!matchMedia('(prefers-reduced-motion: reduce)').matches)gsap.from('#guide-panel',{y:16,opacity:0,scale:.97,transformOrigin:'100% 100%',duration:.35,ease:'power3.out'});}
ACT.tour=()=>guideOpen(!GD.open);
ACT.tourGo=el=>{GD.open=false;store.set('bp-tour-intro','1');if(el.dataset.role)S.role=el.dataset.role;go(el.dataset.r);};
ACT.tourReset=()=>{GD.seen.clear();store.set('bp-tour','[]');guideSync();};
// capture phase, so this runs before an action re-renders the guide and detaches the clicked node
document.addEventListener('click',e=>{if(GD.open&&!e.target.closest('#guide'))guideOpen(false);},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&GD.open)guideOpen(false);});
// first visit: open the guide on larger screens, just pulse the button on phones
function guideWelcome(){if(store.get('bp-tour-intro'))return;
 if(innerWidth>760)setTimeout(()=>{if(!GD.open&&!$('#modal-root').children.length)guideOpen(true);},1600);
 else{GD.pulse=true;guideSync();}}
