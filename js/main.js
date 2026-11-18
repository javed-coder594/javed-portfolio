document.addEventListener('DOMContentLoaded', () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const script = document.createElement('script');
  script.src = '/js/script.js';
  script.onload = () => {
    if (typeof setupMobileMenu === 'function') setupMobileMenu();
    if (typeof setupAchievementsNavigation === 'function') setupAchievementsNavigation();
    if (typeof setupAchievementsSection === 'function') setupAchievementsSection();
    initPortfolioMotion(reduced);
    if (typeof startTyping === 'function') startTyping();
  };
  script.onerror = () => initPortfolioMotion(reduced);
  document.head.appendChild(script);
});

function initPortfolioMotion(reduced) {
  if (document.documentElement.dataset.motionReady) return;
  document.documentElement.dataset.motionReady = 'true';

  // Stagger each major section into view without hiding content when motion is reduced.
  const reveal = document.querySelectorAll('main section, .experience-card, .expertise-card, .project-card, .achievement-list > div, .contact-cta');
  reveal.forEach((el,i) => { el.classList.add('motion-reveal'); el.style.setProperty('--motion-delay', ((i%5)*75)+'ms'); });
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if(e.isIntersecting){e.target.classList.add('motion-in');io.unobserve(e.target);}
    }), {threshold:.12,rootMargin:'0px 0px -30px 0px'});
    reveal.forEach(el => io.observe(el));
  } else reveal.forEach(el => el.classList.add('motion-in'));

  // Count-up metrics when visible.
  const count = el => {
    if(el.dataset.counted) return; el.dataset.counted='true';
    const end=Number(el.dataset.count||0), start=performance.now(), duration=1400;
    const tick=now=>{const p=Math.min((now-start)/duration,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3))).toLocaleString();if(p<1)requestAnimationFrame(tick);};
    requestAnimationFrame(tick);
  };
  const counters=document.querySelectorAll('[data-count]');
  if('IntersectionObserver' in window){const cio=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){count(e.target);cio.unobserve(e.target);}}),{threshold:.65});counters.forEach(el=>cio.observe(el));}

  // Pointer-responsive depth tilt on cards (desktop only).
  if(window.matchMedia('(hover:hover) and (pointer:fine)').matches&&!reduced){
    document.querySelectorAll('.project-card,.expertise-card,.experience-card').forEach(card=>{
      card.addEventListener('pointermove',e=>{
        const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
        card.style.transform='perspective(900px) rotateY('+((x-.5)*5)+'deg) rotateX('+((.5-y)*4)+'deg) translateY(-3px)';
        card.style.setProperty('--pointer-x',(x*100)+'%');card.style.setProperty('--pointer-y',(y*100)+'%');
      });
      card.addEventListener('pointerleave',()=>card.style.transform='');
    });
  }

  // Keep mobile menu behavior consistent across anchors.
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{
    const nav=document.querySelector('.navbar'),toggle=document.querySelector('.menu-toggle');
    if(nav&&nav.classList.contains('active'))nav.classList.remove('active');
    if(toggle){toggle.classList.remove('active');toggle.setAttribute('aria-expanded','false');}
  }));

  const sections=[...document.querySelectorAll('main section[id]')];
  if('IntersectionObserver' in window){const nio=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting)document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('is-current',a.hash==='#'+e.target.id));
  }),{rootMargin:'-35% 0px -55% 0px'});sections.forEach(s=>nio.observe(s));}

  if(!reduced){
    initHeroParticleField();
    runCinematicOpening();
  }
  const footer=document.querySelector('.footer');
  if(footer&&!reduced)window.addEventListener('scroll',()=>{
    const r=footer.getBoundingClientRect();footer.style.setProperty('--footer-progress',Math.max(0,Math.min(1,(innerHeight-r.top)/innerHeight)));
  },{passive:true});
}

