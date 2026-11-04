/* Dinesh PP — welcome / transition / tree choreography.
   Rebuilt from the reference reference sections (study model), vanilla GSAP port. */
(function () {
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- char splitter ---------- */
  function splitChars(el) {
    const text = el.textContent;
    el.textContent = '';
    const chars = [];
    for (const c of text) {
      const s = document.createElement('span');
      s.className = 'ch';
      s.textContent = c === ' ' ? '\u00A0' : c;
      el.appendChild(s);
      chars.push(s);
    }
    return chars;
  }

  /* ---------- 1 · WELCOME intro ---------- */
  // split headline lines for masked rise (wrap first, then hide)
  document.querySelectorAll('.w-head .l').forEach((l) => {
    const inner = document.createElement('span');
    while (l.firstChild) inner.appendChild(l.firstChild);
    l.appendChild(inner);
  });
  gsap.set('.hud-top > *, .w-ver, .w-head .l > span, .w-card, .w-sub', { opacity: 0, y: 26 });
  // giant name: typewriter entrance
  const giantSpan = document.querySelector('.w-giant span');
  let giantChars = [];
  let giantCaret = null;
  if (giantSpan) {
    giantChars = splitChars(giantSpan);
    gsap.set(giantChars, { opacity: 0 });
    giantCaret = document.createElement('span');
    giantCaret.className = 'w-caret';
    giantCaret.setAttribute('aria-hidden', 'true');
    giantSpan.appendChild(giantCaret);
  }
  const intro = gsap.timeline({ delay: 0.35 });
  intro.to('.hud-top > *', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08 }, 0)
       .to('.w-ver', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.1)
       .to('.w-head .l > span', { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 }, 0.15)
       .to('.w-card', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.45)
       .add(() => {
         if (!giantChars.length) return;
         const tw = gsap.timeline();
         giantChars.forEach((ch, i) => {
           tw.call(() => { ch.style.opacity = 1; ch.after(giantCaret); }, null, i * 0.07);
         });
         tw.call(() => { if (giantCaret) giantCaret.style.display = 'none'; },
           null, giantChars.length * 0.07 + 0.9);
       }, 0.55)
       .to('.w-sub', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1 }, 0.6);
  // headline parallax drift on scroll away
  gsap.to('.w-head', {
    yPercent: -18, opacity: 0.25, ease: 'none',
    scrollTrigger: { trigger: '.w-welcome', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.w-giant', {
    yPercent: 24, ease: 'none',
    scrollTrigger: { trigger: '.w-welcome', start: 'top top', end: 'bottom top', scrub: true }
  });
  /* video card autoplays (muted); hover handled in CSS */

  /* ---------- 2 · TRANSITION: pinned 800vh, staged char reveals ---------- */
  const tPhrases = gsap.utils.toArray('.w-transition .t-ph');
  const tChars = tPhrases.map(splitChars);
  const tBar = document.querySelector('.t-progress span');
  const tTl = gsap.timeline({
    scrollTrigger: { trigger: '.w-transition', start: 'top top', end: 'bottom bottom', scrub: 1 }
  });
  tTl.to(tBar, { scaleX: 1, duration: 8, ease: 'none' }, 0);
  // phrase slices mirror the reference: [0.05-0.65], [0.35-0.95], [0.65-1.0] of 8 units
  const slices = [[0.4, 5.2], [2.8, 7.6], [5.2, 8.0]];
  tChars.forEach((chars, i) => {
    const [a, b] = slices[i];
    const mid = (a + b) / 2;
    tTl.to(chars, {
      opacity: 1, filter: 'blur(0px)', y: 0, duration: (mid - a), ease: 'none', stagger: (mid - a) / chars.length / 2
    }, a);
    tTl.to(chars, {
      opacity: 0.08, filter: 'blur(12px)', y: -30, duration: (b - mid), ease: 'none', stagger: (b - mid) / chars.length / 2
    }, mid);
    // dragon roars at each blood text the moment it fully appears
    tTl.call(() => { if (window.__dragonRoar) window.__dragonRoar(); }, null, mid);
  });
  gsap.set(tChars.flat(), { y: 30 });

  /* blood drips canvas — liquid blood running from the text */
  (function () {
    const cv = document.getElementById('bloodCanvas');
    if (!cv || !window.ScrollTrigger) return;
    const ctx = cv.getContext('2d');
    let W = 0, H = 0, startY = 0;
    const drips = [], drops = [];
    let running = false;

    function size() {
      const r = cv.getBoundingClientRect();
      W = cv.width = Math.max(2, r.width);
      H = cv.height = Math.max(2, r.height);
      startY = H * 0.14;
    }
    size();
    window.addEventListener('resize', size);

    function spawn() {
      const x = W * (0.18 + Math.random() * 0.64);
      drips.push({
        x: x, len: 0,
        maxLen: H * (0.10 + Math.random() * 0.28),
        w: 4 + Math.random() * 7,
        speed: 0.5 + Math.random() * 1.4
      });
    }

    function strand(d) {
      const y0 = startY;
      const g = ctx.createLinearGradient(d.x - d.w / 2, 0, d.x + d.w / 2, 0);
      g.addColorStop(0, '#4d0810');
      g.addColorStop(0.42, '#a3121f');
      g.addColorStop(0.55, '#e53242');
      g.addColorStop(1, '#4d0810');
      ctx.fillStyle = g;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(d.x - d.w / 2, y0, d.w, d.len, d.w / 2);
      else ctx.rect(d.x - d.w / 2, y0, d.w, d.len);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(d.x, y0 + d.len, d.w * 0.62, d.w * 0.85, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#8e0f1d';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(d.x - d.w * 0.18, y0 + d.len - d.w * 0.22, d.w * 0.2, d.w * 0.3, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,120,130,.5)';
      ctx.fill();
    }

    (function draw() {
      requestAnimationFrame(draw);
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      if (Math.random() < 0.05 && drips.length < 16) spawn();
      for (let i = drips.length - 1; i >= 0; i--) {
        const d = drips[i];
        if (d.len < d.maxLen) d.len += d.speed;
        else if (Math.random() < 0.015) {
          drops.push({ x: d.x + (Math.random() - 0.5) * 4, y: startY + d.len, r: d.w * 0.55, vy: 0.5 });
          d.len = d.maxLen * 0.4;
          d.maxLen = d.len;
        }
        strand(d);
      }
      for (let i = drops.length - 1; i >= 0; i--) {
        const p = drops[i];
        p.vy += 0.22; p.y += p.vy;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r * 0.8, p.r * 1.15, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#7d0d1a';
        ctx.fill();
        if (p.y > H + 30) drops.splice(i, 1);
      }
    })();

    ScrollTrigger.create({
      trigger: '.w-transition', start: 'top bottom', end: 'bottom top',
      onToggle: (self) => {
        running = self.isActive;
        if (running) size();
        else { ctx.clearRect(0, 0, W, H); drips.length = 0; drops.length = 0; }
      }
    });
  })();

  // blood splatter fades in with the first phrase, out at the end
  tTl.to('.t-splat', { opacity: 0.85, duration: 1.2, ease: 'none', stagger: 0.25 }, 0.8);
  tTl.to('.t-splat', { opacity: 0, duration: 0.8, ease: 'none' }, 7.2);

  /* ---------- 3 · TREE ---------- */
  const treeSec = document.querySelector('.w-tree');
  if (treeSec) {
    // staged text
    const treePhrases = gsap.utils.toArray('.tree-stage .t-ph');
    const treeChars = treePhrases.map(splitChars);
    gsap.set(treeChars.flat(), { y: 30 });
    const treeTl = gsap.timeline({
      scrollTrigger: { trigger: '.tree-stage-wrap', start: 'top top', end: 'bottom bottom', scrub: 1 }
    });
    const T = 4; // timeline units
    treeChars.forEach((chars, i) => {
      const a = i * (T / 2), b = a + T / 2;
      treeTl.to(chars, {
        opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.55, ease: 'none', stagger: 0.02
      }, a);
      treeTl.to(chars, {
        opacity: 0.08, filter: 'blur(12px)', y: -26, duration: 0.45, ease: 'none', stagger: 0.015
      }, b);
    });
    /* waterfall canvases */
    function makeFalls(id, n, alpha) {
      const cv = document.getElementById(id);
      if (!cv) return;
      const ctx = cv.getContext('2d');
      let W, H, running = true;
      const drops = [];
      function size() {
        const r = cv.parentElement.getBoundingClientRect();
        W = cv.width = Math.max(2, r.width); H = cv.height = Math.max(2, r.height);
        drops.length = 0;
        for (let i = 0; i < n; i++) drops.push({
          x: Math.random() * W, y: Math.random() * H,
          len: 60 + Math.random() * 160, sp: 2 + Math.random() * 5,
          w: 1 + Math.random() * 2
        });
      }
      size(); window.addEventListener('resize', size);
      new IntersectionObserver((es) => { running = es[0].isIntersecting; }).observe(cv);
      (function draw() {
        requestAnimationFrame(draw);
        if (!running) return;
        ctx.clearRect(0, 0, W, H);
        for (const d of drops) {
          d.y += d.sp;
          if (d.y - d.len > H) { d.y = -d.len; d.x = Math.random() * W; }
          const g = ctx.createLinearGradient(0, d.y - d.len, 0, d.y);
          g.addColorStop(0, 'rgba(255,255,255,0)');
          g.addColorStop(1, `rgba(255,255,255,${alpha})`);
          ctx.strokeStyle = g; ctx.lineWidth = d.w;
          ctx.beginPath(); ctx.moveTo(d.x, d.y - d.len); ctx.lineTo(d.x, d.y); ctx.stroke();
        }
      })();
    }
    makeFalls('fallsBack', 90, 0.5);
    makeFalls('fallsFront', 50, 0.35);

    /* impulse string — pointer-reactive spring curve */
    const path = document.getElementById('stringPath');
    if (path) {
      let px = 500, pv = 0, tx = 500, py = 30, tv = 0, ty = 30;
      const svg = path.closest('svg');
      svg.parentElement.style.pointerEvents = 'auto';
      svg.parentElement.addEventListener('pointermove', (e) => {
        const r = svg.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width) * 1000;
        ty = ((e.clientY - r.top) / r.height) * 60;
      });
      svg.parentElement.addEventListener('pointerleave', () => { tx = 500; ty = 30; });
      (function strTick() {
        requestAnimationFrame(strTick);
        pv += (tx - px) * 0.06; pv *= 0.86; px += pv;
        tv += (ty - py) * 0.09; tv *= 0.82; py += tv;
        path.setAttribute('d', `M0 30 Q ${px.toFixed(1)} ${py.toFixed(1)} 1000 30`);
      })();
    }
  }

  /* ---------- 5–9 · headline reveals ---------- */
  gsap.utils.toArray('.t-head').forEach((h) => {
    gsap.from(h, {
      y: 60, opacity: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: h, start: 'top 86%', once: true }
    });
  });
  /* ---------- header adapts over light sections ---------- */
  const hud = document.querySelector('.hud-top');
  if (hud) {
    document.querySelectorAll('.w-tree, .w-masonry, .w-clarity').forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec, start: 'top 64px', end: 'bottom 64px',
        onToggle: (self) => hud.classList.toggle('on-light', self.isActive)
      });
    });
  }

  /* ---------- footer clock ---------- */
  const fc2 = document.getElementById('footClock2');
  if (fc2) {
    const tick = () => {
      try { fc2.textContent = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }); } catch (e) {}
    };
    tick(); setInterval(tick, 1000);
  }



  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
