/* ============================================================
   Stacks Garage — demo-modal.js
   Opens a 3-image mockup gallery when "View Demo" is clicked
   - ESC closes
   - Click-outside closes
   - Focus trap + restore
   - ARIA wired
   - Body scroll lock while open
   ============================================================ */

(function () {
  'use strict';

  let lastTrigger = null;

  function init() {
    const modal = document.getElementById('demoModal');
    if (!modal) return;

    /* Open triggers */
    document.querySelectorAll('[data-demo-open]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        lastTrigger = btn;
        openModal(btn.dataset.demoOpen);
      });
    });

    /* Close on backdrop, close button, ESC */
    modal.querySelectorAll('[data-demo-close]').forEach((el) => {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  }

  function openModal(offerKey) {
    const modal = document.getElementById('demoModal');
    if (!modal) return;

    /* Read offer data from JSON-encoded data attribute (set in HTML) */
    const dataEl = document.querySelector(`[data-offer-data="${offerKey}"]`);
    if (!dataEl) return;

    const data = JSON.parse(dataEl.textContent);
    modal.querySelector('[data-demo-title]').textContent = data.title;
    modal.querySelector('[data-demo-subtitle]').textContent = data.subtitle || 'Demo Preview';

    /* Build gallery */
    const gallery = modal.querySelector('[data-demo-gallery]');
    gallery.innerHTML = '';
    (data.images || []).forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = data.title + ' preview';
      img.loading = 'lazy';
      img.decoding = 'async';
      gallery.appendChild(img);
    });

    /* Update call-to-action link in modal footer */
    const callBtn = modal.querySelector('[data-demo-call]');
    if (callBtn) callBtn.href = data.callHref || 'tel:+8801700123456';

    /* Show */
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    /* Focus first focusable */
    setTimeout(() => {
      const closeBtn = modal.querySelector('.demo-modal__close');
      closeBtn && closeBtn.focus();
    }, 50);
  }

  function closeModal() {
    const modal = document.getElementById('demoModal');
    if (!modal) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastTrigger) {
      setTimeout(() => lastTrigger.focus(), 50);
      lastTrigger = null;
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
