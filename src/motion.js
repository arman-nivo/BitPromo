/* ===== motion (GSAP + ScrollTrigger, inlined from vendor/) =====
   Progressive enhancement: every page renders complete without this. Nothing animates when GSAP
   is missing or the viewer prefers reduced motion. render() calls MO.page(); the explore list calls MO.list(). */
const MO=(()=>{const G=window.gsap,ST=window.ScrollTrigger;
 const on=!!(G&&ST)&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(on){G.registerPlugin(ST);G.defaults({ease:'power3.out',duration:.7});}
 const FADE='transform,opacity';
 // blocks that fade up as they scroll into view (only the outermost match animates)
 const REVEAL='.sec-head,.hfilter,.ccard,.tcard,.cat,.step,.feat,.quote,.camp,.faq details,.final,.flow-node,.flow-arrow,.card,.port>.vt,.prof-head,.kpis,.empty,.pkg-opt,.drop,.vstep';
 let last=null,ctx=null,listSig='';
 const outermost=els=>els.filter(el=>!els.some(p=>p!==el&&p.contains(el)));

 // hero headline: words rise out of a mask, then the original markup is restored
 function splitWords(el){const html=el.innerHTML;
  const walk=n=>[...n.childNodes].forEach(c=>{if(c.nodeType===1){walk(c);return;}if(c.nodeType!==3)return;const f=document.createDocumentFragment();
   c.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w)){f.append(w);return;}const o=document.createElement('span'),i=document.createElement('span');o.className='w';i.className='wi';i.textContent=w;o.append(i);f.append(o);});c.replaceWith(f);});
  walk(el);return{words:el.querySelectorAll('.wi'),revert:()=>{el.innerHTML=html;}};}

 function heroIntro(hero){const copy=hero.querySelector('.hero-in > div');if(!copy)return;const h1=copy.querySelector('h1'),kids=[...copy.children];
  const before=h1?kids.slice(0,kids.indexOf(h1)):[],after=h1?kids.slice(kids.indexOf(h1)+1):kids;
  const tl=G.timeline();if(before.length)tl.from(before,{y:12,opacity:0,duration:.5,clearProps:FADE});
  if(h1){const sp=splitWords(h1);tl.from(sp.words,{yPercent:115,duration:.95,stagger:.045,ease:'power4.out',onComplete:sp.revert},'-=.25');}
  if(after.length)tl.from(after,{y:18,opacity:0,stagger:.08,duration:.6,clearProps:FADE},'-=.6');
  const tiles=hero.querySelectorAll('.collage .vt');
  if(tiles.length)tl.from(tiles,{y:44,opacity:0,scale:.94,duration:1,stagger:{each:.08,from:'center'},clearProps:FADE},.2);
  const cards=hero.querySelectorAll('.float-card');
  if(cards.length){tl.from(cards,{scale:.6,opacity:0,y:12,duration:.6,ease:'back.out(1.8)',stagger:.25},'-=.35');
   tl.add(()=>G.to(cards,{y:-7,duration:2.4,ease:'sine.inOut',yoyo:true,repeat:-1,stagger:1.2}));}}

 // headers of inner pages, dashboards and sign-in
 function intro(){const ph=document.querySelector('#view .phead .wrap');if(ph)G.from(ph.children,{y:14,opacity:0,duration:.55,stagger:.07,clearProps:FADE});
  const dm=document.querySelector('#view .dmain');if(dm&&dm.firstElementChild)G.from(dm.firstElementChild,{y:12,opacity:0,duration:.5,clearProps:FADE});
  const af=document.querySelector('#view .auth-form');if(af)G.from(af.children,{y:16,opacity:0,stagger:.05,duration:.5,clearProps:FADE});}

 function reveals(){let els=[...document.querySelectorAll('#view '+REVEAL.split(',').join(',#view '))];
  els=outermost(els.filter(el=>!el.closest('.hero,.side,.auth-form')&&el.offsetParent!==null));if(!els.length)return;
  G.set(els,{opacity:0,y:26});
  ST.batch(els,{start:'top 92%',once:true,onEnter:b=>G.to(b,{opacity:1,y:0,duration:.7,stagger:.08,overwrite:true,clearProps:FADE})});}

 // numbers count up from zero, keeping the ৳ sign, grouping and suffix (e.g. "4.9 / 5", "1.2M", "৳64,800")
 function countUp(el){if(el.offsetParent===null)return;const txt=el.textContent,m=txt.match(/^(৳?)(\d[\d,]*(?:\.\d+)?)(.*)$/s);if(!m)return;
  const[,pre,num,post]=m,v=parseFloat(num.replace(/,/g,'')),dec=(num.split('.')[1]||'').length,grp=num.includes(',');if(!v)return;
  const fmt=n=>grp?Math.round(n).toLocaleString('en-IN'):n.toFixed(dec),o={n:0};el.textContent=pre+fmt(0)+post;
  G.to(o,{n:v,duration:1.4,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 95%',once:true},onUpdate:()=>{el.textContent=pre+fmt(o.n)+post;},onComplete:()=>{el.textContent=txt;}});}

 // bars, charts and timelines fill in when they come into view
 function fills(){const st=t=>({trigger:t,start:'top 90%',once:true});
  document.querySelectorAll('#view .split').forEach(el=>G.from(el,{clipPath:'inset(0 100% 0 0 round 999px)',duration:1.2,ease:'power2.inOut',delay:.2,scrollTrigger:st(el)}));
  document.querySelectorAll('#view .bar-track i').forEach(el=>G.from(el,{scaleX:0,transformOrigin:'0 50%',duration:1,ease:'power2.out',delay:.15,scrollTrigger:st(el)}));
  document.querySelectorAll('#view .chart').forEach(svg=>G.from(svg.querySelectorAll('rect'),{scaleY:0,transformOrigin:'50% 100%',duration:.8,stagger:.07,ease:'power2.out',delay:.15,scrollTrigger:st(svg)}));
  document.querySelectorAll('#view .tl').forEach(el=>G.from(el.children,{opacity:0,x:-10,stagger:.06,duration:.45,delay:.2,clearProps:FADE,scrollTrigger:st(el)}));
  document.querySelectorAll('#view .hstl').forEach(el=>G.from(el.children,{opacity:0,y:8,stagger:.05,duration:.4,delay:.25,clearProps:FADE}));}

 // payment protection story: a ৳ coin travels Business → BitPromo (held, checked) → Creator, on loop while visible
 function flowLoop(flow){const nodes=[...flow.querySelectorAll('.flow-node')];if(nodes.length<3)return;const fi=nodes.map(n=>n.querySelector('.fi'));
  const coin=document.createElement('span');coin.className='flow-coin';coin.textContent='৳';coin.setAttribute('aria-hidden','true');flow.append(coin);
  const at=i=>{const f=flow.getBoundingClientRect(),r=fi[i].getBoundingClientRect();return{x:r.right-f.left-14,y:r.top-f.top-12};};
  const mark=(i,cls)=>()=>{nodes.forEach(n=>n.classList.remove('lit','paid'));if(i>=0)nodes[i].classList.add(cls);};
  G.timeline({repeat:-1,repeatDelay:1.4,repeatRefresh:true,delay:.8,scrollTrigger:{trigger:flow,start:'top 80%',end:'bottom top',toggleActions:'play pause resume pause'}})
   .set(coin,{x:()=>at(0).x,y:()=>at(0).y,scale:0,opacity:1}).call(mark(0,'lit'))
   .to(coin,{scale:1,duration:.45,ease:'back.out(2)'})
   .to(coin,{x:()=>at(1).x,y:()=>at(1).y,duration:1.1,ease:'power2.inOut'},'+=.5').call(mark(1,'lit'))
   .to(fi[1],{scale:1.15,duration:.3,yoyo:true,repeat:1,ease:'power2.out'})
   .to(coin,{x:()=>at(2).x,y:()=>at(2).y,duration:1.1,ease:'power2.inOut'},'+=1.1').call(mark(2,'paid'))
   .to(fi[2],{scale:1.15,duration:.3,yoyo:true,repeat:1,ease:'power2.out'})
   .to(coin,{scale:0,duration:.35,ease:'back.in(2)'},'+=.7').call(mark(-1),null,'+=.5');}

 // runs on every render, including re-renders of the same page
 function ambient(){if(innerWidth>900)document.querySelectorAll('#view .hero .collage .col').forEach((c,i)=>G.to(c,{yPercent:[-5,7,-9][i]||0,ease:'none',scrollTrigger:{trigger:c.closest('.hero'),start:'top top',end:'bottom top',scrub:.6}}));
  document.querySelectorAll('#view .flow').forEach(flowLoop);}

 function page(fn){if(!on)return;const changed=ROUTE!==last;last=ROUTE;if(ctx)ctx.revert();
  ctx=G.context(()=>{ambient();
   if(changed){const hero=document.querySelector('#view .hero');if(hero)heroIntro(hero);else intro();reveals();fills();document.querySelectorAll('#view .statband b,#view .stat b,#view .kpis b').forEach(countUp);}
   else if(fn==='order')G.from('#co-step',{opacity:0,y:10,duration:.4,clearProps:FADE});});
  requestAnimationFrame(()=>ST.refresh());}

 // explore results: re-animate only when the set of creators actually changes (not on every keystroke)
 function list(el){const sig=[...el.querySelectorAll('.ccard')].map(c=>c.dataset.go).join();if(sig===listSig)return;listSig=sig;
  if(!on||ROUTE!==last)return;G.from(el.querySelectorAll('.ccard'),{opacity:0,y:14,duration:.45,stagger:.035,clearProps:FADE});}

 if(on){// modals and the mobile drawer ease in; the order-placed check pops
  new MutationObserver(()=>{const box=document.querySelector('#modal-root .modal-box'),dr=document.querySelector('#modal-root .drawer-in');
   if(box){G.from(box,{y:18,scale:.97,opacity:0,duration:.4,clearProps:FADE});const ok=box.querySelector('.success-ic');if(ok)G.from(ok,{scale:0,rotation:-30,duration:.6,ease:'back.out(2.2)',delay:.1});}
   if(dr)G.from(dr,{xPercent:100,duration:.45});}).observe(document.getElementById('modal-root'),{childList:true});
  if(document.fonts)document.fonts.ready.then(()=>ST.refresh());}
 addEventListener('scroll',()=>{const t=document.getElementById('top');if(t)t.classList.toggle('scrolled',scrollY>8);},{passive:true});
 return{page,list};})();
