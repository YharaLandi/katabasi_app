// ============================================
// KATABASI — puzzle.js
// Apre, renderizza e valida gli enigmi.
// ============================================

function openPuzzle(puzzleId) {
  const puzzle = PUZZLES[puzzleId];
  if (!puzzle) return;

  const overlay = document.getElementById('puzzle-overlay');
  const content = document.getElementById('puzzle-content');
  content.innerHTML = '';

  const title = document.createElement('h2');
  title.classList.add('puzzle-title');
  title.textContent = puzzle.title;

  const desc = document.createElement('p');
  desc.classList.add('puzzle-desc');
  desc.textContent = puzzle.description;

  const prompt = document.createElement('p');
  prompt.classList.add('puzzle-prompt');
  prompt.textContent = puzzle.prompt;

  content.appendChild(title);
  content.appendChild(desc);
  content.appendChild(prompt);

  switch (puzzle.type) {
    case 'cipher':   renderCipherPuzzle(puzzle, content);   break;
    case 'sequence': renderSequencePuzzle(puzzle, content); break;
    case 'riddle':   renderRiddlePuzzle(puzzle, content);   break;
    case 'mirror':   renderMirrorPuzzle(puzzle, content);   break;
  }

  if (puzzle.hint) {
    const hint = document.createElement('p');
    hint.classList.add('puzzle-hint');
    hint.textContent = `💡 ${puzzle.hint}`;
    content.appendChild(hint);
  }

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('puzzle-close');
  closeBtn.textContent = 'Chiudi';
  closeBtn.addEventListener('click', closePuzzle);
  content.appendChild(closeBtn);

  overlay.classList.remove('hidden');
}

function closePuzzle() {
  document.getElementById('puzzle-overlay').classList.add('hidden');
}


// ── MIRROR ──────────────────────────────────

function renderMirrorPuzzle(puzzle, container) {
  const label = document.createElement('p');
  label.classList.add('puzzle-hint');
  label.textContent = 'Il nastro riflesso nello specchio...';

  const mirror = document.createElement('div');
  mirror.classList.add('puzzle-mirror-text');
  mirror.textContent = puzzle.mirroredText;

  const input = document.createElement('input');
  input.type = 'text';
  input.classList.add('puzzle-input');
  input.placeholder = 'Cosa vedi?';

  const submitBtn = document.createElement('button');
  submitBtn.classList.add('puzzle-submit');
  submitBtn.textContent = 'Conferma';
  submitBtn.addEventListener('click', () => {
    const normalize = str => str.trim().toUpperCase().replace(/[\s\-_]/g, '');
    if (normalize(input.value) === normalize(puzzle.solution)) {
      onPuzzleSolved(puzzle);
    } else {
      showPuzzleError(container);
    }
  });

  container.appendChild(label);
  container.appendChild(mirror);
  container.appendChild(input);
  container.appendChild(submitBtn);
}


// ── CIPHER ──────────────────────────────────

function renderCipherPuzzle(puzzle, container) {
  const input = document.createElement('input');
  input.type = 'text';
  input.classList.add('puzzle-input');
  input.placeholder = 'La tua risposta...';

  const submitBtn = document.createElement('button');
  submitBtn.classList.add('puzzle-submit');
  submitBtn.textContent = 'Conferma';
  submitBtn.addEventListener('click', () => {
    const normalize = str => str.trim().toUpperCase().replace(/[\s\-_]/g, '');
    if (normalize(input.value) === normalize(puzzle.solution)) {
      onPuzzleSolved(puzzle);
    } else {
      showPuzzleError(container);
    }
  });

  container.appendChild(input);
  container.appendChild(submitBtn);
}


// ── SEQUENCE ────────────────────────────────

function renderSequencePuzzle(puzzle, container) {
  const sequence = [];

  const display = document.createElement('div');
  display.classList.add('sequence-display');
  display.textContent = '[ ]';

  const buttons = document.createElement('div');
  buttons.classList.add('sequence-buttons');

  ['1', '2', '3', '4'].forEach(num => {
    const btn = document.createElement('button');
    btn.classList.add('sequence-btn');
    btn.textContent = num;
    btn.addEventListener('click', () => {
      sequence.push(num);
      display.textContent = `[ ${sequence.join(' — ')} ]`;
    });
    buttons.appendChild(btn);
  });

  const resetBtn = document.createElement('button');
  resetBtn.classList.add('puzzle-reset');
  resetBtn.textContent = 'Ricomincia';
  resetBtn.addEventListener('click', () => {
    sequence.length = 0;
    display.textContent = '[ ]';
  });

  const submitBtn = document.createElement('button');
  submitBtn.classList.add('puzzle-submit');
  submitBtn.textContent = 'Conferma sequenza';
  submitBtn.addEventListener('click', () => {
    if (JSON.stringify(sequence) === JSON.stringify(puzzle.solution)) {
      onPuzzleSolved(puzzle);
    } else {
      sequence.length = 0;
      display.textContent = '[ ]';
      showPuzzleError(container);
    }
  });

  container.appendChild(display);
  container.appendChild(buttons);
  container.appendChild(resetBtn);
  container.appendChild(submitBtn);
}


// ── RIDDLE ──────────────────────────────────

function renderRiddlePuzzle(puzzle, container) {
  const input = document.createElement('input');
  input.type = 'text';
  input.classList.add('puzzle-input');
  input.placeholder = 'La tua risposta...';

  const submitBtn = document.createElement('button');
  submitBtn.classList.add('puzzle-submit');
  submitBtn.textContent = 'Rispondi';
  submitBtn.addEventListener('click', () => {
    const normalize = str => str.trim().toLowerCase().replace(/[\s\-_]/g, '');
    if (normalize(input.value) === normalize(puzzle.solution)) {
      onPuzzleSolved(puzzle);
    } else {
      showPuzzleError(container);
    }
  });

  container.appendChild(input);
  container.appendChild(submitBtn);
}


// ── ON SOLVED ───────────────────────────────

function onPuzzleSolved(puzzle) {
  solvePuzzle(puzzle.id);
  addClue(puzzle.rewardClue);

  // Se il puzzle produce un nuovo oggetto, sostituisce quello vecchio
  if (puzzle.rewardItem) {
    if (puzzle.consumeItem) removeFromInventory(puzzle.consumeItem);
    addToInventory(puzzle.rewardItem);
    renderInventory();
  }

  closePuzzle();
  showMessage(puzzle.rewardText);
  loadScene(getCurrentScene());
}

function showPuzzleError(container) {
  let error = container.querySelector('.puzzle-error');
  if (!error) {
    error = document.createElement('p');
    error.classList.add('puzzle-error');
    error.textContent = 'Non è corretto. Riprova.';
    container.appendChild(error);
  }
  error.classList.add('shake');
  setTimeout(() => error.classList.remove('shake'), 500);
}