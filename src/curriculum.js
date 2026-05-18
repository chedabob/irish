// Each step type:
//  chat   – character speech bubble, auto-advances
//  teach  – Irish word/phrase card with phonetic + audio button
//  choice – multiple choice (taps)
//  write  – type the Irish (special char keyboard provided)
//  listen – hear it, then choose / translate
//  pairs  – tap-to-match two columns
//
// phonetic: human-readable approximation for display
// tts: spelling an English TTS engine will read closer to the real Irish sound

export const CURRICULUM = [
  {
    id: 1,
    title: 'Fáilte!',
    subtitle: 'Greetings',
    icon: '👋',
    color: '#2D6A4F',
    lessons: [
      {
        id: '1-1',
        title: 'Dia duit!',
        subtitle: 'Your first hello',
        xp: 20,
        steps: [
          { type: 'chat', name: 'Séan', text: 'Dia duit! Welcome — I\'m Séan, your Irish guide. Irish (Gaeilge) is one of Europe\'s oldest living languages, spoken on this island for over 2,500 years.' },
          { type: 'chat', name: 'Séan', text: 'We\'ll start with the most important thing you\'ll ever say in Irish. Ready?' },
          { type: 'teach', irish: 'Dia duit', english: 'Hello', phonetic: 'JEE-uh GWITCH', tts: 'jeeuh gwitch', note: 'Literally "God to you". The D before i/e is palatalised — closer to a soft J than a hard D.' },
          { type: 'chat', name: 'Séan', text: 'When someone greets you with "Dia duit", there\'s a traditional response. Notice the "mh" — in Irish that makes a W sound:' },
          { type: 'teach', irish: 'Dia is Muire duit', english: 'Hello (in reply)', phonetic: 'JEE-uh iss MWIR-uh GWITCH', tts: 'jeeuh iss mwiruh gwitch', note: '"God and Mary to you." Always the reply, never the opener. Muire = MWIR-uh, not Moo-ir.' },
          { type: 'choice', question: 'How do you say "Hello" in Irish?', options: ['Slán', 'Dia duit', 'Go raibh maith agat', 'Conas atá tú?'], correct: 1, explanation: 'Dia duit — JEE-uh GWITCH. Literally "God to you".' },
          { type: 'choice', question: 'Someone says "Dia duit" to you. You say…', options: ['Dia duit', 'Slán', 'Dia is Muire duit', 'Go maith'], correct: 2, explanation: '"Dia is Muire duit" — God and Mary to you. Always the reply.' },
          { type: 'listen', irish: 'Dia duit', english: 'Hello', phonetic: 'JEE-uh GWITCH', tts: 'jeeuh gwitch', question: 'What did you hear?', options: ['Hello', 'Goodbye', 'Thank you', 'How are you?'], correct: 0 },
          { type: 'write', prompt: 'Type the Irish for "Hello"', answer: 'Dia duit', phonetic: 'JEE-uh GWITCH', hint: 'Two words, starts with D' },
          { type: 'chat', name: 'Séan', text: 'Ar fheabhas! (ar-OWS — "excellent!") You\'ve just spoken Irish. Go raibh maith agat — thank you!' },
        ],
      },
      {
        id: '1-2',
        title: 'Conas atá tú?',
        subtitle: 'How are you?',
        xp: 20,
        steps: [
          { type: 'chat', name: 'Séan', text: 'Dia duit arís — hello again! Now let\'s have a proper conversation. Every greeting needs a "how are you?"' },
          { type: 'teach', irish: 'Conas atá tú?', english: 'How are you?', phonetic: 'KUN-us uh-TAW too', tts: 'kunus uhtaw too', note: '"Atá" uses the long á — TAW, like "saw". "Tú" = too. Conas = KUN-us.' },
          { type: 'teach', irish: 'Tá mé go maith', english: 'I am well', phonetic: 'TAW may guh MAH', tts: 'taw may guh mah', note: '"Tá" (TAW) means "is/am/are" — the most useful word in Irish. Maith = good/well.' },
          { type: 'teach', irish: 'Tá mé go hiontach', english: 'I am wonderful', phonetic: 'TAW may guh HUN-tukh', tts: 'taw may guh huntukh', note: 'The -ch ending is a soft friction sound, like ch in Scottish "loch" or German "Bach".' },
          { type: 'teach', irish: 'Tá mé tuirseach', english: 'I am tired', phonetic: 'TAW may TEER-shukh', tts: 'taw may teerchukh', note: '"Tuirseach" — the ui = EE, and -each ending = -ukh. An honest answer is always welcome!' },
          { type: 'choice', question: 'How do you ask "How are you?" in Irish?', options: ['Tá mé go maith', 'Conas atá tú?', 'Dia duit', 'Slán'], correct: 1, explanation: 'Conas atá tú? — KUN-us uh-TAW too.' },
          { type: 'choice', question: 'What does "Tá mé go maith" mean?', options: ['I am tired', 'I am wonderful', 'I am well', 'How are you?'], correct: 2, explanation: 'Tá mé go maith — "I am well". Tá = am/is/are.' },
          { type: 'listen', irish: 'Conas atá tú?', english: 'How are you?', phonetic: 'KUN-us uh-TAW too', tts: 'kunus uhtaw too', question: 'Translate what you heard:', options: ['I am well', 'How are you?', 'Goodbye', 'Thank you'], correct: 1 },
          { type: 'pairs', prompt: 'Match the Irish to the English', pairs: [['Tá mé go maith', 'I am well'], ['Conas atá tú?', 'How are you?'], ['Tá mé tuirseach', 'I am tired']] },
          { type: 'write', prompt: 'How do you say "I am well"?', answer: 'Tá mé go maith', phonetic: 'TAW may guh MAH', hint: 'Three words — starts with Tá' },
        ],
      },
      {
        id: '1-3',
        title: 'Go raibh maith agat',
        subtitle: 'Thank you & Goodbye',
        xp: 20,
        steps: [
          { type: 'chat', name: 'Séan', text: 'You\'re building up a real conversation. Let\'s add "thank you" and "goodbye". One key rule: "bh" and "mh" in Irish both make a V or W sound.' },
          { type: 'teach', irish: 'Go raibh maith agat', english: 'Thank you', phonetic: 'guh REV mah AH-gut', tts: 'guh rev mah ahgut', note: '"Raibh" has a silent r almost — the bh = V. So "raibh" sounds like REV. Not "row" or "roh"!' },
          { type: 'teach', irish: 'Go raibh maith agaibh', english: 'Thank you (to a group)', phonetic: 'guh REV mah AH-giv', tts: 'guh rev mah ahgiv', note: '"Agaibh" (AH-giv) is the plural "at you". Irish has separate singular and plural "you".' },
          { type: 'teach', irish: 'Slán', english: 'Goodbye', phonetic: 'SLAWN', tts: 'slawn', note: 'Also means "safe" — wishing someone a safe farewell. The á = AW sound.' },
          { type: 'teach', irish: 'Slán go fóill', english: 'Goodbye for now', phonetic: 'SLAWN guh FOIL', tts: 'slawn guh foil', note: '"Fóill" (FOIL) means "yet/for now". A warmer, see-you-soon goodbye.' },
          { type: 'teach', irish: 'Oíche mhaith', english: 'Good night', phonetic: 'EE-huh WAH', tts: 'eeha wah', note: '"Oíche" = EE-huh (the oi+h = EE, then ch = h). "Mhaith" — the mh = W, so WAH.' },
          { type: 'choice', question: 'How do you say "Thank you" in Irish?', options: ['Slán', 'Go raibh maith agat', 'Oíche mhaith', 'Tá mé go maith'], correct: 1, explanation: 'Go raibh maith agat — guh REV mah AH-gut. The "bh" in raibh = V sound.' },
          { type: 'choice', question: 'What does "Slán go fóill" mean?', options: ['Good night', 'Thank you', 'Goodbye for now', 'See you tomorrow'], correct: 2, explanation: 'Slán go fóill — goodbye for now. SLAWN guh FOIL.' },
          { type: 'listen', irish: 'Slán', english: 'Goodbye', phonetic: 'SLAWN', tts: 'slawn', question: 'What did you hear?', options: ['Hello', 'Thank you', 'Goodbye', 'Good night'], correct: 2 },
          { type: 'write', prompt: 'How do you say "Thank you"?', answer: 'Go raibh maith agat', phonetic: 'guh REV mah AH-gut', hint: 'Four words — starts with Go. Remember raibh = REV!' },
          { type: 'chat', name: 'Séan', text: 'Go hiontach! You can now greet someone, ask how they are, thank them, and say goodbye. That\'s a complete Irish conversation!' },
        ],
      },
      {
        id: '1-4',
        title: 'Comhrá! Conversation',
        subtitle: 'Unit 1 review',
        xp: 30,
        steps: [
          { type: 'chat', name: 'Séan', text: 'Comhrá (KOH-raw) means conversation. Let\'s put Unit 1 together — a full greeting exchange. I\'ll go first…' },
          { type: 'chat', name: 'Séan', text: 'Dia duit!' },
          { type: 'choice', question: 'You reply to Séan\'s greeting:', options: ['Slán', 'Dia is Muire duit', 'Go raibh maith agat', 'Oíche mhaith'], correct: 1, explanation: 'Dia is Muire duit — the traditional reply to "Dia duit".' },
          { type: 'chat', name: 'Séan', text: 'Conas atá tú?' },
          { type: 'write', prompt: 'Tell Séan you are well:', answer: 'Tá mé go maith', phonetic: 'TAW may guh MAH', hint: 'I am well' },
          { type: 'chat', name: 'Séan', text: 'Go maith! Now, how would you ask me "How are you?"' },
          { type: 'write', prompt: 'Ask Séan how he is:', answer: 'Conas atá tú?', phonetic: 'KUN-us uh-TAW too', hint: 'How are you?' },
          { type: 'chat', name: 'Séan', text: 'Tá mé go hiontach, go raibh maith agat! Now say goodbye.' },
          { type: 'choice', question: 'Say a casual "goodbye for now":', options: ['Oíche mhaith', 'Dia duit', 'Slán go fóill', 'Go raibh maith agat'], correct: 2, explanation: 'Slán go fóill — goodbye for now! SLAWN guh FOIL.' },
          { type: 'pairs', prompt: 'Final review — match them all:', pairs: [['Dia duit', 'Hello'], ['Conas atá tú?', 'How are you?'], ['Tá mé go maith', 'I am well'], ['Go raibh maith agat', 'Thank you'], ['Slán', 'Goodbye']] },
          { type: 'chat', name: 'Séan', text: 'Comhghairdeas (KOH-wir-jus) — congratulations! Unit 1 complete. Lean ar aghaidh — keep going!' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Mé Féin',
    subtitle: 'About Me',
    icon: '🙋',
    color: '#40916C',
    lessons: [
      {
        id: '2-1',
        title: 'Is mise...',
        subtitle: 'My name is…',
        xp: 20,
        steps: [
          { type: 'chat', name: 'Séan', text: 'Dia duit arís! Now we\'ll learn how to introduce yourself. Irish has two words for "I am" — "tá mé" for states, and "is mise" for identity. We use "is mise" to say who you are.' },
          { type: 'teach', irish: 'Is mise Séan', english: 'I am Séan', phonetic: 'iss MISH-uh SHAWN', tts: 'iss misha shawn', note: '"Mise" (MISH-uh) is the emphatic "me". "S" before é/í/e/i sounds like SH — so Séan = SHAWN.' },
          { type: 'teach', irish: 'Cad is ainm duit?', english: 'What is your name?', phonetic: 'KAD iss AN-im DITCH', tts: 'kad iss anim ditch', note: '"Ainm" (AN-im) = name. "Duit" here = DITCH (slender D + slender T). Literally "what is name to you?"' },
          { type: 'teach', irish: 'Is as Éire mé', english: 'I am from Ireland', phonetic: 'iss us AY-ruh may', tts: 'iss us ayruh may', note: '"As" (us) = from. "Éire" (AY-ruh) = Ireland — the long é gives the AY sound.' },
          { type: 'teach', irish: 'Cén áit as tú?', english: 'Where are you from?', phonetic: 'KAYN AWT us too', tts: 'kayn awt us too', note: '"Cén" = which/what. "Áit" (AWT) = place — the long á = AW. Literally "which place from you?"' },
          { type: 'choice', question: 'How do you introduce yourself in Irish?', options: ['Tá mé Séan', 'Is mise Séan', 'Mé Séan', 'Mise Séan'], correct: 1, explanation: 'Is mise — the emphatic "I am" for introductions. MISH-uh.' },
          { type: 'choice', question: 'What does "Cad is ainm duit?" mean?', options: ['Where are you from?', 'How are you?', 'What is your name?', 'Who are you?'], correct: 2, explanation: 'Cad is ainm duit? — What is your name? Ainm (AN-im) = name.' },
          { type: 'listen', irish: 'Cad is ainm duit?', english: 'What is your name?', phonetic: 'KAD iss AN-im DITCH', tts: 'kad iss anim ditch', question: 'What did you hear?', options: ['Where are you from?', 'What is your name?', 'How are you?', 'I am well'], correct: 1 },
          { type: 'write', prompt: 'Introduce yourself: type "Is mise" followed by your name', answer: 'Is mise', phonetic: 'iss MISH-uh', hint: 'Two words to start: Is mise...', acceptPrefix: true },
          { type: 'pairs', prompt: 'Match the phrases:', pairs: [['Is mise', 'I am (intro)'], ['Cad is ainm duit?', 'What is your name?'], ['Cén áit as tú?', 'Where are you from?'], ['Is as Éire mé', 'I am from Ireland']] },
        ],
      },
      {
        id: '2-2',
        title: 'Na huimhreacha 1–5',
        subtitle: 'Numbers 1 to 5',
        xp: 20,
        steps: [
          { type: 'chat', name: 'Séan', text: 'Uimhreacha (IV-rukh-uh) — numbers! The "mh" = V again. Let\'s count to five.' },
          { type: 'teach', irish: 'a haon', english: 'one (1)', phonetic: 'uh HAYN', tts: 'uh hayn', note: 'The "a" prefix is used for abstract counting. "Haon" — the h is clearly sounded.' },
          { type: 'teach', irish: 'a dó', english: 'two (2)', phonetic: 'uh DOH', tts: 'uh doh', note: 'Long ó = OH. Simple and clear.' },
          { type: 'teach', irish: 'a trí', english: 'three (3)', phonetic: 'uh TREE', tts: 'uh tree', note: 'Like the English word "tree". The long í = EE.' },
          { type: 'teach', irish: 'a ceathair', english: 'four (4)', phonetic: 'uh KAH-hir', tts: 'uh kahir', note: '"Ceathair" — c before e/a here stays K. The "th" = H (silent-ish). KAH-hir.' },
          { type: 'teach', irish: 'a cúig', english: 'five (5)', phonetic: 'uh KOO-ig', tts: 'uh kooig', note: 'Long ú = OO. The g at the end is slender (palatalised) — a soft ig sound.' },
          { type: 'choice', question: 'What is "three" in Irish?', options: ['a haon', 'a dó', 'a trí', 'a ceathair'], correct: 2, explanation: 'A trí — uh TREE.' },
          { type: 'choice', question: 'What does "a ceathair" mean?', options: ['1', '2', '3', '4'], correct: 3, explanation: 'A ceathair = four. KAH-hir.' },
          { type: 'listen', irish: 'a dó', english: 'two', phonetic: 'uh DOH', tts: 'uh doh', question: 'Which number did you hear?', options: ['1', '2', '3', '4'], correct: 1 },
          { type: 'pairs', prompt: 'Match number to Irish:', pairs: [['a haon', '1'], ['a dó', '2'], ['a trí', '3'], ['a ceathair', '4'], ['a cúig', '5']] },
          { type: 'write', prompt: 'How do you say "five"?', answer: 'a cúig', phonetic: 'uh KOO-ig', hint: 'Two words, starts with "a"' },
        ],
      },
      {
        id: '2-3',
        title: 'Na huimhreacha 6–10',
        subtitle: 'Numbers 6 to 10',
        xp: 20,
        steps: [
          { type: 'chat', name: 'Séan', text: 'Leanaimis ar aghaidh (LAN-im-ish er AY) — let\'s continue! Six to ten, and you can count anything.' },
          { type: 'teach', irish: 'a sé', english: 'six (6)', phonetic: 'uh SHAY', tts: 'uh shay', note: 'S before é/í = SH in Irish. So "sé" = SHAY, like the English name "Shay".' },
          { type: 'teach', irish: 'a seacht', english: 'seven (7)', phonetic: 'uh SHOKHT', tts: 'uh shokht', note: '"Seacht" — SH start, then -acht = the ch friction sound + t. SHOKHT.' },
          { type: 'teach', irish: 'a hocht', english: 'eight (8)', phonetic: 'uh HOKHT', tts: 'uh hokht', note: '"Hocht" — starts with a clear H, then the -cht ending again. HOKHT.' },
          { type: 'teach', irish: 'a naoi', english: 'nine (9)', phonetic: 'uh NEE', tts: 'uh nee', note: '"Naoi" — the "aoi" combination = EE. So naoi = NEE.' },
          { type: 'teach', irish: 'a deich', english: 'ten (10)', phonetic: 'uh JEH', tts: 'uh jeh', note: '"D" before e/i is palatalised = J. "Deich" = JEH (rhymes with "beh").' },
          { type: 'choice', question: 'What is "seven" in Irish?', options: ['a sé', 'a seacht', 'a hocht', 'a naoi'], correct: 1, explanation: 'A seacht — uh SHOKHT.' },
          { type: 'choice', question: 'What does "a naoi" mean?', options: ['6', '7', '8', '9'], correct: 3, explanation: 'A naoi = nine. The "aoi" = EE, so NEE.' },
          { type: 'listen', irish: 'a deich', english: 'ten', phonetic: 'uh JEH', tts: 'uh jeh', question: 'Which number?', options: ['7', '8', '9', '10'], correct: 3 },
          { type: 'pairs', prompt: 'Match them up:', pairs: [['a sé', '6'], ['a seacht', '7'], ['a hocht', '8'], ['a naoi', '9'], ['a deich', '10']] },
          { type: 'write', prompt: 'How do you say "eight"?', answer: 'a hocht', phonetic: 'uh HOKHT', hint: 'Two words, the second starts with h' },
        ],
      },
      {
        id: '2-4',
        title: 'Mé Féin — Review',
        subtitle: 'Unit 2 review',
        xp: 30,
        steps: [
          { type: 'chat', name: 'Séan', text: 'Iontach ar fad (UN-tukh er FAD — "absolutely wonderful")! Let\'s review Unit 2.' },
          { type: 'choice', question: 'How do you introduce yourself in Irish?', options: ['Tá mé...', 'Is mise...', 'Mé...', 'Mise atá...'], correct: 1, explanation: 'Is mise — the emphatic introduction. MISH-uh.' },
          { type: 'choice', question: '"A ceathair" means…', options: ['3', '4', '5', '6'], correct: 1, explanation: 'A ceathair = four. KAH-hir.' },
          { type: 'listen', irish: 'Cad is ainm duit?', english: 'What is your name?', phonetic: 'KAD iss AN-im DITCH', tts: 'kad iss anim ditch', question: 'What question is being asked?', options: ['How are you?', 'Where are you from?', 'What is your name?', 'Who are you?'], correct: 2 },
          { type: 'pairs', prompt: 'Match the numbers:', pairs: [['a seacht', '7'], ['a hocht', '8'], ['a naoi', '9'], ['a deich', '10']] },
          { type: 'write', prompt: 'How do you ask "What is your name?"', answer: 'Cad is ainm duit?', phonetic: 'KAD iss AN-im DITCH', hint: 'Four words, starts with Cad' },
          { type: 'choice', question: '"Is as Éire mé" means…', options: ['I am Irish', 'I am from Ireland', 'I love Ireland', 'Ireland is great'], correct: 1, explanation: 'Is as Éire mé — I am from Ireland. As (us) = from.' },
          { type: 'chat', name: 'Séan', text: 'Comhghairdeas arís! Two units done. You\'re building real Irish now. On to Unit 3!' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'An Teaghlach',
    subtitle: 'The Family',
    icon: '👨‍👩‍👧‍👦',
    color: '#1B4332',
    lessons: [
      {
        id: '3-1',
        title: 'Mo theaghlach',
        subtitle: 'My family',
        xp: 20,
        steps: [
          { type: 'chat', name: 'Séan', text: 'An teaghlach (un CHYOL-ukh) — the family. Notice "gh" here makes a Y sound between vowels. Irish culture is deeply family-oriented, and the language reflects that.' },
          { type: 'teach', irish: 'máthair', english: 'mother', phonetic: 'MAW-hir', tts: 'mawir', note: '"Th" in Irish = H (or silent). So "máthair" = MAW-hir. The long á = AW.' },
          { type: 'teach', irish: 'athair', english: 'father', phonetic: 'AH-hir', tts: 'ahir', note: 'Same pattern — "th" = H. "Athair" = AH-hir.' },
          { type: 'teach', irish: 'mo mháthair', english: 'my mother', phonetic: 'muh WAW-hir', tts: 'muh wawir', note: '"Mo" (my) lenites the next word — adds an H after the first consonant. Mh = W, so mháthair = WAW-hir.' },
          { type: 'teach', irish: 'mo athair', english: 'my father', phonetic: 'muh AH-hir', tts: 'muh ahir', note: 'Athair starts with a vowel, so no lenition change needed.' },
          { type: 'teach', irish: 'deartháir', english: 'brother', phonetic: 'JAR-uh-hir', tts: 'jaruhir', note: '"D" before e = J sound. "Th" = H. So deart-háir = JAR-uh-hir.' },
          { type: 'teach', irish: 'deirfiúr', english: 'sister', phonetic: 'JER-fyoor', tts: 'jer fyoor', note: '"D" before e = J again. The "f" stays F, and long ú = OO. JER-fyoor.' },
          { type: 'teach', irish: 'páiste', english: 'child', phonetic: 'PAWSH-tuh', tts: 'pawshtuh', note: '"St" after á gives a SH-T sound. Páiste = PAWSH-tuh.' },
          { type: 'choice', question: 'What is "mother" in Irish?', options: ['athair', 'máthair', 'deirfiúr', 'páiste'], correct: 1, explanation: 'Máthair — MAW-hir. "Th" sounds like H.' },
          { type: 'choice', question: 'What does "mo mháthair" mean?', options: ['my father', 'my sister', 'my mother', 'my brother'], correct: 2, explanation: 'Mo mháthair — my mother. "Mo" causes lenition, mh = W.' },
          { type: 'pairs', prompt: 'Match family members:', pairs: [['máthair', 'mother'], ['athair', 'father'], ['deartháir', 'brother'], ['deirfiúr', 'sister'], ['páiste', 'child']] },
          { type: 'write', prompt: 'How do you say "my mother"?', answer: 'mo mháthair', phonetic: 'muh WAW-hir', hint: 'Two words — mo + lenited máthair' },
        ],
      },
      {
        id: '3-2',
        title: 'Dathanna',
        subtitle: 'Colours',
        xp: 20,
        steps: [
          { type: 'chat', name: 'Séan', text: 'Dathanna (DAH-hun-uh) — colours! The Irish landscape is famous for forty shades of green. Let\'s learn some.' },
          { type: 'teach', irish: 'glas', english: 'green', phonetic: 'GLAS', tts: 'glas', note: 'Glas refers to natural green — grass, fields. Pronounced just as it looks: GLAS.' },
          { type: 'teach', irish: 'gorm', english: 'blue', phonetic: 'GUR-um', tts: 'gurum', note: '"Gorm" = GUR-um. The broad o sounds like a short U here. Also covers some blue-greens.' },
          { type: 'teach', irish: 'dearg', english: 'red', phonetic: 'JAR-ug', tts: 'jarug', note: '"D" before e = J. "Dearg" = JAR-ug. The -rg at the end has a slight g sound.' },
          { type: 'teach', irish: 'buí', english: 'yellow', phonetic: 'BWEE', tts: 'bwee', note: '"Buí" = BWEE. The "u" after b adds a W glide. Rhymes with "free".' },
          { type: 'teach', irish: 'bán', english: 'white', phonetic: 'BAWN', tts: 'bawn', note: 'Long á = AW. "Bán" = BAWN. Also means "fair" or "pale".' },
          { type: 'teach', irish: 'dubh', english: 'black', phonetic: 'DUV', tts: 'duv', note: '"Bh" = V. So "dubh" = DUV. The ub + h combination gives that V ending.' },
          { type: 'teach', irish: 'donn', english: 'brown', phonetic: 'DUN', tts: 'dun', note: '"Donn" = DUN. Simple and clear — rhymes with "fun".' },
          { type: 'choice', question: 'What colour is "gorm"?', options: ['green', 'blue', 'red', 'yellow'], correct: 1, explanation: 'Gorm = blue (GUR-um). It can shade into blue-green too.' },
          { type: 'choice', question: 'How do you say "black" in Irish?', options: ['bán', 'glas', 'dubh', 'donn'], correct: 2, explanation: 'Dubh — DUV. The "bh" makes a V sound.' },
          { type: 'listen', irish: 'dearg', english: 'red', phonetic: 'JAR-ug', tts: 'jarug', question: 'Which colour did you hear?', options: ['blue', 'green', 'red', 'yellow'], correct: 2 },
          { type: 'pairs', prompt: 'Match the colours:', pairs: [['glas', 'green'], ['dearg', 'red'], ['bán', 'white'], ['dubh', 'black'], ['buí', 'yellow']] },
          { type: 'write', prompt: 'How do you say "white"?', answer: 'bán', phonetic: 'BAWN', hint: 'Three letters, with a fada' },
        ],
      },
    ],
  },
];

export function getUnit(id) {
  return CURRICULUM.find(u => u.id === id);
}

export function getLesson(id) {
  for (const unit of CURRICULUM) {
    const lesson = unit.lessons.find(l => l.id === id);
    if (lesson) return { lesson, unit };
  }
  return null;
}

export function getAllLessons() {
  return CURRICULUM.flatMap(u => u.lessons);
}

export function getNextLesson(currentId) {
  const all = getAllLessons();
  const idx = all.findIndex(l => l.id === currentId);
  return idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
}
