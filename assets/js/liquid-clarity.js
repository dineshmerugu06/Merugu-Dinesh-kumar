/* Liquid "Ready for project" — WebGL2 particles for the clarity section.
   Renders text to a canvas, uses it as the particle source image. */
(function () {
  'use strict';

  function makeTextImage(text, font) {
    var c = document.createElement('canvas');
    var ctx = c.getContext('2d', { willReadFrequently: true });
    // Measure
    ctx.font = font;
    var w = Math.ceil(ctx.measureText(text).width) + 40;
    var h = 120;
    c.width = w;
    c.height = h;
    // Draw dark text on transparent (we'll key by alpha)
    ctx.font = font;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#1a1a1a';
    ctx.fillText(text, 20, h / 2);
    var img = new Image();
    img.src = c.toDataURL('image/png');
    return img;
  }

  function init() {
    var canvas = document.getElementById('readyParticles');
    if (!canvas || typeof LiquidEngine === 'undefined') return;

    var container = canvas.parentElement;
    if (!container) return;

    container.style.position = 'relative';
    container.style.minHeight = '140px';
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    var engine = new LiquidEngine(canvas, {
      auto: true,
      interactive: true,
      reducedMotion: false,
      restStyle: 'particles',
      sim: { curl: 0.4, damping: 0.97, flow: 0.08, maxSpeed: 0.8, noise: 1.0 },
      visibility: { threshold: 0.08, margin: 240 },
      dpr: [1, 1.5],
      density: 0.5,
      clearColor: [0, 0, 0, 0]
    });

    var textImg = makeTextImage(
      'Ready for project',
      '600 72px "Space Grotesk", system-ui, sans-serif'
    );

    function start() {
      try {
        engine.setImage(textImg);
      } catch (e) {
        /* engine handles fallback */
      }
    }

    if (textImg.complete && textImg.naturalWidth) {
      start();
    } else {
      textImg.onload = start;
      textImg.onerror = start;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
