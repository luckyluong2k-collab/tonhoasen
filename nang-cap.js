/* Nâng cấp 11/2026: tiến độ theo lịch thực, mô hình 3D nhà xưởng, nút lên đầu trang.
   File độc lập, không sửa dữ liệu đã lưu và không động vào báo cáo ngày. */
(() => {
  'use strict';

  const DAY_MS = 24 * 60 * 60 * 1000;
  // Hợp đồng 01/2026/HĐXD/HSG-HG: 60 ngày, 10/09/2026 – 09/11/2026.
  const CONTRACT = { start: '2026-09-10', end: '2026-11-09', days: 60 };

  const toLocalDate = iso => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d);
  };
  const fmtDate = date => date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const pad = n => String(n).padStart(2, '0');

  // Tính ngày thi công theo lịch hợp đồng. Hàm thuần để kiểm thử được.
  function contractTimeline(today, start = CONTRACT.start, end = CONTRACT.end, total = CONTRACT.days) {
    const startDate = toLocalDate(start);
    const endDate = toLocalDate(end);
    const day = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const span = Math.round((endDate - startDate) / DAY_MS) + 1;
    const current = Math.round((day - startDate) / DAY_MS) + 1;
    const toEnd = Math.round((endDate - day) / DAY_MS);
    const base = { total, current: Math.max(0, current), startDate, endDate };
    if (current < 1) return { ...base, state: 'before', remaining: toEnd, overdue: 0, planRate: 0 };
    if (toEnd < 0) return { ...base, state: 'overdue', remaining: 0, overdue: -toEnd, planRate: 100 };
    return { ...base, state: 'running', remaining: toEnd, overdue: 0, planRate: Math.min(100, current / span * 100) };
  }

  function renderTimeline() {
    const t = contractTimeline(new Date());
    const sideText = document.getElementById('sideProgressText');
    const sideFill = document.getElementById('sideProgressFill');
    const sidePlan = document.getElementById('sidePlanRate');
    const card = document.querySelector('.sidebar-status-card');
    if (sideText) {
      sideText.textContent = t.state === 'overdue'
        ? `Quá hạn ${t.overdue} ngày`
        : t.state === 'before' ? 'Chưa khởi công' : `Ngày ${pad(Math.min(t.current, t.total))}/${t.total}`;
      sideText.classList.toggle('text-primary', t.state !== 'overdue');
      sideText.classList.toggle('hsh-overdue-text', t.state === 'overdue');
    }
    if (sideFill) sideFill.style.width = `${Math.min(100, t.planRate).toFixed(1)}%`;
    if (sidePlan) sidePlan.textContent = `${t.planRate.toFixed(1)}%`;
    if (card) {
      card.classList.toggle('is-overdue', t.state === 'overdue');
      card.title = `Theo hợp đồng: ${fmtDate(t.startDate)} – ${fmtDate(t.endDate)} (${t.total} ngày)`;
    }

    const box = document.querySelector('.d-day-countdown');
    if (box) {
      const num = box.querySelector('.countdown-num');
      const label = box.querySelector('.countdown-label');
      const remain = box.querySelector('.countdown-remain');
      box.classList.toggle('is-overdue', t.state === 'overdue');
      if (num) num.innerHTML = t.state === 'overdue'
        ? `+${pad(t.overdue)} <span class="countdown-sub">ngày</span>`
        : `${pad(Math.min(t.current, t.total))} <span class="countdown-sub">/ ${t.total}</span>`;
      if (label) label.textContent = t.state === 'overdue'
        ? 'Quá thời hạn hợp đồng'
        : t.state === 'before' ? 'Chưa đến ngày khởi công' : 'Ngày thi công theo hợp đồng';
      if (remain) remain.innerHTML = t.state === 'overdue'
        ? `Hết hạn: <strong>${fmtDate(t.endDate)}</strong> · đang ở ngày ${t.current}`
        : `Còn lại: <strong>${t.remaining} ngày</strong> · hết hạn ${fmtDate(t.endDate)}`;
    }
  }

  // Đếm số điểm "Cần chốt" trực tiếp từ trang 3D để con số luôn khớp mô hình.
  async function refreshOpenIssueCount() {
    const targets = document.querySelectorAll('[data-3d-open-count]');
    if (!targets.length) return;
    try {
      const response = await fetch('./mo-hinh-3d-xuong.html', { cache: 'no-cache' });
      if (!response.ok) return;
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const count = doc.querySelectorAll('#p-warn li').length;
      if (count > 0) targets.forEach(node => { node.textContent = String(count); });
    } catch (_) { /* Ngoại tuyến: giữ số đang hiển thị. */ }
  }

  function addBackToTop() {
    const scroller = document.getElementById('mainContentArea');
    if (!scroller || document.getElementById('hshBackToTop')) return;
    const button = document.createElement('button');
    button.id = 'hshBackToTop';
    button.type = 'button';
    button.className = 'hsh-back-to-top';
    button.setAttribute('aria-label', 'Lên đầu trang');
    button.title = 'Lên đầu trang';
    button.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i><span>Lên đầu</span>';
    button.hidden = true;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    button.addEventListener('click', () => {
      scroller.scrollTo({ top: 0, behavior: reduce.matches ? 'auto' : 'smooth' });
      window.scrollTo({ top: 0, behavior: reduce.matches ? 'auto' : 'smooth' });
    });
    const update = () => {
      const offset = Math.max(scroller.scrollTop, window.scrollY || 0);
      button.hidden = offset < 900;
    };
    scroller.addEventListener('scroll', update, { passive: true });
    window.addEventListener('scroll', update, { passive: true });
    document.body.append(button);
  }

  function init() {
    renderTimeline();
    refreshOpenIssueCount();
    addBackToTop();
    // Sang ngày mới khi trang để mở qua đêm.
    setInterval(renderTimeline, 30 * 60 * 1000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) renderTimeline(); });
  }

  window.hshContractTimeline = contractTimeline;
  if (typeof document !== 'undefined' && document.getElementById) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  }
})();
