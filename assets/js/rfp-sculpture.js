/* Ready for Project sculpture — vanilla wrapper for LiquidEngine. */
(function () {
  'use strict';
  function init() {
    var canvas = document.getElementById('rfp-canvas');
    if (!canvas || typeof LiquidEngine === 'undefined') return;
    var root = canvas.closest('.rfp');
    if (!root) return;
    var fallback = root.querySelector('.rfp-fallback');
    var engine = new LiquidEngine(canvas, {
      interactive: true, strength: 1, radius: 220, density: 1, dotSize: 1,
      spread: 1, turbulence: 1, returnSpeed: 1, streaks: true, restStyle: 'image',
      ambient: false, ambientIntensity: 1, speed: 1, intro: false, reducedMotion: false,
      bg: [0.957, 0.945, 0.918], imgBg: null, liquid: 1
    }, function () {
      // WebGL failed - show static fallback image
      if (fallback) fallback.style.opacity = '1';
      canvas.style.opacity = '0';
    });
    var img = new Image();
    img.src = 'assets/images/sculpture/sculpture-light.webp';
    img.onload = function () {
      root.dataset.gl = 'on';
      try {
        engine.setImage(img);
        // Position fallback image to match canvas rect
        if (fallback) {
          var r = canvas.getBoundingClientRect();
          var rootRect = root.getBoundingClientRect();
        }
      } catch (e) {
        if (fallback) fallback.style.opacity = '1';
      }
    };
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
