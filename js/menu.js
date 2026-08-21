/* ============================================================
   StackGarage — menu.js
   Mobile drawer + theme-aware logo swap
   ============================================================ */

(function () {
  'use strict';

  function initBurger() {
    const burger = document.querySelector('.nav__burger');
    const drawer = document.querySelector('.nav-drawer');
    const backdrop = document.querySelector('.nav-drawer-backdrop');
    if (!burger || !drawer) return;

    const close = () => {
      burger.classList.remove('is-open');
      drawer.classList.remove('is-open');
      backdrop && backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    };
    const open = () => {
      burger.classList.add('is-open');
      drawer.classList.add('is-open');
      backdrop && backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };

    burger.addEventListener('click', () => {
      if (drawer.classList.contains('is-open')) close();
      else open();
    });
    backdrop && backdrop.addEventListener('click', close);
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  /* ---------- Header "over light section" detection ----------
     The logo is a self-contained navy plate (opaque background), so it no
     longer needs a light/dark swap — but the header itself still needs to
     know when it's riding over a light section to adjust link colors. */
  function initNavOverLight() {
    const sections = document.querySelectorAll('.section-dark, .section-light, .site-header, .site-footer, .page-hero, .hero');
    const nav = document.querySelector('.site-header');
    if (!sections.length || !nav || !('IntersectionObserver' in window)) return;

    const update = () => {
      const visible = [...sections].find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= 100 && r.bottom > 100;
      });
      const overLight = !!(visible && visible.classList.contains('section-light'));
      nav.classList.toggle('nav--over-light', overLight);
    };

    const io = new IntersectionObserver(update, { threshold: [0, 0.1, 0.5] });
    sections.forEach((s) => io.observe(s));
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---------- Scroll spy for nav links ---------- */
  function initScrollSpy() {
    const links = document.querySelectorAll('.nav__link[href^="#"]');
    if (!links.length) return;
    const sections = [...links].map((l) => document.querySelector(l.getAttribute('href'))).filter(Boolean);
    if (!sections.length) return;
    const onScroll = () => {
      const offset = 120;
      let active = null;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top - offset <= 0 && r.bottom > offset) { active = s; break; }
      }
      links.forEach((l) => {
        l.classList.toggle('is-active', active && l.getAttribute('href') === '#' + active.id);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Header elevated style on scroll ---------- */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initBurger();
    initNavOverLight();
    initScrollSpy();
    initHeaderScroll();
  });
})();
