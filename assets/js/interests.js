/* Interests pager — rebuilt 2026-11-04 (no cards).
   Petal-wipe entry transition, dot pager (Chess / Anime / AI),
   ambient drifting petals on canvas. */
(function () {
  var section = document.getElementById('arsenal');
  if (!section) return;
  var stage = document.getElementById('interestStage');
  var slides = Array.prototype.slice.call(stage.querySelectorAll('.interest-slide'));
  var dotsBox = document.getElementById('interestDots');
  var dots = Array.prototype.slice.call(dotsBox.querySelectorAll('button'));
  var idx = 0, timer = null, started = false;

  function go(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle('is-active', k === idx); });
    dots.forEach(function (d, k) { d.classList.toggle('is-active', k === idx); });
  }
  function auto() {
    stop();
    timer = setInterval(function () { go(idx + 1); }, 6000);
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  dots.forEach(function (d) {
    d.addEventListener('click', function () { go(+d.getAttribute('data-go')); auto(); });
  });
  stage.addEventListener('pointerenter', stop);
  stage.addEventListener('pointerleave', auto);

  /* ambient petals */
  var cv = document.getElementById('petalField'), ctx = cv.getContext('2d');
  var petals = [], W = 0, H = 0;
  function sizeCanvas() {
    var r = section.getBoundingClientRect();
    W = cv.width = Math.max(1, Math.floor(r.width));
    H = cv.height = Math.max(1, Math.floor(r.height));
  }
  function seed() {
    petals = [];
    var n = Math.max(8, Math.min(16, Math.floor(W / 110)));
    for (var i = 0; i < n; i++) {
      petals.push({
        x: Math.random() * W, y: Math.random() * H,
        r: 14 + Math.random() * 42,
        vx: 6 + Math.random() * 14, vy: -4 - Math.random() * 10,
        ph: Math.random() * Math.PI * 2,
        a: 0.05 + Math.random() * 0.08
      });
    }
  }
  var last = 0;
  function frame(t) {
    if (!started) return;
    var dt = Math.min(0.05, (t - last) / 1000 || 0.016);
    last = t;
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < petals.length; i++) {
      var p = petals[i];
      p.ph += dt * 0.6;
      p.x += (p.vx + Math.sin(p.ph) * 12) * dt;
      p.y += p.vy * dt;
      if (p.y < -p.r * 2) { p.y = H + p.r; p.x = Math.random() * W; }
      if (p.x > W + p.r * 2) p.x = -p.r;
      var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, 'rgba(195,61,30,' + p.a.toFixed(3) + ')');
      g.addColorStop(1, 'rgba(195,61,30,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.r, p.r * 0.72, Math.sin(p.ph) * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting && !started) {
        started = true;
        section.classList.add('is-in');
        sizeCanvas(); seed();
        requestAnimationFrame(frame);
        auto();
        io.disconnect();
      }
    });
  }, { threshold: 0.25 });
  io.observe(section);
  window.addEventListener('resize', function () { if (started) { sizeCanvas(); seed(); } });
})();
