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

  // Elementi Inventario
  const inventoryPanel = document.getElementById('inventory-panel');
  const inventoryToggle = document.getElementById('inventory-toggle');

  // Impostiamo un volume di sottofondo soffuso di default
  if (bgMusic) bgMusic.volume = 0.3;

  // STEP 1: Da Splash Screen a Ritaglio Giornale + Avvio Audio (Garantendo l'isolamento)
  splashBtn.addEventListener('click', () => {
    splash.classList.add('splash-exit');
    
    // Tenta di avviare la musica all'interfaccia utente iniziale
    if (bgMusic) {
      bgMusic.play().catch(err => console.log("Riproduzione audio bloccata dal browser: ", err));
    }

    setTimeout(() => {
      splash.classList.add('hidden');
      
      // SICUREZZA: Teniamo spento il wrapper di gioco principale mentre c'è il giornale
      wrapper.classList.add('hidden');
      
      caseScreen.classList.remove('hidden');
      caseScreen.classList.add('game-enter');
    }, 1000);
  });

  // Gestione del pulsante di Mute dell'audio
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

  // STEP 2: Da Ritaglio Giornale a Scelta Identità (Prologo)
  caseContinueBtn.addEventListener('click', () => {
    caseScreen.style.opacity = '0';
    caseScreen.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
      // Spegniamo il giornale definitivamente per liberare la memoria del layout
      caseScreen.classList.add('hidden');
      
      // Accendiamo e sblocchiamo il gioco solo adesso
      wrapper.classList.remove('hidden');
      wrapper.classList.add('game-enter');
      
      renderInventory();
      loadScene('prologue');
    }, 800);
  });

  // ── GESTIONE INVENTARIO (CON FUNZIONE CLICK OUTSIDE) ────────────────────────
  
  if (inventoryToggle && inventoryPanel) {
    // 1. Apertura/Chiusura classica tramite il pulsante Header
    inventoryToggle.addEventListener('click', (event) => {
      event.stopPropagation(); // Blocca la propagazione immediata al document
      inventoryPanel.classList.toggle('hidden');
    });

    // 2. Chiudi l'inventario se si clicca in un punto qualsiasi fuori dal pannello
    document.addEventListener('click', (event) => {
      if (!inventoryPanel.classList.contains('hidden') && 
          !inventoryPanel.contains(event.target) && 
          event.target !== inventoryToggle) {
        
        inventoryPanel.classList.add('hidden');
      }
    });

    // 3. Evita che i click all'interno dell'inventario stesso lo chiudano per errore
    inventoryPanel.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }

});

/* === EFFETTO NEBBIA VANTA.JS INTERFACCIA === */
/* === CONFIGURAZIONE DINAMICA NEBBIA VANTA.JS === */

// 1. Definiamo la configurazione di base (Desktop)
let vantaOptions = {
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
  speed: 2.00, // Velocità su PC
  zoom: 1.60   // Zoom su PC
};

// 2. CONTROLLO MOBILE: Se lo schermo è inferiore o uguale a 768px, modifichiamo i parametri
if (window.innerWidth <= 768) {
  vantaOptions.speed = 3.00;        // Riduciamo la velocità su mobile per risparmiare CPU/Batteria
  vantaOptions.zoom = 1.10;         // Modifichiamo lo zoom per stringere l'inquadratura sul telefono
  
  // Puoi anche cambiare i colori solo su mobile modificando queste righe:
  // vantaOptions.midtoneColor = 0x808080; 
  // vantaOptions.baseColor = 0x909090;
}

// 3. Inizializziamo Vanta con la configurazione scelta
VANTA.FOG(vantaOptions);

// ── UTILITY GLOBALI ─────────────────────────────────

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