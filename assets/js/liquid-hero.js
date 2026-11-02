/* Liquid sculpture hero — vanilla wrapper for LiquidEngine.
   Loads local sculpture image, handles resize and pointer. */
(function () {
  'use strict';

  function init() {
    var canvas = document.getElementById('sh-canvas');
    if (!canvas || typeof LiquidEngine === 'undefined') return;
    var root = document.getElementById('top');
    if (!root) return;

    var engine = new LiquidEngine(canvas, {
      auto: true,
      interactive: true,
      reducedMotion: false,
      restStyle: 'image',
      sim: { curl: 0.55, damping: 0.965, flow: 0.1, maxSpeed: 0.9, noise: 1.5 },
      visibility: { threshold: 0.05, margin: 200 },
      dpr: [1, 2],
      clearColor: [0, 0, 0, 0]
    });

    var img = new Image();
    img.src = 'assets/images/sculpture.webp';
    img.onload = function () {
      try { engine.setImage(img); } catch (e) {}
    };
    img.onerror = function () {
      root.classList.add('sh-no-gl');
    };

    // Pointer events on the hero section
    ['pointermove', 'pointerdown'].forEach(function (ev) {
      root.addEventListener(ev, function (e) {
        var r = canvas.getBoundingClientRect();
        engine.pointer('move', e.clientX - r.left, e.clientY - r.top, r.width, r.height);
      }, { passive: true });
    });
    root.addEventListener('pointerleave', function () {
      engine.pointer('leave');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
