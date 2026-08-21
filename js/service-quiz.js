/* ============================================================
   Stacks Garage — service-quiz.js
   2-question service finder on services.html
   ============================================================ */

(function () {
  'use strict';

  const ICONS = {
    web: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/></svg>',
    app: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/></svg>',
    hosting: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 014.5-4.5h11.25a4.5 4.5 0 014.5 4.5"/></svg>',
    custom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894a1.125 1.125 0 00-.781-.93c-.398-.164-.854-.142-1.205.108l-.737.527c-.448.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737a1.125 1.125 0 00.108-1.204c-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>'
  };

  const RESULTS = {
    web: {
      title: 'Web Development',
      text: 'A custom website or online store built on React, Next.js, Laravel, or WordPress — whichever fits how you’ll run and grow it.',
      link: 'services.html#web',
      pairs: ['Domain Registration', 'UI/UX & SEO']
    },
    app: {
      title: 'Mobile App Development',
      text: 'A native or cross-platform Android & iOS app, from first wireframe to a Play Store / App Store launch.',
      link: 'services.html#app',
      pairs: ['Hosting Solutions', 'UI/UX & SEO']
    },
    hosting: {
      title: 'Hosting Solutions',
      text: 'Managed shared, VPS, cloud, or dedicated hosting with 99.9% uptime, free SSL, and 24/7 support from Dhaka.',
      link: 'services.html#hosting',
      pairs: ['Domain Registration', 'Software Customization']
    },
    custom: {
      title: 'Software Customization',
      text: 'A tailor-made ERP, CRM, POS, or inventory system built around how your team already works.',
      link: 'services.html#custom',
      pairs: ['Hosting Solutions', 'UI/UX & SEO']
    }
  };

  const URGENCY = {
    asap: 'Since you need this live fast, we’ll fast-track discovery within 48 hours.',
    soon: 'We’ll scope this over a focused 1–2 week discovery phase.',
    exploring: 'No rush — happy to just talk through options first.'
  };

  function init() {
    const root = document.getElementById('serviceQuiz');
    if (!root) return;

    const steps = root.querySelectorAll('.service-quiz__step');
    const progress = root.querySelectorAll('.service-quiz__progress span');
    const result = root.querySelector('.service-quiz__result');
    const state = {};

    function showStep(n) {
      steps.forEach((s) => s.classList.toggle('is-active', Number(s.dataset.step) === n));
      result.classList.remove('is-active');
      progress.forEach((p) => {
        const step = Number(p.dataset.step);
        p.classList.toggle('is-active', step === n);
        p.classList.toggle('is-done', step < n);
      });
    }

    root.querySelectorAll('[data-goal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.goal = btn.dataset.goal;
        showStep(2);
      });
    });

    root.querySelectorAll('[data-urgency]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.urgency = btn.dataset.urgency;
        renderResult();
      });
    });

    const back = root.querySelector('.service-quiz__back');
    if (back) back.addEventListener('click', () => showStep(1));

    const restart = root.querySelector('.service-quiz__restart');
    if (restart) restart.addEventListener('click', () => showStep(1));

    function renderResult() {
      const r = RESULTS[state.goal];
      if (!r) return;
      root.querySelector('#quizIcon').innerHTML = ICONS[state.goal];
      root.querySelector('#quizTitle').textContent = r.title;
      root.querySelector('#quizText').textContent = r.text;
      root.querySelector('#quizUrgency').textContent = URGENCY[state.urgency] || '';
      root.querySelector('#quizLink').href = r.link;
      root.querySelector('#quizPairs').innerHTML = r.pairs.map((p) => '<span>' + p + '</span>').join('');

      steps.forEach((s) => s.classList.remove('is-active'));
      progress.forEach((p) => p.classList.add('is-done'));
      result.classList.add('is-active');
    }

    showStep(1);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
