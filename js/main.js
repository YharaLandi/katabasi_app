// ============================================
// KATABASI — main.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  const splash          = document.getElementById('splash-screen');
  const caseScreen      = document.getElementById('case-intro-screen');
  const wrapper         = document.getElementById('game-wrapper');
  const splashBtn       = document.getElementById('splash-btn');
  const caseContinueBtn = document.getElementById('case-continue-btn');
  const bgMusic         = document.getElementById('bg-music');
  const audioToggle     = document.getElementById('audio-toggle');
  const inventoryPanel  = document.getElementById('inventory-panel');
  const inventoryToggle = document.getElementById('inventory-toggle');

  if (bgMusic) bgMusic.volume = 0.3;

  // ── NEBBIA VANTA ────────────────────────────
  const isMobile = window.innerWidth <= 768;

  const vantaOptions = {
    el: '#splash-screen',
    mouseControls: !isMobile,
    touchControls: isMobile,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    highlightColor: 0xffffff,
    midtoneColor:   0xaaaaaa,
    lowlightColor:  0x333333,
    baseColor:      0x000000,
    blurFactor:     0.7,
    speed:          2.00,
    zoom:           1.00
  };

  if (isMobile) {
    vantaOptions.speed = 1.50;
    vantaOptions.zoom  = 1.10;
  }

  if (typeof VANTA !== 'undefined' && typeof THREE !== 'undefined') {
    VANTA.FOG(vantaOptions);
  } else {
    console.warn('Vanta o Three.js non caricati');
  }

  // ── SPLASH → GIORNALE ───────────────────────
  splashBtn.addEventListener('click', () => {
    splash.classList.add('splash-exit');

    if (bgMusic) {
      bgMusic.play().catch(err => console.log("Audio bloccato: ", err));
    }

    setTimeout(() => {
      splash.classList.add('hidden');
      wrapper.classList.add('hidden');
      caseScreen.classList.remove('hidden');
      caseScreen.classList.add('game-enter');
    }, 1000);
  });

  // ── AUDIO TOGGLE ────────────────────────────
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

  // ── GIORNALE → GIOCO ────────────────────────
  caseContinueBtn.addEventListener('click', () => {
    caseScreen.style.opacity    = '0';
    caseScreen.style.transition = 'opacity 0.8s ease';

    setTimeout(() => {
      caseScreen.classList.add('hidden');
      wrapper.classList.remove('hidden');
      wrapper.classList.add('game-enter');
      renderInventory();
      loadScene('prologue');
    }, 800);
  });

  // ── INVENTARIO ──────────────────────────────
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

// ── UTILITY ─────────────────────────────────

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