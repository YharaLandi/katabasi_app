// ============================================
// KATABASI — data/items.js
// Dati di tutti gli oggetti del gioco.
// replacedBy indica la versione evolved —
// usato da scene.js per evitare duplicati.
// ============================================

const ITEMS = {

  item_mirror: {
    id: 'item_mirror',
    name: 'Frammento di specchio',
    image: 'assets/images/items/item_mirror.png',
    description: 'Un frammento di specchio ornato. Il riflesso mostra qualcosa che non dovrebbe esserci.',
    combinable: true,
    combinations: [
      { with: 'item_vial', result: 'item_vial_revealed' }
    ]
  },

  item_tape: {
    id: 'item_tape',
    name: 'Nastro delle bobine',
    image: 'assets/images/items/item_tape.png',
    description: 'Un nastro magnetico parzialmente svolto. Simboli incisi sulla superficie.',
    combinable: false,
    combinations: []
  },

  item_vial: {
    id: 'item_vial',
    name: 'Fiala anonima',
    image: 'assets/images/items/item_vial.png',
    description: 'Liquido ambra sigillato con cera nera. Nessuna etichetta. Qualcuno non voleva che si sapesse di chi era.',
    combinable: true,
    replacedBy: 'item_vial_revealed',
    combinations: [
      { with: 'item_mirror', result: 'item_vial_revealed' }
    ]
  },

  item_vial_revealed: {
    id: 'item_vial_revealed',
    name: 'Fiala — etichetta visibile',
    image: 'assets/images/items/item_vial.png',
    description: "Riflessa nello specchio, l'etichetta invisibile appare. Numero dossier: 0-07-PALE.",
    combinable: false,
    combinations: []
  },

  item_dossier: {
    id: 'item_dossier',
    name: 'Dossier cifrato',
    image: 'assets/images/items/item_dossier.png',
    description: 'Cartella sigillata con ceralacca. Il simbolo — una spirale — non appartiene alla clinica.',
    combinable: false,
    replacedBy: 'item_dossier_open',
    combinations: []
  },

  item_dossier_open: {
    id: 'item_dossier_open',
    name: 'Dossier aperto',
    image: 'assets/images/items/item_dossier.png',
    description: 'Nome: REDACTED. Data: 14 novembre — la stessa notte della morte di Mira. Il paziente di Dorian era lì.',
    combinable: false,
    combinations: []
  },

  item_key: {
    id: 'item_key',
    name: 'Chiave di Elias',
    image: 'assets/images/items/item_key.png',
    description: 'Un ferro antico e pesante. Il manico ha la forma di un occhio. Apre qualcosa che non è una porta normale.',
    combinable: false,
    combinations: []
  },

  item_glass_eye: {
    id: 'item_glass_eye',
    name: 'Occhio di vetro',
    image: 'assets/images/items/item_glass_eye.png',
    description: "Perfettamente sferico. Iride grigio-blu. Una bolla d'aria intrappolata dentro — un difetto di fabbricazione, o forse no.",
    combinable: true,
    combinations: [
      { with: null, result: null, usedWith: 'sable' }
    ]
  }

};