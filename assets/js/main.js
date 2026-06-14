
(function(){
  const menuBtn=document.querySelector('[data-menu-toggle]');
  const mobile=document.querySelector('[data-mobile-menu]');
  if(menuBtn&&mobile){menuBtn.addEventListener('click',()=>{const open=mobile.classList.toggle('is-open');menuBtn.setAttribute('aria-expanded',String(open));}); mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('is-open');menuBtn.setAttribute('aria-expanded','false');}));}
  window.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobile){mobile.classList.remove('is-open');menuBtn&&menuBtn.setAttribute('aria-expanded','false');}});
  const zap=(phone,msg)=>{ const url='https://wa.me/'+phone+'?text='+encodeURIComponent(msg||'Olá, vim pelo site da Osasco Express.'); window.open(url,'_blank','noopener'); };
  document.querySelectorAll('[data-zap]').forEach(el=>{el.setAttribute('role','link');el.setAttribute('tabindex','0');const go=()=>{window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'whatsapp_click',phone:el.dataset.zapTo||'5511986661784'});zap(el.dataset.zapTo||'5511986661784',el.dataset.zap);};el.addEventListener('click',go);el.addEventListener('keydown',e=>{if(e.key==='Enter')go();});});
  document.querySelectorAll('[data-diagnostic-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);let msg='Olá, quero solicitar um diagnóstico gratuito da minha operação de entregas.'; for(const [k,v] of data.entries()){ if(v) msg+='
'+k+': '+v; } zap(form.dataset.phone||'5511986661784',msg);}));
  document.querySelectorAll('[data-routing-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const canal=data.get('canal');const phone=canal==='comercial'?'5511986661784':'5511924782555';let msg='Olá, vim pelo site da Osasco Express.'; for(const [k,v] of data.entries()){ if(v) msg+='
'+k+': '+v; } zap(phone,msg);}));
  document.querySelectorAll('[data-faq-item]').forEach(item=>{ const btn=item.querySelector('.faq-q'); btn&&btn.addEventListener('click',()=>{const open=item.classList.toggle('is-open');btn.setAttribute('aria-expanded',String(open));btn.querySelector('b').textContent=open?'−':'+';}); });
  const search=document.querySelector('[data-faq-search]'); const items=[...document.querySelectorAll('[data-faq-item]')]; const filters=document.querySelector('[data-faq-filters]'); let active='all'; function apply(){const q=(search&&search.value||'').toLowerCase();items.forEach(item=>{const matchText=item.textContent.toLowerCase().includes(q);const matchCat=active==='all'||item.dataset.category===active;item.hidden=!(matchText&&matchCat);});} if(search)search.addEventListener('input',apply); if(filters)filters.addEventListener('click',e=>{if(e.target.matches('button')){filters.querySelectorAll('button').forEach(b=>b.classList.remove('is-active'));e.target.classList.add('is-active');active=e.target.dataset.filter;apply();}});
})();
