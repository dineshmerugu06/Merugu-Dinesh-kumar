/* Liquid sculpture in clarity section — vanilla wrapper for LiquidEngine. */
(function () {
  'use strict';
  function init() {
    var canvas = document.getElementById('clarityCanvas');
    if (!canvas || typeof LiquidEngine === 'undefined') return;
    var root = canvas.closest('.w-clarity');
    if (!root) return;
    var engine = new LiquidEngine(canvas, {
      interactive: true,
      strength: 1,
      radius: 220,
      density: 1,
      dotSize: 1,
      spread: 1,
      turbulence: 1,
      returnSpeed: 1,
      streaks: true,
      restStyle: 'image',
      ambient: false,
      ambientIntensity: 1,
      speed: 1,
      intro: false,
      reducedMotion: false,
      bg: [0.957, 0.945, 0.918],
      imgBg: null,
      liquid: 1
    }, function () {
      root.classList.add('no-gl');
    });
    var img = new Image();
    img.src = 'assets/images/sculpture.webp';
    img.onload = function () { try { engine.setImage(img); } catch (e) {} };
    img.onerror = function () { root.classList.add('no-gl'); };
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
