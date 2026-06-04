// ============================================
// KATABASI — data/characters.js
// Dati dei personaggi e alberi di dialogo.
// Ogni nodo ha: id, testo, opzioni, condizioni,
// conseguenze sullo stato.
// ============================================

const CHARACTERS = {
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
        text: 'Non dovrebbe essere qui. La Torre è chiusa al pubblico dopo... l\'incidente dell\'archivista.',
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
            label: 'Hai tu il controllo di tutte le chiavi?',
            condition: null,
            next: 'elias_keys',
            consequence: null
          },
          {
            id: 'ask_detective',
            label: 'Sto conducendo un\'indagine ufficiale sulla morte di Mira. Collabora.',
            condition: { identity: 'detective' },
            next: 'elias_pressured',
            consequence: { addClue: 'clue_elias_nervous' }
          }
        ]
      },
      elias_mira: {
        id: 'elias_mira',
        portrait: 'neutral',
        text: 'Era una professionista precisa. Troppo curiosa, forse. Cercava risposte nei vecchi registri della Torre.',
        options: [
          {
            id: 'ask_night',
            label: 'Dov\'eri la notte del 14 novembre?',
            condition: null,
            next: 'elias_alibi',
            consequence: { addClue: 'clue_elias_alibi' }
          }
        ]
      },
      elias_alibi: {
        id: 'elias_alibi',
        portrait: 'suspect',
        text: 'Ero nella mia garitta inferiore, a fare l\'inventario delle vecchie bobine magnetiche. Da solo. Come ogni fottuta notte.',
        options: []
      },
      elias_keys: {
        id: 'elias_keys',
        portrait: 'neutral',
        text: 'È il mio dovere da trent\'anni. Sorveglio ogni singola serratura di questa struttura.',
        options: [
          {
            id: 'ask_key_special',
            label: 'Anche la chiave pesante con l\'emblema dell\'occhio che ho trovato?',
            condition: { hasItem: 'item_key' },
            next: 'elias_key_reaction',
            consequence: { addClue: 'clue_elias_key' }
          }
        ]
      },
      elias_key_reaction: {
        id: 'elias_key_reaction',
        portrait: 'suspect',
        text: 'Dove hai preso quella chiave? Non dovrebbe... quella serratura non appartiene ai registri ordinari!',
        options: []
      },
      elias_pressured: {
        id: 'elias_pressured',
        portrait: 'suspect',
        text: 'La legge si ferma ai piedi della Torre, investigatore. Non ho nulla da dirvi.',
        options: []
      }
    }
  },

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
        text: 'Stai guardando le mie fiale da compensazione da cinque minuti. Compri o vai via.',
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
            id: 'ask_journalist',
            label: 'Ho un articolo in prima pagina pronto. Il tuo nome attirerà i corvi della Torre.',
            condition: { identity: 'journalist' },
            next: 'calista_exposed', // La giornalista la costringe subito a confessare il movente
            consequence: { addClue: 'clue_calista_motive' }
          },
          {
            id: 'ask_detective',
            label: 'Ho un mandato ufficiale. Rispondi alle mie domande.',
            condition: { identity: 'detective' },
            next: 'calista_pressured',
            consequence: { addClue: 'clue_calista_nervous' }
          }
        ]
      },
      calista_mira: {
        id: 'calista_mira',
        portrait: 'evasive',
        text: 'Tutti conoscevano Mira. Era l\'archivista della Torre. Era... necessaria.',
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
            id: 'back_to_intro',
            label: 'Ho altre domande.',
            condition: null,
            next: 'intro',
            consequence: null
          }
        ]
      },
      calista_pressured: {
        id: 'calista_pressured',
        portrait: 'evasive',
        text: 'Un mandato ufficiale... Certo che collaboro. Ma non so molto. Chiedimi di Mira, ti dirò quel poco che ricordo.',
        options: [
          {
            id: 'continue_to_mira',
            label: 'Parliamo di Mira, allora.',
            condition: null,
            next: 'calista_mira',
            consequence: null
          }
        ]
      },
      calista_covered: {
        id: 'calista_covered',
        portrait: 'neutral',
        text: 'Saggio da parte tua. Alcune cose è meglio lasciarle seppellite nell\'oblio.',
        options: [] // Fine dialogo terminale
      },
      calista_exposed: {
        id: 'calista_exposed',
        portrait: 'evasive',
        text: 'Va bene, d\'accordo! Mira aveva trovato un ricordo che non avrebbe dovuto toccare nelle bobine. Uno dei miei fornitori della clinica. Voleva... restituirlo al proprietario legittimo. Questo avrebbe rovinato i miei affari.',
        options: [] // Fine dialogo terminale — indizio aggiunto con successo
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
      neutral: 'assets/images/characters/char_sable.png',
      mira_flashback: 'assets/images/characters/char_mira_flashback.png' // <--- Carichiamo qui il flashback!
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
        text: 'Il corvo ti fissa. Non si muove. Sa che non hai ancora connesso tutti i fili nella bacheca.',
        options: []
      },
      sable_speaks: {
        id: 'sable_speaks',
        portrait: 'mira_flashback', // <--- Il box del dialogo mostrerà improvvisamente il flashback di Mira!
        text: 'L\'occhio di vetro riflette la luce della luna... Un ricordo residuo si sblocca nella tua mente: vedi Mira correre nel panico lungo le bobine della Torre. Non era sola. Qualcuno che conosceva bene le stanze stava camminando dietro di lei nell\'ombra.',
        options: [] // fine dialogo — indizio finale sbloccato con impatto visivo
      }
    }
  }
};  