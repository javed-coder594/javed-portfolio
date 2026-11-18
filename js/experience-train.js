/* Scroll-linked career train movement */
(() => {
  const init = () => {
    const route = document.querySelector('[data-career-route]');
    if (!route || route.dataset.trainReady) return;
    route.dataset.trainReady = 'true';
    const train = route.querySelector('.route-train');
    const stops = [...route.querySelectorAll('.route-stop')];
    if (!train || !stops.length) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const moveTrain = () => {
      const routeBox = route.getBoundingClientRect();
      const first = stops[0].querySelector('.station-pin').getBoundingClientRect();
      const last = stops[stops.length - 1].querySelector('.station-pin').getBoundingClientRect();
      const start = first.top + first.height / 2 - routeBox.top;
      const finish = last.top + last.height / 2 - routeBox.top;
      const viewportTrigger = window.innerHeight * .68;
      const progress = reduced ? 1 : Math.max(0, Math.min(1, (viewportTrigger - routeBox.top - start) / Math.max(1, finish - start)));
      train.style.top = (start + (finish - start) * progress - 21) + 'px';
      stops.forEach((stop, index) => {
        const pin = stop.querySelector('.station-pin');
        const pinY = pin.getBoundingClientRect().top + pin.offsetHeight / 2;
        const active = window.innerHeight * .68 >= pinY;
        stop.classList.toggle('is-passed', active);
        stop.classList.toggle('is-next', !active && index === stops.findIndex(item => !item.classList.contains('is-passed')));
      });
    };
    let ticking = false;
    const requestMove = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { moveTrain(); ticking = false; });
    };
    window.addEventListener('scroll', requestMove, {passive:true});
    window.addEventListener('resize', requestMove);
    moveTrain();
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) requestMove();
      }, {threshold:.05});
      observer.observe(route);
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
