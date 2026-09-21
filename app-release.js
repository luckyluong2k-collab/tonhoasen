/* Shared release display and opt-in updates; never reload an open form. */
(() => {
  const label = `HSH Phủ Lý v${window.APP_VERSION}`;
  document.querySelectorAll('[data-app-version]').forEach(node => node.textContent = label);
  document.title += ` · ${label}`;
  document.querySelectorAll('link[rel="manifest"],link[rel="icon"],link[rel="apple-touch-icon"]').forEach(link => {
    const url = new URL(link.href); url.searchParams.set('v', window.APP_VERSION); link.href = url.href;
  });
  if (!('serviceWorker' in navigator)) return;
  let activeRegistration = null;
  let notice;
  function offer(registration) {
    if (!registration.waiting || !navigator.serviceWorker.controller || notice) return;
    notice = document.createElement('aside');
    notice.setAttribute('role', 'status');
    notice.style.cssText = 'position:fixed;bottom:78px;left:12px;right:12px;z-index:100000;background:#0a2c54;color:white;padding:14px;border-radius:12px;box-shadow:0 4px 20px #0004;font:14px Arial;display:flex;gap:12px;align-items:center;flex-wrap:wrap';
    const text = document.createElement('span');
    text.textContent = 'Có bản mới. Hãy hoàn tất nội dung đang nhập trước khi cập nhật.';
    const button = document.createElement('button');
    button.textContent = 'Cập nhật';
    button.style.cssText = 'padding:12px;border:0;border-radius:8px;background:white;color:#0a2c54;font-weight:bold';
    button.onclick = () => {
      if (document.querySelector('#busy:not([hidden])')) { text.textContent = 'Đang xuất file. Vui lòng đợi xuất xong rồi cập nhật.'; return; }
      button.disabled = true;
      navigator.serviceWorker.addEventListener('controllerchange', () => location.reload(), {once:true});
      registration.waiting?.postMessage({type:'ACTIVATE_RELEASE'});
    };
    notice.append(text, button); document.body.append(notice);
  }
  window.hshCheckForUpdate = async function() {
    const button = document.getElementById('btnSideCheckUpdate');
    const originalMarkup = button ? button.innerHTML : '';
    let reloadPending = false;

    if (button) {
      button.disabled = true;
      button.classList.add('is-checking');
      button.innerHTML = '<i class="fas fa-rotate" aria-hidden="true"></i> <span>Đang kiểm tra...</span>';
    }

    try {
      if (!activeRegistration) {
        showToast('Bộ cập nhật đang khởi tạo, hãy thử lại sau giây lát.', 'info');
        return;
      }
      await activeRegistration.update();
      if (activeRegistration.waiting) {
        reloadPending = true;
        showToast('Đã tìm thấy phiên bản mới. Trang sẽ tải lại...', 'success');
        navigator.serviceWorker.addEventListener('controllerchange', () => location.reload(), {once:true});
        activeRegistration.waiting.postMessage({type:'ACTIVATE_RELEASE'});
      } else {
        showToast('Bạn đang dùng phiên bản mới nhất.', 'success');
      }
    } catch (error) {
      console.warn('Không kiểm tra được bản cập nhật:', error);
      showToast('Chưa kiểm tra được cập nhật. Hãy kiểm tra kết nối mạng.', 'error');
    } finally {
      if (button && !reloadPending) {
        button.disabled = false;
        button.classList.remove('is-checking');
        button.innerHTML = originalMarkup;
      }
    }
  };

  navigator.serviceWorker.register('./sw.js', {updateViaCache:'none'}).then(registration => {
    activeRegistration = registration;
    offer(registration);
    registration.addEventListener('updatefound', () => {
      const worker = registration.installing;
      worker?.addEventListener('statechange', () => { if (worker.state === 'installed') offer(registration); });
    });
    const check = () => { if (navigator.onLine) registration.update().catch(() => {}); };
    check(); setInterval(check, 5 * 60 * 1000);
    window.addEventListener('online', check);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
  }).catch(error => console.warn('Không kiểm tra được bản cập nhật:', error));
})();
