document.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.src = '/js/script.js';
  script.onload = () => {
    if (typeof setupMobileMenu === 'function') setupMobileMenu();
    if (typeof setupAchievementsNavigation === 'function') setupAchievementsNavigation();
    if (typeof setupAchievementsSection === 'function') setupAchievementsSection();
    initPortfolioMotion();
    if (typeof startTyping === 'function') startTyping();
  };
  script.onerror = () => console.error('Unable to load shared site script.');
  document.head.appendChild(script);
});

function initPortfolioMotion() {
  if (document.documentElement.dataset.motionReady) return;
  document.documentElement.dataset.motionReady = 'true';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveal = document.querySelectorAll('main section, .experience-card, .expertise-card, .project-card, .achievement-list > div, .contact-cta');
  reveal.forEach((el,i) => { el.classList.add('motion-reveal'); el.style.setProperty('--motion-delay', ((i%4)*85)+'ms'); });
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('motion-in');io.unobserve(e.target);} }), {threshold:.13,rootMargin:'0px 0px -35px 0px'});
    reveal.forEach(el => io.observe(el));
  } else reveal.forEach(el => el.classList.add('motion-in'));
  const count = el => { const end=Number(el.dataset.count||0), start=performance.now(), duration=1500; const tick=now=>{const p=Math.min((now-start)/duration,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3))).toLocaleString();if(p<1)requestAnimationFrame(tick);};requestAnimationFrame(tick); };
  const counters=document.querySelectorAll('[data-count]');
  if('IntersectionObserver' in window){const cio=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){count(e.target);cio.unobserve(e.target);}}),{threshold:.7});counters.forEach(el=>cio.observe(el));}else counters.forEach(count);
  if(window.matchMedia('(hover:hover) and (pointer:fine)').matches&&!reduced){
    document.querySelectorAll('.project-card,.expertise-card,.visual-window').forEach(card=>{
      card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;card.style.setProperty('--pointer-x',(x*100)+'%');card.style.setProperty('--pointer-y',(y*100)+'%');if(card.classList.contains('visual-window'))card.style.transform='perspective(1000px) rotateY('+((x-.5)*5)+'deg) rotateX('+((.5-y)*4)+'deg)';});
      card.addEventListener('pointerleave',()=>{if(card.classList.contains('visual-window'))card.style.transform='';});
    });
  }
  const hero=document.querySelector('.astra-hero');
  if(hero&&!hero.querySelector('.ambient-particles')&&!reduced){const layer=document.createElement('div');layer.className='ambient-particles';layer.setAttribute('aria-hidden','true');for(let i=0;i<28;i++){const dot=document.createElement('span');dot.style.setProperty('--x',(Math.random()*100)+'%');dot.style.setProperty('--y',(Math.random()*100)+'%');dot.style.setProperty('--d',(3+Math.random()*4)+'px');dot.style.setProperty('--t',(7+Math.random()*12)+'s');dot.style.setProperty('--delay',(-Math.random()*15)+'s');layer.appendChild(dot);}hero.prepend(layer);}
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{const nav=document.querySelector('.navbar');if(nav&&nav.classList.contains('active'))nav.classList.remove('active');document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');}));
  const sections=[...document.querySelectorAll('main section[id]')];
  if('IntersectionObserver' in window){const nio=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('is-current',a.hash==='#'+e.target.id));}),{rootMargin:'-35% 0px -55% 0px'});sections.forEach(s=>nio.observe(s));}
  const footer=document.querySelector('.footer');
  if(footer&&!reduced)window.addEventListener('scroll',()=>{const r=footer.getBoundingClientRect();footer.style.setProperty('--footer-progress',Math.max(0,Math.min(1,(innerHeight-r.top)/innerHeight)));},{passive:true});
}