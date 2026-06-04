// ============================================
// KATABASI — data/characters.js
// Dati dei personaggi e alberi di dialogo.
// Ogni nodo ha: id, testo, opzioni, condizioni,
// conseguenze sullo stato.
// ============================================

const CHARACTERS = {

  calista: {
    id: 'calista',
    name: 'Calista Renn',
    role: 'Commerciante di ricordi',
    portraits: {
      neutral: 'assets/images/characters/char_calista_neutral.png',
      evasive: 'assets/images/characters/char_calista_evasive.png'
    },
    dialogues: {
      intro: {
        id: 'intro',
        portrait: 'neutral',
        text: 'Stai guardando le mie fiale da cinque minuti. Compri o vai via.',
        options: [
          {
            id: 'ask_mira',
            label: 'Conoscevi Mira Voss?',
            condition: null,
            next: 'calista_mira',
            consequence: null
          },
          {
            id: 'ask_vial',
            label: 'Da dove vengono questi ricordi?',
            condition: null,
            next: 'calista_vial',
            consequence: null
          },
          {
            id: 'ask_detective',
            label: 'Ho un mandato. Rispondi alle mie domande.',
            condition: { identity: 'detective' },
            next: 'calista_pressured',
            consequence: { addClue: 'clue_calista_nervous' }
          }
        ]
      },
      calista_mira: {
        id: 'calista_mira',
        portrait: 'evasive',
        text: 'Tutti conoscevano Mira. Era l\'archivista. Era... necessaria.',
        options: [
          {
            id: 'cover',
            label: 'Lasciami passare. Non ho visto niente.',
            condition: null,
            next: 'calista_covered',
            consequence: { setChoice: { key: 'coveredSuspect', value: true } }
          },
          {
            id: 'press',
            label: 'Stai mentendo. Cosa ti ha minacciato di rivelare?',
            condition: { hasClue: 'clue_cipher_note' },
            next: 'calista_exposed',
            consequence: { addClue: 'clue_calista_motive' }
          }
        ]
      },
      calista_vial: {
        id: 'calista_vial',
        portrait: 'neutral',
        text: 'Fonti private. Non chiedo da chi vengono, non chiedo dove vanno.',
        options: [
          {
            id: 'back',
            label: 'Capito.',
            condition: null,
            next: 'intro',
            consequence: null
          }
        ]
      },
      calista_pressured: {
        id: 'calista_pressured',
        portrait: 'evasive',
        text: 'Un mandato. Interessante. Mostrami.',
        options: [
          {
            id: 'bluff',
            label: "È in arrivo. Nel frattempo parliamo.",
            condition: null,
            next: 'calista_mira',
            consequence: null
          }
        ]
      },
      calista_covered: {
        id: 'calista_covered',
        portrait: 'neutral',
        text: 'Saggio. Alcune cose è meglio non saperle.',
        options: [] // fine dialogo
      },
      calista_exposed: {
        id: 'calista_exposed',
        portrait: 'evasive',
        text: 'Mira aveva trovato un ricordo che non avrebbe dovuto toccare. Uno dei miei fornitori. Voleva... restituirlo.',
        options: [] // fine dialogo — indizio aggiunto
      }
    }
  },

  dorian: {
    id: 'dorian',
    name: 'Dorian Pale',
    role: "Medico dell'oblio",
    portraits: {
      neutral: 'assets/images/characters/char_dorian_neutral.png',
      nervous: 'assets/images/characters/char_dorian_nervous.png'
    },
    dialogues: {
      intro: {
        id: 'intro',
        portrait: 'neutral',
        text: 'Non ho appuntamenti oggi. Come è entrato qui?',
        options: [
          {
            id: 'ask_procedure',
            label: 'Cosa fa quella macchina?',
            condition: null,
            next: 'dorian_machine',
            consequence: null
          },
          {
            id: 'ask_patient',
            label: 'Ho visto il suo paziente in sala d\'attesa.',
            condition: { hasClue: 'clue_waiting_room' },
            next: 'dorian_patient',
            consequence: { addClue: 'clue_dorian_patient' }
          },
          {
            id: 'ask_occultist',
            label: 'Cancellare un ricordo non lo distrugge. Lo sposta.',
            condition: { identity: 'occultist' },
            next: 'dorian_shaken',
            consequence: { addClue: 'clue_dorian_secret' }
          }
        ]
      },
      dorian_machine: {
        id: 'dorian_machine',
        portrait: 'neutral',
        text: 'Terapia di allegerimento mnestico. Completamente legale.',
        options: [
          {
            id: 'back',
            label: 'Certo.',
            condition: null,
            next: 'intro',
            consequence: null
          }
        ]
      },
      dorian_patient: {
        id: 'dorian_patient',
        portrait: 'nervous',
        text: 'Quello... non è un paziente. È un collega. Stava aspettando me.',
        options: [
          {
            id: 'press_patient',
            label: 'Il nome del paziente che Mira aveva scoperto. Lo so già.',
            condition: { hasClue: 'clue_dossier_open' },
            next: 'dorian_broken',
            consequence: { addClue: 'clue_dorian_motive' }
          }
        ]
      },
      dorian_shaken: {
        id: 'dorian_shaken',
        portrait: 'nervous',
        text: '... Chi le ha detto questa cosa.',
        options: [] // fine dialogo — indizio aggiunto
      },
      dorian_broken: {
        id: 'dorian_broken',
        portrait: 'nervous',
        text: 'Mira aveva trovato il dossier. Sapeva chi era. Se fosse uscito fuori...',
        options: [] // fine dialogo — indizio aggiunto
      }
    }
  },

  sable: {
    id: 'sable',
    name: 'Sable',
    role: 'Il corvo',
    portraits: {
      neutral: 'assets/images/characters/char_sable.png'
    },
    dialogues: {
      intro: {
        id: 'intro',
        portrait: 'neutral',
        text: '...',
        options: [
          {
            id: 'give_eye',
            label: 'Gli porgi l\'occhio di vetro.',
            condition: { hasItem: 'item_glass_eye' },
            next: 'sable_speaks',
            consequence: {
              removeFromInventory: 'item_glass_eye',
              addClue: 'clue_sable_truth'
            }
          },
          {
            id: 'wait',
            label: 'Aspetti.',
            condition: null,
            next: 'sable_waiting',
            consequence: null
          }
        ]
      },
      sable_waiting: {
        id: 'sable_waiting',
        portrait: 'neutral',
        text: 'Il corvo ti fissa. Non si muove. Sa che non hai ancora tutto.',
        options: [] // fine dialogo
      },
      sable_speaks: {
        id: 'sable_speaks',
        portrait: 'neutral',
        text: 'Mira non è scesa da sola. Qualcuno sapeva dove sarebbe andata.',
        options: [] // fine dialogo — indizio finale sbloccato
      }
    }
  },

elias: {
  id: 'elias',
  name: 'Elias Vorn',
  role: 'Custode della Torre',
  portraits: {
    neutral: 'assets/images/characters/char_elias_neutral.png',
    suspect: 'assets/images/characters/char_elias_suspect.png'
  },
  dialogues: {
    intro: {
      id: 'intro',
      portrait: 'neutral',
      text: 'Non dovrebbe essere qui. La Torre è chiusa al pubblico.',
      options: [
        {
          id: 'ask_mira',
          label: 'Conoscevi Mira Voss?',
          condition: null,
          next: 'elias_mira',
          consequence: null
        },
        {
          id: 'ask_keys',
          label: 'Hai le chiavi di tutti i corridoi?',
          condition: null,
          next: 'elias_keys',
          consequence: null
        },
        {
          id: 'ask_detective',
          label: 'Sto indagando sulla sua morte. Collabora.',
          condition: { identity: 'detective' },
          next: 'elias_pressured',
          consequence: { addClue: 'clue_elias_nervous' }
        }
      ]
    },
    elias_mira: {
      id: 'elias_mira',
      portrait: 'neutral',
      text: 'Era una professionista. Precisa.',
      options: [
        {
          id: 'ask_night',
          label: 'Dov\'eri la notte in cui è morta?',
          condition: null,
          next: 'elias_alibi',
          consequence: { addClue: 'clue_elias_alibi' }
        }
      ]
    },
    elias_alibi: {
      id: 'elias_alibi',
      portrait: 'suspect',
      text: 'A casa. Da solo. Come ogni notte.',
      options: []
    },
    elias_keys: {
      id: 'elias_keys',
      portrait: 'neutral',
      text: 'È il mio lavoro. Ogni porta, ogni corridoio. Trent\'anni.',
      options: [
        {
          id: 'ask_key_special',
          label: 'Anche quella che apre la sala delle bobine?',
          condition: { hasItem: 'item_key' },
          next: 'elias_key_reaction',
          consequence: { addClue: 'clue_elias_key' }
        }
      ]
    },
    elias_key_reaction: {
      id: 'elias_key_reaction',
      portrait: 'suspect',
      text: 'Dove hai trovato quella chiave.',
      options: []
    },
    elias_pressured: {
      id: 'elias_pressured',
      portrait: 'suspect',
      text: 'Non ho niente da nascondere. Ma non ho niente da dirle neanche.',
      options: []
    }
  }       
  }        

};  