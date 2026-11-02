/* "Ready for project" — particle text for the clarity section.
   Particles form the text, scatter from cursor, reform after. */
(function () {
  'use strict';

  var TEXT = 'Ready for project';
  var FONT_SIZE = 64;
  var FONT = '600 ' + FONT_SIZE + 'px "Space Grotesk", system-ui, sans-serif';
  var GAP = 4;
  var RADIUS = 90;
  var FORCE = 5;

  function init() {
    var canvas = document.getElementById('readyParticles');
    if (!canvas) return;
    var container = canvas.parentElement;
    if (!container) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var W = 0, H = 0, particles = [];
    var mx = -9999, my = -9999;
    var raf = null;

    function build() {
      // Wait for layout - retry if container has no width yet
      var cw = container.clientWidth;
      if (!cw || cw < 50) {
        setTimeout(build, 200);
        return;
      }

      try {
        var off = document.createElement('canvas');
        var octx = off.getContext('2d', { willReadFrequently: true });
        octx.font = FONT;
        var tw = Math.ceil(octx.measureText(TEXT).width);
        if (!tw || tw < 10) { setTimeout(build, 200); return; }

        var th = FONT_SIZE + 30;
        off.width = tw + 20;
        off.height = th;
        octx.font = FONT;
        octx.textBaseline = 'middle';
        octx.fillStyle = '#fff';
        octx.fillText(TEXT, 10, th / 2);

        var imgData = octx.getImageData(0, 0, off.width, off.height);
        var data = imgData.data;
        var scale = Math.min(1, (cw - 10) / off.width);
        if (scale < 0.1) scale = 0.5;

        W = Math.floor(off.width * scale);
        H = Math.floor(off.height * scale);
        canvas.width = W;
        canvas.height = H;
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';

        particles = [];
        for (var y = 0; y < off.height; y += GAP) {
          for (var x = 0; x < off.width; x += GAP) {
            if (data[(y * off.width + x) * 4 + 3] > 128) {
              var hx = x * scale, hy = y * scale;
              particles.push({ hx: hx, hy: hy, x: hx, y: hy, vx: 0, vy: 0, r: 1 + Math.random() * 1.5 });
            }
          }
        }
        if (!particles.length) { setTimeout(build, 300); return; }
        start();
      } catch (e) {
        setTimeout(build, 500);
      }
    }

    function tick() {
      if (!W || !H) { raf = requestAnimationFrame(tick); return; }
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#1a1a1a';
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var dx = p.x - mx, dy = p.y - my;
        var d2 = dx * dx + dy * dy;
        if (d2 < RADIUS * RADIUS && d2 > 1) {
          var d = Math.sqrt(d2);
          var f = (RADIUS - d) / RADIUS * FORCE;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx += (p.hx - p.x) * 0.05;
        p.vy += (p.hy - p.y) * 0.05;
        p.vx *= 0.9; p.vy *= 0.9;
        p.x += p.vx; p.y += p.vy;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (raf) return;
      tick();
    }

    container.addEventListener('mousemove', function (e) {
      var r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    });
    container.addEventListener('mouseleave', function () { mx = -9999; my = -9999; });
    container.addEventListener('touchmove', function (e) {
      var t = e.touches[0], r = canvas.getBoundingClientRect();
      mx = t.clientX - r.left; my = t.clientY - r.top;
    }, { passive: true });
    container.addEventListener('touchend', function () { mx = -9999; my = -9999; });

    // Wait for fonts, then build
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { setTimeout(build, 100); });
    } else {
      setTimeout(build, 500);
    }
    // Fallback: try again after window load
    window.addEventListener('load', function () { if (!particles.length) build(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
