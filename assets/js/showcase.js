/* How I Work showcase — east64-style 6-item pinned showcase.
   Left index / center preview / right meta. Auto-rotates, click to jump. */
(function () {
  var sec = document.getElementById('how');
  if (!sec) return;

  var data = [
    { name: 'Discover', sub: 'Understanding the Vision',
      desc: 'I start by understanding your idea, business objectives, target audience and the challenges you want to solve.' },
    { name: 'Analyze', sub: 'Finding the Right Direction',
      desc: 'I break down the problem, identify opportunities and explore possible approaches to find the most effective solution.' },
    { name: 'Strategize', sub: 'Planning the Solution',
      desc: 'I define the concept, features, functionality and technical direction before moving into development.' },
    { name: 'Design', sub: 'Shaping the Experience',
      desc: 'I transform the concept into intuitive interfaces, thoughtful layouts and visually engaging user experiences.' },
    { name: 'Develop', sub: 'Turning Ideas into Reality',
      desc: 'I use modern technologies and AI-assisted development workflows to build responsive, functional and scalable digital solutions.' },
    { name: 'Deliver', sub: 'Bringing It to Life',
      desc: 'I test, refine and deploy the final product, ensuring it works as intended and meets the agreed requirements.' }
  ];

  var rows = Array.prototype.slice.call(sec.querySelectorAll('.sc-index li'));
  var imgs = Array.prototype.slice.call(sec.querySelectorAll('.sc-preview img'));
  var title = document.getElementById('scTitle');
  var desc = document.getElementById('scDesc');
  var metaNum = document.getElementById('scMetaNum');
  var metaName = document.getElementById('scMetaName');
  var metaSub = document.getElementById('scMetaSub');

  var idx = 0, timer = null, started = false;
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  function splitTitle(text) {
    title.innerHTML = '';
    var i = 0;
    Array.prototype.forEach.call(text, function (c) {
      var sp = document.createElement('span');
      sp.className = 'ch';
      sp.textContent = c === ' ' ? '\u00A0' : c;
      sp.style.animationDelay = (i * 28) + 'ms';
      title.appendChild(sp);
      i++;
    });
  }

  function go(i) {
    idx = (i + data.length) % data.length;
    var d = data[idx];
    rows.forEach(function (r, k) { r.classList.toggle('is-active', k === idx); });
    imgs.forEach(function (im, k) { im.classList.toggle('is-active', k === idx); });
    splitTitle(d.name);
    desc.textContent = d.desc;
    metaNum.textContent = pad(idx + 1) + ' / ' + pad(data.length);
    metaName.textContent = d.name.toUpperCase();
    metaSub.textContent = d.sub;
  }

  function auto() {
    stop();
    timer = setInterval(function () { go(idx + 1); }, 7000);
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  rows.forEach(function (r) {
    r.addEventListener('click', function () {
      go(+r.getAttribute('data-i'));
      auto();
    });
  });


  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting && !started) {
        started = true;
        go(0);
        auto();
      }
    });
  }, { threshold: 0.4 });
  io.observe(sec);
})();