function runCinematicOpening(){
  if(!document.querySelector('.cinematic-hero'))return;
  const intro=document.createElement('div');intro.className='vfx-intro';intro.setAttribute('aria-hidden','true');
  intro.innerHTML='<canvas></canvas><div class="vfx-intro-flash"></div><div class="vfx-intro-name">Javed <span>Chaudhary.</span></div><div class="vfx-intro-label">SEO STRATEGY · AEO · GEO · SEARCH EXPERIENCE</div>';
  document.body.appendChild(intro);
  const canvas=intro.querySelector('canvas'),ctx=canvas.getContext('2d');let w=0,h=0,raf=0,points=[],last=0;
  const resize=()=>{const d=Math.min(devicePixelRatio||1,1.25);w=innerWidth;h=innerHeight;canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);points=Array.from({length:Math.min(54,Math.round(w*h/22000))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.45,vy:(Math.random()-.5)*.45,r:Math.random()*1.5+.5}));};
  resize();const start=performance.now();
  const draw=now=>{
    if(now-last<33){raf=requestAnimationFrame(draw);return}last=now;
    const elapsed=now-start;ctx.clearRect(0,0,w,h);const reveal=Math.min(1,Math.max(0,(elapsed-250)/900));
    points.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=i%4===0?'rgba(240,68,62,'+(reveal*.8)+')':'rgba(86,190,232,'+(reveal*.72)+')';ctx.fill();
      for(let j=i+1;j<points.length;j++){const q=points[j],dx=p.x-q.x,dy=p.y-q.y,d2=dx*dx+dy*dy;if(d2<8100){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle='rgba(72,156,195,'+((1-Math.sqrt(d2)/90)*.18*reveal)+')';ctx.lineWidth=.6;ctx.stroke();}}
    });
    if(elapsed>350&&elapsed<2200){const sweep=((elapsed-350)/1850)*Math.max(w,h)*1.5;ctx.save();ctx.translate(w/2,h/2);ctx.rotate(-.42);const grad=ctx.createLinearGradient(-sweep-100,0,-sweep+100,0);grad.addColorStop(0,'transparent');grad.addColorStop(.48,'rgba(240,68,62,.65)');grad.addColorStop(.52,'rgba(111,211,255,.8)');grad.addColorStop(1,'transparent');ctx.fillStyle=grad;ctx.fillRect(-sweep-100,-h,200,h*2);ctx.restore();}
    if(elapsed<2800)raf=requestAnimationFrame(draw);
  };
  raf=requestAnimationFrame(draw);
  setTimeout(()=>{cancelAnimationFrame(raf);intro.classList.add('is-gone');setTimeout(()=>intro.remove(),800);},3200);
}
function initHeroParticleField(){
  const canvas=document.querySelector('.hero-particle-canvas'),hero=document.querySelector('.cinematic-hero');
  if(!canvas||!hero||!canvas.getContext)return;
  const ctx=canvas.getContext('2d',{alpha:true});let width=0,height=0,particles=[],pointer={x:-1000,y:-1000},frame=0,last=0,active=false;
  const mobile=matchMedia('(max-width:700px)').matches;
  const resize=()=>{const d=Math.min(devicePixelRatio||1,1.2),r=hero.getBoundingClientRect();width=r.width;height=r.height;canvas.width=Math.round(width*d);canvas.height=Math.round(height*d);ctx.setTransform(d,0,0,d,0,0);const n=mobile?22:42;particles=Array.from({length:n},()=>({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:.7+Math.random()*1.2}));};
  resize();
  const onMove=e=>{const r=canvas.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;};
  hero.addEventListener('pointermove',onMove,{passive:true});hero.addEventListener('pointerleave',()=>{pointer.x=-1000;pointer.y=-1000;},{passive:true});
  const draw=now=>{if(!active)return;if(now-last<33){frame=requestAnimationFrame(draw);return}last=now;ctx.clearRect(0,0,width,height);
    for(let i=0;i<particles.length;i++){const p=particles[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>width)p.vx*=-1;if(p.y<0||p.y>height)p.vy*=-1;
      const dx=p.x-pointer.x,dy=p.y-pointer.y,dist=Math.hypot(dx,dy);if(dist<110&&dist>0){p.x+=dx/dist*.7;p.y+=dy/dist*.7;}
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=i%5===0?'rgba(240,68,62,.72)':'rgba(91,190,235,.62)';ctx.fill();
      for(let j=i+1;j<particles.length;j++){const q=particles[j],x=p.x-q.x,y=p.y-q.y,d2=x*x+y*y;if(d2<6400){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle='rgba(77,157,196,'+((1-Math.sqrt(d2)/80)*.17)+')';ctx.lineWidth:.55;ctx.stroke();}}
    }frame=requestAnimationFrame(draw);
  };
  if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>{active=es[0].isIntersecting;if(active){last=0;frame=requestAnimationFrame(draw)}else cancelAnimationFrame(frame);},{threshold:.01});io.observe(hero);}else{active=true;draw(0);}
  document.addEventListener('visibilitychange',()=>{active=!document.hidden&&hero.getBoundingClientRect().bottom>0&&hero.getBoundingClientRect().top<innerHeight;if(active)frame=requestAnimationFrame(draw);else cancelAnimationFrame(frame);});
  window.addEventListener('pagehide',()=>{active=false;cancelAnimationFrame(frame);},{once:true});
}
