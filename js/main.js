/* ============================================================
   Stacks Garage — main.js
   Entry point — boots everything on every page
   ============================================================ */

(function () {
  'use strict';

  /* Scripts are loaded individually with `defer`,
     but we still wait for DOMContentLoaded for safety. */

  document.addEventListener('DOMContentLoaded', () => {
    /* Subtle parallax for hero float icons */
    const floats = document.querySelectorAll('.float-icon');
    if (floats.length) {
      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 14;
        const y = (e.clientY / window.innerHeight - 0.5) * 14;
        floats.forEach((el, i) => {
          const k = (i + 1) * 0.6;
          el.style.transform = `translate(${x * k}px, ${y * k}px)`;
        });
      }, { passive: true });
    }

    /* Smooth scroll for in-page anchors */
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id === '#' || id.length < 2) return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  });
})();
