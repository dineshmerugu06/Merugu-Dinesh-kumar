/* Ready for Project sculpture — vanilla wrapper for LiquidEngine.
   Positions the sculpture like the 21st.dev reference: centered,
   slightly above middle, occupying ~55-60% of section height. */
(function () {
  'use strict';
  function init() {
    var canvas = document.getElementById('rfp-canvas');
    if (!canvas || typeof LiquidEngine === 'undefined') return;
    var root = canvas.closest('.rfp');
    if (!root) return;
    var stage = root.querySelector('.rfp-stage');
    if (!stage) return;

    var engine = new LiquidEngine(canvas, {
      interactive: true, strength: 1, radius: 220, density: 1, dotSize: 1,
      spread: 1, turbulence: 1, returnSpeed: 1, streaks: true, restStyle: 'image',
      ambient: false, ambientIntensity: 1, speed: 1, intro: false, reducedMotion: false,
      bg: [0.957, 0.945, 0.918], imgBg: null, liquid: 1
    }, function () {
      root.dataset.gl = 'off';
    });

    var aspect = 1983 / 793;
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'assets/images/sculpture/sculpture-light.webp';

    function layout() {
      var w = root.clientWidth;
      var h = root.clientHeight;
      // Sculpture band: top 5% to 65% of section (like reference: centered slightly above middle)
      var bandTop = h * 0.05;
      var bandBottom = h * 0.68;
      var bandH = bandBottom - bandTop;
      // Reference: rw = w * 1.02, maxH = bandH * 1.1
      var rw = w * 1.02;
      var maxH = bandH * 1.1;
      if (rw / aspect > maxH) rw = maxH * aspect;
      var rh = rw / aspect;
      var cx = w * 0.5;
      var cy = (bandTop + bandBottom) / 2;
      var rect = { x: cx - rw / 2, y: cy - rh / 2, w: rw, h: rh };
      engine.resize(w, h, rect);
      // Position fallback image
      var fallback = root.querySelector('.rfp-fallback');
      if (fallback) {
        fallback.style.left = rect.x + 'px';
        fallback.style.top = rect.y + 'px';
        fallback.style.width = rect.w + 'px';
        fallback.style.height = rect.h + 'px';
      }
      // Position backdrop text
      var backdrop = root.querySelector('.rfp-backdrop');
      if (backdrop) {
        backdrop.style.fontSize = Math.min(bandH * 0.95, (w * 0.92) / 5 * 0.56) + 'px';
        backdrop.style.top = cy + 'px';
      }
      // Position hint
      var hint = root.querySelector('.rfp-hint');
      if (hint) {
        hint.style.left = '50%';
        hint.style.top = Math.min(rect.y + rect.h * 0.95, bandBottom - 20) + 'px';
      }
    }

    img.onload = function () {
      try {
        aspect = img.naturalWidth / img.naturalHeight || aspect;
        engine.setImage(img);
        root.dataset.gl = 'on';
        layout();
      } catch (e) {
        root.dataset.gl = 'off';
      }
    };
    img.onerror = function () { root.dataset.gl = 'off'; };

    // Pointer events
    ['pointermove', 'pointerdown'].forEach(function (ev) {
      root.addEventListener(ev, function (e) {
        var r = canvas.getBoundingClientRect();
        var touch = e.pointerType === 'touch';
        engine.pointer(ev === 'pointermove' ? 'move' : 'down', e.clientX - r.left, e.clientY - r.top, touch);
      }, { passive: true });
    });
    root.addEventListener('pointerup', function (e) {
      var r = canvas.getBoundingClientRect();
      engine.pointer('up', e.clientX - r.left, e.clientY - r.top, e.pointerType === 'touch');
    });
    root.addEventListener('pointerleave', function (e) {
      var r = canvas.getBoundingClientRect();
      engine.pointer('leave', e.clientX - r.left, e.clientY - r.top, false);
    });

    // Resize handling
    var ro = new ResizeObserver(function () { layout(); });
    ro.observe(root);
    window.addEventListener('resize', layout);
    // Initial layout
    layout();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
