/* ============================================================
   StackGarage — form-validation.js
   Client-side validation + success toast (no backend)
   ============================================================ */

(function () {
  'use strict';

  function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML = `
      <svg class="toast__icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
      <span>${message}</span>`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  function validateField(field) {
    const value = field.value.trim();
    let message = '';

    if (field.required && !value) {
      message = 'This field is required.';
    } else if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = 'Please enter a valid email.';
    } else if (field.type === 'tel' && value && !/^[\d+\-\s()]{6,}$/.test(value)) {
      message = 'Please enter a valid phone number.';
    } else if (field.minLength && value.length < field.minLength) {
      message = `Minimum ${field.minLength} characters.`;
    }

    const wrapper = field.closest('.form__field');
    if (wrapper) {
      wrapper.classList.toggle('error', !!message);
      const err = wrapper.querySelector('.form__error');
      if (err) err.textContent = message;
    }
    return !message;
  }

  function init() {
    document.querySelectorAll('.form').forEach((form) => {
      const fields = form.querySelectorAll('input, select, textarea');

      fields.forEach((field) => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
          const wrapper = field.closest('.form__field');
          if (wrapper && wrapper.classList.contains('error')) validateField(field);
        });
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        fields.forEach((f) => { if (!validateField(f)) valid = false; });

        if (!valid) {
          const firstError = form.querySelector('.form__field.error input, .form__field.error select, .form__field.error textarea');
          firstError && firstError.focus();
          return;
        }

        const success = form.querySelector('.form-success');
        if (success) success.classList.add('is-visible');
        const msg = success && success.textContent.trim()
          ? success.textContent.trim()
          : 'Thanks! We will be in touch shortly.';
        showToast(msg);
        form.reset();
        setTimeout(() => success && success.classList.remove('is-visible'), 5000);
      });
    });

    /* Newsletter form (footer) */
    document.querySelectorAll('.footer__newsletter').forEach((ns) => {
      ns.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = ns.querySelector('input');
        const value = (input && input.value || '').trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          showToast('Please enter a valid email.');
          return;
        }
        showToast('Subscribed! Check your inbox.');
        ns.reset();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
