/* "Ready for project" — lightweight 2D particle text for the clarity section.
   Particles form the text, disperse from cursor like liquid, reform after. */
(function () {
  'use strict';

  var TEXT = 'Ready for project';
  var FONT = '600 64px "Space Grotesk", system-ui, sans-serif';
  var PARTICLE_GAP = 4;       // spacing between particles
  var MOUSE_RADIUS = 80;      // disperse radius
  var MOUSE_FORCE = 6;        // push strength

  function init() {
    var canvas = document.getElementById('readyParticles');
    if (!canvas) return;
    var container = canvas.parentElement;
    if (!container) return;

    var ctx = canvas.getContext('2d');
    var W, H, particles = [];
    var mouse = { x: -9999, y: -9999 };
    var running = false, rafId = null;

    // Render text to offscreen canvas, sample pixels for particle positions
    function buildParticles() {
      var off = document.createElement('canvas');
      var octx = off.getContext('2d', { willReadFrequently: true });
      octx.font = FONT;
      var tw = Math.ceil(octx.measureText(TEXT).width);
      var th = 90;
      off.width = tw + 20;
      off.height = th;
      octx.font = FONT;
      octx.textBaseline = 'middle';
      octx.fillStyle = '#fff';
      octx.fillText(TEXT, 10, th / 2);

      var data = octx.getImageData(0, 0, off.width, off.height).data;
      particles = [];
      for (var y = 0; y < off.height; y += PARTICLE_GAP) {
        for (var x = 0; x < off.width; x += PARTICLE_GAP) {
          if (data[(y * off.width + x) * 4 + 3] > 128) {
            particles.push({
              hx: x, hy: y,           // home position
              x: x, y: y,             // current
              vx: 0, vy: 0,           // velocity
              r: 1.2 + Math.random() * 1.3
            });
          }
        }
      }

      // Size canvas to fit text, scale to container
      var scale = Math.min(1, (container.clientWidth - 20) / off.width);
      W = canvas.width = Math.floor(off.width * scale);
      H = canvas.height = Math.floor(off.height * scale);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';

      // Scale particle home positions
      particles.forEach(function (p) {
        p.hx *= scale; p.hy *= scale;
        p.x = p.hx; p.y = p.hy;
      });
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#1a1a1a';

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        // Mouse repulsion
        var dx = p.x - mouse.x, dy = p.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0.1) {
          var f = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * MOUSE_FORCE;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }

        // Spring back home
        p.vx += (p.hx - p.x) * 0.04;
        p.vy += (p.hy - p.y) * 0.04;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    }

    function start() {
      if (running) return;
      running = true;
      tick();
    }
    function stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    }

    // Mouse tracking (relative to canvas)
    container.addEventListener('mousemove', function (e) {
      var r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });
    container.addEventListener('mouseleave', function () {
      mouse.x = -9999; mouse.y = -9999;
    });
    // Touch support
    container.addEventListener('touchmove', function (e) {
      var t = e.touches[0];
      var r = canvas.getBoundingClientRect();
      mouse.x = t.clientX - r.left;
      mouse.y = t.clientY - r.top;
    }, { passive: true });
    container.addEventListener('touchend', function () {
      mouse.x = -9999; mouse.y = -9999;
    });

    // Only run when visible
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) start(); else stop();
        });
      }, { threshold: 0.1 }).observe(container);
    }

    buildParticles();
    start();

    // Rebuild on resize (debounced)
    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(buildParticles, 250);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
