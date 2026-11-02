/* Liquid Sculpture Hero — vanilla JS wrapper (port of 21st.dev liquid-sculpture-hero) */
(function () {
  var root = document.getElementById('liquid-hero');
  if (!root || !window.LiquidEngine) return;

  var IMG_SRC = 'https://cdn.21st.dev/assets/mirror/ae/ae8c3de9003460e59182e950ccd345f68f27f9d0e4808b64c92c962a4eca7120.webp';
  var BG = window.LiquidHexToRgb('#EBE9E5', [0.92, 0.91, 0.9]);

  var stage = root.querySelector('.sh-stage');
  var imgEl = root.querySelector('.sh-fallback');
  var navEl = root.querySelector('.sh-nav');
  var contentEl = root.querySelector('.sh-content');
  var hintEl = root.querySelector('.sh-hint');
  var backdropEl = root.querySelector('.sh-backdrop');

  var engine = null;
  var aspect = 1983 / 793;
  var canvas = null;
  var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  var touched = false;

  var opts = {
    interactive: true, strength: 1, radius: 220, density: 1, dotSize: 1,
    spread: 1, turbulence: 1, liquid: 1, streaks: true, restStyle: 'image',
    returnSpeed: 1, ambient: false, ambientIntensity: 1, speed: 1,
    intro: true, reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    bg: BG, imgBg: null
  };

  function computeRect(w, h) {
    var bandTop = navEl ? navEl.offsetTop + navEl.offsetHeight + 8 : 16;
    var bandBottom = contentEl ? contentEl.offsetTop - 8 : h;
    var bandH = Math.max(80, bandBottom - bandTop);
    var rw, maxH;
    if (w >= 1024) { rw = w * 1.02; maxH = bandH * 1.1; }
    else if (w >= 640) { rw = w * 1.3; maxH = bandH * 1.15; }
    else { rw = w * 1.9; maxH = bandH * 1.2; }
    if (rw / aspect > maxH) rw = maxH * aspect;
    var rh = rw / aspect;
    var cx = w * 0.5, cy = (bandTop + bandBottom) / 2;
    return { x: cx - rw / 2, y: cy - rh / 2, w: rw, h: rh };
  }

  function relayout() {
    var w = root.clientWidth, h = root.clientHeight;
    var rect = computeRect(w, h);
    if (backdropEl) {
      var chars = Math.max(1, (backdropEl.textContent || '').length);
      backdropEl.style.fontSize = Math.min((rect.y + rect.h - rect.y) * 0.9, (w * 0.92) / (chars * 0.56)) + 'px';
      backdropEl.style.top = (rect.y + rect.h / 2) + 'px';
    }
    if (imgEl) {
      imgEl.style.left = rect.x + 'px'; imgEl.style.top = rect.y + 'px';
      imgEl.style.width = rect.w + 'px'; imgEl.style.height = rect.h + 'px';
    }
    if (hintEl) {
      hintEl.style.left = Math.max(80, Math.min(w - 80, rect.x + rect.w / 2)) + 'px';
      hintEl.style.top = Math.min(rect.y + rect.h * 0.95, h - 120) + 'px';
    }
    if (engine) engine.resize(w, h, rect);
  }

  function fail() { root.dataset.gl = 'off'; }

  function boot() {
    canvas = document.createElement('canvas');
    canvas.className = 'sh-canvas';
    stage.appendChild(canvas);
    try {
      engine = new window.LiquidEngine(canvas, opts, fail);
    } catch (e) { fail(); return; }

    var ro = new ResizeObserver(relayout);
    ro.observe(root);
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++)
        engine.setVisible(entries[i].isIntersecting && !document.hidden);
    });
    io.observe(root);
    document.addEventListener('visibilitychange', function () {
      engine.setVisible(!document.hidden);
    });

    function pos(e) {
      var b = root.getBoundingClientRect();
      return [e.clientX - b.left, e.clientY - b.top];
    }
    function markTouched() {
      if (!touched) { touched = true; root.dataset.touched = '1'; }
    }
    root.addEventListener('pointermove', function (e) {
      var p = pos(e), touch = e.pointerType === 'touch';
      if (touch && e.buttons === 0 && e.pressure === 0) return;
      engine.pointer('move', p[0], p[1], touch);
      markTouched();
    }, { passive: true });
    root.addEventListener('pointerdown', function (e) {
      var p = pos(e);
      engine.pointer('down', p[0], p[1], e.pointerType === 'touch');
      markTouched();
    }, { passive: true });
    root.addEventListener('pointerup', function (e) {
      var p = pos(e);
      engine.pointer('up', p[0], p[1], e.pointerType === 'touch');
    }, { passive: true });
    root.addEventListener('pointerleave', function (e) {
      var p = pos(e);
      engine.pointer('leave', p[0], p[1], e.pointerType === 'touch');
    }, { passive: true });

    // load image
    var image = new Image();
    image.crossOrigin = 'anonymous';
    image.decoding = 'async';
    image.onload = function () {
      aspect = image.naturalWidth / image.naturalHeight || aspect;
      relayout();
      try {
        engine.onFirstFrame = function () { root.dataset.gl = 'on'; };
        engine.setImage(image);
        relayout();
      } catch (e) { fail(); }
    };
    image.onerror = fail;
    image.src = IMG_SRC;
    if (imgEl) imgEl.src = IMG_SRC;
    relayout();
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
