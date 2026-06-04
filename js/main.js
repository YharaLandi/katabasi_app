// ============================================
// KATABASI — main.js
// Punto di ingresso. Gestisce splash screen
// e inizializza il gioco.
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  const splash = document.getElementById('splash-screen');
  const caseScreen = document.getElementById('case-intro-screen');
  const wrapper = document.getElementById('game-wrapper');
  const splashBtn = document.getElementById('splash-btn');
  const caseContinueBtn = document.getElementById('case-continue-btn');
  
  // Elementi Audio
  const bgMusic = document.getElementById('bg-music');
  const audioToggle = document.getElementById('audio-toggle');

  // Impostiamo un volume di sottofondo soffuso di default
  if (bgMusic) bgMusic.volume = 0.3;

  // STEP 1: Da Splash Screen a Ritaglio Giornale + Avvio Audio
  splashBtn.addEventListener('click', () => {
    splash.classList.add('splash-exit');
    
    // Tenta di avviare la musica all'interfaccia utente iniziale
    if (bgMusic) {
      bgMusic.play().catch(err => console.log("Riproduzione audio bloccata dal browser: ", err));
    }

    setTimeout(() => {
      splash.classList.add('hidden');
      caseScreen.classList.remove('hidden');
      caseScreen.classList.add('game-enter');
    }, 1000);
  });

  // STEP 2: Gestione del pulsante di Mute dell'audio
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

  // Da Ritaglio Giornale a Scelta Identità (Prologo)
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