// ============================================
// KATABASI — main.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  const splash = document.getElementById('splash-screen');
  const caseScreen = document.getElementById('case-intro-screen');
  const wrapper = document.getElementById('game-wrapper');
  const splashBtn = document.getElementById('splash-btn');
  const caseContinueBtn = document.getElementById('case-continue-btn');

  const bgMusic = document.getElementById('bg-music');
  const audioToggle = document.getElementById('audio-toggle');

  const inventoryPanel = document.getElementById('inventory-panel');
  const inventoryToggle = document.getElementById('inventory-toggle');

  if (bgMusic) bgMusic.volume = 0.3;

  splashBtn.addEventListener('click', () => {
    splash.classList.add('splash-exit');

    if (bgMusic) {
      bgMusic.play().catch(err => console.log("Riproduzione audio bloccata dal browser: ", err));
    }

    setTimeout(() => {
      splash.classList.add('hidden');
      wrapper.classList.add('hidden');
      caseScreen.classList.remove('hidden');
      caseScreen.classList.add('game-enter');
    }, 1000);
  });

  if (audioToggle && bgMusic) {
    audioToggle.addEventListener('click', () => {
      if (bgMusic.muted) {
        bgMusic.muted = false;
        audioToggle.textContent = 'Musica: ON';
        audioToggle.classList.remove('audio-muted');
        audioToggle.classList.add('audio-on');
      } else {
        bgMusic.muted = true;
        audioToggle.textContent = 'Musica: OFF';
        audioToggle.classList.remove('audio-on');
        audioToggle.classList.add('audio-muted');
      }
    });
  }

  caseContinueBtn.addEventListener('click', () => {
    caseScreen.style.opacity = '0';
    caseScreen.style.transition = 'opacity 0.8s ease';

    setTimeout(() => {
      caseScreen.classList.add('hidden');
      wrapper.classList.remove('hidden');
      wrapper.classList.add('game-enter');
      renderInventory();
      loadScene('prologue');
    }, 800);
  });

  if (inventoryToggle && inventoryPanel) {
    inventoryToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      inventoryPanel.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
      if (!inventoryPanel.classList.contains('hidden') &&
        !inventoryPanel.contains(event.target) &&
        event.target !== inventoryToggle) {
        inventoryPanel.classList.add('hidden');
      }
    });

    inventoryPanel.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }

});

/* === NEBBIA VANTA.JS === */

let vantaOptions = {
  el: '#splash-screen',
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  highlightColor: 0xffffff,
  midtoneColor: 0xaaaaaa,
  lowlightColor: 0x333333,
  baseColor: 0x000000,
  speed: 2.00,
  zoom: 1.00,
  blurFactor: 0.7
};

if (window.innerWidth <= 768) {
  vantaOptions.speed = 1.50;
  vantaOptions.zoom = 1.10;
  vantaOptions.blurFactor = 0.7;
  vantaOptions.highlightColor = 0xffffff;  // nebbia bianca
  vantaOptions.midtoneColor = 0xaaaaaa;    // grigio chiaro
  vantaOptions.lowlightColor = 0x333333;   // grigio scuro
  vantaOptions.baseColor = 0x000000;       // fondo nero puro
}

VANTA.FOG(vantaOptions);

/* === UTILITY === */

let messageTimeout = null;

function showMessage(text) {
  const box = document.getElementById('message-box');
  box.textContent = text;
  box.classList.remove('hidden');

  if (messageTimeout) clearTimeout(messageTimeout);
  messageTimeout = setTimeout(() => {
    box.classList.add('hidden');
  }, 4000);
}