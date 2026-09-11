// Hoa Sen Home Phủ Lý - Service Worker Cache V9.9
const CACHE_NAME = 'hsh-phuly-v10.1';
const FULL_DRAWING_ASSETS = [
  ...Array.from({ length: 6 }, (_, index) => `./assets/hoa-sen/foundation-full-page-${index + 1}.png`),
  ...Array.from({ length: 70 }, (_, index) => `./assets/hoa-sen/design-full-page-${String(index + 1).padStart(2, '0')}.png`)
];
const PROJECT_DOCUMENT_ASSETS = [
  './assets/hoa-sen/docs/01.BAO CAO NGAY.xlsx',
  './assets/hoa-sen/docs/03.NHAT KY CONG TRINH.DOC',
  './assets/hoa-sen/docs/07.BBNT CONG VIEC XAY DUNG.doc',
  './assets/hoa-sen/docs/09.BIEN BAN GHI NHAN DEFECT LIST.docx',
  './assets/hoa-sen/docs/10.CHECKLIST NGHIEM THU PHAN XAY DUNG.xls',
  './assets/hoa-sen/docs/11.CHECKLIST NGHIEM THU PHAN MEP.xls',
  './assets/hoa-sen/docs/BM - HO SO THANH - QUYET TOAN.xlsx',
  './assets/hoa-sen/docs/signed HDTC HSH PHU LY NINH BINH.pdf',
  './assets/hoa-sen/docs/2026.05.23_TKTC_HOME PHỦ LÝ.pdf',
  './assets/hoa-sen/docs/20260908 KC MÓNG PS.pdf',
  './assets/hoa-sen/docs/2026.08.06 TMCG THI CONG CAI TAO CUA HANG HOA SEN HOME PHU LY - NINH BINH r1.xlsx'
];
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './dossier-editor.html',
  './dossier-editor.css',
  './dossier-editor.js',
  './dossier-editor.js?v=10.1',
  './dossier-editor.css?v=10.1',
  './dossier-template-layout.js?v=10.1',
  './vendor/fflate.min.js',
  './assets/hoa-sen/templates/03-1.svg',
  './assets/hoa-sen/templates/03-2.svg',
  './assets/hoa-sen/templates/03-3.svg',
  './assets/hoa-sen/templates/03-4.svg',
  './assets/hoa-sen/templates/07-1.svg',
  './assets/hoa-sen/templates/07-2.svg',
  './assets/hoa-sen/templates/09-1.svg',
  './vendor/html2canvas.min.js',
  './vendor/jspdf.umd.min.js',
  './assets/hoa-sen/project-document-index.js',
  './app.js',
  './manifest.json',
  './assets/hoa-sen/foundation-page-1.png',
  './assets/hoa-sen/foundation-page-2.png',
  './assets/hoa-sen/foundation-page-3.png',
  './assets/hoa-sen/foundation-page-4.png',
  './assets/hoa-sen/foundation-page-5.png',
  './assets/hoa-sen/foundation-page-6.png',
  './assets/hoa-sen/design-page-1.png',
  './assets/hoa-sen/design-page-4.png',
  './assets/hoa-sen/design-page-5.png',
  './assets/hoa-sen/design-page-7.png',
  './assets/hoa-sen/design-page-16.png',
  './assets/hoa-sen/design-page-24.png',
  './assets/hoa-sen/design-page-30.png',
  './assets/hoa-sen/design-page-35.png',
  './assets/hoa-sen/design-page-52.png',
  './assets/hoa-sen/design-page-68.png',
  ...FULL_DRAWING_ASSETS,
  ...PROJECT_DOCUMENT_ASSETS,
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/dexie@3.2.4/dist/dexie.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching core assets...');
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('[ServiceWorker] Some external CDN assets skipped in pre-cache:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
