/* Typing brand, sticky header and moving active-section orbit */
document.addEventListener('DOMContentLoaded',()=>{
 const word=document.querySelector('[data-typing-logo]');
 const typed=word?.querySelector('.brand-typed');
 const header=document.querySelector('#siteHeader');
 const nav=header?.querySelector('.creative-navbar');
 const indicator=nav?.querySelector('.nav-cycle');
 const links=[...(nav?.querySelectorAll('.nav-links a[href*="#"]')||[])];
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(word&&typed){
  const value=word.getAttribute('data-text')||'Javed';
  if(reduce) typed.textContent=value;
  else{
   typed.textContent='';let i=0;
   const typeNext=()=>{if(i<value.length){typed.textContent+=value.charAt(i++);window.setTimeout(typeNext,105)}};
   window.setTimeout(typeNext,260);
  }
 }
 if(header){
  const updateHeader=()=>header.classList.toggle('is-scrolled',window.scrollY>24);
  updateHeader();window.addEventListener('scroll',updateHeader,{passive:true});
 }
 if(!nav||!indicator||!links.length)return;
 const sectionLinks=links.map(link=>({link,id:(link.getAttribute('href').split('#')[1]||'').trim()}))
  .filter(item=>item.id&&document.getElementById(item.id));
 let activeId=location.hash.slice(1);
 if(!sectionLinks.some(item=>item.id===activeId))activeId='home';
 const moveIndicator=()=>{
  const active=sectionLinks.find(item=>item.id===activeId)||sectionLinks[0];
  if(!active)return;
  const link=active.link;
  links.forEach(a=>{if(a===link)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  if(window.matchMedia('(max-width: 991px)').matches){indicator.classList.remove('is-visible');return}
  const navRect=nav.getBoundingClientRect(),linkRect=link.getBoundingClientRect();
  const x=linkRect.left-navRect.left+(linkRect.width-46)/2;
  indicator.style.transform='translate3d('+x+'px,0,0)';
  indicator.classList.add('is-visible');
 };
 const setActive=id=>{if(!sectionLinks.some(item=>item.id===id))return;activeId=id;moveIndicator()};
 sectionLinks.forEach(({link,id})=>link.addEventListener('click',()=>setActive(id)));
 const observer=new IntersectionObserver(entries=>{
  const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
  if(visible.length)setActive(visible[0].target.id);
 },{rootMargin:'-18% 0px -58% 0px',threshold:[0,.12,.25,.4,.6]});
 sectionLinks.forEach(({id})=>{const section=document.getElementById(id);if(section)observer.observe(section)});
 window.addEventListener('hashchange',()=>setActive(location.hash.slice(1)));
 window.addEventListener('resize',moveIndicator,{passive:true});
 window.addEventListener('load',moveIndicator,{once:true});
 moveIndicator();
});
