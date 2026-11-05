/* ══════════ 9 · STARBURST THANKS FOOTER (vanilla port of starburst-thanks-footer.tsx) ══════════ */
(function () {
  'use strict';

  /* ---------- config : Dinesh's data ---------- */
  var STF = {
    name: 'Dinesh Kumar',
    thanks: ['Thank you', 'Dhanyavaadalu', 'Gracias', 'Merci', 'Danke', 'Grazie', 'Arigato'],
    tagline: 'for stopping by',
    email: 'dinesh.merugu.kumar@gmail.com',
    phone: '',
    copiedLabel: 'Copied!',
    starPoints: 10,
    links: [
      { caption: 'Projects', label: 'my work', href: 'projects/' },
      { caption: "Let's connect", label: '+91 93983 59538', href: 'tel:+919398359538' }
    ]
  };

  /* ---------- pure geometry (lifted from the component) ---------- */
  function hash(n) { var s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
  function round(v) { return Math.round(v * 100) / 100; }

  var GLYPHS = {
    A:[6,"M0 10L3 0L6 10M1.2 6.2L4.8 6.2"],B:[5.6,"M0 10L0 0L3.2 0Q5.2 0 5.2 2.4Q5.2 4.8 3 4.8L0 4.8M3 4.8Q5.6 4.8 5.6 7.4Q5.6 10 3 10L0 10"],
    C:[5.5,"M5.5 1.2Q4.6 0 3 0Q0 0 0 5Q0 10 3 10Q4.6 10 5.5 8.8"],D:[5.6,"M0 0L0 10L2.6 10Q5.6 10 5.6 5Q5.6 0 2.6 0Z"],
    E:[5,"M5 0L0 0L0 10L5 10M0 5L3.8 5"],F:[5,"M5 0L0 0L0 10M0 5L3.8 5"],
    G:[6,"M5.6 1.4Q4.6 0 3 0Q0 0 0 5Q0 10 3 10Q6 10 6 6L3.4 6"],H:[5.6,"M0 0L0 10M5.6 0L5.6 10M0 5L5.6 5"],
    I:[1,"M0.5 0L0.5 10"],J:[4.6,"M4.6 0L4.6 7Q4.6 10 2.3 10Q0 10 0 7.6"],K:[5.4,"M0 0L0 10M5.4 0L0 6.2M1.8 4.6L5.4 10"],
    L:[4.6,"M0 0L0 10L4.6 10"],M:[7,"M0 10L0.6 0L3.5 7L6.4 0L7 10"],N:[5.6,"M0 10L0 0L5.6 10L5.6 0"],
    O:[6,"M3 0Q0 0 0 5Q0 10 3 10Q6 10 6 5Q6 0 3 0Z"],P:[5.2,"M0 10L0 0L3 0Q5.2 0 5.2 2.7Q5.2 5.4 3 5.4L0 5.4"],
    Q:[6.4,"M3 0Q0 0 0 5Q0 10 3 10Q6 10 6 5Q6 0 3 0ZM3.6 7L6.4 10.6"],R:[5.4,"M0 10L0 0L3 0Q5.2 0 5.2 2.7Q5.2 5.4 3 5.4L0 5.4M2.4 5.4L5.4 10"],
    S:[5.2,"M5 1.2Q4.2 0 2.6 0Q0.2 0 0.2 2.5Q0.2 4.6 2.6 5Q5.2 5.5 5.2 7.6Q5.2 10 2.6 10Q0.8 10 0 8.6"],
    T:[6,"M0 0L6 0M3 0L3 10"],U:[5.6,"M0 0L0 7Q0 10 2.8 10Q5.6 10 5.6 7L5.6 0"],V:[6,"M0 0L3 10L6 0"],
    W:[8,"M0 0L1.9 10L4 2.6L6.1 10L8 0"],X:[5.6,"M0 0L5.6 10M5.6 0L0 10"],Y:[5.6,"M0 0L2.8 5L5.6 0M2.8 5L2.8 10"],
    Z:[5.4,"M0 0L5.4 0L0 10L5.4 10"],
    "0":[5,"M2.5 0Q0 0 0 5Q0 10 2.5 10Q5 10 5 5Q5 0 2.5 0Z"],"1":[3,"M0 2L2 0L2 10"],
    "2":[5,"M0 2Q0.6 0 2.6 0Q5 0 5 2.6Q5 4.6 0 10L5 10"],
    "3":[5.2,"M0 1Q1 0 2.5 0Q5 0 5 2.4Q5 4.8 2.2 4.8Q5.2 4.8 5.2 7.4Q5.2 10 2.5 10Q0.8 10 0 8.8"],
    "4":[5.4,"M4 10L4 0L0 7L5.4 7"],"5":[5,"M5 0L0.6 0L0.2 4.6Q1.2 4 2.6 4Q5 4 5 7Q5 10 2.4 10Q0.8 10 0 8.8"],
    "6":[5,"M4.6 0.8Q3.8 0 2.6 0Q0 0 0 5.6Q0 10 2.5 10Q5 10 5 7.2Q5 4.6 2.6 4.6Q0.8 4.6 0 6"],
    "7":[5,"M0 0L5 0L1.6 10"],
    "8":[5,"M2.5 4.8Q0.2 4.8 0.2 2.4Q0.2 0 2.5 0Q4.8 0 4.8 2.4Q4.8 4.8 2.5 4.8Q0 4.8 0 7.4Q0 10 2.5 10Q5 10 5 7.4Q5 4.8 2.5 4.8Z"],
    "9":[5,"M5 4Q4.2 5.4 2.4 5.4Q0 5.4 0 2.7Q0 0 2.5 0Q5 0 5 4L5 6Q5 10 2.4 10Q1 10 0.2 9"],
    "!":[1,"M0.5 0L0.5 6.8M0.5 9.4L0.5 10"],"?":[4.6,"M0 1.6Q0.6 0 2.4 0Q4.6 0 4.6 2.4Q4.6 4 2.4 5.2L2.4 7M2.4 9.4L2.4 10"],
    ".":[1,"M0.5 9.4L0.5 10"],",":[1.4,"M0.9 9.2L0.3 11"],"'":[1,"M0.5 0L0.5 2.6"],
    ":":[1,"M0.5 3L0.5 3.6M0.5 9.4L0.5 10"],"-":[3.6,"M0 5.4L3.6 5.4"],"/":[4,"M4 0L0 10"],
    "&":[6,"M6 10L1.4 3.4Q0.6 2 1.6 0.8Q2.6 0 3.6 0.8Q4.4 2 2.6 3.8L1 5.4Q0 6.6 0 8Q0 10 2.2 10Q4 10 5.6 6.6"]
  };
  var SPACE = 3.2, TRACK = 1.9;

  function layoutScript(text, seed, track, jitter) {
    seed = seed == null ? 1 : seed; track = track == null ? TRACK : track; jitter = jitter == null ? 1 : jitter;
    var clean = String(text == null ? '' : text).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
    var glyphs = [], x = 0, i, g;
    for (i = 0; i < clean.length; i++) {
      g = GLYPHS[clean[i]];
      if (!g) { x += SPACE; continue; }
      glyphs.push({ d: g[1], x: round(x), w: g[0],
        dy: round((hash(i * 7.31 + seed * 13.7) - 0.5) * 1.1 * jitter),
        rot: round((hash(i * 3.17 + seed * 5.3) - 0.5) * 8 * jitter) });
      x += g[0] + track;
    }
    var last = glyphs[glyphs.length - 1];
    return { glyphs: glyphs, width: last ? round(last.x + last.w) : 0 };
  }

  function starPath(points, outer, inner, cx, cy, wobble, seed) {
    cx = cx || 0; cy = cy || 0; wobble = wobble || 0; seed = seed || 0;
    var n = Math.max(3, Math.floor(points) || 3), pts = [], i, a, r;
    for (i = 0; i < n * 2; i++) {
      a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2;
      r = i % 2 ? inner : outer * (1 + (hash(i * 9.7 + seed) - 0.5) * wobble);
      pts.push(round(cx + Math.cos(a) * r) + ' ' + round(cy + Math.sin(a) * r));
    }
    return 'M' + pts.join('L') + 'Z';
  }

  function loopPath(w, h, turns, tilt, steps) {
    w = w || 100; h = h || 40; turns = turns || 1.1; tilt = tilt == null ? -5 : tilt; steps = steps || 140;
    var cx = w / 2, cy = h / 2, rx = w * 0.46, ry = h * 0.36,
        tr = (tilt * Math.PI) / 180, ct = Math.cos(tr), st = Math.sin(tr),
        pts = [], i, u, a, k, x, y;
    for (i = 0; i <= steps; i++) {
      u = i / steps; a = Math.PI * 0.92 + u * turns * Math.PI * 2;
      k = 1 - 0.06 * u + 0.015 * Math.sin(a * 3);
      x = Math.cos(a) * rx * k; y = Math.sin(a) * ry * k * (1 + 0.04 * u);
      pts.push(round(cx + x * ct - y * st) + ' ' + round(cy + x * st + y * ct));
    }
    return 'M' + pts.join('L');
  }

  function cycle(i, n) { return (n > 0 && isFinite(i)) ? (((Math.floor(i) + 1) % n) + n) % n : 0; }

  function initialsOf(name) {
    return String(name == null ? '' : name).trim().split(/\s+/).filter(Boolean)
      .slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
  }

  function dust(n, seed) {
    seed = seed || 0;
    var out = [], i, m = Math.max(0, Math.floor(n) || 0);
    for (i = 0; i < m; i++) out.push({
      x: round(hash(i * 1.7 + seed) * 100), y: round(hash(i * 2.9 + seed + 4) * 100),
      s: round(1 + hash(i * 5.3 + seed) * 2.2), o: round(0.12 + hash(i * 8.1 + seed) * 0.4)
    });
    return out;
  }

  /* ---------- static geometry ---------- */
  var ORBIT = loopPath();
  var SEP = starPath(8, 5.6, 1.5);
  var SPECKS = dust(22, 3);
  var SPARKS = [];
  (function () { for (var i = 0; i < 12; i++) SPARKS.push({ a: i * 30 + 15, l: i % 2 ? 0.7 : 1 }); })();
  var HAND = 'M8 13V3.5A2 2 0 0 1 12 3.5V10.5A2 2 0 0 1 16 10.5V11.5A2 2 0 0 1 20 11.5V12.5A1.8 1.8 0 0 1 23.6 12.5V19' +
    'Q23.6 27 16 27H13Q9.5 27 7.6 24L3 17.4Q2 15.6 3.6 14.8Q5 14.2 6.2 15.6L8 18Z';

  /* ---------- builders ---------- */
  function scriptSVG(text, seed, cap, cls, delay, step) {
    delay = delay || 0; step = step == null ? 0.06 : step;
    var lay = layoutScript(text, seed), vbW = lay.width + 6, vbH = 14, paths = '';
    lay.glyphs.forEach(function (g, i) {
      paths += '<path d="' + g.d + '" transform="translate(' + g.x + ' ' + g.dy +
        ') rotate(' + g.rot + ' ' + (g.w / 2) + ' 5)" style="animation-delay:' + (delay + i * step).toFixed(2) + 's"/>';
    });
    return '<svg class="stf-script ' + (cls || '') + '" viewBox="-3 -2 ' + vbW + ' ' + vbH +
      '" style="height:' + (cap * vbH / 10) + 'em;width:' + (cap * vbW / 10) + 'em" aria-hidden="true">' +
      '<g transform="skewX(-12)">' + paths + '</g></svg>';
  }

  function monogram(name) {
    var lay = layoutScript(initialsOf(name), 0, 1.6, 0), vbW = lay.width + 16, paths = '';
    lay.glyphs.forEach(function (g) { paths += '<path d="' + g.d + '" transform="translate(' + g.x + ' 0)"/>'; });
    var words = name.trim().split(/\s+/).filter(Boolean);
    var lines = [words[0] || '', words.slice(1).join(' ')].filter(Boolean);
    return '<span class="stf-logo"><svg class="stf-mark" viewBox="-8 -2 ' + vbW + ' 14" ' +
      'style="height:2.4em;width:' + (2.4 * vbW / 14) + 'em" aria-hidden="true">' +
      '<path class="stf-mark-l" d="M-6 0L-2 5L-6 10"/>' +
      '<path class="stf-mark-r" d="M' + (lay.width + 6) + ' 0L' + (lay.width + 2) + ' 5L' + (lay.width + 6) + ' 10"/>' +
      '<g class="stf-mark-i">' + paths + '</g></svg><span class="stf-name">' +
      lines.map(function (l) { return '<span>' + l + '</span>'; }).join('') + '</span></span>';
  }

  function handSVG() {
    return '<span class="stf-hand" aria-hidden="true"><svg viewBox="0 -5 26 33">' +
      '<path class="stf-click" d="M10 0.2V-3.4M5.6 1.4L3.3-0.9M14.4 1.4L16.7-0.9"/>' +
      '<path class="stf-palm" d="' + HAND + '"/>' +
      '<path class="stf-knuckle" d="M12 10.5V15M16 11.5V15.5M20 12.5V16"/></svg></span>';
  }

  function sepSVG() {
    return '<svg class="stf-sep" viewBox="-6 -6 12 12" aria-hidden="true"><path d="' + SEP + '"/></svg>';
  }

  function stampLengths(root, screen) {
    var paths = root.querySelectorAll('path');
    paths.forEach(function (p) {
      var total = 0;
      try { total = p.getTotalLength(); } catch (e) { return; }
      var len = total;
      if (screen) {
        try {
          var m = p.getScreenCTM(), prev = null, i, q;
          if (m) {
            len = 0;
            for (i = 0; i <= 64; i++) {
              q = p.getPointAtLength((i / 64) * total).matrixTransform(m);
              if (prev) len += Math.hypot(q.x - prev.x, q.y - prev.y);
              prev = q;
            }
            len *= 1.6;
          }
        } catch (e) { len = total; }
      }
      p.style.setProperty('--l', String(Math.ceil(len) + 1));
    });
  }

  /* ---------- assemble ---------- */
  var footer = document.querySelector('.stf');
  if (!footer) return;

  var words = STF.thanks.filter(function (w) { return w && w.trim(); });
  if (!words.length) words = ['Thank you'];
  var idx = 0, burst = 0;

  /* film dust + scratches */
  (function () {
    var fx = document.getElementById('stf-fx'), html = '';
    SPECKS.forEach(function (d) {
      html += '<span class="stf-dust" style="left:' + d.x + '%;top:' + d.y + '%;width:' + d.s + 'px;height:' + d.s + 'px;opacity:' + d.o + '"></span>';
    });
    html += '<span class="stf-scratch" style="left:81%;top:64%;height:9%;transform:rotate(14deg)"></span>';
    html += '<span class="stf-scratch" style="left:13%;top:22%;height:6%;transform:rotate(-8deg)"></span>';
    fx.innerHTML = html;
  })();

  /* logo */
  document.getElementById('stf-logo').innerHTML = monogram(STF.name);

  /* orbit + star geometry */
  document.getElementById('stf-orbit-path').setAttribute('d', ORBIT);
  document.getElementById('stf-star-path').setAttribute('d', starPath(STF.starPoints, 46, 20, 0, 0, 0.22, 2));

  /* headline word */
  function renderWord() {
    var word = words[idx % words.length];
    document.getElementById('stf-sr').textContent = word + ' ' + STF.tagline;
    var chars = '';
    Array.prototype.forEach.call(word, function (c, i) {
      chars += '<span class="stf-ch" style="animation-delay:' + (i * 0.035).toFixed(3) + 's">' +
        (c === ' ' ? '&nbsp;' : c) + '</span>';
    });
    document.getElementById('stf-word').innerHTML = chars;
    document.getElementById('stf-star').setAttribute('aria-label', 'Say thanks another way (now: ' + word + ')');
  }
  renderWord();
  document.getElementById('stf-tagline').innerHTML = scriptSVG(STF.tagline, 3, 0.5, 'stf-tag', 0.6, 0.06);

  /* links */
  (function () {
    var nav = document.getElementById('stf-links'), html = '';
    STF.links.forEach(function (l, i) {
      if (i > 0) html += sepSVG();
      var ext = l.href && /^https?:/.test(l.href);
      html += '<div class="stf-item has-hand"><span class="stf-cap">' +
        (l.caption ? scriptSVG(l.caption, i + 7, 0.78, '', 1.2 + i * 0.5, 0.035) : '') + '</span>' +
        '<span class="stf-pillwrap"><a class="stf-pill" href="' + l.href + '"' +
        (ext ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + l.label + '</a>' + handSVG() + '</span></div>';
    });
    if (STF.email) {
      if (STF.links.length) html += sepSVG();
      html += '<div class="stf-item"><span class="stf-cap stf-cap-copied" id="stf-copied"></span>' +
        '<span class="stf-pillwrap"><button type="button" class="stf-pill" id="stf-copy" title="Copy email address">' +
        STF.email + '</button></span>';
      if (STF.phone) {
        var tel = STF.phone.replace(/[^\d+]/g, '');
        html += '<a class="stf-phone" href="tel:' + tel + '">' + STF.phone + '</a>';
      }
      html += '<span class="stf-sr" role="status" id="stf-copy-status"></span></div>';
    }
    nav.innerHTML = html;
  })();

  /* stroke lengths for the draw-in */
  stampLengths(footer, false);
  stampLengths(document.getElementById('stf-orbit'), true);

  /* reveal once, when first seen */
  (function () {
    if (!('IntersectionObserver' in window)) { footer.classList.add('is-in'); return; }
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) {
        footer.classList.add('is-in');
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(footer);
  })();

  /* starburst: pop, sparks, next language */
  var star = document.getElementById('stf-star'), pop = document.getElementById('stf-pop');
  star.addEventListener('click', function () {
    idx = cycle(idx, words.length);
    renderWord();
    burst++;
    var sparks = document.getElementById('stf-sparks'), html = '';
    SPARKS.forEach(function (s) {
      html += '<span class="stf-spark" style="--a:' + s.a + 'deg;width:' + (62 * s.l) + '%"><i></i></span>';
    });
    sparks.innerHTML = html;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced && pop.animate) {
      pop.animate([
        { transform: 'scale(1) rotate(0deg)' },
        { transform: 'scale(1.25) rotate(200deg)', offset: 0.45 },
        { transform: 'scale(1) rotate(360deg)' }
      ], { duration: 700, easing: 'cubic-bezier(.2,.9,.25,1.1)' });
    }
  });
  star.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); star.click(); }
  });

  /* pointer lean */
  footer.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    var r = footer.getBoundingClientRect();
    if (!r.width || !r.height) return;
    footer.style.setProperty('--stf-px', (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    footer.style.setProperty('--stf-py', (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
  });
  footer.addEventListener('pointerleave', function () {
    footer.style.setProperty('--stf-px', '0');
    footer.style.setProperty('--stf-py', '0');
  });

  /* email copy */
  var copyBtn = document.getElementById('stf-copy');
  if (copyBtn) {
    var copyTimer = null;
    copyBtn.addEventListener('click', function () {
      function done() {
        document.getElementById('stf-copied').innerHTML = scriptSVG(STF.copiedLabel, 11, 0.78, '', 0, 0.035);
        stampLengths(document.getElementById('stf-copied'), false);
        document.getElementById('stf-copy-status').textContent = 'Email address copied';
        if (copyTimer) clearTimeout(copyTimer);
        copyTimer = setTimeout(function () {
          document.getElementById('stf-copied').innerHTML = '';
          document.getElementById('stf-copy-status').textContent = '';
        }, 2400);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(STF.email).then(done, function () { window.location.href = 'mailto:' + STF.email; });
      } else {
        window.location.href = 'mailto:' + STF.email;
      }
    });
  }
})();
