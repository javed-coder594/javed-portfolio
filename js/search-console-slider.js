(() => {
  const root = document.querySelector('[data-search-console-slider]');
  if (!root) return;
  const slides = [...root.querySelectorAll('.sc-slide')];
  const dots = [...root.querySelectorAll('.sc-dot')];
  const previous = root.querySelector('[data-sc-prev]');
  const next = root.querySelector('[data-sc-next]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let active = 0, timer = null, paused = false;
  function render(index) {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === active);
      slide.classList.toggle('is-prev', i === (active + slides.length - 1) % slides.length);
      slide.classList.toggle('is-next', i === (active + 1) % slides.length);
      slide.setAttribute('aria-hidden', i === active ? 'false' : 'true');
    });
    dots.forEach((dot, i) => {
      dot.setAttribute('aria-current', i === active ? 'true' : 'false');
      dot.setAttribute('aria-label', 'Show screenshot ' + (i + 1));
    });
    root.querySelector('[data-sc-count]').textContent = String(active + 1).padStart(2, '0');
  }
  function stop(){ if (timer) window.clearInterval(timer); timer = null; }
  function start(){ stop(); if (reducedMotion || paused || document.hidden) return; timer = window.setInterval(() => render(active + 1), 5200); }
  previous?.addEventListener('click', () => { render(active - 1); start(); });
  next?.addEventListener('click', () => { render(active + 1); start(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { render(i); start(); }));
  root.addEventListener('mouseenter', () => { paused = true; stop(); });
  root.addEventListener('mouseleave', () => { paused = false; start(); });
  root.addEventListener('focusin', () => { paused = true; stop(); });
  root.addEventListener('focusout', e => { if (!root.contains(e.relatedTarget)) { paused = false; start(); } });
  document.addEventListener('visibilitychange', start);
  render(0); start();
})();