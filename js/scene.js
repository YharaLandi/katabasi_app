// ============================================
// KATABASI — scene.js
// Carica e renderizza le scene.
// Legge da data/scenes.js, scrive sul DOM,
// chiama game.js per aggiornare lo stato.
// ============================================

function loadScene(sceneId) {
  const scene = SCENES[sceneId];
  if (!scene) {
    console.error(`Scena non trovata: ${sceneId}`);
    return;
  }

  setCurrentScene(sceneId);
  updateBackground(scene.background);

  switch (scene.type) {
    case 'identity_choice':
      renderPrologue(scene);
      break;
    case 'exploration':
      renderExploration(scene);
      break;
    case 'board':
      renderBoard(scene);
      break;
    case 'accusation':
      renderAccusation(scene);
      break;
    default:
      renderExploration(scene);
  }
}


// ── BACKGROUND ──────────────────────────────

function updateBackground(imagePath) {
  const bg = document.getElementById('scene-background');
  bg.style.backgroundImage = `url('${imagePath}')`;
}


// ── PROLOGUE ────────────────────────────────

function renderPrologue(scene) {
  const main = document.getElementById('scene-main');
  main.innerHTML = '';

  // Testo introduttivo
  const textEl = document.createElement('div');
  textEl.classList.add('scene-text');
  scene.text.forEach(line => {
    const p = document.createElement('p');
    p.innerHTML = line;
    textEl.appendChild(p);
  });
  main.appendChild(textEl);

  // Griglia identità
  const grid = document.createElement('div');
  grid.classList.add('identity-grid');

  scene.identities.forEach(identity => {
    const card = document.createElement('div');
    card.classList.add('identity-card');
    card.dataset.id = identity.id;

    const label = document.createElement('h2');
    label.classList.add('identity-label');
    label.textContent = identity.label;

    const subtitle = document.createElement('p');
    subtitle.classList.add('identity-subtitle');
    subtitle.textContent = identity.subtitle;

    const desc = document.createElement('p');
    desc.classList.add('identity-desc');
    desc.textContent = identity.description;

    const btn = document.createElement('button');
    btn.classList.add('identity-btn');
    btn.textContent = 'Scegli';
    btn.addEventListener('click', () => chooseIdentity(identity.id));

    card.appendChild(label);
    card.appendChild(subtitle);
    card.appendChild(desc);
    card.appendChild(btn);
    grid.appendChild(card);
  });

  main.appendChild(grid);
}

function chooseIdentity(identityId) {
  setIdentity(identityId);
  unlockScene('tower');
  loadScene('tower');
}


// ── EXPLORATION ─────────────────────────────

function renderExploration(scene) {
  const main = document.getElementById('scene-main');
  main.innerHTML = '';

  // Titolo scena
  const title = document.createElement('h1');
  title.classList.add('scene-title');
  title.textContent = scene.title;
  main.appendChild(title);

  // Testo descrittivo
  const textEl = document.createElement('div');
  textEl.classList.add('scene-text');
  scene.text.forEach(line => {
    const p = document.createElement('p');
    p.innerHTML = line;
    textEl.appendChild(p);
  });
  main.appendChild(textEl);

  // Azioni disponibili
  const actions = document.createElement('div');
  actions.classList.add('scene-actions');

  // Oggetti raccoglibili
  if (scene.items && scene.items.length > 0) {
    scene.items.forEach(itemId => {
      const item = ITEMS[itemId];
      if (!item) return;

      // Nascondi se già in inventario
      if (hasItem(itemId)) return;

      // Nascondi se esiste una versione evolved già in inventario
      if (item.replacedBy && hasItem(item.replacedBy)) return;

      const btn = document.createElement('button');
      btn.classList.add('action-btn', 'action-pick');
      btn.textContent = `Raccogli: ${item.name}`;
      btn.addEventListener('click', () => pickUpItem(itemId));
      actions.appendChild(btn);
    });
  }

  // Puzzle disponibili
  if (scene.puzzles && scene.puzzles.length > 0) {
    scene.puzzles.forEach(puzzleId => {
      if (isPuzzleSolved(puzzleId)) return;

      const puzzle = PUZZLES[puzzleId];

      // Mostra il puzzle solo se hai l'oggetto richiesto
      if (puzzle.requiredItem && !hasItem(puzzle.requiredItem)) return;

      const btn = document.createElement('button');
      btn.classList.add('action-btn', 'action-puzzle');
      btn.textContent = `Esamina: ${puzzle.title}`;
      btn.addEventListener('click', () => openPuzzle(puzzleId));
      actions.appendChild(btn);
    });
  }

  // Personaggi con cui parlare
  if (scene.characters && scene.characters.length > 0) {
    scene.characters.forEach(charId => {
      const char = CHARACTERS[charId];
      const btn = document.createElement('button');
      btn.classList.add('action-btn', 'action-talk');
      btn.textContent = `Parla con: ${char.name}`;
      btn.addEventListener('click', () => openDialogue(charId));
      actions.appendChild(btn);
    });
  }

  main.appendChild(actions);

  // Tasto indietro
  if (scene.back) {
    const backBtn = document.createElement('button');
    backBtn.classList.add('action-btn');
    backBtn.textContent = '← Torna indietro';
    backBtn.addEventListener('click', () => loadScene(scene.back));
    main.appendChild(backBtn);
  }

  renderExits(scene, main);
}


