/* ============================================================
   Stacks Garage — typewriter.js
   Cycles through phrases defined in lang/<lang>.json
   ============================================================ */

(function () {
  'use strict';

  function init() {
    const target = document.getElementById('typewriter-text');
    if (!target) return;
    const cursor = document.querySelector('.cursor-blink');

    const getPhrases = () => {
      const fromI18n = window.SG_I18N && window.SG_I18N.t('hero.typewriter_phrases');
      return Array.isArray(fromI18n) && fromI18n.length
        ? fromI18n
        : ["We Build.", "We Host.", "We Scale."];
    };

    const TYPE_DELAY = 90;
    const ERASE_DELAY = 40;
    const PAUSE_AFTER_TYPE = 1800;
    const PAUSE_AFTER_ERASE = 400;

    let phraseIdx = 0;
    let charIdx = 0;
    let typing = true;

    function tick() {
      const phrases = getPhrases();
      const phrase = phrases[phraseIdx] || '';

      if (typing) {
        if (charIdx < phrase.length) {
          target.textContent = phrase.substring(0, charIdx + 1);
          charIdx++;
          setTimeout(tick, TYPE_DELAY);
        } else {
          typing = false;
          setTimeout(tick, PAUSE_AFTER_TYPE);
        }
      } else {
        if (charIdx > 0) {
          charIdx--;
          target.textContent = phrase.substring(0, charIdx);
          setTimeout(tick, ERASE_DELAY);
        } else {
          typing = true;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(tick, PAUSE_AFTER_ERASE);
        }
      }
    }

    setTimeout(tick, 800);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
