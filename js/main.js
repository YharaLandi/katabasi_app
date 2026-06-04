// ============================================
// KATABASI — main.js
// Punto di ingresso. Gestisce splash screen
// e inizializza il gioco.
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── SPLASH ──────────────────────────────────
  const splash   = document.getElementById('splash-screen');
  const wrapper  = document.getElementById('game-wrapper');
  const splashBtn = document.getElementById('splash-btn');

  splashBtn.addEventListener('click', () => {
    splash.classList.add('splash-exit');
    setTimeout(() => {
      splash.classList.add('hidden');
      wrapper.classList.remove('hidden');
      wrapper.classList.add('game-enter');
      renderInventory();
      loadScene('prologue');
    }, 1000);
  });

  // ── INVENTORY TOGGLE ────────────────────────
  document.getElementById('inventory-toggle').addEventListener('click', () => {
    document.getElementById('inventory-panel').classList.toggle('hidden');
  });

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


VANTA.FOG({
  el: '#splash-screen',
 mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  highlightColor: 0x0,
  midtoneColor: 0xa0a0a0,
  lowlightColor: 0x5f5f5f,
  baseColor: 0xa4a4a4,
  speed: 2.00,
  zoom: 1.60
})