// ============================================
// KATABASI — ending.js
// Calcola quale finale mostrare e lo renderizza.
// ============================================

const ENDINGS = {
  a: {
    id: 'a',
    title: 'La verità completa',
    background: 'assets/images/backgrounds/bg_ending_a.png',
    text: [
      'Mira non si è suicidata.',
      'Il ricordo proibito viene riportato alla luce.',
      'La città trema.',
      'Per la prima volta da anni, qualcosa non può essere cancellato.'
    ]
  },
  b: {
    id: 'b',
    title: 'Colpevole sbagliato',
    background: 'assets/images/backgrounds/bg_ending_b.png',
    text: [
      'Il colpevole reale rimane libero.',
      'La città dimentica in fretta.',
      'Come sempre.',
      'Il lampione fuori dalla Torre si spegne.'
    ]
  },
  c: {
    id: 'c',
    title: 'Complice',
    background: 'assets/images/backgrounds/bg_ending_c.png',
    text: [
      'Il ricordo proibito scompare per sempre.',
      'Sei diventato parte del silenzio che volevi rompere.',
      'La boccetta cade.',
      'Il liquido si disperde tra le dita.'
    ]
  }
};

function loadEnding() {
  const endingId = calculateEnding();
  const ending = ENDINGS[endingId];

  updateBackground(ending.background);

  const main = document.getElementById('scene-main');
  main.innerHTML = '';

  const title = document.createElement('h1');
  title.classList.add('ending-title');
  title.textContent = ending.title;
  main.appendChild(title);

  const textEl = document.createElement('div');
  textEl.classList.add('ending-text');
  ending.text.forEach((line, i) => {
    const p = document.createElement('p');
    p.textContent = line;
    p.style.animationDelay = `${i * 0.8}s`;
    p.classList.add('ending-line');
    textEl.appendChild(p);
  });
  main.appendChild(textEl);

  // Tasto per ricominciare
  const restartBtn = document.createElement('button');
  restartBtn.classList.add('restart-btn');
  restartBtn.textContent = 'Ricomincia la discesa';
  restartBtn.addEventListener('click', restartGame);
  main.appendChild(restartBtn);

  // Nascondi inventario e nav durante il finale
  document.getElementById('inventory-panel').classList.add('hidden');
}

function restartGame() {
  // Resetta lo stato
  gameState.player.identity = null;
  gameState.player.name = '';
  gameState.clues = [];
  gameState.inventory = [];
  gameState.connections = [];
  gameState.choices.coveredSuspect = false;
  gameState.choices.accusedId = null;
  gameState.currentScene = 'prologue';
  gameState.unlockedScenes = ['prologue'];
  gameState.puzzlesSolved = [];

  // Ripristina UI
  document.getElementById('inventory-panel').classList.remove('hidden');
  renderInventory();
  loadScene('prologue');
}
