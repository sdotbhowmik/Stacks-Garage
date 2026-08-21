/* ============================================================
   Stacks Garage — portfolio.js
   Category filter for project grid
   ============================================================ */

(function () {
  'use strict';

  function init() {
    const filters = document.querySelectorAll('.portfolio-filters button');
    const cards = document.querySelectorAll('.portfolio-card');
    if (!filters.length || !cards.length) return;

    const setActive = (btn) => {
      filters.forEach((b) => b.classList.toggle('is-active', b === btn));
    };

    filters.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = (btn.dataset.filter || '').toLowerCase();
        setActive(btn);

        cards.forEach((card) => {
          const cats = (card.dataset.category || '').toLowerCase().split(',').map((s) => s.trim());
          const match = !filter || filter === 'all' || cats.includes(filter);
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          if (match) {
            card.style.display = '';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.92)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
