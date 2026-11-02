/* Ripple deck — circular card navigation */
(function () {
  'use strict';

  var ITEMS = [
    { name: 'Portfolio', role: 'Web Design', desc: 'Stunning portfolio websites that showcase your work and land clients. Built with modern tech, designed to impress.' },
    { name: 'Business', role: 'Business Sites', desc: 'Professional business websites that turn visitors into customers. Fast, trustworthy, built to convert.' },
    { name: 'Templates', role: 'Ready Templates', desc: 'Premium templates, ready to customize and launch fast. Clean code, modern design, yours in minutes.' },
    { name: 'Frontend', role: 'Frontend Dev', desc: 'Clean, fast frontend code built with modern tech. React, animations, and interfaces that feel alive.' }
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

    var order = [0, 1, 2, 3]; // card indices front to back

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
