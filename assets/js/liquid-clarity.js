/* Liquid "Ready for project" — WebGL2 particle text for the clarity section.
   Uses LiquidEngine in TEXT mode. Vanilla port of the 21st.dev component logic. */
(function () {
  'use strict';

  function init() {
    var canvas = document.getElementById('readyParticles');
    if (!canvas || typeof LiquidEngine === 'undefined') return;

    var container = canvas.parentElement;
    if (!container) return;

    // Size the container for the text
    container.style.position = 'relative';
    container.style.minHeight = '120px';
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    var engine = new LiquidEngine(canvas, {
      auto: true,
      interactive: true,
      reducedMotion: false,
      restStyle: 'particles',  // particles stay visible (not image mode)
      sim: { curl: 0.55, damping: 0.965, flow: 0.1, maxSpeed: 0.9, noise: 1.5 },
      visibility: { threshold: 0.08, margin: 240 },
      dpr: [1, 2],
      clearColor: [0, 0, 0, 0],  // transparent (section has light bg)
      image: {
        mode: 'text',
        text: 'Ready for project',
        font: '600 64px "Space Grotesk", system-ui, sans-serif',
        fit: 'contain',
        padX: 0.06,
        padY: 0.15,
        sample: 3,  // denser sampling for text
        ink: [0.08, 0.08, 0.08, 1],  // dark text color
        inkMode: 'tint'
      }
    });

    // Trigger formation when scrolled into view
    if ('IntersectionObserver' in window) {
      var seen = false;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !seen) {
            seen = true;
            engine.setText('Ready for project');
            io.disconnect();
          }
        });
      }, { threshold: 0.25 });
      io.observe(container);
    } else {
      engine.setText('Ready for project');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
