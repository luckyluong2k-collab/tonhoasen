(() => {
  const sidebar = document.getElementById('leftSidebar');
  const toggle = document.getElementById('btnSidebarToggle');
  const backdrop = document.getElementById('sidebarBackdrop');
  const more = document.getElementById('mobileMore');
  const dailyReport = document.getElementById('mobileDailyReport');
  const acceptance = document.getElementById('mobileAcceptance');
  const mobile = matchMedia('(max-width: 1024px)');
  let previouslyOpen = false;
  function syncMenu() {
    const open = mobile.matches && sidebar.classList.contains('sidebar-open');
    backdrop.hidden = !open;
    sidebar.inert = mobile.matches && !open;
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-controls', 'leftSidebar');
    more?.setAttribute('aria-expanded', String(open));
    if (open && !previouslyOpen) sidebar.querySelector('a').focus();
    if (!open && previouslyOpen) toggle.focus();
    previouslyOpen = open;
  }
  function close() { sidebar.classList.remove('sidebar-open'); }
  backdrop.addEventListener('click', close);
  more?.addEventListener('click', () => sidebar.classList.toggle('sidebar-open'));
  dailyReport?.addEventListener('click', () => { window.location.href = './bao-cao-ngay.html'; });
  acceptance?.addEventListener('click', () => { window.location.href = './dossier-editor.html?type=acceptance'; });
  new MutationObserver(syncMenu).observe(sidebar, { attributes: true, attributeFilter: ['class'] });
  mobile.addEventListener('change', () => { if (!mobile.matches) close(); syncMenu(); });
  document.addEventListener('keydown', event => {
    if (!previouslyOpen) return;
    if (event.key === 'Escape') close();
    if (event.key === 'Tab') {
      const items = [...sidebar.querySelectorAll('a, button, input, select')].filter(el => !el.disabled && el.offsetParent !== null);
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  const buttons = [...document.querySelectorAll('[data-mobile-tab]')];
  buttons.forEach(button => button.addEventListener('click', () => window.hshNavigateToTab(button.dataset.mobileTab)));
  function syncTab() {
    const active = document.querySelector('.content-tab-view.active')?.id;
    buttons.forEach(button => {
      if (button.dataset.mobileTab === active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    if (more) {
      if (buttons.some(button => button.dataset.mobileTab === active)) more.removeAttribute('aria-current');
      else more.setAttribute('aria-current', 'page');
    }
  }
  document.querySelectorAll('.content-tab-view').forEach(tab => new MutationObserver(syncTab).observe(tab, { attributes: true, attributeFilter: ['class'] }));
  syncMenu(); syncTab();
})();
