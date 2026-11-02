/* Particle text: "Ready for project" — liquid particles that disperse on cursor, reform */
(function () {
  var canvas = document.getElementById('readyParticles');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var W = 440, H = 160;
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = W * DPR;
  canvas.height = H * DPR;
  canvas.style.width = '100%';
  canvas.style.maxWidth = W + 'px';
  canvas.style.height = 'auto';
  ctx.scale(DPR, DPR);

  var TEXT = 'Ready for project';
  var particles = [];
  var mouse = { x: -9999, y: -9999 };

  // Offscreen: render text, sample pixels for target positions
  function buildTargets() {
    var off = document.createElement('canvas');
    off.width = W; off.height = H;
    var octx = off.getContext('2d');
    octx.fillStyle = '#000';
    octx.fillRect(0, 0, W, H);
    octx.fillStyle = '#fff';
    octx.textAlign = 'center';
    octx.textBaseline = 'middle';
    var fs = 44;
    octx.font = '600 ' + fs + 'px "Space Grotesk", system-ui, sans-serif';
    // shrink to fit
    while (octx.measureText(TEXT).width > W - 30 && fs > 10) {
      fs -= 2;
      octx.font = '600 ' + fs + 'px "Space Grotesk", system-ui, sans-serif';
    }
    octx.fillText(TEXT, W / 2, H / 2);
    var data = octx.getImageData(0, 0, W, H).data;
    var pts = [];
    var gap = 3;
    for (var y = 0; y < H; y += gap) {
      for (var x = 0; x < W; x += gap) {
        if (data[(y * W + x) * 4] > 128) pts.push({ x: x, y: y });
      }
    }
    return pts;
  }

  function init() {
    var targets = buildTargets();
    particles = targets.map(function (p) {
      return {
        tx: p.x, ty: p.y,
        x: Math.random() * W, y: Math.random() * H,
        vx: 0, vy: 0,
        r: Math.random() * 1.6 + 0.6
      };
    });
  }

  canvas.addEventListener('pointermove', function (e) {
    var r = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) * (W / r.width);
    mouse.y = (e.clientY - r.top) * (H / r.height);
  });
  canvas.addEventListener('pointerleave', function () {
    mouse.x = -9999; mouse.y = -9999;
  });

  function tick() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#101214';
    var MR = 70; // mouse repel radius
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      // spring back to text position
      p.vx += (p.tx - p.x) * 0.02;
      p.vy += (p.ty - p.y) * 0.02;
      // liquid repel near cursor
      var dx = p.x - mouse.x, dy = p.y - mouse.y;
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d < MR && d > 0.1) {
        var f = (MR - d) / MR * 6;
        p.vx += (dx / d) * f;
        p.vy += (dy / d) * f;
      }
      p.vx *= 0.88; p.vy *= 0.88;
      p.x += p.vx; p.y += p.vy;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  // rebuild on font load (Space Grotesk may arrive late)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { init(); });
  }
  init();
  tick();
})();
