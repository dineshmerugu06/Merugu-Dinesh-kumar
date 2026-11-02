/* Liquid sculpture in clarity section — vanilla wrapper for LiquidEngine. */
(function () {
  'use strict';
  function init() {
    var canvas = document.getElementById('clarityCanvas');
    if (!canvas || typeof LiquidEngine === 'undefined') return;
    var root = canvas.closest('.w-clarity');
    if (!root) return;
    var engine = new LiquidEngine(canvas, {
      auto: true, interactive: true, reducedMotion: false, restStyle: 'image',
      sim: { curl: 0.55, damping: 0.965, flow: 0.1, maxSpeed: 0.9, noise: 1.5 },
      visibility: { threshold: 0.05, margin: 200 },
      dpr: [1, 2], clearColor: [0, 0, 0, 0]
    });
    var img = new Image();
    img.src = 'assets/images/sculpture.webp';
    img.onload = function () { try { engine.setImage(img); } catch (e) {} };
    ['pointermove', 'pointerdown'].forEach(function (ev) {
      root.addEventListener(ev, function (e) {
        var r = canvas.getBoundingClientRect();
        engine.pointer('move', e.clientX - r.left, e.clientY - r.top, r.width, r.height);
      }, { passive: true });
    });
    root.addEventListener('pointerleave', function () { engine.pointer('leave'); });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
