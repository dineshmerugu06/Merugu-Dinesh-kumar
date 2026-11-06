/* Water Ripple Section — Phase 1: AI generation blobs, Phase 2: water ripple reveal */
(function () {
  'use strict';

  function init() {
    var section = document.getElementById('for');
    if (!section) return;
    var gen = document.getElementById('rippleGen');
    var water = document.getElementById('rippleWater');
    var pctEl = document.getElementById('ripplePct');
    var etaEl = document.getElementById('rippleEta');
    var genText = document.getElementById('rippleGenText');
    var canvas = document.getElementById('rippleCanvas');
    if (!gen || !water || !canvas) return;

    // Phase 1: AI Generation progress (8 seconds desktop, 2.5s on phones —
    // a blank screen for 8s reads as broken on mobile)
    var progress = 0;
    var duration = (window.matchMedia && window.matchMedia('(max-width: 760px)').matches) ? 2500 : 8000;
    var start = null;
    var phase1Done = false;

    function phase1(ts) {
      if (!start) start = ts;
      var elapsed = ts - start;
      progress = Math.min(100, Math.round((elapsed / duration) * 100));
      if (pctEl) pctEl.textContent = progress + '%';
      var remaining = Math.max(0, Math.ceil((duration - elapsed) / 1000));
      if (etaEl) etaEl.textContent = remaining;

      if (genText) {
        if (progress < 30) genText.textContent = 'Dreaming it up.';
        else if (progress < 80) genText.textContent = 'Painting pixels.';
        else genText.textContent = 'Almost magic.';
      }

      if (progress >= 100 && !phase1Done) {
        phase1Done = true;
        // Transition to Phase 2
        setTimeout(function () {
          gen.style.opacity = '0';
          gen.style.pointerEvents = 'none';
          water.style.opacity = '1';
          water.classList.add('active');
          startRipple();
          if (genText) genText.textContent = 'Image created.';
          setTimeout(function () { gen.style.display = 'none'; }, 800);
        }, 500);
        return;
      }
      if (!phase1Done) requestAnimationFrame(phase1);
    }

    // Phase 2: Water ripple canvas effect
    function startRipple() {
      var ctx = canvas.getContext('2d');
      var w, h;
      var ripples = [];
      var img = new Image();

      function resize() {
        w = canvas.width = section.clientWidth;
        h = canvas.height = section.clientHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      // Create ripple points
      for (var i = 0; i < 8; i++) {
        ripples.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0,
          maxR: 100 + Math.random() * 150,
          speed: 1 + Math.random() * 2,
          alpha: 0.3
        });
      }

      // Use a gradient water background
      function drawWater() {
        // Water gradient background (teal/blue like the reference lake)
        var grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.5, '#f8f8f8');
        grad.addColorStop(1, '#f0f0f0');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Animated wave lines
        ctx.strokeStyle = 'rgba(0,0,0,0.08)';
        ctx.lineWidth = 2;
        var t = Date.now() / 1000;
        for (var y = 0; y < h; y += 30) {
          ctx.beginPath();
          for (var x = 0; x <= w; x += 10) {
            var waveY = y + Math.sin(x / 80 + t * 1.5 + y / 50) * 8;
            if (x === 0) ctx.moveTo(x, waveY);
            else ctx.lineTo(x, waveY);
          }
          ctx.stroke();
        }

        // Expanding ripple circles
        ripples.forEach(function (rp) {
          rp.r += rp.speed;
          if (rp.r > rp.maxR) {
            rp.r = 0;
            rp.x = Math.random() * w;
            rp.y = Math.random() * h;
          }
          var alpha = rp.alpha * (1 - rp.r / rp.maxR);
          ctx.strokeStyle = 'rgba(0,0,0,' + (alpha * 0.6) + ')';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
          ctx.stroke();
          // Inner ripple
          ctx.strokeStyle = 'rgba(0,0,0,' + (alpha * 0.3) + ')';
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.r * 0.7, 0, Math.PI * 2);
          ctx.stroke();
        });

        requestAnimationFrame(drawWater);
      }
      drawWater();
    }

    // Start only when the section scrolls into view
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !phase1Done && progress === 0) {
            io.disconnect();
            requestAnimationFrame(phase1);
          }
        });
      }, { threshold: 0.25 });
      io.observe(section);
    } else {
      requestAnimationFrame(phase1);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
