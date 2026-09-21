// Release 10.83. The page and worker share the same release source.
importScripts('./app-version.js');
const CACHE_NAME = `hsh-phuly-v${self.APP_VERSION}`;
const CORE = [
  "./interface-polish.css",
  "./sync-overview.js",
  "./sheet-diary.js",
  "./nhat-ky-cong-trinh.html",
  "./bao-cao-ngay.html",
  "./chi-tiet-thep.html",
  "./field-workflow.js", "./field-workflow.css",
  ...['Regular','Bold','Italic','BoldItalic'].map(style => `./vendor/fonts/Tinos-${style}.ttf`),
  "./app-release.js",
  "./app-version.js",
  "./app.js",
  "./tool-visuals.js",
  "./tool-visuals.css",
  "./assets/app/apple-touch-icon.png",
  "./assets/app/icon-192.png",
  "./assets/app/icon-512.png",
  "./assets/app/icon-maskable-512.png",
  "./assets/app/icon.svg",
  "./assets/hoa-sen/project-document-index.js",
  "./assets/hoa-sen/templates/03-1.svg",
  "./assets/hoa-sen/templates/03-2.svg",
  "./assets/hoa-sen/templates/03-3.svg",
  "./assets/hoa-sen/templates/03-4.svg",
  "./assets/hoa-sen/templates/07-1.svg",
  "./assets/hoa-sen/templates/07-2.svg",
  "./assets/hoa-sen/templates/09-1.svg",
  "./bien-phap-thi-cong.html",
  "./construction-processes.js",
  "./dossier-drive.js",
  "./dossier-editor.css",
  "./dossier-editor.html",
  "./dossier-editor.js",
  "./dossier-history.js",
  "./dossier-template-layout.js",
  "./dossier-workflow.js",
  "./index.html",
  "./manifest.json",
  "./method-statement-data.js",
  "./method-statement.css",
  "./method-statement.js",
  "./responsive.css",
  "./responsive.js",
  "./material-log.js",
  "./notification-reminder.js",
  "./styles.css",
  "./vendor/fflate.min.js",
  "./vendor/html2canvas.min.js",
  "./vendor/jspdf.umd.min.js"
];
self.addEventListener('install', event => {
  // A partial download must not replace the working release.
  event.waitUntil(caches.open(CACHE_NAME).then(cache =>
    cache.addAll(CORE.map(path => new Request(path, {cache:'reload'})))
  ));
});
self.addEventListener('message', event => {
  if (event.data?.type === 'ACTIVATE_RELEASE') self.skipWaiting();
});
self.addEventListener('activate', event => {
  // Keep previous release caches while other tabs may still use them.
  event.waitUntil(self.clients.claim());
});
self.addEventListener('push', event => {
  let payload = {};
  try { payload = event.data?.json() || {}; } catch (_) {}
  const notification = payload.notification || payload.data || {};
  if (!notification.title && !notification.body) return;
  event.waitUntil(self.registration.showNotification(notification.title || 'Nhắc báo cáo nhật ký', {
    body: notification.body || 'Đã đến giờ nhập báo cáo nhật ký công trình.',
    icon: './assets/app/icon-192.png',
    badge: './assets/app/icon-192.png',
    tag: notification.tag || 'hsh-diary-daily',
    data: { url: notification.click_action || payload.data?.url || './index.html#journal' }
  }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    const target = new URL(event.notification.data?.url || './index.html#journal', self.location.origin).href;
    const existing = list.find(client => client.url === target);
    if (existing?.focus) return existing.focus();
    return clients.openWindow(target);
  }));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // Never intercept Google Drive / OAuth or non-GET operations.
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  const root = new URL('./', self.location.href);
  if (!url.pathname.startsWith(root.pathname)) return;
  let path = './' + url.pathname.slice(root.pathname.length);
  if (path === './') path = './index.html';
  const core = CORE.includes(path);
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Core is an atomic release, including HTML, version, styles, scripts and manifest.
    const key = core ? new URL(path, root).href : event.request;
    const cached = await cache.match(key);
    if (cached) return cached;
    const response = await fetch(event.request);
    if (response.ok) await cache.put(key, response.clone());
    return response;
  })());
});
