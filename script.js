/* navigasi (home -> ucapan -> kenangan -> home)*/
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(function (el) {
    el.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');

  document.getElementById(screenId).scrollTop = 0;

  startHeartField();

  if (screenId === 'screen-home') {
    heartFieldEl.classList.remove('is-blurred');
  } else {
    heartFieldEl.classList.add('is-blurred');
  }

  if (screenId === 'screen-kenangan') {
    playPhotoIntro();
  }
}

function playPhotoIntro() {
  var photo = document.getElementById('mainPhoto');
  if (!photo) return;

  photo.classList.remove('is-small', 'is-fading');

  window.setTimeout(function () {
    photo.classList.add('is-fading'); 

    window.setTimeout(function () {
      photo.classList.add('is-small');     
      photo.classList.remove('is-fading'); 
    }, 900); 

  }, 1800); 
}

/* vid */
document.querySelectorAll('.gallery-item--video video').forEach(function (vid) {
  vid.addEventListener('loadedmetadata', function () {
    if (vid.videoWidth && vid.videoHeight) {
      vid.style.aspectRatio = vid.videoWidth + ' / ' + vid.videoHeight;
    }
  });
});
/* love dropping effect */
var heartFieldEl = document.getElementById('heart-field');
var heartSpawnTimer = null;
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function spawnHeart() {
  var heart = document.createElement('span');
  heart.className = 'falling-heart';
  heart.textContent = Math.random() > 0.5 ? '❤' : '♥';

  var size = 12 + Math.random() * 22;     
  var left = Math.random() * 100;         
  var duration = 6 + Math.random() * 6;    
  var drift = (Math.random() * 120 - 60);  

  heart.style.left = left + 'vw';
  heart.style.fontSize = size + 'px';
  heart.style.opacity = (0.4 + Math.random() * 0.5).toString();
  heart.style.animationDuration = duration + 's';
  heart.style.setProperty('--drift', drift + 'px');

  heartFieldEl.appendChild(heart);

 
  window.setTimeout(function () {
    heart.remove();
  }, duration * 1000 + 200);
}

function startHeartField() {
  if (heartSpawnTimer) return; 

 
  var interval = reduceMotion ? 900 : 260;

  heartSpawnTimer = window.setInterval(spawnHeart, interval);
}

function stopHeartField() {
  if (heartSpawnTimer) {
    window.clearInterval(heartSpawnTimer);
    heartSpawnTimer = null;
  }
}

startHeartField();
