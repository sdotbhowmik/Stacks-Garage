/* ============================================================
   StackGarage — logo.js
   Coordinates the animated SVG logos.
   - Tags each logo with its role (hero, footer, nav) for downstream styling
   - Re-triggers the hero-load line-draw when the tab regains visibility
   - Respects prefers-reduced-motion at the JS layer

   Note: All actual animations live inside each SVG file's <style>
   block, so they self-execute when the SVG loads as an <img>.
   This script only adds orchestration on top.
   ============================================================ */

(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init() {
    const logos = document.querySelectorAll('img.nav__logo-img');
    if (!logos.length) return;

    logos.forEach(assignRole);

    /* Re-trigger hero draw animation when user returns to the tab */
    if (!reduced) {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') replayHeroDraw();
      });
    }
  }

  function assignRole(img) {
    if (img.closest('.hero')) img.classList.add('logo--hero');
    else if (img.closest('.site-footer')) img.classList.add('logo--footer');
    else img.classList.add('logo--nav');
  }

  function replayHeroDraw() {
    document.querySelectorAll('.logo--hero').forEach((img) => {
      const src = img.getAttribute('src');
      if (!src) return;
      /* Cache-bust to restart the keyframe sequence inside the SVG */
      img.src = src.split('?')[0] + '?t=' + Date.now();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
