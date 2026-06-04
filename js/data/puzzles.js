// ============================================
// KATABASI — data/puzzles.js
// Dati di tutti gli enigmi del gioco.
// ============================================

const PUZZLES = {

  puzzle_cipher_tape: {
    id: 'puzzle_cipher_tape',
    type: 'mirror',
    scene: 'tower',
    title: 'Il nastro cifrato',
    requiredItem: 'item_mirror',
    description: 'Tieni il nastro davanti al frammento di specchio. Qualcosa appare.',
    prompt: 'Il riflesso rivela un messaggio. Cosa dice?',
    hint: 'Leggi quello che vedi nel riflesso.',
    mirroredText: 'OTTOSADRAUG',
    solution: 'GUARDA SOTTO',
    rewardClue: 'clue_cipher_note',
    rewardText: 'Sul fondo della scrivania, incollato, un foglio con un nome.'
  },

  puzzle_combine_vial: {
    id: 'puzzle_combine_vial',
    type: 'combine',
    scene: 'market',
    title: 'La fiala e lo specchio',
    description: "La fiala riflette qualcosa di diverso nello specchio. Un'etichetta invisibile ad occhio nudo.",
    prompt: 'Combina la fiala con il frammento di specchio nell\'inventario.',
    hint: null,
    solution: null,
    rewardClue: 'clue_vial_label',
    rewardText: "L'etichetta invisibile appare: numero dossier 0-07-PALE."
  },

  puzzle_pattern_machine: {
    id: 'puzzle_pattern_machine',
    type: 'sequence',
    scene: 'clinic',
    title: "La macchina dell'oblio",
    description: 'La macchina ha una sequenza di attivazione. I numeri sono incisi sul bordo, ma in ordine sbagliato.',
    prompt: 'Inserisci la sequenza corretta.',
    hint: "L'ordine è cronologico — guarda le date sui dossier.",
    solution: ['3', '1', '4', '2'],
    rewardClue: 'clue_waiting_room',
    rewardText: 'La macchina si attiva. Dallo schermo: un nome. Un paziente che non vuole essere ricordato.'
  },

  puzzle_code_dossier: {
    id: 'puzzle_code_dossier',
    type: 'cipher',
    scene: 'clinic',
    title: 'Il dossier sigillato',
    description: 'La ceralacca ha un codice. Hai visto quel numero da qualche parte.',
    prompt: 'Inserisci il codice del dossier.',
    hint: 'Il codice è sulla fiala rivelata dallo specchio.',
    solution: '0-07-PALE',
    rewardClue: 'clue_dossier_open',
    rewardItem: 'item_dossier_open',
    consumeItem: 'item_dossier',
    rewardText: 'Il dossier si apre. Nome: REDACTED. Data: 14 novembre — la stessa notte della morte di Mira. Sullo scaffale gli altri dossier: #3 — 2 marzo, #1 — 15 giugno, #4 — 8 settembre, #2 — 14 novembre.'
    },

  puzzle_riddle_sable: {
      id: 'puzzle_riddle_sable',
      type: 'riddle',
      scene: 'rooftop',
      title: "L'enigma di Sable",
      description: 'Sable ti fissa. Poi parla.',
      prompt: '"Sono sempre presente quando qualcosa finisce, ma non esisto quando inizia. Cosa sono?"',
      hint: 'Pensa a cosa lascia ogni ricordo cancellato.',
      solution: ['silenzio', 'il silenzio'],
      rewardClue: 'clue_sable_access',
      rewardText: 'Sable inclina la testa. Sa che sei pronto.'
    }

  };