// ── EXITS ───────────────────────────────────

function renderExits(scene, container) {
  if (!scene.exits || scene.exits.length === 0) return;

  const exitsEl = document.createElement('div');
  exitsEl.classList.add('scene-exits');

  scene.exits.forEach(exit => {
    const isUnlocked = exit.condition === null || isPuzzleSolved(exit.condition);
    const btn = document.createElement('button');
    btn.classList.add('exit-btn');
    btn.textContent = exit.label;
    btn.disabled = !isUnlocked;

    if (isUnlocked) {
      btn.addEventListener('click', () => {
        unlockScene(exit.to);
        loadScene(exit.to);
      });
    } else {
      btn.title = 'Risolvi prima l\'enigma per procedere';
    }

    exitsEl.appendChild(btn);
  });

  container.appendChild(exitsEl);
}


// ── PICK UP ITEM ────────────────────────────

function pickUpItem(itemId) {
  addToInventory(itemId);
  renderInventory();
  loadScene(getCurrentScene()); // ricarica la scena — aggiorna bottoni disponibili
}


// ── BOARD ───────────────────────────────────

function renderBoard(scene) {
  const main = document.getElementById('scene-main');
  main.innerHTML = '';

  const title = document.createElement('h1');
  title.classList.add('scene-title');
  title.textContent = scene.title;
  main.appendChild(title);

  const textEl = document.createElement('div');
  textEl.classList.add('scene-text');
  scene.text.forEach(line => {
    const p = document.createElement('p');
    p.innerHTML = line;
    textEl.appendChild(p);
  });
  main.appendChild(textEl);

  // Contatore indizi
  const counter = document.createElement('p');
  counter.classList.add('clue-counter');
  const count = clueCount();
  const required = scene.requiredClues || 3;
  counter.textContent = `Indizi raccolti: ${count} — necessari per parlare con Sable: ${required}`;
  main.appendChild(counter);

  const boardBtn = document.createElement('button');
  boardBtn.classList.add('action-btn', 'action-board');
  boardBtn.textContent = 'Apri la bacheca degli indizi';
  boardBtn.addEventListener('click', openBoard);
  main.appendChild(boardBtn);

  // Sable — sbloccato se hai abbastanza indizi
  if (scene.characters) {
    scene.characters.forEach(charId => {
      const char = CHARACTERS[charId];
      const hasEnough = count >= required;
      const btn = document.createElement('button');
      btn.classList.add('action-btn', 'action-talk');
      btn.textContent = hasEnough
        ? `Parla con: ${char.name}`
        : `Parla con: ${char.name} (servono ${required} indizi)`;
      btn.disabled = !hasEnough;
      btn.addEventListener('click', () => {
        if (hasEnough) openDialogue(charId);
      });
      main.appendChild(btn);
    });
  }

  // Tasto indietro
  if (scene.back) {
    const backBtn = document.createElement('button');
    backBtn.classList.add('action-btn');
    backBtn.textContent = '← Torna indietro';
    backBtn.addEventListener('click', () => loadScene(scene.back));
    main.appendChild(backBtn);
  }

  renderExits(scene, main);
}


// ── ACCUSATION ──────────────────────────────

function renderAccusation(scene) {
  const main = document.getElementById('scene-main');
  main.innerHTML = '';

  const title = document.createElement('h1');
  title.classList.add('scene-title');
  title.textContent = scene.title;
  main.appendChild(title);

  const textEl = document.createElement('div');
  textEl.classList.add('scene-text');
  scene.text.forEach(line => {
    const p = document.createElement('p');
    p.innerHTML = line;
    textEl.appendChild(p);
  });
  main.appendChild(textEl);

  const suspectGrid = document.createElement('div');
  suspectGrid.classList.add('suspect-grid');

  scene.suspects.forEach(suspectId => {
    const char = CHARACTERS[suspectId];
    const card = document.createElement('div');
    card.classList.add('suspect-card');

    const portrait = document.createElement('img');
    portrait.src = char.portraits.neutral;
    portrait.alt = char.name;
    portrait.classList.add('suspect-portrait');

    const name = document.createElement('p');
    name.classList.add('suspect-name');
    name.textContent = char.name;

    const btn = document.createElement('button');
    btn.classList.add('accuse-btn');
    btn.textContent = 'Accusa';
    btn.addEventListener('click', () => accuseSuspect(suspectId));

    card.appendChild(portrait);
    card.appendChild(name);
    card.appendChild(btn);
    suspectGrid.appendChild(card);
  });

  main.appendChild(suspectGrid);
}

function accuseSuspect(suspectId) {
  setChoice('accusedId', suspectId);
  loadEnding();
}