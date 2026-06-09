// ── Work Mate Service Worker ──────────────────────────
// 버전을 바꾸면 캐시가 갱신됩니다
const CACHE_VERSION = 'workmate-v62';
const ASSET_CACHE   = CACHE_VERSION + '-assets';
const PAGE_CACHE    = CACHE_VERSION + '-pages';

// ── 앱 셸 (항상 캐싱) ──────────────────────────────────
const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
];

// ── 게임 에셋 전체 목록 (287개) ───────────────────────
const GAME_ASSETS = [
  './assets/alarm1.mp3',
  './assets/alarm2.mp3',
  './assets/alarm3.mp3',
  './assets/alarm4.mp3',
  './assets/alarm5.mp3',
  './assets/alarm6.mp3',
  './assets/alarm7.mp3',
  './assets/alarm8.mp3',
  './assets/alarm9.mp3',
  './assets/game_icon.png',
  './assets/game_icon_256.png',
  './assets/gift_icon.png',
  './assets/gift_open.mp3',
  './assets/tutorial_click.mp3',
  './assets/Accessories/a1.png',
  './assets/Accessories/a10.png',
  './assets/Accessories/a11.png',
  './assets/Accessories/a12.png',
  './assets/Accessories/a13.png',
  './assets/Accessories/a2.png',
  './assets/Accessories/a3.png',
  './assets/Accessories/a4.png',
  './assets/Accessories/a5.png',
  './assets/Accessories/a6.png',
  './assets/Accessories/a7.png',
  './assets/Accessories/a8.png',
  './assets/Accessories/a9.png',
  './assets/bg/room0.jfif',
  './assets/bg/room1.jfif',
  './assets/bg/room2.jfif',
  './assets/bg/room3.jfif',
  './assets/bg/room4.jfif',
  './assets/bg/room5.jpg',
  './assets/bg/room6.jpg',
  './assets/bg/room7.jpg',
  './assets/bg/room8.jpg',
  './assets/bg/room9.jpg',
  './assets/body/bady.png',
  './assets/eyes/i10_1.png',
  './assets/eyes/i10_2.png',
  './assets/eyes/i10_3.png',
  './assets/eyes/i11_1.png',
  './assets/eyes/i11_2.png',
  './assets/eyes/i11_3.png',
  './assets/eyes/i11_4.png',
  './assets/eyes/i12_1.png',
  './assets/eyes/i12_2.png',
  './assets/eyes/i12_3.png',
  './assets/eyes/i12_4.png',
  './assets/eyes/i13_1.png',
  './assets/eyes/i13_2.png',
  './assets/eyes/i13_3.png',
  './assets/eyes/i14_1.png',
  './assets/eyes/i14_2.png',
  './assets/eyes/i14_3.png',
  './assets/eyes/i15_1.png',
  './assets/eyes/i16_1.png',
  './assets/eyes/i17_1.png',
  './assets/eyes/i17_2.png',
  './assets/eyes/i17_3.png',
  './assets/eyes/i18_1.png',
  './assets/eyes/i18_2.png',
  './assets/eyes/i18_3.png',
  './assets/eyes/i19_1.png',
  './assets/eyes/i19_2.png',
  './assets/eyes/i19_3.png',
  './assets/eyes/i1_1.png',
  './assets/eyes/i1_2.png',
  './assets/eyes/i1_3.png',
  './assets/eyes/i20_1.png',
  './assets/eyes/i20_2.png',
  './assets/eyes/i20_3.png',
  './assets/eyes/i21_1.png',
  './assets/eyes/i21_2.png',
  './assets/eyes/i21_3.png',
  './assets/eyes/i21_4.png',
  './assets/eyes/i2_1.png',
  './assets/eyes/i2_2.png',
  './assets/eyes/i2_3.png',
  './assets/eyes/i3_1.png',
  './assets/eyes/i3_2.png',
  './assets/eyes/i3_3.png',
  './assets/eyes/i4_1.png',
  './assets/eyes/i4_2.png',
  './assets/eyes/i4_3.png',
  './assets/eyes/i5_1.png',
  './assets/eyes/i5_2.png',
  './assets/eyes/i5_3.png',
  './assets/eyes/i6_1.png',
  './assets/eyes/i7_1.png',
  './assets/eyes/i7_2.png',
  './assets/eyes/i7_3.png',
  './assets/eyes/i8_1.png',
  './assets/eyes/i8_2.png',
  './assets/eyes/i8_3.png',
  './assets/eyes/i9_1.png',
  './assets/eyes/i9_2.png',
  './assets/eyes/i9_3.png',
  './assets/face/g1.png',
  './assets/face/g2.png',
  './assets/face/g3.png',
  './assets/face/g4.png',
  './assets/face/g5.png',
  './assets/face/p1.png',
  './assets/face/p10.png',
  './assets/face/p11.png',
  './assets/face/p2.png',
  './assets/face/p3.png',
  './assets/face/p4.png',
  './assets/face/p5.png',
  './assets/face/p6.png',
  './assets/face/p7.png',
  './assets/face/p8.png',
  './assets/face/p9.png',
  './assets/hair/h1.png',
  './assets/hair/h10_1.png',
  './assets/hair/h10_2.png',
  './assets/hair/h11_1.png',
  './assets/hair/h12_1.png',
  './assets/hair/h13_1.png',
  './assets/hair/h13_2.png',
  './assets/hair/h13_3.png',
  './assets/hair/h13_4.png',
  './assets/hair/h13_5.png',
  './assets/hair/h13_6.png',
  './assets/hair/h14_1.png',
  './assets/hair/h15_1.png',
  './assets/hair/h15_2.png',
  './assets/hair/h15_3.png',
  './assets/hair/h15_4.png',
  './assets/hair/h15_5.png',
  './assets/hair/h15_6.png',
  './assets/hair/h16_1.png',
  './assets/hair/h17_1.png',
  './assets/hair/h18_1.png',
  './assets/hair/h19_1.png',
  './assets/hair/h19_2.png',
  './assets/hair/h19_3.png',
  './assets/hair/h19_4.png',
  './assets/hair/h19_5.png',
  './assets/hair/h19_6.png',
  './assets/hair/h20_1.png',
  './assets/hair/h20_2.png',
  './assets/hair/h21_1.png',
  './assets/hair/h22_1.png',
  './assets/hair/h22_2.png',
  './assets/hair/h23_1.png',
  './assets/hair/h2_1.png',
  './assets/hair/h2_2.png',
  './assets/hair/h3_1.png',
  './assets/hair/h3_2.png',
  './assets/hair/h4_1.png',
  './assets/hair/h4_2.png',
  './assets/hair/h5_1.png',
  './assets/hair/h6_1.png',
  './assets/hair/h6_2.png',
  './assets/hair/h7_1.png',
  './assets/hair/h7_2.png',
  './assets/hair/h7_3.png',
  './assets/hair/h7_4.png',
  './assets/hair/h7_5.png',
  './assets/hair/h7_6.png',
  './assets/hair/h8_1.png',
  './assets/hair/h8_2.png',
  './assets/hair/h9_1.png',
  './assets/hair/h9_2.png',
  './assets/outfits/c10_1.png',
  './assets/outfits/c10_2.png',
  './assets/outfits/c10_3.png',
  './assets/outfits/c11_1.png',
  './assets/outfits/c11_2.png',
  './assets/outfits/c11_3.png',
  './assets/outfits/c12_1.png',
  './assets/outfits/c12_2.png',
  './assets/outfits/c12_3.png',
  './assets/outfits/c13_1.png',
  './assets/outfits/c13_2.png',
  './assets/outfits/c13_3.png',
  './assets/outfits/c14_1.png',
  './assets/outfits/c14_2.png',
  './assets/outfits/c14_3.png',
  './assets/outfits/c15_1.png',
  './assets/outfits/c15_2.png',
  './assets/outfits/c15_3.png',
  './assets/outfits/c16_1.png',
  './assets/outfits/c16_2.png',
  './assets/outfits/c16_3.png',
  './assets/outfits/c17_1.png',
  './assets/outfits/c17_2.png',
  './assets/outfits/c17_3.png',
  './assets/outfits/c18_1.png',
  './assets/outfits/c18_2.png',
  './assets/outfits/c18_3.png',
  './assets/outfits/c19_1.png',
  './assets/outfits/c19_2.png',
  './assets/outfits/c19_3.png',
  './assets/outfits/c1_1.png',
  './assets/outfits/c1_2.png',
  './assets/outfits/c20_1.png',
  './assets/outfits/c20_2.png',
  './assets/outfits/c20_3.png',
  './assets/outfits/c2_1.png',
  './assets/outfits/c2_2.png',
  './assets/outfits/c3_1.png',
  './assets/outfits/c3_2.png',
  './assets/outfits/c4_1.png',
  './assets/outfits/c5_1.png',
  './assets/outfits/c5_2.png',
  './assets/outfits/c6_1.png',
  './assets/outfits/c6_2.png',
  './assets/outfits/c7_1.png',
  './assets/outfits/c7_2.png',
  './assets/outfits/c7_3.png',
  './assets/outfits/c8_1.png',
  './assets/outfits/c8_2.png',
  './assets/outfits/c9_1.png',
  './assets/outfits/c9_2.png',
  './assets/outfits/c9_3.png',
  './assets/pets/bird.png',
  './assets/pets/cat.png',
  './assets/pets/cat_2.png',
  './assets/pets/cat_3.png',
  './assets/pets/cat_4.png',
  './assets/pets/cat_5.png',
  './assets/pets/dog.png',
  './assets/pets/dog_2.png',
  './assets/pets/dog_3.png',
  './assets/pets/dog_4.png',
  './assets/pets/dog_5.png',
  './assets/pets/dragon.png',
  './assets/pets/fox.png',
  './assets/pets/hamster.png',
  './assets/pets/rabbit.png',
  './assets/pets/unicorn.png',
  './assets/shop_icons/bg/room0_icon.png',
  './assets/shop_icons/bg/room1_icon.png',
  './assets/shop_icons/bg/room2_icon.png',
  './assets/shop_icons/bg/room3_icon.png',
  './assets/shop_icons/bg/room4_icon.png',
  './assets/shop_icons/bg/room5_icon.png',
  './assets/shop_icons/bg/room6_icon.png',
  './assets/shop_icons/bg/room7_icon.png',
  './assets/shop_icons/bg/room8_icon.png',
  './assets/shop_icons/bg/room9_icon.png',
  './assets/shop_icons/eye/i1.svg',
  './assets/shop_icons/eye/i2.svg',
  './assets/shop_icons/eye/i3.svg',
  './assets/shop_icons/eye/i4.svg',
  './assets/shop_icons/eye/i5.svg',
  './assets/shop_icons/hair/h1.svg',
  './assets/shop_icons/hair/h10.svg',
  './assets/shop_icons/hair/h2.svg',
  './assets/shop_icons/hair/h3.svg',
  './assets/shop_icons/hair/h4.svg',
  './assets/shop_icons/hair/h5.svg',
  './assets/shop_icons/hair/h6.svg',
  './assets/shop_icons/hair/h7.svg',
  './assets/shop_icons/hair/h8.svg',
  './assets/shop_icons/hair/h9.svg',
  './assets/shop_icons/outfit/c1.svg',
  './assets/shop_icons/outfit/c10.svg',
  './assets/shop_icons/outfit/c2.svg',
  './assets/shop_icons/outfit/c3.svg',
  './assets/shop_icons/outfit/c4.svg',
  './assets/shop_icons/outfit/c5.svg',
  './assets/shop_icons/outfit/c6.svg',
  './assets/shop_icons/outfit/c7.svg',
  './assets/shop_icons/outfit/c8.svg',
  './assets/shop_icons/outfit/c9.svg',
  './assets/shop_icons/pet/bird.png',
  './assets/shop_icons/pet/cat.png',
  './assets/shop_icons/pet/dog.png',
  './assets/shop_icons/pet/dragon.png',
  './assets/shop_icons/pet/fox.png',
  './assets/shop_icons/pet/hamster.png',
  './assets/shop_icons/pet/rabbit.png',
  './assets/shop_icons/pet/unicorn.png',
  './assets/soundtrack/Apple_Cider-Zane_Little_Music.mp3',
  './assets/soundtrack/Bossa_Nova-Joth.mp3',
  './assets/soundtrack/Chill_Lofi_Loop-qubodup.ogg',
  './assets/soundtrack/Feel_Good_Island-Brandon75689.ogg',
  './assets/soundtrack/LaDaDa_Guitar-Pro_Sensory.mp3',
  './assets/soundtrack/Menu_Music-mrpoly.wav',
  './assets/soundtrack/Midnight_Cruiser-Zane_Little_Music.mp3',
  './assets/soundtrack/Mocha_Frapp-Pro_Sensory.mp3',
  './assets/soundtrack/November_Snow-cynicmusic.mp3',
  './assets/soundtrack/Red_Heels_Piano-TAD.mp3',
];

