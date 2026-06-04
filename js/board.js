// ============================================
// KATABASI — board.js
// Bacheca degli indizi — scena 04.
// Nodi colorati per categoria — collega
// indizi dello stesso colore per trovare
// le connessioni valide.
// ============================================

const CLUE_LABELS = {
  clue_cipher_note:     'Messaggio cifrato — GUARDA SOTTO',
  clue_vial_label:      'Etichetta invisibile — 0-07-PALE',
  clue_calista_nervous: 'Calista — nervosismo alla menzione di Mira',
  clue_calista_motive:  'Calista — vendeva ricordi rubati dalla Torre',
  clue_waiting_room:    'Clinica — paziente anonimo presente quella notte',
  clue_dossier_open:    'Dossier aperto — nome del paziente di Dorian',
  clue_dorian_patient:  'Dorian — il paziente era presente',
  clue_dorian_motive:   'Dorian — Mira aveva trovato il dossier',
  clue_dorian_secret:   'Dorian — i ricordi cancellati si spostano',
  clue_sable_access:    'Sable — pronto a parlare',
  clue_sable_truth:     'Sable — Mira non è scesa da sola'
};

// Categoria visiva — determina il colore del nodo
// gold    = Torre / oggetti fisici
// red     = Calista
// purple  = Dorian
// teal    = Sable / verità finale
const CLUE_CATEGORIES = {
  clue_cipher_note:     'gold',
  clue_vial_label:      'gold',
  clue_calista_nervous: 'red',
  clue_calista_motive:  'red',
  clue_waiting_room:    'purple',
  clue_dossier_open:    'purple',
  clue_dorian_patient:  'purple',
  clue_dorian_motive:   'purple',
  clue_dorian_secret:   'purple',
  clue_sable_access:    'teal',
  clue_sable_truth:     'teal'
};

const VALID_CONNECTIONS = [
  ['clue_cipher_note',  'clue_vial_label'],
  ['clue_vial_label',   'clue_dossier_open'],
  ['clue_dossier_open', 'clue_dorian_motive'],
  ['clue_calista_motive', 'clue_calista_nervous'],
  ['clue_waiting_room', 'clue_dorian_patient'],
  ['clue_sable_truth',  'clue_dorian_motive']
];

let boardSelectedNode = null;

function openBoard() {
  const overlay = document.getElementById('board-overlay');
  const canvas  = document.getElementById('board-canvas');
  overlay.classList.remove('hidden');
  renderBoardNodes(canvas);
}

function closeBoard() {
  document.getElementById('board-overlay').classList.add('hidden');
  boardSelectedNode = null;
}

function renderBoardNodes(canvas) {
  canvas.innerHTML = '';

  const clues = gameState.clues;

  if (clues.length === 0) {
    const empty = document.createElement('p');
    empty.classList.add('board-empty');
    empty.textContent = 'Nessun indizio ancora. Continua a esplorare.';
    canvas.appendChild(empty);
    return;
  }

  // Legenda categorie
  const legend = document.createElement('div');
  legend.classList.add('board-legend');
  const categories = [
    { key: 'gold',   label: 'Torre / oggetti' },
    { key: 'red',    label: 'Calista' },
    { key: 'purple', label: 'Dorian' },
    { key: 'teal',   label: 'Sable' }
  ];
  categories.forEach(cat => {
    const item = document.createElement('div');
    item.classList.add('board-legend-item');
    const dot = document.createElement('span');
    dot.classList.add('board-legend-dot', `board-cat-${cat.key}`);
    const text = document.createElement('span');
    text.textContent = cat.label;
    item.appendChild(dot);
    item.appendChild(text);
    legend.appendChild(item);
  });
  canvas.appendChild(legend);

  // Istruzione
  const hint = document.createElement('p');
  hint.classList.add('board-hint');
  hint.textContent = 'Clicca due nodi dello stesso colore per collegarli.';
  canvas.appendChild(hint);

  // Crea nodi
  clues.forEach((clueId, index) => {
    const node = document.createElement('div');
    const category = CLUE_CATEGORIES[clueId] || 'gold';
    node.classList.add('board-node', `board-cat-${category}`);
    node.dataset.id = clueId;

    const col = index % 3;
    const row = Math.floor(index / 3);
    node.style.left = `${80 + col * 240}px`;
    node.style.top  = `${120 + row * 150}px`;

    const label = document.createElement('p');
    label.classList.add('board-node-label');
    label.textContent = CLUE_LABELS[clueId] || clueId;

    node.appendChild(label);
    node.addEventListener('click', () => selectBoardNode(clueId, node));
    canvas.appendChild(node);

    if (isNodeConnected(clueId)) {
      node.classList.add('connected');
    }
  });

  drawConnections(canvas);

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('board-close');
  closeBtn.textContent = 'Chiudi bacheca';
  closeBtn.addEventListener('click', closeBoard);
  canvas.appendChild(closeBtn);
}

function selectBoardNode(clueId, nodeEl) {
  if (boardSelectedNode === null) {
    // Prima selezione
    boardSelectedNode = clueId;
    document.querySelectorAll('.board-node').forEach(n => n.classList.remove('selected'));
    nodeEl.classList.add('selected');
  } else if (boardSelectedNode === clueId) {
    // Deselezione
    boardSelectedNode = null;
    nodeEl.classList.remove('selected');
  } else {
    // Seconda selezione — prova connessione
    tryConnect(boardSelectedNode, clueId);
    boardSelectedNode = null;
    renderBoardNodes(document.getElementById('board-canvas'));
  }
}

function tryConnect(nodeA, nodeB) {
  const isValid = VALID_CONNECTIONS.some(
    pair => (pair[0] === nodeA && pair[1] === nodeB) ||
            (pair[0] === nodeB && pair[1] === nodeA)
  );

  if (isValid) {
    addConnection(nodeA, nodeB);
    showMessage('Connessione trovata.');
  } else {
    showMessage('Questi due indizi non sembrano collegati direttamente.');
  }
}

function isNodeConnected(clueId) {
  return gameState.connections.some(
    pair => pair[0] === clueId || pair[1] === clueId
  );
}

function drawConnections(canvas) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('board-svg');

  gameState.connections.forEach(pair => {
    const nodeA = canvas.querySelector(`[data-id="${pair[0]}"]`);
    const nodeB = canvas.querySelector(`[data-id="${pair[1]}"]`);
    if (!nodeA || !nodeB) return;

    const rectA     = nodeA.getBoundingClientRect();
    const rectB     = nodeB.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    const x1 = rectA.left - canvasRect.left + rectA.width  / 2;
    const y1 = rectA.top  - canvasRect.top  + rectA.height / 2;
    const x2 = rectB.left - canvasRect.left + rectB.width  / 2;
    const y2 = rectB.top  - canvasRect.top  + rectB.height / 2;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);

    // Colore linea in base alla categoria del primo nodo
    const category = CLUE_CATEGORIES[pair[0]] || 'gold';
    line.classList.add('board-line', `board-line-${category}`);
    svg.appendChild(line);
  });

  canvas.appendChild(svg);
}