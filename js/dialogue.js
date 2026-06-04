// ============================================
// KATABASI — dialogue.js
// Apre e gestisce i dialoghi con gli NPC.
// Struttura ad albero — ogni nodo ha opzioni
// con condizioni e conseguenze sullo stato.
// ============================================

// Traccia i nodi già visitati per ogni personaggio
const visitedNodes = {};

function openDialogue(charId) {
  const char = CHARACTERS[charId];
  if (!char || !char.dialogues.intro) return;

  if (!visitedNodes[charId]) {
    visitedNodes[charId] = [];
  }

  renderDialogueNode(char, 'intro');
}

function renderDialogueNode(char, nodeId) {
  const node = char.dialogues[nodeId];
  if (!node) return;

  // Segna il nodo come visitato
  if (!visitedNodes[char.id]) visitedNodes[char.id] = [];
  if (!visitedNodes[char.id].includes(nodeId)) {
    visitedNodes[char.id].push(nodeId);
  }

  const overlay  = document.getElementById('dialogue-overlay');
  const portrait = document.getElementById('dialogue-portrait');
  const name     = document.getElementById('dialogue-name');
  const text     = document.getElementById('dialogue-text');
  const options  = document.getElementById('dialogue-options');

  portrait.src = char.portraits[node.portrait] || char.portraits.neutral;
  portrait.alt = char.name;
  name.textContent = char.name;
  text.textContent = node.text;
  options.innerHTML = '';

  if (!node.options || node.options.length === 0) {
    // Nodo terminale — solo chiudi
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('dialogue-option');
    closeBtn.textContent = 'Chiudi';
    closeBtn.addEventListener('click', closeDialogue);
    options.appendChild(closeBtn);
  } else {
    // Filtra opzioni: visibili, non già usate come nodo di destinazione
    const visibleOptions = node.options.filter(option => {
      if (!isOptionVisible(option)) return false;
      // Nascondi opzioni che portano a nodi già visitati
      if (option.next && visitedNodes[char.id]?.includes(option.next)) return false;
      return true;
    });

    if (visibleOptions.length === 0) {
      // Tutte le opzioni già esplorate — chiudi
      const closeBtn = document.createElement('button');
      closeBtn.classList.add('dialogue-option');
      closeBtn.textContent = 'Non ho altre domande.';
      closeBtn.addEventListener('click', closeDialogue);
      options.appendChild(closeBtn);
    } else {
      visibleOptions.forEach(option => {
        const btn = document.createElement('button');
        btn.classList.add('dialogue-option');
        btn.textContent = option.label;
        btn.addEventListener('click', () => {
          applyConsequence(option.consequence);
          if (option.next) {
            renderDialogueNode(char, option.next);
          } else {
            closeDialogue();
          }
        });
        options.appendChild(btn);
      });

      // Aggiungi sempre opzione di uscita
      const closeBtn = document.createElement('button');
      closeBtn.classList.add('dialogue-option', 'dialogue-option--exit');
      closeBtn.textContent = 'Lascialo perdere.';
      closeBtn.addEventListener('click', closeDialogue);
      options.appendChild(closeBtn);
    }
  }

  overlay.classList.remove('hidden');
}

function isOptionVisible(option) {
  // Se non c'è nessuna condizione, l'opzione è sempre visibile e cliccabile
  if (!option.condition) return true;

  // Estrazione sicura delle proprietà dall'oggetto condition
  const { identity, hasClue: clueId, hasItem: itemId } = option.condition;

  // Controlli di corrispondenza con lo stato di gioco
  if (identity && getIdentity() !== identity) return false;
  if (clueId && !hasClue(clueId)) return false;
  if (itemId && !hasItem(itemId)) return false;

  return true;
}
function applyConsequence(consequence) {
  if (!consequence) return;

  if (consequence.addClue)           addClue(consequence.addClue);
  if (consequence.setChoice)         setChoice(consequence.setChoice.key, consequence.setChoice.value);
  if (consequence.removeFromInventory) removeFromInventory(consequence.removeFromInventory);
}

function closeDialogue() {
  document.getElementById('dialogue-overlay').classList.add('hidden');
  loadScene(getCurrentScene());
}
