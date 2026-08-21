/* ============================================================
   StackGarage — pricing-calculator.js
   Live hosting-cost estimator on pricing.html
   ============================================================ */

(function () {
  'use strict';

  const BASE = 4000;
  const PER_SITE = 1000;
  const PER_GB = 30;
  const INCLUDED_SITES = 1;
  const INCLUDED_GB = 5;
  const YEARLY_DISCOUNT = 0.15;

  function fmt(n) {
    return '৳' + Math.round(n).toLocaleString('en-IN');
  }

  function init() {
    const root = document.getElementById('planBuilder');
    if (!root) return;

    const sites = root.querySelector('#pbSites');
    const sitesValue = root.querySelector('#pbSitesValue');
    const storage = root.querySelector('#pbStorage');
    const storageValue = root.querySelector('#pbStorageValue');
    const total = root.querySelector('#pbTotal');
    const per = root.querySelector('#pbPer');
    const yearlyNote = root.querySelector('#pbYearlyNote');
    const breakdown = root.querySelector('#pbBreakdown');
    const toggles = root.querySelectorAll('.pb-toggle');

    const state = { support: 0, backup: 0, billing: 'monthly' };

    toggles.forEach((group) => {
      const field = group.dataset.field;
      group.querySelectorAll('.pb-toggle__btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          group.querySelectorAll('.pb-toggle__btn').forEach((b) => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          state[field] = field === 'billing' ? btn.dataset.value : Number(btn.dataset.value);
          recalc();
        });
      });
    });

    [sites, storage].forEach((input) => input.addEventListener('input', recalc));

    function recalc() {
      const extraSites = Number(sites.value) - INCLUDED_SITES;
      const extraGB = Number(storage.value) - INCLUDED_GB;
      const siteCost = extraSites * PER_SITE;
      const storageCost = extraGB * PER_GB;

      sitesValue.textContent = sites.value;
      storageValue.textContent = storage.value + ' GB';

      const monthly = BASE + siteCost + storageCost + state.support + state.backup;

      const lines = [['Base hosting (1 site, 5 GB)', BASE]];
      if (extraSites > 0) lines.push([extraSites + ' extra website' + (extraSites > 1 ? 's' : ''), siteCost]);
      if (extraGB > 0) lines.push([extraGB + ' GB extra storage', storageCost]);
      if (state.support > 0) lines.push(['Priority 24/7 support', state.support]);
      if (state.backup > 0) lines.push(['Daily backups', state.backup]);

      if (state.billing === 'yearly') {
        const yearly = monthly * 12 * (1 - YEARLY_DISCOUNT);
        const saved = monthly * 12 * YEARLY_DISCOUNT;
        total.textContent = fmt(yearly);
        per.textContent = '/year';
        yearlyNote.textContent = '≈ ' + fmt(yearly / 12) + '/mo · save ' + fmt(saved) + ' a year';
        lines.push(['Yearly discount (−15%)', -(monthly * 12 * YEARLY_DISCOUNT)]);
      } else {
        total.textContent = fmt(monthly);
        per.textContent = '/month';
        yearlyNote.textContent = '';
      }

      breakdown.innerHTML = lines
        .map(([label, amount]) => '<li><span>' + label + '</span><span>' + (amount < 0 ? '−' : '') + fmt(Math.abs(amount)) + '</span></li>')
        .join('');
    }

    recalc();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
