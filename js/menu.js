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

  /* ---------- Theme-aware logo swap ---------- */
  function initLogoSwap() {
    const logoWhite = document.querySelector('[data-logo="white"]');
    const logoBlack = document.querySelector('[data-logo="black"]');
    if (!logoWhite && !logoBlack) return;

    const sections = document.querySelectorAll('.section-dark, .section-light, .site-header, .site-footer, .page-hero, .hero');
    if (!sections.length || !('IntersectionObserver' in window)) {
      // fallback: ensure one logo visible based on body bg
      return;
    }

    const updateLogos = () => {
      // default to dark (current visible section)
      let bgIsLight = false;
      const visible = [...sections].find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= 100 && r.bottom > 100;
      });
      if (visible && visible.classList.contains('section-light')) bgIsLight = true;
      const nav = document.querySelector('.site-header');
      if (nav) {
        const r = nav.getBoundingClientRect();
        const overLight = visible && visible.classList.contains('section-light');
        // Header is transparent over hero/dark, glass over light
        if (overLight) nav.classList.add('nav--over-light');
        else nav.classList.remove('nav--over-light');
      }

      if (bgIsLight) {
        if (logoBlack) logoBlack.style.display = 'inline-block';
        if (logoWhite) logoWhite.style.display = 'none';
      } else {
        if (logoWhite) logoWhite.style.display = 'inline-block';
        if (logoBlack) logoBlack.style.display = 'none';
      }
    };

    const io = new IntersectionObserver(updateLogos, { threshold: [0, 0.1, 0.5] });
    sections.forEach((s) => io.observe(s));
    window.addEventListener('scroll', updateLogos, { passive: true });
    updateLogos();
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
    initLogoSwap();
    initScrollSpy();
    initHeaderScroll();
  });
})();
