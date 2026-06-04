// ============================================
// KATABASI — data/scenes.js
// Dati di tutte le scene del gioco.
// scene.js legge da qui — nessuna logica,
// solo struttura dati.
// ============================================

const SCENES = {

  prologue: {
    id: 'prologue',
    title: 'La scelta',
    background: 'assets/images/backgrounds/bg_prologue.png',
    text: [
      'Una busta senza mittente.',
      'Una parola sola: <em>Guarda.</em>',
      'Prima di scendere, devi sapere chi sei.'
    ],
    type: 'identity_choice', // tipo speciale — gestito da scene.js
    identities: [
      {
        id: 'detective',
        label: 'Detective',
        subtitle: 'Cinica · Diretta',
        description: 'Hai visto abbastanza da non credere alle coincidenze. Sai leggere una scena del crimine meglio di chiunque altro.'
      },
      {
        id: 'journalist',
        label: 'Giornalista',
        subtitle: 'Persuasiva · Obliqua',
        description: 'Le persone ti parlano. Non sempre sanno perché. Tu sì.'
      },
      {
        id: 'occultist',
        label: 'Occultista',
        subtitle: 'Intuitiva · Simbolica',
        description: 'Vedi cose che gli altri ignorano. I simboli parlano. I ricordi lasciano tracce che nessuno sa leggere tranne te.'
      }
    ],
    exits: [] // nessuna uscita manuale — si sblocca dopo la scelta
  },

  tower: {
    id: 'tower',
    title: 'La Torre delle Voci',
    background: 'assets/images/backgrounds/bg_tower.png',
    text: [
      'La sala odora di polvere e bobine arrugginite.',
      'Qualcuno è stato qui di recente. Forse due volte.',
      'Sul pavimento, vicino alla scrivania, un frammento di specchio.'
    ],
    type: 'exploration',
    back: null,
    items: ['item_mirror', 'item_tape'],
    puzzles: ['puzzle_cipher_tape'],
    exits: [
      {
        to: 'market',
        label: 'Scendi al mercato',
        condition: 'puzzle_cipher_tape'
      }
    ]
  },

  market: {
    id: 'market',
    title: 'Il Mercato dei Ricordi',
    background: 'assets/images/backgrounds/bg_market.png',
    text: [
      'Fiale di ogni colore. Ricordi in vendita.',
      'Calista Renn ha uno stand in fondo a sinistra.',
      'Qualcuno ti segue da quando sei entrato.'
    ],
    type: 'exploration',
    back: 'tower',
    items: ['item_vial', 'item_glass_eye'],
     characters: ['calista'],
    puzzles: ['puzzle_combine_vial'],
    exits: [
      {
        to: 'clinic',
        label: 'Vai alla clinica',
        condition: null
      }
    ]
  },

  clinic: {
    id: 'clinic',
    title: "La Clinica dell'Oblio",
    background: 'assets/images/backgrounds/bg_clinic.png',
    text: [
      'Tutto è troppo in ordine.',
      'Tranne quel cassetto. Aperto di un centimetro.',
      'Dorian Pale ti fissa dall\'altra parte della scrivania.'
    ],
    type: 'exploration',
    back: 'market',
    items: ['item_dossier', 'item_key'],
    characters: ['dorian'],
    puzzles: ['puzzle_pattern_machine', 'puzzle_code_dossier'],
    exits: [
      {
        to: 'rooftop',
        label: 'Sali sul tetto',
        condition: 'puzzle_code_dossier'
      }
    ]
  },

  rooftop: {
    id: 'rooftop',
    title: 'Il Tetto del Mondo',
    background: 'assets/images/backgrounds/bg_rooftop.png',
    text: [
      'La città respira sotto di te.',
      'Sable è sul cornicione. Ti aspettava.',
      'Ma prima devi connettere quello che sai.'
    ],
    type: 'board',
    back: 'clinic',
    characters: ['sable'],
    requiredClues: 3,
    puzzles: ['puzzle_riddle_sable'],
    exits: [
      {
        to: 'confrontation',
        label: 'Il confronto finale',
        condition: 'puzzle_riddle_sable'
      }
    ]
  },

  confrontation: {
    id: 'confrontation',
    title: 'Il Confronto',
    background: 'assets/images/backgrounds/bg_rooftop.png', // stessa scena, stato diverso
    text: [
      'Hai tutto quello che ti serve.',
      'O almeno, questo è quello che credi.',
      'Chi accusi?'
    ],
    type: 'accusation', // tipo speciale — mostra i tre sospettati
    suspects: ['elias', 'calista', 'dorian'],
    exits: [] // nessuna uscita — porta al finale
  }

};