// ── 메시지 수신 (업데이트 즉시 적용) ─────────────────
self.addEventListener('message', e => {
  if(e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// ── 알림 클릭 → 앱 포커스/열기 ──────────────────────
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({type:'window', includeUncontrolled:true}).then(clients => {
      for(const c of clients){
        if(c.url && c.focus) return c.focus();
      }
      if(self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});

// ── Install: 모든 에셋 사전 캐싱 ─────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    Promise.all([
      // 앱 셸: 설치 즉시 캐싱 (실패 시 설치 중단)
      caches.open(PAGE_CACHE).then(c => c.addAll(SHELL_ASSETS)),
      // 게임 에셋: 하나씩 캐싱 (일부 실패해도 설치 계속)
      caches.open(ASSET_CACHE).then(cache =>
        Promise.allSettled(
          GAME_ASSETS.map(url =>
            cache.add(url).catch(err =>
              console.warn('[SW] 캐싱 실패:', url, err)
            )
          )
        )
      ),
    ])
  );
});

// ── Activate: 이전 버전 캐시 삭제 ────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== PAGE_CACHE && k !== ASSET_CACHE)
          .map(k => {
            console.log('[SW] 이전 캐시 삭제:', k);
            return caches.delete(k);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: 캐시 전략 ─────────────────────────────────
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // 외부 요청 (Google Fonts 등) → 네트워크 우선, 실패 시 캐시
  if (url.origin !== self.location.origin) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }

  // HTML (index.html) → Network First: 항상 최신 버전 시도
  if (e.request.mode === 'navigate' ||
      e.request.destination === 'document' ||
      url.pathname.endsWith('.html') ||
      url.pathname === '/' ) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          // 성공 시 페이지 캐시에도 저장
          const clone = res.clone();
          caches.open(PAGE_CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request) || caches.match('./index.html'))
    );
    return;
  }

  // 에셋 (이미지·음악·폰트 등) → Cache First: 캐시 우선, 없으면 네트워크 후 저장
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200 || res.type === 'error') return res;
        const clone = res.clone();
        caches.open(ASSET_CACHE).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => {
        // 오프라인 + 캐시 없음: 빈 응답
        return new Response('', { status: 503, statusText: 'Offline' });
      });
    })
  );
});
