// ============================================
// KATABASI — game.js
// Stato centrale e funzioni core
// Nessun modulo tocca gameState direttamente —
// tutto passa da queste funzioni.
// ============================================

const gameState = {
  player: {
    identity: null, // 'detective' | 'journalist' | 'occultist'
    name: ''
  },
  clues: [],             // ID degli indizi raccolti
  inventory: [],         // ID degli oggetti in possesso
  connections: [],       // Coppie connesse sulla bacheca
  choices: {
    coveredSuspect: false,  // Scena 02 — scelta morale
    accusedId: null         // 'elias' | 'calista' | 'dorian'
  },
  currentScene: 'prologue',
  unlockedScenes: ['prologue'],
  puzzlesSolved: []
};


// ── PLAYER ──────────────────────────────────

function setIdentity(identity) {
  gameState.player.identity = identity;
}

function setName(name) {
  gameState.player.name = name;
}

function getIdentity() {
  return gameState.player.identity;
}


// ── SCENE ───────────────────────────────────

function getCurrentScene() {
  return gameState.currentScene;
}

function setCurrentScene(sceneId) {
  gameState.currentScene = sceneId;
}

function unlockScene(sceneId) {
  if (!gameState.unlockedScenes.includes(sceneId)) {
    gameState.unlockedScenes.push(sceneId);
  }
}

function canAccessScene(sceneId) {
  return gameState.unlockedScenes.includes(sceneId);
}


// ── CLUES ───────────────────────────────────

function addClue(clueId) {
  if (!gameState.clues.includes(clueId)) {
    gameState.clues.push(clueId);
  }
}

function hasClue(clueId) {
  return gameState.clues.includes(clueId);
}

function clueCount() {
  return gameState.clues.length;
}


// ── INVENTORY ───────────────────────────────

function addToInventory(itemId) {
  if (!gameState.inventory.includes(itemId)) {
    gameState.inventory.push(itemId);
  }
}

function removeFromInventory(itemId) {
  gameState.inventory = gameState.inventory.filter(id => id !== itemId);
}

function hasItem(itemId) {
  return gameState.inventory.includes(itemId);
}


// ── CHOICES ─────────────────────────────────

function setChoice(key, value) {
  gameState.choices[key] = value;
}

function getChoice(key) {
  return gameState.choices[key];
}


// ── PUZZLES ─────────────────────────────────

function solvePuzzle(puzzleId) {
  if (!gameState.puzzlesSolved.includes(puzzleId)) {
    gameState.puzzlesSolved.push(puzzleId);
  }
}

function isPuzzleSolved(puzzleId) {
  return gameState.puzzlesSolved.includes(puzzleId);
}


// ── BOARD ───────────────────────────────────

function addConnection(nodeA, nodeB) {
  const exists = gameState.connections.some(
    c => (c[0] === nodeA && c[1] === nodeB) ||
         (c[0] === nodeB && c[1] === nodeA)
  );
  if (!exists) {
    gameState.connections.push([nodeA, nodeB]);
  }
}

function hasConnection(nodeA, nodeB) {
  return gameState.connections.some(
    c => (c[0] === nodeA && c[1] === nodeB) ||
         (c[0] === nodeB && c[1] === nodeA)
  );
}


// ── ENDING ──────────────────────────────────

function calculateEnding() {
  const totalClues = 7; // numero totale di indizi nel gioco
  const ratio = clueCount() / totalClues;

  if (gameState.choices.coveredSuspect) {
    return 'c'; // complice
  }

  if (ratio >= 0.85) {
    return 'a'; // verità completa
  }

  return 'b'; // colpevole sbagliato
}


// ── DEBUG ────────────────────────────────────

function logState() {
  console.log('── KATABASI gameState ──', gameState);
}
