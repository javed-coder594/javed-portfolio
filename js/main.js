document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.navbar');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('active');
      menu.classList.toggle('active', open);
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('active');
      menu.classList.remove('active');
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Open menu');
    }));
  }

  const hero = document.querySelector('.hero.astra-hero');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal each content block as it enters the viewport; content stays visible
  // if IntersectionObserver is unavailable or reduced motion is requested.
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
      '.about-orbit-heading, .about-orbit-scene, .about-orbit-card, .about-orbit-copy, .sc-heading, .sc-stage, .sc-side-copy, .experience-card, .expertise-card, .project-card, .achievement-list > div, .contact-cta > div'
    );
    revealTargets.forEach((el, index) => {
      el.classList.add('motion-reveal');
      el.style.setProperty('--motion-delay', (index % 4) * 75 + 'ms');
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('motion-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealTargets.forEach(el => observer.observe(el));
  }

  // Decorative particle canvas is intentionally disabled for fast rendering.

  // Railway journey: move the locomotive down the career line and stop at Naresh i Technologies.
  const careerSection = document.querySelector('.train-experience');
  const careerTrack = careerSection?.querySelector('.railway-track');
  const careerTrain = careerTrack?.querySelector('.railway-locomotive');
  const currentStationPin = careerSection?.querySelector('.route-stop-current .station-pin');
  if (careerSection && careerTrack && careerTrain && currentStationPin) {
    const arriveAtCurrentStation = () => {
      const trackRect = careerTrack.getBoundingClientRect();
      const stationRect = currentStationPin.getBoundingClientRect();
      const maxTop = Math.max(0, careerTrack.clientHeight - careerTrain.offsetHeight);
      const desired = stationRect.top + stationRect.height / 2 - trackRect.top - careerTrain.offsetHeight * .52;
      careerTrain.style.top = Math.max(0, Math.min(maxTop, desired)) + 'px';
      careerTrain.classList.add('train-arrived');
      careerSection.classList.add('railway-active');
    };
    if (reduceMotion) {
      arriveAtCurrentStation();
    } else {
      const railwayObserver = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          requestAnimationFrame(() => requestAnimationFrame(arriveAtCurrentStation));
          railwayObserver.disconnect();
        }
      }, { threshold: .12 });
      railwayObserver.observe(careerSection);
    }
    window.addEventListener('resize', () => {
      if (careerSection.classList.contains('railway-active')) arriveAtCurrentStation();
    }, { passive: true });
  }
});
