// ============================================
// KATABASI — inventory.js
// Renderizza l'inventario e gestisce
// la combinazione degli oggetti.
// ============================================

let selectedItem = null;

function renderInventory() {
  const panel = document.getElementById('inventory-items');
  panel.innerHTML = '';

  const inventory = gameState.inventory;

  if (inventory.length === 0) {
    const empty = document.createElement('p');
    empty.classList.add('inventory-empty');
    empty.textContent = 'Nessun oggetto.';
    panel.appendChild(empty);
    return;
  }

  inventory.forEach(itemId => {
    const item = ITEMS[itemId];
    const slot = document.createElement('div');
    slot.classList.add('inventory-slot');
    slot.dataset.id = itemId;

    if (selectedItem === itemId) {
      slot.classList.add('selected');
    }

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.classList.add('inventory-img');

    const name = document.createElement('p');
    name.classList.add('inventory-name');
    name.textContent = item.name;

    slot.appendChild(img);
    slot.appendChild(name);
    slot.addEventListener('click', () => selectItem(itemId));
    panel.appendChild(slot);
  });
}

function selectItem(itemId) {
  if (selectedItem === null) {
    // Prima selezione
    selectedItem = itemId;
    renderInventory();
    showItemDetail(itemId);
  } else if (selectedItem === itemId) {
    // Deselezione
    selectedItem = null;
    renderInventory();
    hideItemDetail();
  } else {
    // Seconda selezione — prova combinazione
    tryCombine(selectedItem, itemId);
    selectedItem = null;
    renderInventory();
  }
}

function tryCombine(itemIdA, itemIdB) {
  // Controlla in entrambe le direzioni
  let sourceId = null;
  let targetId = null;
  let combo = null;

  const itemA = ITEMS[itemIdA];
  const itemB = ITEMS[itemIdB];

  if (itemA.combinable) {
    combo = itemA.combinations.find(c => c.with === itemIdB);
    if (combo) { sourceId = itemIdA; targetId = itemIdB; }
  }

  if (!combo && itemB.combinable) {
    combo = itemB.combinations.find(c => c.with === itemIdA);
    if (combo) { sourceId = itemIdB; targetId = itemIdA; }
  }

  if (!combo) {
    showMessage('Questi due oggetti non hanno nulla in comune.');
    return;
  }

  // Combinazione riuscita
  removeFromInventory(sourceId);
  removeFromInventory(targetId);

  if (combo.result) {
    addToInventory(combo.result);
  }

  const puzzleId = findPuzzleByCombination(sourceId, targetId);
  if (puzzleId) {
    solvePuzzle(puzzleId);
    const puzzle = PUZZLES[puzzleId];
    addClue(puzzle.rewardClue);
    showMessage(puzzle.rewardText);
    loadScene(getCurrentScene());
  }

  renderInventory();
}

  // Combinazione riuscita
  removeFromInventory(itemIdA);
  removeFromInventory(itemIdB);

  if (combo.result) {
    addToInventory(combo.result);
  }

  // Segna il puzzle come risolto se la combinazione corrisponde a un puzzle
  const puzzleId = findPuzzleByCombination(itemIdA, itemIdB);
  if (puzzleId) {
    solvePuzzle(puzzleId);
    const puzzle = PUZZLES[puzzleId];
    addClue(puzzle.rewardClue);
    showMessage(puzzle.rewardText);
    loadScene(getCurrentScene()); // ricarica la scena per aggiornare le azioni
  }

  renderInventory();


function findPuzzleByCombination(itemIdA, itemIdB) {
  return Object.keys(PUZZLES).find(puzzleId => {
    const p = PUZZLES[puzzleId];
    return p.type === 'combine' && p.scene === getCurrentScene();
  }) || null;
}

function showItemDetail(itemId) {
  const item = ITEMS[itemId];
  const detail = document.getElementById('item-detail');
  if (!detail) return;
  detail.querySelector('.detail-name').textContent = item.name;
  detail.querySelector('.detail-desc').textContent = item.description;
  detail.classList.remove('hidden');
}

function hideItemDetail() {
  const detail = document.getElementById('item-detail');
  if (detail) detail.classList.add('hidden');
}
