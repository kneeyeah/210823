/* =====================================================
   NAVIGASI ANTAR LAYAR (home -> ucapan -> kenangan -> home)
   ===================================================== */
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(function (el) {
    el.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');

  // Selalu mulai dari atas tiap ganti layar
  document.getElementById(screenId).scrollTop = 0;

  // Efek love cuma jalan/di-generate di halaman awal
  if (screenId === 'screen-home') {
    startHeartField();
  } else {
    stopHeartField();
  }

  // Foto kenangan: besar dulu, lalu fade mengecil ke lebar card
  if (screenId === 'screen-kenangan') {
    playPhotoIntro();
  }
}

/* ANIMASI FOTO: BESAR -> FADE OUT -> KECIL -> FADE IN, lalu DIAM */
function playPhotoIntro() {
  var photo = document.getElementById('mainPhoto');
  if (!photo) return;

  photo.classList.remove('is-small', 'is-fading');

  window.setTimeout(function () {
    photo.classList.add('is-fading'); // mulai fade out (durasi 0.9s, lihat CSS)

    window.setTimeout(function () {
      photo.classList.add('is-small');     // ganti ukuran selagi transparan
      photo.classList.remove('is-fading'); // fade in lagi di ukuran kecil
    }, 900); // HARUS SAMA dengan durasi transition opacity di CSS (0.9s)

  }, 1800); // foto tampil BESAR selama 1.8 detik dulu sebelum fade, boleh diubah
}

/* VIDEO: sesuaikan rasio tampilan otomatis ke ukuran video ASLI,
   supaya seluruh video kelihatan (ga kepotong / ga ke-zoom) */
document.querySelectorAll('.gallery-item--video video').forEach(function (vid) {
  vid.addEventListener('loadedmetadata', function () {
    if (vid.videoWidth && vid.videoHeight) {
      vid.style.aspectRatio = vid.videoWidth + ' / ' + vid.videoHeight;
    }
  });
});
/* =====================================================
   EFEK LOVE YANG BERJATUHAN
   ===================================================== */
var heartFieldEl = document.getElementById('heart-field');
var heartSpawnTimer = null;
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function spawnHeart() {
  var heart = document.createElement('span');
  heart.className = 'falling-heart';
  heart.textContent = Math.random() > 0.5 ? '❤' : '♥';

  var size = 12 + Math.random() * 22;      // ukuran love bervariasi
  var left = Math.random() * 100;          // posisi horizontal acak
  var duration = 6 + Math.random() * 6;    // kecepatan jatuh bervariasi
  var drift = (Math.random() * 120 - 60);  // sedikit melenceng kiri/kanan

  heart.style.left = left + 'vw';
  heart.style.fontSize = size + 'px';
  heart.style.opacity = (0.4 + Math.random() * 0.5).toString();
  heart.style.animationDuration = duration + 's';
  heart.style.setProperty('--drift', drift + 'px');

  heartFieldEl.appendChild(heart);

  // Bersihkan elemen setelah selesai animasi supaya DOM tidak menumpuk
  window.setTimeout(function () {
    heart.remove();
  }, duration * 1000 + 200);
}

function startHeartField() {
  if (heartSpawnTimer) return; // sudah jalan, jangan dobel
  var interval = reduceMotion ? 0 : 260;

  if (reduceMotion) {
    // Kalau user matikan animasi: tampilkan beberapa love statis saja
    for (var i = 0; i < 12; i++) spawnHeart();
    return;
  }

  heartSpawnTimer = window.setInterval(spawnHeart, interval);
}

function stopHeartField() {
  if (heartSpawnTimer) {
    window.clearInterval(heartSpawnTimer);
    heartSpawnTimer = null;
  }
}

/* Mulai efek love begitu halaman dibuka (kita ada di screen-home) */
startHeartField();
