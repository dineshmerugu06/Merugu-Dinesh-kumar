/* Ripple deck — circular card navigation */
(function () {
  'use strict';

  var ITEMS = [
    { name: 'Website Development', role: '01 — Websites', desc: 'Creating modern, responsive and functional websites tailored to business requirements.' },
    { name: 'Portfolio & Landing Pages', role: '02 — Portfolios', desc: 'Designing visually engaging digital experiences that showcase personal brands, products and services.' },
    { name: 'Dashboards & Web Applications', role: '03 — Web Apps', desc: 'Developing interactive web applications and data-driven interfaces that simplify business operations.' },
    { name: 'Digital Problem Solving', role: '04 — Consulting', desc: 'Understanding real-world challenges and transforming ideas into practical digital solutions.' },
    { name: 'Website Improvements', role: '05 — Redesign', desc: 'Improving existing websites through better design, usability, functionality and user experience.' },
    { name: 'Ready-made Templates & UI Kits', role: '06 — Templates', desc: 'Offering professionally designed, customizable digital products for individuals, developers and businesses.' }
  ];

  function init() {
    var stack = document.getElementById('rippleStack');
    if (!stack) return;
    var cards = Array.prototype.slice.call(stack.querySelectorAll('.r-card'));
    var nameEl = document.getElementById('rippleName');
    var roleEl = document.getElementById('rippleRole');
    var descEl = document.getElementById('rippleDesc');
    var prevBtn = document.getElementById('ripplePrev');
    var nextBtn = document.getElementById('rippleNext');
    if (!cards.length) return;

    var order = [0, 1, 2, 3, 4, 5]; // card indices front to back

    function render() {
      cards.forEach(function (card) {
        var idx = parseInt(card.getAttribute('data-i'), 10);
        var pos = order.indexOf(idx);
        card.setAttribute('data-pos', pos);
      });
      var front = ITEMS[order[0]];
      if (nameEl) nameEl.textContent = front.name;
      if (roleEl) roleEl.textContent = front.role;
      if (descEl) descEl.textContent = front.desc;
    }

    function next() {
      order.push(order.shift());
      render();
    }
    function prev() {
      order.unshift(order.pop());
      render();
    }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    // Auto-advance every 6s (pauses on hover)
    var timer = setInterval(next, 6000);
    var wrap = document.getElementById('rippleDeck');
    if (wrap) {
      wrap.addEventListener('mouseenter', function () { clearInterval(timer); });
      wrap.addEventListener('mouseleave', function () { timer = setInterval(next, 6000); });
    }

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
