(() => {
  const init = () => {
    const root = document.querySelector('[data-search-console-slider]');
    if (!root || root.dataset.scReady) return;
    root.dataset.scReady = 'true';
    const slides = [...root.querySelectorAll('.sc-slide')];
    const dots = [...root.querySelectorAll('.sc-dot')];
    const previous = root.querySelector('[data-sc-prev]');
    const next = root.querySelector('[data-sc-next]');
    const counter = root.querySelector('[data-sc-count]');
    const type = root.querySelector('[data-sc-type]');
    const title = root.querySelector('[data-sc-title]');
    const description = root.querySelector('[data-sc-description]');
    const progress = root.querySelector('[data-sc-progress]');
    if (slides.length !== 3 || !counter) return;
    const items = [
      {type:'GOOGLE SEARCH CONSOLE / PERFORMANCE',title:'Search visibility, measured.',description:'Reviewing clicks, impressions, average position and search queries to understand what is working and where to improve.'},
      {type:'GOOGLE SEARCH CONSOLE / ORGANIC GROWTH',title:'Turning impressions into discovery.',description:'Tracking how pages appear in search, which queries bring visitors and where content can earn stronger visibility.'},
      {type:'GOOGLE SEARCH CONSOLE / SEARCH INSIGHTS',title:'Find the next opportunity.',description:'Using query and page-level insights to spot ranking opportunities, refine content and guide the next SEO action.'}
    ];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let active=0,timer=null,paused=false,startX=0;
    function render(index){
      active=(index+slides.length)%slides.length;
      slides.forEach((slide,i)=>{
        slide.classList.toggle('is-active',i===active);
        slide.classList.toggle('is-prev',i===(active+slides.length-1)%slides.length);
        slide.classList.toggle('is-next',i===(active+1)%slides.length);
        slide.setAttribute('aria-hidden',i===active?'false':'true');
      });
      dots.forEach((dot,i)=>dot.setAttribute('aria-current',i===active?'true':'false'));
      counter.textContent=String(active+1).padStart(2,'0');
      if(type)type.textContent=items[active].type;
      if(title)title.textContent=items[active].title;
      if(description)description.textContent=items[active].description;
      if(progress)progress.style.width=((active+1)/slides.length*100)+'%';
    }
    function stop(){if(timer)clearInterval(timer);timer=null}
    function start(){stop();if(reducedMotion||paused||document.hidden)return;timer=setInterval(()=>render(active+1),4800)}
    previous?.addEventListener('click',()=>{render(active-1);start()});
    next?.addEventListener('click',()=>{render(active+1);start()});
    dots.forEach((dot,i)=>dot.addEventListener('click',()=>{render(i);start()}));
    const stage=root.querySelector('.sc-reference-stage');
    stage?.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX},{passive:true});
    stage?.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>45){render(active+(dx<0?1:-1));start()}},{passive:true});
    stage?.addEventListener('mouseenter',()=>{paused=true;stop()});
    stage?.addEventListener('mouseleave',()=>{paused=false;start()});
    root.addEventListener('focusin',()=>{paused=true;stop()});
    root.addEventListener('focusout',e=>{if(!root.contains(e.relatedTarget)){paused=false;start()}});
    document.addEventListener('visibilitychange',start);
    render(0);start();
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();