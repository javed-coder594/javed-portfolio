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

  if (!hero || reduceMotion || window.matchMedia('(max-width: 760px)').matches || navigator.connection?.saveData) return;

  // Lightweight interactive particle network, attached to the actual hero markup.
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-particle-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  hero.prepend(canvas);
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const pointer = { x: -1000, y: -1000 };
  const points = [];
  let width = 0, height = 0, frame = 0, running = false, last = 0;
  const isMobile = window.matchMedia('(max-width: 760px)').matches;
  const count = isMobile ? 0 : 16;

  for (let i = 0; i < count; i++) {
    points.push({
      x: Math.random() * hero.clientWidth,
      y: Math.random() * hero.clientHeight,
      vx: (Math.random() - 0.5) * 0.24,
      vy: (Math.random() - 0.5) * 0.24,
      r: 0.7 + Math.random() * 1.1
    });
  }

  const resize = () => {
    const rect = hero.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });
  hero.addEventListener('pointermove', event => {
    const rect = hero.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
  }, { passive: true });
  hero.addEventListener('pointerleave', () => {
    pointer.x = -1000;
    pointer.y = -1000;
  }, { passive: true });

  const draw = time => {
    if (!running) return;
    if (time - last < 50) { frame = requestAnimationFrame(draw); return; }
    last = time;
    ctx.clearRect(0, 0, width, height);
    points.forEach((point, i) => {
      point.x += point.vx;
      point.y += point.vy;
      if (point.x < 0 || point.x > width) point.vx *= -1;
      if (point.y < 0 || point.y > height) point.vy *= -1;

      const dx = point.x - pointer.x, dy = point.y - pointer.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 90 && distance > 0) {
        point.x += (dx / distance) * 0.8;
        point.y += (dy / distance) * 0.8;
      }

      ctx.beginPath();
      ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
      ctx.fillStyle = i % 4 === 0 ? 'rgba(244,75,67,.9)' : 'rgba(73,174,218,.82)';
      ctx.fill();

      for (let j = i + 1; j < points.length; j++) {
        const other = points[j];
        const lineDistance = Math.hypot(point.x - other.x, point.y - other.y);
        if (lineDistance < 82) {
          const alpha = (1 - lineDistance / 82) * 0.18;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = i % 3 === 0
            ? 'rgba(244,75,67,' + alpha + ')'
            : 'rgba(73,174,218,' + alpha + ')';
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    });
    frame = requestAnimationFrame(draw);
  };

  const visibility = new IntersectionObserver(entries => {
    running = entries[0].isIntersecting && !document.hidden;
    if (running) { last = 0; frame = requestAnimationFrame(draw); }
    else cancelAnimationFrame(frame);
  }, { threshold: 0.01 });
  visibility.observe(hero);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { running = false; cancelAnimationFrame(frame); }
    else if (hero.getBoundingClientRect().bottom > 0 && hero.getBoundingClientRect().top < innerHeight) {
      running = true; last = 0; frame = requestAnimationFrame(draw);
    }
  });

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
