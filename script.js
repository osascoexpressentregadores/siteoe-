
(function(){
  const btn=document.querySelector('[data-nav-toggle]');
  const nav=document.querySelector('[data-nav-links]');
  if(btn && nav){
    btn.addEventListener('click', function(){
      const open=nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true':'false');
    });
  }
  document.querySelectorAll('a[target="_blank"]').forEach(function(a){
    const rel=(a.getAttribute('rel')||'').split(/\s+/);
    ['noopener','noreferrer'].forEach(function(v){if(!rel.includes(v)) rel.push(v)});
    a.setAttribute('rel', rel.join(' ').trim());
  });
  document.querySelectorAll('a[href*="wa.me"]').forEach(function(a){
    a.addEventListener('click', function(){
      window.dataLayer=window.dataLayer||[];
      window.dataLayer.push({event:'whatsapp_click',label:a.textContent.trim()||a.href});
    });
  });
})();
