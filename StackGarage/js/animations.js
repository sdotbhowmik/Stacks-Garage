/* ============================================================
   StackGarage — animations.js
   Counter animations, scroll reveals, intersection triggers
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Reveal on scroll ---------- */
  function initReveals() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
  }

  /* ---------- Counter animation ---------- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target || '0');
    const duration = parseInt(el.dataset.duration || '1800', 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const start = performance.now();
    const isInt = Number.isInteger(target);

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;

      el.textContent = (prefix || '') + (isInt ? Math.floor(value) : value.toFixed(1)) + (suffix || '');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = (prefix || '') + (isInt ? target : target.toFixed(1)) + (suffix || '');
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    const els = document.querySelectorAll('[data-counter]');
    if (!els.length || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    els.forEach((el) => io.observe(el));
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    const onScroll = () => {
      btn.classList.toggle('is-visible', window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    onScroll();
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initReveals();
    initCounters();
    initBackToTop();
  });
})();
