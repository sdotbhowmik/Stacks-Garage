/* ============================================================
   Stacks Garage — faq.js
   Accordion for FAQ items
   ============================================================ */

(function () {
  'use strict';

  function init() {
    const items = document.querySelectorAll('.faq__item');
    if (!items.length) return;

    items.forEach((item) => {
      const q = item.querySelector('.faq__question');
      if (!q) return;
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        items.forEach((i) => i.classList.remove('is-open'));
        if (!isOpen) item.classList.add('is-open');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
