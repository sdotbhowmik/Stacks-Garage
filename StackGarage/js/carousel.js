/* ============================================================
   StackGarage — carousel.js
   Testimonial carousel (CSS scroll-snap, JS arrow navigation)
   ============================================================ */

(function () {
  'use strict';

  function init() {
    const carousel = document.querySelector('.testimonials');
    if (!carousel) return;

    const track = carousel.querySelector('.testimonials__track');
    const prev = carousel.querySelector('.testimonials__nav [data-dir="prev"]');
    const next = carousel.querySelector('.testimonials__nav [data-dir="next"]');
    if (!track) return;

    const stepSize = () => {
      const card = track.querySelector('.testimonial');
      if (!card) return track.clientWidth * 0.85;
      const style = getComputedStyle(track);
      const gap = parseInt(style.columnGap || style.gap || '24', 10);
      return card.getBoundingClientRect().width + gap;
    };

    const scrollBy = (dir) => {
      track.scrollBy({ left: dir * stepSize(), behavior: 'smooth' });
    };

    prev && prev.addEventListener('click', () => scrollBy(-1));
    next && next.addEventListener('click', () => scrollBy(1));
  }

  document.addEventListener('DOMContentLoaded', init);
})();
