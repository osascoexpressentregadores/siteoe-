
const menuBtn=document.querySelector('[data-menu-btn]');
const mobilePanel=document.querySelector('[data-mobile-panel]');
function setMenu(open){
  if(!menuBtn||!mobilePanel) return;
  mobilePanel.classList.toggle('open',open);
  document.body.classList.toggle('menu-open',open);
  menuBtn.setAttribute('aria-expanded',open?'true':'false');
}
if(menuBtn&&mobilePanel){
  menuBtn.addEventListener('click',()=>setMenu(!mobilePanel.classList.contains('open')));
  mobilePanel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') setMenu(false); });
}
const header=document.querySelector('[data-header]');
if(header){
  const onScroll=()=>header.classList.toggle('is-scrolled', window.scrollY>12);
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
}
function zap(number,msg){ return 'https://wa.me/'+number+'?text='+encodeURIComponent(msg); }
document.querySelectorAll('[data-zap]').forEach(el=>{
  const number=el.dataset.zapTo || '5511986661784';
  el.setAttribute('href', zap(number, el.dataset.zap));
  if(!el.getAttribute('target')){ el.setAttribute('target','_blank'); el.setAttribute('rel','noopener'); }
});
document.querySelectorAll('.faq-q').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item=btn.closest('.faq-item');
    const open=!item?.classList.contains('open');
    item?.classList.toggle('open',open);
    btn.setAttribute('aria-expanded',open?'true':'false');
  });
});
const search=document.querySelector('[data-faq-search]');
const filters=document.querySelectorAll('[data-faq-filter]');
function applyFaqFilter(cat='all'){
  const term=(search?.value||'').toLowerCase().trim();
  document.querySelectorAll('[data-faq-item]').forEach(item=>{
    const matchesCat=cat==='all'||item.dataset.category===cat;
    const matchesTerm=!term||item.textContent.toLowerCase().includes(term);
    item.classList.toggle('hidden',!(matchesCat&&matchesTerm));
  });
}
filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(b=>{b.classList.remove('active'); b.setAttribute('aria-pressed','false');});
  btn.classList.add('active'); btn.setAttribute('aria-pressed','true');
  applyFaqFilter(btn.dataset.faqFilter);
}));
filters.forEach(btn=>btn.setAttribute('aria-pressed',btn.classList.contains('active')?'true':'false'));
if(search) search.addEventListener('input',()=>applyFaqFilter(document.querySelector('[data-faq-filter].active')?.dataset.faqFilter||'all'));
const triage=document.querySelector('[data-triage-form]');
if(triage){
  triage.addEventListener('submit',e=>{
    e.preventDefault();
    const d=new FormData(triage);
    const tipo=(d.get('tipo')||'comercial').toString();
    let number='5511986661784';
    let msg=`Olá, vim pelo site da Osasco Express e quero falar com o comercial.

Nome: ${d.get('nome')||''}
WhatsApp: ${d.get('whatsapp')||''}
Empresa: ${d.get('empresa')||''}
Cidade/bairro: ${d.get('cidade')||''}
Mensagem: ${d.get('mensagem')||''}

Quero entender qual modelo de entrega faz sentido para minha operação.`;
    if(tipo==='suporte'){ number='5511924782555'; msg=`Olá, vim pelo site da Osasco Express e quero falar com o suporte de parceiros.

Nome: ${d.get('nome')||''}
WhatsApp: ${d.get('whatsapp')||''}
Cidade/bairro: ${d.get('cidade')||''}
Dúvida: ${d.get('mensagem')||''}`; }
    if(tipo==='entregador'){ number='5511924782555'; msg=`Olá, quero me cadastrar como parceiro autônomo da Osasco Express.

Nome: ${d.get('nome')||''}
WhatsApp: ${d.get('whatsapp')||''}
Cidade/bairro: ${d.get('cidade')||''}
Mensagem: ${d.get('mensagem')||''}`; }
    window.open(zap(number,msg),'_blank','noopener');
  });
}


// V7: formulário de diagnóstico comercial e marcação de origem do clique
function collectChecked(form,name){ return Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map(i=>i.value).join(', '); }
const diagForms=document.querySelectorAll('[data-diagnostico-form]');
diagForms.forEach(form=>{
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const d=new FormData(form);
    const origem=form.dataset.origem||document.title||'site';
    const msg=`Olá, vim pelo site da Osasco Express e quero solicitar o diagnóstico gratuito da minha operação de entregas.

Origem: ${origem}
Nome: ${d.get('nome')||''}
Empresa: ${d.get('empresa')||''}
WhatsApp: ${d.get('whatsapp')||''}
Cidade: ${d.get('cidade')||''}
Segmento: ${d.get('segmento')||''}
Volume aproximado: ${d.get('volume')||''}
Principal necessidade: ${d.get('necessidade')||''}
Canais usados: ${collectChecked(form,'canais')||d.get('canais')||''}
Mensagem: ${d.get('mensagem')||''}

Quero entender qual modelo operacional faz mais sentido para minha empresa.`;
    try{ window.dataLayer=window.dataLayer||[]; window.dataLayer.push({event:'diagnostico_whatsapp_oe', origem}); }catch(e){}
    window.open(zap('5511986661784',msg),'_blank','noopener');
  });
});
document.querySelectorAll('[data-zap]').forEach(el=>{
  el.addEventListener('click',()=>{
    try{ window.dataLayer=window.dataLayer||[]; window.dataLayer.push({event:'click_whatsapp_oe', canal:el.dataset.zapTo||'5511986661784', texto:el.textContent.trim()}); }catch(e){}
  });
});


// V10: marca navegação ativa com segurança quando a página não veio marcada no HTML.
(function(){
  const path = window.location.pathname.replace(/\/index\.html$/, '/');
  document.querySelectorAll('.nav-links a, .mobile-panel a').forEach(a=>{
    const href = a.getAttribute('href') || '';
    if(!href || href.startsWith('http') || href.startsWith('#') || a.dataset.zap) return;
    try{
      const url = new URL(href, window.location.href);
      const target = url.pathname.replace(/\/index\.html$/, '/');
      const isHome = (path === '/' || path.endsWith('/index.html')) && (target === '/' || target.endsWith('/')) && (href === './' || href === '../');
      if((target !== '/' && path === target) || isHome){
        a.setAttribute('aria-current','page');
      }
    }catch(e){}
  });
})();
