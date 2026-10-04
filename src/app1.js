/* ===== helpers ===== */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const tk=n=>'৳'+Math.round(n).toLocaleString('en-IN');
const esc=s=>String(s??'').replace(/[&<>"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
const C=id=>CREATORS.find(c=>c.id===id), B=id=>BUSINESSES.find(b=>b.id===id), O=id=>ORDERS.find(o=>o.id===id);
const first=c=>c.name.split(' ')[0];
const fmtF=n=>n>=1e6?(n/1e6).toFixed(1).replace('.0','')+'M':n>=1e3?Math.round(n/1e3)+'K':String(n);
const FEATS=[['script','Script written by creator'],['place','Product placement'],['vo','Voice-over'],['post',"Posted on creator's social media"],['raw','Raw footage included']];
function pkgs(c){const p=c.price,d=c.price>=20000?5:c.price>=9000?4:c.price<=4000?2:3;return[
 {n:'Basic',price:p,dur:15,rev:1,days:d,desc:'15-second promotional video',f:{script:false,place:true,vo:false,post:false,raw:false},rights:'3 months usage rights'},
 {n:'Standard',price:p*2,dur:30,rev:2,days:d+2,desc:'30-second promotional video',f:{script:true,place:true,vo:true,post:false,raw:false},rights:'6 months usage rights'},
 {n:'Premium',price:p*3,dur:60,rev:3,days:d+4,desc:'60-second promotional campaign',f:{script:true,place:true,vo:true,post:true,raw:true},rights:'12 months usage rights'}];}
SERVICES.forEach(s=>{const P=pkgs(C(s.c));let bi=0;P.forEach((p,i)=>{if(Math.abs(p.price-s.price)<Math.abs(P[bi].price-s.price))bi=i});s.pkg=bi;s.price=P[bi].price;s.days=P[bi].days;});
const amt=o=>pkgs(C(o.c))[o.pkg].price;

const IC={
search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',play:'<path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/>',
pause:'<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
star:'<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/>',check:'<path d="M20 6 9 17l-5-5"/>',
shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
badge:'<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',pin:'<path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
chevr:'<path d="m9 18 6-6-6-6"/>',chevl:'<path d="m15 18-6-6 6-6"/>',x:'<path d="M18 6 6 18M6 6l12 12"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',compass:'<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/>',
package:'<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',message:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
chart:'<path d="M3 3v18h18"/><path d="M7 16v-5M12 16V8M17 16V6"/>',sliders:'<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
film:'<rect x="2" y="2" width="20" height="20" rx="2.5"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/>',
mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4"/>',
camera:'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
trophy:'<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0z"/>',
smile:'<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',briefcase:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
shirt:'<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',
utensils:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
tv:'<rect x="2" y="7" width="20" height="15" rx="2"/><path d="m17 2-5 5-5-5"/>',phone:'<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
volume:'<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',plus:'<path d="M12 5v14M5 12h14"/>',arrow:'<path d="M5 12h14M12 5l7 7-7 7"/>',
eye:'<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',refresh:'<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
flag:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/>',filter:'<path d="M22 3H2l8 9.46V19l4 2v-8.54z"/>',
send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',clip:'<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
megaphone:'<path d="m3 11 18-5v12L3 14z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>',trend:'<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
scale:'<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1ZM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1ZM7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
doc:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',
video:'<path d="m16 13 5.22 3.48a.5.5 0 0 0 .78-.42V7.87a.5.5 0 0 0-.75-.43L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
id:'<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2.5"/><path d="M14 10h4M14 14h4"/>',
building:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
};
const ic=(n,cls='')=>`<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${IC[n]||''}</svg>`;
const vb=()=>`<span class="vbadge" title="Verified Creator">${ic('check')}</span>`;
const rating=(r,n)=>`<span class="rating">${ic('star')}${r.toFixed(1)}${n!=null?` <span>(${n})</span>`:''}</span>`;
const stars=n=>'★★★★★'.slice(0,n)+'☆☆☆☆☆'.slice(0,5-n);

/* ===== avatars & video thumbnails ===== */
function avSvg(L){const s=SKIN[L.k],sh=SHADE[L.k],h=L.hc,t=L.sh;
 let back='',front='',face=`<ellipse cx="50" cy="42" rx="15.5" ry="18.5" fill="${s}"/>`,body=`<path d="M12 101c3-20 18-31 38-31s35 11 38 31z" fill="${t}"/>`,neck=`<path d="M43.5 55h13v13c-3 3.5-10 3.5-13 0z" fill="${sh}"/>`;
 const shortHair=`<path d="M34.5 40c-1.5-14 6-22 16-22 10.5 0 17 7 15.5 22-2-6-5.5-9.5-9-10.5-6 2-13 2-18.5 0-2.5 2-3.5 5.5-4 10.5z" fill="${h}"/>`;
 if(L.s==='f-long'){back=`<path d="M31 44C29 22 40 15 50 15s21 7 19 29l3 30c-7-4-12-6-15-8H43c-3 2-8 4-15 8z" fill="${h}"/>`;front=`<path d="M34.5 38C36 24 45 20.5 51 21c8 .5 14 6 14.5 17-5-7.5-12-10-18.5-7-4.5 2.2-8.5 4.5-12.5 7z" fill="${h}"/>`;}
 else if(L.s==='f-bun'){back=`<circle cx="50" cy="19" r="8.5" fill="${h}"/><ellipse cx="50" cy="39" rx="17" ry="17.5" fill="${h}"/>`;front=`<path d="M34.5 39C35 26 43 22 50 22s15 4 15.5 17c-4-7-9-9.5-15.5-9.5S38.5 32 34.5 39z" fill="${h}"/>`;}
 else if(L.s==='f-hijab'){back=`<path d="M28.5 47C28.5 24 38.5 15 50 15s21.5 9 21.5 32c0 9-3 16-7 21h-29c-4-5-7-12-7-21z" fill="${h}"/>`;face=`<ellipse cx="50" cy="44" rx="12.5" ry="15.5" fill="${s}"/>`;neck='';body+=`<path d="M29 64c4 8 11 12.5 21 12.5S67 72 71 64c-5-3-11-5-21-5s-16 2-21 5z" fill="${h}"/>`;}
 else if(L.s==='m-beard'){front=shortHair+`<path d="M35 45c1 12.5 8 18 15 18s14-5.5 15-18c-3 5.5-7.5 7.5-15 7.5S38 50.5 35 45z" fill="${h}"/>`;}
 else front=shortHair;
 return `<svg viewBox="0 0 100 100" aria-hidden="true">${back}${body}${neck}${face}${front}</svg>`;}
const PH=id=>(window.PHOTOS||{})[id];
const phImg=id=>PH(id)?`<img class="ph" src="${PH(id)}" alt="" loading="lazy" onerror="this.remove()">`:'';
function av(x,sz=44,cls=''){const L=x.look||x,[a,b]=BG[L.bg];return `<span class="av ${cls}" style="width:${sz}px;height:${sz}px;background:linear-gradient(135deg,${a},${b})">${avSvg(L)}${phImg(x.id)}</span>`;}
function bizAv(b,sz=40){return `<span class="biz-av" style="background:${b.col};width:${sz}px;height:${sz}px">${b.name.replace(/[^A-Za-z ]/g,'').split(' ').map(w=>w[0]).slice(0,2).join('')}</span>`;}
function vt(c,o={}){const[a,b]=BG[c.look.bg];const brand=o.brand||BRANDS_FOR_DEMO[(+c.id.slice(1)+(o.i||0))%BRANDS_FOR_DEMO.length];const t=o.title||'';
 const act=o.still?'':`role="button" tabindex="0" aria-label="Play sample video: ${esc(t||c.name)}" data-act="play" data-c="${c.id}" data-t="${esc(t||'Sample promotional video')}" data-brand="${esc(brand)}"`;
 return `<div class="vt ${o.r||''} ${o.playing?'playing':''}" ${act} style="--a:${a};--b:${b}"><div class="vt-scene">${avSvg(c.look)}${phImg(c.id)}</div><span class="vt-prop">${esc(brand)}</span>${o.still?'':'<span class="vt-prev">PREVIEW</span>'}<span class="vt-dur">0:${String(o.dur||30).padStart(2,'0')}</span>${o.still?'':`<span class="vt-play">${ic('play')}</span>`}${t?`<div class="vt-cap">${esc(t)}${o.sub?`<small>${esc(o.sub)}</small>`:''}</div>`:''}<span class="vt-bar"><i></i></span>${o.fav?favBtn(c.id):''}</div>`;}
const favBtn=id=>`<button class="fav ${S.favs.has(id)?'on':''}" data-act="fav" data-id="${id}" aria-label="Save to favorites">${ic('heart')}</button>`;

/* ===== state ===== */
const S={role:null,favs:new Set(['c7','c3','c17']),
 f:{q:'',cat:'',city:'',lang:'',price:'',rating:0,days:'',aud:'',avail:false,sort:'rec',tab:'creators'},
 pkgSel:1,co:null,applied:new Set(),avail:true,
 bal:{avail:64800,withdrawn:[]},ver:{step:1,status:'draft',files:{}},
 vq:VERIFY_QUEUE.map(v=>({...v,st:'Pending'})),disp:DISPUTES.map(d=>({...d})),
 reviewsHidden:new Set(),thread:null,campCat:'All',myCamps:['k1'],nextId:24125,
 svcPrices:null,portfolio:6,playTimer:null,filtersOpen:false};
const USERS={biz:{name:'Bhoj Kitchen',email:'business@bitpromo.demo',label:'Business'},creator:{name:'Ayesha Rahman',email:'creator@bitpromo.demo',label:'Creator'},admin:{name:'BitPromo Admin',email:'admin@bitpromo.demo',label:'Admin'}};
const ME_BIZ='b1',ME_CRE='c1';
function userAv(sz=30){if(S.role==='creator')return av(C(ME_CRE),sz);if(S.role==='biz')return bizAv(B(ME_BIZ),sz).replace('biz-av','biz-av av');return `<span class="biz-av" style="background:var(--ink);color:var(--bg);width:${sz}px;height:${sz}px;font-size:12px">BP</span>`;}

/* ===== router ===== */
let ROUTE=(location.hash||'#home').slice(1)||'home';
function go(r){ROUTE=r;try{history.pushState(null,'','#'+r)}catch(e){}closeModal();render();window.scrollTo(0,0);}
window.addEventListener('popstate',()=>{ROUTE=(location.hash||'#home').slice(1)||'home';render();});
const PAGES={},POST={},ACT={},FORM={};
function render(){const[p,...a]=ROUTE.split('~');const fn=PAGES[p]?p:'home';
 if(fn==='dash'&&a[0]&&S.role!==a[0]&&USERS[a[0]]){S.role=a[0];setTimeout(()=>toast(`Signed in as demo ${USERS[a[0]].label.toLowerCase()} · ${USERS[a[0]].email}`),50);}
 $('#view').innerHTML=PAGES[fn](...a);renderTop(fn,a);renderBnav(fn,a);
 $('#foot').hidden=['dash','signin','join'].includes(fn);if(POST[fn])POST[fn](...a);}

/* ===== chrome ===== */
function renderTop(p,a){const u=S.role;const links=[['explore','Explore Creators'],['categories','Categories'],['how','How It Works'],['business','For Businesses'],['creators','For Creators'],['campaigns','Campaigns']];
 $('#top').innerHTML=`<div class="wrap top-in"><button class="logo" data-go="home" aria-label="BitPromo home"><span class="logo-mark">${ic('play','i-fill')}</span><span>Bit<b>Promo</b></span></button>
 <nav class="nav" aria-label="Main">${links.map(([r,l])=>`<button data-go="${r}" class="${p===r?'on':''}">${l}</button>`).join('')}</nav>
 <div class="top-right"><form class="top-search" data-form="search"><span class="muted">${ic('search')}</span><input name="q" id="top-q" placeholder="Search creators…" aria-label="Search creators"></form>
 ${u?`<button class="btn btn-ghost btn-sm" data-go="dash~${u}~home">Dashboard</button><button class="userchip" data-act="menu" aria-label="Account menu">${userAv()}<span class="gs">${USERS[u].name.split(' ')[0]}</span></button>`
 :`<button class="btn btn-ghost btn-sm" data-go="signin">Sign In</button><button class="btn btn-pri btn-sm gs" data-go="join">Get Started</button>`}
 <button class="iconbtn menu-btn" data-act="menu" aria-label="Open menu">${ic('menu')}</button></div></div>`;}
function renderBnav(p,a){const r=S.role;let items;
 if(r==='creator')items=[['dash~creator~home','Dashboard','grid'],['dash~creator~orders','Orders','package'],['dash~creator~earnings','Earnings','wallet'],['dash~creator~messages','Messages','message'],['dash~creator~settings','Profile','user']];
 else{const base=r||'biz';items=[['home','Home','home'],['explore','Explore','compass'],[`dash~${base}~orders`,'Orders','package'],[`dash~${base}~messages`,'Messages','message'],[r?`dash~${r}~home`:'signin','Profile','user']];}
 $('#bnav').innerHTML=items.map(([g,l,i])=>`<button data-go="${g}" class="${ROUTE===g||(g==='home'&&p==='home')?'on':''}">${ic(i)}${l}</button>`).join('');}
function footer(){const col=(h,items)=>`<div><h4>${h}</h4>${items.map(([l,g,act])=>`<button ${act?`data-act="${act}" data-k="${g}"`:`data-go="${g}"`}>${l}</button>`).join('')}</div>`;
 return `<div class="wrap"><div class="foot-grid"><div class="stack"><button class="logo" data-go="home"><span class="logo-mark">${ic('play','i-fill')}</span><span>Bit<b>Promo</b></span></button><p style="max-width:300px">The trusted promotional-content marketplace connecting Bangladeshi businesses with creators and public figures.</p><div class="row small">${['bKash','Nagad','Visa / Mastercard','Bank'].map(x=>`<span class="tag" style="background:transparent;color:var(--on-night-2);border-color:var(--night-line)">${x}</span>`).join('')}</div></div>
 ${col('Categories',[['Actors','actors','cat'],['Influencers','influencers','cat'],['Food Creators','food','cat'],['Comedians','comedians','cat'],['Voice Artists','voice','cat']])}
 ${col('For Businesses',[['Find a creator','explore'],['Post a campaign','campaigns'],['How it works','how'],['Why BitPromo','business'],['Business dashboard','dash~biz~home']])}
 ${col('For Creators',[['Become a creator','creators'],['Get verified','verify'],['Browse campaigns','campaigns'],['Creator dashboard','dash~creator~home']])}
 ${col('Company',[['Trust & Safety','trust'],['Sign in','signin'],['Get started','join'],['Admin console (demo)','dash~admin~overview']])}</div>
 <div class="foot-bottom"><span>© 2026 BitPromo · Interactive prototype</span><span>All creators, businesses, orders and payments shown are fictional demo data. Payment methods are simulated.</span></div></div>`;}

/* ===== shared components ===== */
function creatorCard(c,i=0){return `<article class="ccard" data-go="creator~${c.id}">${vt(c,{fav:true,i})}
 <div class="ccard-body"><div class="name">${esc(c.name)}${vb()}</div><div class="meta">${c.cats[0]} <span aria-hidden="true">·</span> ${ic('pin')}${c.city}${c.avail?'':' <span class="pill p-mute">Fully booked</span>'}</div>
 <div class="desc">${esc(c.tag)}</div><div class="row" style="gap:12px">${rating(c.rating,c.revs)}<span class="small muted">${c.orders} orders completed</span></div>
 <div class="foot"><span class="price"><small>Starting at</small><span class="price-value">${tk(c.price)}</span></span><button class="btn btn-pri btn-sm" data-go="creator~${c.id}" aria-label="View ${esc(c.name)}'s profile">View profile ${ic('arrow')}</button></div></div></article>`;}
function serviceCard(s,i=0){const c=C(s.c);return `<article class="ccard" data-go="creator~${c.id}~${s.pkg}">${vt(c,{r:'h',title:s.title,dur:pkgs(c)[s.pkg].dur,i:i+3})}
 <div class="ccard-body"><div class="row" style="gap:8px">${av(c,26)}<b class="small">${esc(c.name)}</b>${vb()}<span class="small muted" style="margin-left:auto">${s.plat}</span></div>
 <div style="font-weight:650;line-height:1.35;min-height:2.7em">${esc(s.title)}</div><div class="row" style="gap:14px">${rating(c.rating,c.revs)}<span class="small muted">${ic('clock')} ${s.days}-day delivery</span></div>
 <div class="foot"><span class="price"><small>Starting at</small><span class="price-value">${tk(s.price)}</span></span><button class="btn btn-pri btn-sm" data-go="order~${c.id}~${s.pkg}">Order ${ic('arrow')}</button></div></div></article>`;}
function campCard(k){const b=B(k.b);const ap=S.applied.has(k.id);return `<article class="card camp"><div class="row between"><div class="row" style="gap:10px">${bizAv(b,36)}<div><b style="font-size:14px">${esc(b.name)}</b><div class="small muted">${b.type}</div></div></div><span class="tag">${k.plat}</span></div>
 <h3>${esc(k.title)}</h3><p class="muted small">${esc(k.content)}</p>
 <div class="kv"><div><small>Budget</small><b class="tnum">${tk(k.budget)}</b></div><div><small>Location</small><b>${k.city}</b></div><div><small>Deadline</small><b>${k.days} days</b></div></div>
 <div class="row between"><span class="small muted">${ic('users')} ${k.apps+(ap?1:0)} applications</span>${ap?`<span class="pill p-good">Proposal sent</span>`:`<button class="btn btn-dark btn-sm" data-act="apply" data-id="${k.id}">Apply for Campaign</button>`}</div></article>`;}
function stagePill(st){const cls=st===7?'p-good':st===6?'p-warn':st<=1?'p-mute':'p-acc';return `<span class="pill ${cls}">${STAGES[st]}</span>`;}
function table(cols,rows,click){return `<div class="tbl-wrap"><table class="tbl"><thead><tr>${cols.map(c=>`<th class="${c[1]||''}">${c[0]}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr ${r.go?`class="click" data-go="${r.go}"`:''}>${r.cells.map((x,i)=>`<td class="${cols[i][1]||''}">${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
function orderRows(list,role){return list.map(o=>{const c=C(o.c),b=B(o.b);return{go:`track~${o.id}`,cells:[`<b class="tnum">${o.id}</b><div class="small muted">${esc(o.title)}</div>`,role==='creator'?`<div class="who-cell">${bizAv(b,32)}${esc(b.name)}</div>`:`<div class="who-cell">${av(c,32)}${esc(c.name)}</div>`,stagePill(o.st),`<span class="tnum">${o.due}</span>`,`<b class="tnum">${tk(role==='creator'?amt(o)*.8:amt(o))}</b>`]};});}
function barChart(data,o={}){const W=o.w||560,H=o.h||210,pl=46,pb=26,pt=22,pr=8;const mx=niceMax(Math.max(...data.map(d=>d[1])));const bw=(W-pl-pr)/data.length;let g='';
 for(let i=0;i<=4;i++){const v=mx*i/4,y=pt+(H-pt-pb)*(1-i/4);g+=`<line class="gl" x1="${pl}" x2="${W-pr}" y1="${y}" y2="${y}"/><text x="${pl-8}" y="${y+4}" text-anchor="end">${o.fmt?o.fmt(v):v}</text>`;}
 data.forEach((d,i)=>{const h=(H-pt-pb)*d[1]/mx,x=pl+i*bw+bw*.2,w=bw*.6,y=H-pb-h,last=i===data.length-1;g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" style="fill:var(--accent);opacity:${last?1:.38}"/><text x="${x+w/2}" y="${H-8}" text-anchor="middle">${d[0]}</text>${last?`<text x="${x+w/2}" y="${y-7}" text-anchor="middle" style="fill:var(--ink);font-weight:700">${o.fmt?o.fmt(d[1]):d[1]}</text>`:''}`;});
 return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.label||'Bar chart')}">${g}</svg>`;}
function niceMax(m){const p=Math.pow(10,Math.floor(Math.log10(m))),n=m/p;return(n<=2?2:n<=2.5?2.5:n<=5?5:10)*p;}
function splitBar(total){return `<div class="split" role="img" aria-label="80% creator, 20% BitPromo"><i class="c" style="width:80%"></i><i class="b" style="width:20%"></i></div><div class="legend" style="margin-top:10px"><span><i style="background:var(--good)"></i>Creator receives ${tk(total*.8)} (80%)</span><span><i style="background:var(--accent)"></i>BitPromo commission ${tk(total*.2)} (20%)</span></div>`;}
function escrowFlow(){return `<div class="flow"><div class="flow-node"><span class="fi">${ic('building')}</span><b>Business pays</b><span class="muted small">Payment is placed with BitPromo when the order starts. The creator can see it is secured.</span></div><div class="flow-arrow">${ic('arrow')}</div>
 <div class="flow-node mid"><span class="fi">${ic('shield')}</span><b>BitPromo holds &amp; checks</b><span class="muted small">We hold the payment while the video is made, then check it against the brief before you see it.</span></div><div class="flow-arrow">${ic('arrow')}</div>
 <div class="flow-node"><span class="fi">${ic('wallet')}</span><b>Creator gets paid</b><span class="muted small">Once you approve, the creator receives 80% and BitPromo keeps a 20% commission.</span></div></div>`;}

/* ===== modal, toast ===== */
function modal(html,cls=''){$('#modal-root').innerHTML=`<div class="modal" data-act="bg"><div class="modal-box ${cls}" role="dialog" aria-modal="true">${html}</div></div>`;}
function mhead(t){return `<div class="modal-head"><h3>${t}</h3><button class="iconbtn" data-act="close" aria-label="Close">${ic('x')}</button></div>`;}
function closeModal(){clearInterval(S.playTimer);$('#modal-root').innerHTML='';}
function toast(m){const t=document.createElement('div');t.className='toast';t.innerHTML=ic('check')+esc(m);$('#toasts').appendChild(t);setTimeout(()=>t.remove(),3200);}
ACT.bg=(el,e)=>{if(e.target===el)closeModal();};ACT.close=closeModal;

/* ===== HOME ===== */
PAGES.home=()=>{const hero=['c1','c7','c5','c9','c4','c3'].map(C);
 return `<section class="hero"><div class="wrap hero-in"><div>
 <span class="eyebrow" style="color:var(--accent)">Promotional videos from Bangladesh's creators</span>
 <h1 style="margin-top:14px">Turn your brand into a story <span>people remember.</span></h1>
 <p class="hero-sub">Connect with creators, actors, influencers and public figures to create authentic promotional videos for your business.</p>
 <form class="hero-search" data-form="search"><input name="q" id="hero-q" placeholder="Search creators, actors, influencers…" aria-label="Search creators"><button class="btn btn-pri" type="submit">${ic('search')}<span>Find Your Creator</span></button></form>
 <div class="hero-chips"><span class="small" style="color:var(--on-night-2)">Popular:</span>${['Restaurant promo','Instagram Reel','Product review','Eid campaign','Voice-over'].map(q=>`<button class="chip-n" data-act="q" data-q="${q}">${q}</button>`).join('')}</div>
 <div class="hero-ctas"><button class="btn btn-light btn-lg" data-go="explore">Find a Creator ${ic('arrow')}</button><button class="btn btn-outline-light btn-lg" data-go="creators">Become a Creator</button></div>
 <div class="trustrow"><span>${ic('badge')}Verified creators</span><span>${ic('lock')}Payment held until you approve</span><span>${ic('shield')}Every video quality-checked</span></div></div>
 <div class="collage" aria-label="Sample promotional videos">
 <div class="col">${vt(hero[0],{r:'v',title:'Bhoj Kitchen',sub:'Ayesha Rahman',brand:'Bhoj Kitchen',playing:true})}${vt(hero[1],{r:'v',title:'Mishti Mukh',sub:'Tahsin Ara',brand:'Mishti Mukh'})}</div>
 <div class="col">${vt(hero[2],{r:'v',title:'DeshiCha',sub:'Samiul Khan',brand:'DeshiCha'})}${vt(hero[3],{r:'v',title:'Nakshi Threads',sub:'Lamia Islam',brand:'Nakshi Threads',playing:true})}</div>
 <div class="col">${vt(hero[4],{r:'v',title:'Sobuj Homes',sub:'Arif Mahmud',brand:'Sobuj Homes'})}${vt(hero[5],{r:'v',title:'Glow Lab',sub:'Nusrat Ahmed',brand:'Glow Lab'})}</div>
 <div class="float-card" style="left:-26px;top:16%"><span class="fi" style="background:#E5F5EC;color:#108A47">${ic('check')}</span><div>Video approved<small>Bhoj Kitchen · Order BP-24117</small></div></div>
 <div class="float-card" style="right:-12px;bottom:10%;animation-delay:-2.5s"><span class="fi" style="background:#ECF1FF;color:#2453FF">${ic('wallet')}</span><div>Creator receives ৳8,000<small>on a ৳10,000 order</small></div></div></div></div>
 <div class="statband"><div class="wrap">${[['186','Verified creators'],['742','Videos delivered'],['4.9 / 5','Average order rating'],['6 cities','Dhaka to Khulna']].map(([b,s])=>`<div><b>${b}</b><span>${s}</span></div>`).join('')}</div></div></section>

 <section class="sec"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">Search</span><h2 style="margin-top:8px">Find the right face for your brand</h2><p class="muted">Filter by category, city, language and budget. Every creator lists fixed packages, so you know the price before you message anyone.</p></div></div>
 <form class="card pad hfilter" data-form="homefilter">
  <div><label class="small" for="hf-q" style="font-weight:650">Keyword</label><input class="field" id="hf-q" name="q" placeholder="e.g. food, comedy, reel"></div>
  <div><label class="small" for="hf-cat" style="font-weight:650">Category</label><select class="field" id="hf-cat" name="cat"><option value="">All</option>${CATS.map(c=>`<option value="${c.k}">${c.n}</option>`).join('')}</select></div>
  <div><label class="small" for="hf-city" style="font-weight:650">Location</label><select class="field" id="hf-city" name="city"><option value="">Anywhere</option>${['Dhaka','Chattogram','Sylhet','Rajshahi','Khulna','Cumilla'].map(x=>`<option>${x}</option>`).join('')}</select></div>
  <div><label class="small" for="hf-lang" style="font-weight:650">Language</label><select class="field" id="hf-lang" name="lang"><option value="">Any</option><option>Bangla</option><option>English</option><option>Hindi</option></select></div>
  <div><label class="small" for="hf-price" style="font-weight:650">Budget</label><select class="field" id="hf-price" name="price"><option value="">Any</option><option value="0-5000">Up to ৳5,000</option><option value="5001-10000">৳5,000–10,000</option><option value="10001-100000">৳10,000+</option></select></div>
  <button class="btn btn-pri" type="submit" style="height:44px">${ic('search')}Search</button></form>
 <div class="grid g4" style="margin-top:28px">${['c1','c7','c3','c5','c2','c13','c17','c8'].map((id,i)=>creatorCard(C(id),i)).join('')}</div>
 <div style="text-align:center;margin-top:28px"><button class="btn btn-ghost" data-go="explore">Browse all 20 creators ${ic('arrow')}</button></div></div></section>

 <section class="sec sec-alt"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">Trending creators</span><h2 style="margin-top:8px">Faces brands are booking this week</h2></div><div class="row"><button class="btn btn-ghost btn-sm" data-go="explore">See all</button></div></div>
 <div class="hscroll" style="grid-auto-columns:minmax(230px,260px)">${['c1','c2','c3','c4','c5','c6','c15','c11'].map(C).map((c,i)=>`<div class="tcard" data-go="creator~${c.id}">${vt(c,{r:'v',i,fav:true})}<div class="tcard-info"><b>${esc(c.name)} ${vb()}</b><span>${c.cats.join(' · ')}</span><div class="row">${ic('star','i-fill')}${c.rating.toFixed(1)}<span style="opacity:.85">From ${tk(c.price)}</span></div></div></div>`).join('')}</div></div></section>

 <section class="sec"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">Categories</span><h2 style="margin-top:8px">Popular categories</h2></div><button class="btn btn-ghost btn-sm" data-go="categories">All categories</button></div>
 <div class="cats">${CATS.map(catTile).join('')}</div></div></section>

 <section class="sec sec-alt"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">How BitPromo works</span><h2 style="margin-top:8px">From idea to promotional video. One platform.</h2></div><button class="btn btn-ghost btn-sm" data-go="how">Learn more</button></div>${steps4()}</div></section>

 <section class="sec sec-night"><div class="wrap"><div class="sec-head"><div><span class="eyebrow" style="color:var(--accent)">Trending promotional videos</span><h2 style="margin-top:8px">Watch what creators are making</h2><p class="muted">Real-style sample work from the marketplace. Tap any video to play it.</p></div></div>
 <div class="hscroll" style="grid-auto-columns:minmax(180px,210px)">${[['c7','Kacchi platter review','Bhoj Kitchen','184K views'],['c14','Same-day delivery','Swift Courier','1.2M views'],['c13','Night-care routine','Glow Lab','322K views'],['c5','Office tea break','DeshiCha','908K views'],['c17','Sreemangal weekend','Ghuri Travels','211K views'],['c10','Send money in 3 taps','PayDhara','145K views'],['c9','Eid edit','Nakshi Threads','276K views'],['c16','30-day challenge','FitZone Gym','98K views']].map(([id,t,br,v],i)=>vt(C(id),{r:'v',title:t,sub:`${br} · ${v}`,brand:br,dur:[15,30,45][i%3]})).join('')}</div></div></section>

 <section class="sec"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">Buy now</span><h2 style="margin-top:8px">Popular services</h2><p class="muted">Browse ready-to-order video services rather than people. Fixed scope, fixed price, fixed delivery time.</p></div><button class="btn btn-ghost btn-sm" data-act="exploreTab" data-tab="services">All 30 services</button></div>
 <div class="grid g4">${SERVICES.slice(0,8).map(serviceCard).join('')}</div></div></section>

 <section class="sec sec-alt"><div class="wrap grid g2" style="gap:24px">
 <div class="card pad" style="padding:32px;display:flex;flex-direction:column;gap:18px"><span class="eyebrow">For businesses</span><h2>Your brand deserves a face people trust.</h2>
 <div class="stack">${[['compass','Find the right creator fast','Search by category, city, language, audience size and budget.'],['doc','Brief once, clearly','A structured brief means the creator knows your product, tone and platform before filming.'],['lock','Pay only for approved work','Your payment stays with BitPromo until you approve the final video.'],['refresh','Revisions built in','Every package lists its revision count up front.']].map(([i,h,p])=>`<div class="feat"><span class="fi">${ic(i)}</span><div><h4>${h}</h4><p class="muted small">${p}</p></div></div>`).join('')}</div>
 <div class="row"><button class="btn btn-pri" data-go="explore">Find a Creator</button><button class="btn btn-ghost" data-go="business">Why businesses choose us</button></div></div>
 <div class="card pad" style="padding:32px;display:flex;flex-direction:column;gap:18px;background:var(--night);color:var(--on-night);border-color:var(--night-line)"><span class="eyebrow" style="color:var(--accent)">For creators</span><h2>Turn your influence into income.</h2>
 <p style="color:var(--on-night-2)">Set your own packages, get briefs from real businesses, and get paid through BitPromo once the buyer approves.</p>
 <div style="background:var(--night-2);border:1px solid var(--night-line);border-radius:14px;padding:18px"><div class="row between small" style="color:var(--on-night-2)"><span>Example: ৳10,000 Standard package</span><b style="color:var(--ink)">You earn ৳8,000</b></div><div style="margin-top:12px">${splitBar(10000)}</div></div>
 <ul class="checks">${['Earn from your audience','Set your own prices','Manage orders, messages and payouts in one place','Get protected from out-of-scope changes'].map(x=>`<li>${ic('check')}${x}</li>`).join('')}</ul>
 <div class="row"><button class="btn btn-light" data-go="creators">Become a Creator</button><button class="btn btn-outline-light" data-go="dash~creator~home">See creator dashboard</button></div></div></div></section>

 <section class="sec"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">Trust &amp; safety</span><h2 style="margin-top:8px">We don't just connect. We protect the deal.</h2><p class="muted">BitPromo sits between the business and the creator, holding payment and checking every delivery against the brief.</p></div><button class="btn btn-ghost btn-sm" data-go="trust">Trust &amp; Safety</button></div>
 ${escrowFlow()}<div class="grid g3" style="margin-top:28px">${TRUST6.map(([i,h,p])=>`<div class="feat"><span class="fi">${ic(i)}</span><div><h4>${h}</h4><p class="muted small">${p}</p></div></div>`).join('')}</div></div></section>

 <section class="sec sec-alt"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">Campaigns</span><h2 style="margin-top:8px">Or post a campaign and let creators come to you</h2><p class="muted">Publish your budget and brief. Verified creators send proposals, you pick the best one.</p></div><div class="row"><button class="btn btn-ghost btn-sm" data-go="campaigns">Browse campaigns</button><button class="btn btn-dark btn-sm" data-act="postCamp">Post a campaign</button></div></div>
 <div class="grid g3">${CAMPAIGNS.slice(0,3).map(campCard).join('')}</div></div></section>

 <section class="sec"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">Testimonials</span><h2 style="margin-top:8px">Businesses that found their face</h2></div></div>
 <div class="grid g3">${[['b1','Our Friday family platter sold out two weekends in a row after Ayesha’s video. The brief form made it easy to explain exactly what we wanted.','Shafiq Rahman, Owner'],['b3','We needed an explainer that felt human, not corporate. The quality check caught a wrong promo code before it went live.','Mahbuba Karim, Growth Lead'],['b6','Posted a campaign, got 15 proposals in two days and hired a travel creator from Sylhet who knew the area.','Rezaul Huq, Marketing Manager']].map(([b,q,who])=>`<figure class="card quote" style="margin:0"><div class="stars">★★★★★</div><p>“${q}”</p><figcaption class="row" style="gap:10px">${bizAv(B(b),38)}<div><b style="font-size:14px">${who}</b><div class="small muted">${B(b).name}</div></div></figcaption></figure>`).join('')}</div></div></section>

 <section class="sec sec-alt"><div class="wrap" style="max-width:880px"><div class="sec-head"><div><span class="eyebrow">FAQ</span><h2 style="margin-top:8px">Questions businesses ask</h2></div></div><div class="faq">${FAQ.map(([q,a],i)=>`<details ${i===0?'open':''}><summary>${q}${ic('plus')}</summary><p>${a}</p></details>`).join('')}</div></div></section>

 <section class="sec"><div class="wrap"><div class="final"><h2 style="font-size:clamp(28px,4vw,46px)">Ready to put your brand in the spotlight?</h2><p style="color:var(--on-night-2);margin-top:12px;font-size:17px">Find the creator. Create the content. Grow your brand.</p><div class="row" style="justify-content:center;margin-top:26px"><button class="btn btn-light btn-lg" data-go="explore">Find a Creator</button><button class="btn btn-outline-light btn-lg" data-go="creators">Become a Creator</button></div></div></div></section>`;};
const TRUST6=[['badge','Verified creators','Creators pass an approval process before they can sell.'],['doc','Clear requirements','Businesses submit a structured brief with platform, tone and deadline.'],['eye','Content review','Submitted videos are checked against the agreed requirements.'],['lock','Secure transactions','BitPromo manages the payment flow from order to payout.'],['scale','Dispute support','A structured, documented process when an order goes wrong.'],['shield','Creator protection','Creators are protected from changes outside the agreed scope.']];
const FAQ=[['How does BitPromo protect my payment?','When you place an order, your payment is held through BitPromo’s marketplace process. The creator is paid only after the video passes our quality check and you approve it, or after the agreed conditions are met.'],
 ['What does the 20% commission mean for me as a business?','You pay the package price shown on the creator’s profile. BitPromo’s 20% commission is taken from the creator’s earnings, so a ৳10,000 package costs you ৳10,000.'],
 ['What if the video does not match my brief?','Each package includes a set number of revisions. If the delivery still doesn’t match the agreed brief, you can open a dispute and BitPromo reviews the order documentation.'],
 ['Can I use the video in paid ads?','Each package lists its usage rights (for example 6 months for Standard). Premium packages include longer usage and raw footage.'],
 ['Which payment methods can I use?','The checkout is designed for bKash, Nagad, cards and bank transfer. In this prototype, payments are simulated.'],
 ['What does “Verified Creator” mean?','It means the creator completed BitPromo’s verification steps: identity documents, social profile checks and a portfolio review. It is a platform status, not an endorsement of the person.']];
function catTile(c){const n=CREATORS.filter(x=>x.cats.some(y=>c.m.includes(y))).length;return `<button class="cat" data-act="cat" data-k="${c.k}"><span class="ci">${ic(c.ic)}</span><b>${c.n}</b><small>${n} creator${n===1?'':'s'}</small></button>`;}
function steps4(){return `<div class="steps4">${[['Discover','Find the creator who fits your brand, audience and budget.'],['Brief','Tell the creator exactly what you need with a structured brief.'],['Create','The creator produces your video. BitPromo checks it against the brief.'],['Approve','Review the video, request a revision or approve to complete the order.']].map(([h,p],i)=>`<div class="step"><span class="n">0${i+1}</span><h3>${h}</h3><p class="muted">${p}</p></div>`).join('')}</div>`;}

/* ===== EXPLORE ===== */
function filtered(){const f=S.f;let r=CREATORS.filter(c=>{
 if(f.q){const hay=(c.name+' '+c.cats.join(' ')+' '+c.tag+' '+c.city+' '+SERVICES.filter(s=>s.c===c.id).map(s=>s.title).join(' ')).toLowerCase();if(!f.q.toLowerCase().split(/\s+/).filter(Boolean).every(w=>hay.includes(w.replace(/s$/,''))))return false;}
 if(f.cat){const k=CATS.find(x=>x.k===f.cat);if(k&&!c.cats.some(x=>k.m.includes(x)))return false;}
 if(f.city&&c.city!==f.city)return false;if(f.lang&&!c.langs.includes(f.lang))return false;
 if(f.price){const[lo,hi]=f.price.split('-').map(Number);if(c.price<lo||c.price>hi)return false;}
 if(f.rating&&c.rating<f.rating)return false;if(f.days&&pkgs(c)[0].days>+f.days)return false;
 if(f.aud){const[lo,hi]=f.aud.split('-').map(Number);if(c.followers<lo||c.followers>hi)return false;}
 if(f.avail&&!c.avail)return false;return true;});
 const so={rec:(a,b)=>b.orders*b.rating-a.orders*a.rating,rating:(a,b)=>b.rating-a.rating||b.revs-a.revs,low:(a,b)=>a.price-b.price,high:(a,b)=>b.price-a.price,orders:(a,b)=>b.orders-a.orders}[f.sort];return r.sort(so);}
PAGES.explore=(cat)=>{if(cat&&CATS.find(x=>x.k===cat)){S.f.cat=cat;}const f=S.f;const sel=(id,key,opts)=>`<select class="field" id="${id}" data-f="${key}">${opts.map(([v,l])=>`<option value="${v}" ${String(f[key])===String(v)?'selected':''}>${l}</option>`).join('')}</select>`;
 return `<div class="phead"><div class="wrap"><div class="crumbs"><button data-go="home">Home</button>${ic('chevr')}<span>Explore</span></div><div class="row between"><div><h1 style="font-size:clamp(28px,3.4vw,40px)">${f.cat?CATS.find(x=>x.k===f.cat).n:'Explore creators'}</h1><p class="muted" style="margin-top:6px">Verified creators and ready-to-order promotional video services.</p></div>
 <div class="top-search" style="display:flex;min-width:0;width:min(420px,100%);background:var(--surface)"><span class="muted">${ic('search')}</span><input id="ex-q" data-f="q" value="${esc(f.q)}" placeholder="Search creators, actors, influencers…" aria-label="Search" style="width:100%"></div></div></div></div>
 <div class="wrap explore"><aside class="filters ${S.filtersOpen?'open':''}" id="filters" aria-label="Filters">
  <div><label class="fl" for="f-cat">Category</label>${sel('f-cat','cat',[['','All categories'],...CATS.map(c=>[c.k,c.n])])}</div>
  <div><label class="fl" for="f-city">Location</label>${sel('f-city','city',[['','Anywhere in Bangladesh'],...['Dhaka','Chattogram','Sylhet','Rajshahi','Khulna','Cumilla'].map(x=>[x,x])])}</div>
  <div><label class="fl" for="f-lang">Language</label>${sel('f-lang','lang',[['','Any language'],['Bangla','Bangla'],['English','English'],['Hindi','Hindi']])}</div>
  <div><label class="fl" for="f-price">Starting price</label>${sel('f-price','price',[['','Any price'],['0-5000','Up to ৳5,000'],['5001-10000','৳5,001 – ৳10,000'],['10001-200000','Above ৳10,000']])}</div>
  <div><span class="fl">Rating</span><div class="chips">${[[0,'Any'],[4.7,'4.7+'],[4.8,'4.8+'],[4.9,'4.9+']].map(([v,l])=>`<button class="chipt ${f.rating==v?'on':''}" data-act="fset" data-k="rating" data-v="${v}">${l}</button>`).join('')}</div></div>
  <div><label class="fl" for="f-days">Delivery time</label>${sel('f-days','days',[['','Any time'],['2','Up to 2 days'],['3','Up to 3 days'],['5','Up to 5 days']])}</div>
  <div><label class="fl" for="f-aud">Audience size</label>${sel('f-aud','aud',[['','Any size'],['0-300000','Under 300K'],['300000-1000000','300K – 1M'],['1000000-99000000','1M+']])}</div>
  <div class="row between"><span style="font-weight:650">Available now</span><button class="switch ${f.avail?'on':''}" data-act="fset" data-k="avail" data-v="${!f.avail}" aria-label="Only show available creators" aria-pressed="${f.avail}"></button></div>
  <button class="btn btn-ghost btn-sm" data-act="clearF">Clear all filters</button></aside>
 <div style="min-width:0"><div class="tabs" role="tablist">${[['creators','Creators'],['services','Services']].map(([k,l])=>`<button role="tab" class="${f.tab===k?'on':''}" data-act="exploreTab" data-tab="${k}">${l}</button>`).join('')}<button data-go="campaigns">Campaigns</button></div>
 <div class="row between" style="margin-bottom:18px"><span class="muted" id="count"></span><div class="row"><button class="btn btn-ghost btn-sm filters-toggle" data-act="toggleF">${ic('filter')}Filters</button><label class="small muted" for="f-sort">Sort</label>${sel('f-sort','sort',[['rec','Recommended'],['rating','Highest rated'],['orders','Most orders'],['low','Price: low to high'],['high','Price: high to low']])}</div></div>
 <div id="results"></div></div></div>`;};
POST.explore=()=>renderResults();
function renderResults(){const el=$('#results');if(!el)return;const list=filtered();
 if(S.f.tab==='services'){const ids=new Set(list.map(c=>c.id));const sv=SERVICES.filter(s=>ids.has(s.c)&&(!S.f.q||true));$('#count').textContent=`${sv.length} services`;el.innerHTML=sv.length?`<div class="grid g3">${sv.map(serviceCard).join('')}</div>`:emptyRes();return;}
 $('#count').textContent=`${list.length} creator${list.length===1?'':'s'} found`;el.innerHTML=list.length?`<div class="grid g3">${list.map(creatorCard).join('')}</div>`:emptyRes();}
const emptyRes=()=>`<div class="empty"><h3 style="color:var(--ink)">No creators match these filters</h3><p style="margin:8px 0 16px">Try a wider budget or another city.</p><button class="btn btn-ghost btn-sm" data-act="clearF">Clear filters</button></div>`;
ACT.fset=el=>{let v=el.dataset.v;S.f[el.dataset.k]=v==='true'?true:v==='false'?false:isNaN(+v)?v:+v;render();};
ACT.clearF=()=>{Object.assign(S.f,{q:'',cat:'',city:'',lang:'',price:'',rating:0,days:'',aud:'',avail:false});if(ROUTE!=='explore')go('explore');else render();};
ACT.toggleF=()=>{S.filtersOpen=!S.filtersOpen;$('#filters').classList.toggle('open',S.filtersOpen);};
ACT.exploreTab=el=>{S.f.tab=el.dataset.tab;if(!ROUTE.startsWith('explore'))go('explore');else render();};
ACT.cat=el=>{Object.assign(S.f,{q:'',cat:el.dataset.k,city:'',lang:'',price:'',rating:0,days:'',aud:'',avail:false,tab:'creators'});go('explore');};
ACT.q=el=>{Object.assign(S.f,{q:el.dataset.q,cat:'',tab:'creators'});go('explore');};
FORM.search=f=>{S.f.q=f.q.value.trim();S.f.cat='';S.f.tab='creators';go('explore');};
FORM.homefilter=f=>{Object.assign(S.f,{q:f.q.value.trim(),cat:f.cat.value,city:f.city.value,lang:f.lang.value,price:f.price.value,tab:'creators'});go('explore');};
document.addEventListener('input',e=>{const k=e.target.dataset&&e.target.dataset.f;if(!k)return;S.f[k]=e.target.value;if(k==='cat'){const h=$('.phead h1');if(h)h.textContent=S.f.cat?CATS.find(x=>x.k===S.f.cat).n:'Explore creators';}renderResults();});

/* ===== CATEGORIES ===== */
PAGES.categories=()=>`<div class="phead"><div class="wrap"><div class="crumbs"><button data-go="home">Home</button>${ic('chevr')}<span>Categories</span></div><h1 style="font-size:clamp(28px,3.4vw,40px)">Creator categories</h1><p class="muted" style="margin-top:6px">From screen actors to voice artists. Pick a category to see who is available.</p></div></div>
 <div class="wrap sec" style="padding-top:32px"><div class="cats">${CATS.map(catTile).join('')}</div>
 <div class="stack" style="margin-top:44px;gap:40px">${CATS.slice(0,6).map(k=>{const list=CREATORS.filter(x=>x.cats.some(y=>k.m.includes(y))).slice(0,4);return list.length?`<div><div class="row between" style="margin-bottom:16px"><h2 style="font-size:24px">${k.n}</h2><button class="btn-link" data-act="cat" data-k="${k.k}">See all ${ic('arrow')}</button></div><div class="grid g4">${list.map(creatorCard).join('')}</div></div>`:''}).join('')}</div></div>`;

/* ===== CREATOR PROFILE ===== */
PAGES.creator=(id,p)=>{const c=C(id)||C('c1');if(p!=null&&p!=='')S.pkgSel=+p;const P=pkgs(c);const revs=REVIEWS.filter(r=>r.c===c.id);
 const extra=[{b:'b5',stars:5,text:'Very easy to work with. Delivered exactly what our brief described.',date:'Sep 10'},{b:'b7',stars:5,text:'Great energy on camera and very punctual with the deadline.',date:'Aug 28'}];
 const showRevs=(revs.length?revs:extra).slice(0,4);
 const port=['Restaurant promo','Product review','Eid campaign','Brand intro','Instagram Reel','Testimonial'];
 return `<div class="phead" style="padding-block:20px"><div class="wrap"><div class="crumbs" style="margin:0"><button data-go="home">Home</button>${ic('chevr')}<button data-go="explore">Explore</button>${ic('chevr')}<span>${esc(c.name)}</span></div></div></div>
 <div class="wrap prof"><div class="stack" style="gap:28px;min-width:0">
 <div class="prof-head">${av(c,120)}<div class="stack" style="gap:10px;min-width:0"><div class="row"><h1>${esc(c.name)}</h1><span class="verified-chip">${vb()}Verified Creator</span></div>
  <div style="font-weight:600;color:var(--ink-2)">${c.cats.join(' • ')}</div>
  <div class="row small muted" style="gap:16px"><span>${ic('pin')} ${c.city}, Bangladesh</span><span>${ic('globe')} ${c.langs.join(', ')}</span><span>${ic('clock')} Replies in ~${c.resp}</span></div>
  <div class="row" style="gap:14px"><span class="stars" aria-label="${c.rating} out of 5">★★★★★</span><b>${c.rating.toFixed(1)}</b><span class="muted small">${c.revs} reviews · ${c.orders} completed orders</span>${c.avail?'<span class="pill p-good">Available</span>':'<span class="pill p-mute">Fully booked</span>'}</div>
  <div class="row"><button class="btn btn-ghost btn-sm" data-act="contact" data-id="${c.id}">${ic('message')}Contact Creator</button><button class="btn btn-ghost btn-sm" data-act="favP" data-id="${c.id}">${ic('heart')}${S.favs.has(c.id)?'Saved':'Save'}</button></div></div></div>
 <div class="kpis"><div><b>${fmtF(c.followers)}</b><span>Total followers</span></div><div><b>${c.eng}</b><span>Avg. engagement</span></div><div><b>${c.orders}</b><span>Orders completed</span></div><div><b>98%</b><span>On-time delivery</span></div></div>
 <section><h2 style="font-size:22px;margin-bottom:10px">About</h2><p style="max-width:680px;color:var(--ink-2)">${esc(c.tag)} ${first(c)} has worked with restaurants, fashion labels and startups across Bangladesh, and is known for natural delivery, quick turnaround and scripts that sound like real conversation. All videos are shot in HD with professional lighting and sound, and every delivery goes through BitPromo’s quality check before you see it.</p></section>
 <section><div class="row between" style="margin-bottom:14px"><h2 style="font-size:22px">Portfolio</h2><span class="small muted">Tap a video to play</span></div><div class="port">${port.map((t,i)=>vt(c,{r:'v',title:t,i:i,dur:[15,30,60,30,15,45][i]})).join('')}</div></section>
 <section class="card pad"><h3 style="margin-bottom:16px">Audience</h3><div class="grid g2" style="gap:28px"><div class="bars">${Object.entries(c.plat).map(([k,v])=>`<div class="bar-row"><span>${k}</span><div class="bar-track"><i style="width:${v}%"></i></div><span class="tnum small muted">${v}%</span></div>`).join('')}</div>
  <div class="bars">${[['Age 18–24',34],['Age 25–34',41],['Age 35–44',17],['Age 45+',8]].map(([k,v])=>`<div class="bar-row"><span>${k}</span><div class="bar-track"><i style="width:${v}%;background:var(--good)"></i></div><span class="tnum small muted">${v}%</span></div>`).join('')}</div></div><p class="small muted" style="margin-top:14px">Top cities: Dhaka 52% · Chattogram 18% · Sylhet 9% · Others 21%. Figures shown by the creator and checked at verification.</p></section>
 <section><div class="row between" style="margin-bottom:6px"><h2 style="font-size:22px">Reviews</h2><span class="rating">${ic('star')}${c.rating.toFixed(1)} <span>· ${c.revs} reviews</span></span></div>${showRevs.map(r=>reviewItem(r)).join('')}</section></div>
 <aside class="card pkg" id="pkg">${pkgCard(c)}</aside></div>`;};
function reviewItem(r){const b=B(r.b);return `<div class="review">${bizAv(b)}<div class="grow"><div class="row between"><b>${esc(b.name)}</b><span class="small muted">${r.date||''}</span></div><div class="stars">${stars(r.stars)}</div><p style="margin-top:6px;color:var(--ink-2)">${esc(r.text)}</p></div></div>`;}
function pkgCard(c){const P=pkgs(c),p=P[S.pkgSel];return `<div class="pkg-tabs" role="tablist">${P.map((x,i)=>`<button role="tab" class="${i===S.pkgSel?'on':''}" data-act="pkgTab" data-i="${i}" data-c="${c.id}">${x.n}</button>`).join('')}</div>
 <div class="pkg-body"><div class="row between"><b style="font-size:17px">${p.desc}</b></div><div class="pkg-price">${tk(p.price)}</div>
 <div class="row small" style="gap:16px;font-weight:650"><span>${ic('clock')} ${p.days}-day delivery</span><span>${ic('refresh')} ${p.rev} revision${p.rev>1?'s':''}</span><span>${ic('video')} ${p.dur} sec</span></div>
 <ul class="checks">${FEATS.map(([k,l])=>`<li class="${p.f[k]?'':'no'}">${ic(p.f[k]?'check':'x')}${l}</li>`).join('')}<li>${ic('check')}${p.rights}</li></ul>
 <button class="btn btn-pri btn-lg btn-block" data-go="order~${c.id}~${S.pkgSel}" ${c.avail?'':'disabled style="opacity:.5;cursor:not-allowed"'}>Order Now · ${tk(p.price)}</button>
 <button class="btn btn-ghost btn-block" data-act="contact" data-id="${c.id}">Contact Creator</button>
 <div class="protect">${ic('lock')}<span>Your payment is held by BitPromo and released to ${first(c)} only after you approve the video.</span></div></div>`;}
ACT.pkgTab=el=>{S.pkgSel=+el.dataset.i;$('#pkg').innerHTML=pkgCard(C(el.dataset.c));};
ACT.fav=el=>{const id=el.dataset.id;if(S.favs.has(id)){S.favs.delete(id);toast('Removed from favorites');}else{S.favs.add(id);toast(`${C(id).name} saved to favorites`);}$$(`.fav[data-id="${id}"]`).forEach(b=>b.classList.toggle('on',S.favs.has(id)));};
ACT.favP=el=>{ACT.fav(el);render();};

/* ===== video player ===== */
ACT.play=el=>{const c=C(el.dataset.c),t=el.dataset.t,brand=el.dataset.brand;const lines=[`Hi everyone, I'm ${c.name}!`,`Have you tried ${brand} yet?`,`I've been using it for a week. Honestly? I love it.`,`${brand}. Made for people like you.`,`Order today. Link in the description!`];
 modal(`<div class="player"><div class="player-stage">${vt(c,{r:'v',brand,playing:true,still:true,dur:30})}<div class="subs"><span id="sub">${esc(lines[0])}</span></div><div class="pctl"><button data-act="pp" aria-label="Pause" id="ppb">${ic('pause')}</button><div class="trk"><i id="trk"></i></div><span class="small tnum" id="ptime">0:00 / 0:30</span></div></div>
 <div class="player-side"><div class="row between"><span class="tag tag-acc">Sample promotional video</span><button class="iconbtn" data-act="close" aria-label="Close">${ic('x')}</button></div>
 <h2 style="font-size:26px">${esc(t)}</h2><div class="row">${av(c,44)}<div><b>${esc(c.name)} ${vb()}</b><div class="small muted">${c.cats.join(' · ')} · ${c.city}</div></div></div>
 <div class="row" style="gap:8px"><span class="tag">${ic('video')} 30 sec</span><span class="tag">9:16 vertical</span><span class="tag">For ${esc(brand)}</span></div>
 <p class="muted small">This is a demo playback for the prototype. In the live product, creator portfolio videos stream here.</p>
 <div class="stack" style="margin-top:auto"><button class="btn btn-pri btn-block" data-go="order~${c.id}~1">Order a similar video · ${tk(c.price*2)}</button><button class="btn btn-ghost btn-block" data-go="creator~${c.id}">View ${first(c)}'s profile</button></div></div></div>`,'wide');
 let s=0,playing=true;S.pp=()=>{playing=!playing;$('#ppb').innerHTML=ic(playing?'pause':'play');$('.player-stage .vt').classList.toggle('playing',playing);};
 S.playTimer=setInterval(()=>{if(!playing)return;s=(s+1)%31;const tr=$('#trk');if(!tr){clearInterval(S.playTimer);return;}tr.style.width=(s/30*100)+'%';$('#ptime').textContent=`0:${String(s).padStart(2,'0')} / 0:30`;$('#sub').textContent=lines[Math.min(4,Math.floor(s/6))];},1000);};
ACT.pp=()=>S.pp&&S.pp();
