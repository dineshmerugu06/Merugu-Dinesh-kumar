/* Who I Build For — water ripple + services deck (generation phase removed) */
(function () {
  'use strict';

  function init() {
    var section = document.getElementById('for');
    if (!section) return;
    var water = document.getElementById('rippleWater');
    var canvas = document.getElementById('rippleCanvas');
    if (!water || !canvas) return;

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

    // Start the ripple when the section scrolls into view
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            io.disconnect();
            startRipple();
          }
        });
      }, { threshold: 0.25 });
      io.observe(section);
    } else {
      startRipple();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
