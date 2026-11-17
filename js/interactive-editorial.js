/* Interactive editorial motion: drawn grid, scroll reveals and touch-reactive star orbs */
(() => {
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const hero=document.querySelector('.hero');
 if(hero&&!hero.querySelector('.editorial-draw-lines')){
   const lines=document.createElement('div');lines.className='editorial-draw-lines';lines.setAttribute('aria-hidden','true');
   for(let i=0;i<6;i++)lines.appendChild(document.createElement('i'));
   hero.prepend(lines);
 }
 const sections=[...document.querySelectorAll('main section')];
 sections.forEach((section,i)=>{
   const targets=section.querySelectorAll('.section-kicker,h2,.experience-card,.expertise-card,.project-card,.achievement-list>div,.contact-cta>div');
   targets.forEach((el,j)=>{if(!el.classList.contains('editorial-reveal'))el.classList.add('editorial-reveal');el.style.transitionDelay=Math.min(j*55,330)+'ms';});
 });
 if(!reduced&&'IntersectionObserver'in window){
   const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12});
   document.querySelectorAll('.editorial-reveal').forEach(el=>io.observe(el));
 }else document.querySelectorAll('.editorial-reveal').forEach(el=>el.classList.add('is-visible'));
 const field=document.createElement('div');field.className='editorial-orb-field';field.setAttribute('aria-label','Interactive floating star shapes');
 const count=window.innerWidth<700?12:20,orbs=[];
 for(let i=0;i<count;i++){
   const orb=document.createElement('button');orb.type='button';orb.className='editorial-orb';orb.setAttribute('aria-label','Interactive star, tap to animate');
   const x=4+Math.random()*92,y=8+Math.random()*82;
   orb.style.left=x+'%';orb.style.top=y+'%';orb.style.animationDelay=(Math.random()*2)+'s';
   field.appendChild(orb);orbs.push({el:orb,x,y,phase:Math.random()*Math.PI*2,active:false});
   const activate=()=>{orb.classList.add('is-active');setTimeout(()=>orb.classList.remove('is-active'),850)};
   orb.addEventListener('click',activate);orb.addEventListener('touchstart',activate,{passive:true});
 }
 const contact=document.querySelector('#contact')||document.querySelector('footer');
 if(contact){contact.style.position='relative';contact.style.overflow='hidden';contact.appendChild(field);}
 let pointer={x:-1000,y:-1000};
 const move=e=>{pointer.x=e.clientX;pointer.y=e.clientY};
 window.addEventListener('pointermove',move,{passive:true});
 function animate(t){
   const rect=field.getBoundingClientRect();
   orbs.forEach((o,i)=>{
     const px=rect.left+rect.width*o.x/100,py=rect.top+rect.height*o.y/100;
     const dx=pointer.x-px,dy=pointer.y-py,d=Math.hypot(dx,dy);
     let tx=Math.sin(t*.0007+o.phase)*7,ty=Math.cos(t*.0008+o.phase)*8;
     if(d<150&&d>0){const force=(150-d)/150;tx-=dx/d*force*48;ty-=dy/d*force*48;o.el.classList.add('is-active')}
     else o.el.classList.remove('is-active');
     o.el.style.transform='translate3d('+tx+'px,'+ty+'px,0) rotate('+(Math.sin(t*.0006+o.phase)*18)+'deg)';
   });
   requestAnimationFrame(animate);
 }
 if(!reduced)requestAnimationFrame(animate);
 // Soft marquee echoes the reference's editorial ticker without replacing portfolio copy.
 if(hero&&!hero.querySelector('.editorial-marquee')){
   const m=document.createElement('div');m.className='editorial-marquee';
   const track=document.createElement('div');track.className='editorial-marquee-track';
   const words='SEO STRATEGY  ✳  SEARCH VISIBILITY  ✳  AEO / GEO  ✳  TECHNICAL SEO  ✳  CONTENT THAT CONNECTS  ✳  ';
   track.innerHTML='<span>'+words+'</span><span>'+words+'</span>';
   m.appendChild(track);hero.appendChild(m);
 }
})();
