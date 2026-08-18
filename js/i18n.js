/* ============================================================
   StackGarage — i18n.js
   English + Bengali language toggle with localStorage persistence
   ============================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'sg_lang';
  const DEFAULT_LANG = 'en';
  let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  let translations = {};

  /* ---------- Load a language file ---------- */
  async function loadTranslations(lang) {
    try {
      const res = await fetch(`lang/${lang}.json`);
      if (!res.ok) throw new Error('Network error');
      translations = await res.json();
      currentLang = lang;
      localStorage.setItem(STORAGE_KEY, lang);
      applyTranslations();
      applyFormPlaceholders();
      updateToggleUI();
      document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
      document.body.classList.toggle('lang-bn', lang === 'bn');
    } catch (err) {
      console.error('i18n load failed:', err);
    }
  }

  /* ---------- Walk the DOM and translate ---------- */
  function applyTranslations() {
    if (!translations.meta) return;

    document.documentElement.title = `${translations.meta.site_name} | ${translations.meta.tagline}`;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const path = el.getAttribute('data-i18n');
      const text = getByPath(translations, path);
      if (text != null) el.textContent = text;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.getAttribute('data-i18n-attr').split(',').forEach((mapping) => {
        const [attr, path] = mapping.split(':').map((s) => s.trim());
        const text = getByPath(translations, path);
        if (text != null) el.setAttribute(attr, text);
      });
    });

    /* Lists rendered as <li>: data-i18n-list-html="path.to.array" */
    document.querySelectorAll('[data-i18n-list-html]').forEach((el) => {
      const path = el.getAttribute('data-i18n-list-html');
      const arr = getByPath(translations, path);
      if (!Array.isArray(arr)) return;
      el.innerHTML = '';
      arr.forEach((label) => {
        const li = document.createElement('li');
        li.textContent = label;
        el.appendChild(li);
      });
    });
  }

  /* ---------- Placeholders / form values ---------- */
  function applyFormPlaceholders() {
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const path = el.getAttribute('data-i18n-placeholder');
      const text = getByPath(translations, path);
      if (text != null) el.setAttribute('placeholder', text);
    });
    document.querySelectorAll('select[data-i18n-options]').forEach((sel) => {
      const path = sel.getAttribute('data-i18n-options');
      const arr = getByPath(translations, path);
      if (!Array.isArray(arr)) return;
      const firstVal = sel.options[0] ? sel.options[0].value : '';
      sel.innerHTML = '';
      arr.forEach((label, i) => {
        const opt = document.createElement('option');
        opt.value = firstVal === '' && i === 0 ? '' : label;
        opt.textContent = label;
        sel.appendChild(opt);
      });
    });
  }

  /* ---------- Lookup ---------- */
  function getByPath(obj, path) {
    return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
  }

  /* ---------- Update toggle UI ---------- */
  function updateToggleUI() {
    document.querySelectorAll('.lang-toggle [data-lang]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === currentLang);
    });
  }

  /* ---------- Public helpers ---------- */
  function t(path) { return getByPath(translations, path) || ''; }
  function lang() { return currentLang; }
  function setLang(lang) { loadTranslations(lang); }

  /* ---------- Init ---------- */
  function init() {
    document.querySelectorAll('.lang-toggle [data-lang]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        setLang(btn.dataset.lang);
      });
    });
    loadTranslations(currentLang);
  }

  document.addEventListener('DOMContentLoaded', init);

  /* ---------- Expose ---------- */
  window.SG_I18N = { t, lang, setLang, refresh: applyTranslations };
})();
