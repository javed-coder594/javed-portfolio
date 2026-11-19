/* Typing brand + scroll-progress bicycle navigation (desktop and mobile) */
document.addEventListener('DOMContentLoaded',()=>{
 const word=document.querySelector('[data-typing-logo]');
 const typed=word?.querySelector('.brand-typed');
 const header=document.querySelector('#siteHeader');
 const nav=header?.querySelector('.creative-navbar');
 const desktopBike=nav?.querySelector('.nav-cycle');
 const mobileTrack=header?.querySelector('.mobile-cycle-track');
 const mobileBike=mobileTrack?.querySelector('.mobile-cycle');
 const links=[...(nav?.querySelectorAll('.nav-links a[href*="#"]')||[])];
 const sections=links.map(link=>({link,id:(link.getAttribute('href').split('#')[1]||'').trim(),el:null}))
  .map(item=>({...item,el:document.getElementById(item.id)})).filter(item=>item.el);
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(word&&typed){
  const value=word.getAttribute('data-text')||'Javed';
  if(reduce)typed.textContent=value;
  else{typed.textContent='';let i=0;const typeNext=()=>{if(i<value.length){typed.textContent+=value.charAt(i++);window.setTimeout(typeNext,105)}};window.setTimeout(typeNext,260)}
 }
 if(header){const updateHeader=()=>header.classList.toggle('is-scrolled',window.scrollY>24);updateHeader();window.addEventListener('scroll',updateHeader,{passive:true})}
 if(!sections.length)return;
 let raf=0;
 const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
 const sectionTops=()=>sections.map(s=>({ ...s, top:s.el.getBoundingClientRect().top+window.scrollY }));
 const updateBike=()=>{
  raf=0;
  const points=sectionTops();
  const scroll=window.scrollY+Math.min(window.innerHeight*.28,180);
  let left=points[0],right=points[points.length-1];
  for(let i=0;i<points.length-1;i++){if(scroll>=points[i].top&&scroll<points[i+1].top){left=points[i];right=points[i+1];break}}
  let ratio=right.top===left.top?0:clamp((scroll-left.top)/(right.top-left.top),0,1);
  if(scroll<points[0].top)ratio=0;
  if(scroll>=points[points.length-1].top)ratio=1;
  const segmentIndex=Math.max(0,points.indexOf(left));
  const active=ratio>=.5?right:left;
  links.forEach(a=>{if(a===active.link)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  if(desktopBike&&nav&&!window.matchMedia('(max-width: 991px)').matches){
   const navRect=nav.getBoundingClientRect();
   const a=left.link.getBoundingClientRect(),b=right.link.getBoundingClientRect();
   const x1=a.left-navRect.left+(a.width-46)/2;
   const x2=b.left-navRect.left+(b.width-46)/2;
   desktopBike.style.transform='translate3d('+(x1+(x2-x1)*ratio)+'px,0,0)';
   desktopBike.classList.add('is-visible');
  }
  if(mobileTrack&&mobileBike){
   const width=mobileTrack.clientWidth;
   const bikeWidth=46;
   const x=clamp(8+(width-bikeWidth-16)*(points.length<2?0:(segmentIndex+ratio)/(points.length-1)),8,width-bikeWidth-8);
   mobileBike.style.transform='translate3d('+x+'px,0,0)';
  }
 };
 const requestUpdate=()=>{if(!raf)raf=requestAnimationFrame(updateBike)};
 window.addEventListener('scroll',requestUpdate,{passive:true});
 window.addEventListener('resize',requestUpdate,{passive:true});
 window.addEventListener('load',requestUpdate,{once:true});
 window.addEventListener('hashchange',requestUpdate);
 links.forEach(link=>link.addEventListener('click',()=>requestUpdate()));
 if(document.fonts?.ready)document.fonts.ready.then(requestUpdate);
 requestUpdate();
});
