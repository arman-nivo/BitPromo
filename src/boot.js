/* ===== boot ===== */
document.addEventListener('click',e=>{const el=e.target.closest('[data-act],[data-go]');if(!el)return;
 if(el.dataset.act){const fn=ACT[el.dataset.act];if(!fn)return;if(el.tagName==='BUTTON'&&el.getAttribute('type')!=='submit')e.preventDefault();fn(el,e);}
 else{e.preventDefault();go(el.dataset.go);}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('[role=button][data-act]')){e.preventDefault();e.target.click();}});
document.addEventListener('submit',e=>{const f=e.target;if(!f.dataset||!f.dataset.form)return;e.preventDefault();FORM[f.dataset.form]&&FORM[f.dataset.form](f);});
$('#foot').innerHTML=footer();render();guideWelcome();
