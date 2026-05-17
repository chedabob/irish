// Each step type:
//  chat   – character speech bubble, auto-advances
//  teach  – Irish word/phrase card with phonetic + audio button
//  choice – multiple choice (taps)
//  write  – type the Irish (special char keyboard provided)
//  listen – hear it, then choose / translate
//  pairs  – tap-to-match two columns

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
          { type: 'teach', irish: 'Dia duit', english: 'Hello', phonetic: 'JEE-uh gwitch', note: 'Literally "God to you" — the traditional Irish greeting.' },
          { type: 'chat', name: 'Séan', text: 'When someone greets you with "Dia duit", there\'s a beautiful traditional response:' },
          { type: 'teach', irish: 'Dia is Muire duit', english: 'Hello (in reply)', phonetic: 'JEE-uh iss MWIR-uh gwitch', note: '"God and Mary to you" — always the reply, never the opener.' },
          { type: 'choice', question: 'How do you say "Hello" in Irish?', options: ['Slán', 'Dia duit', 'Go raibh maith agat', 'Conas atá tú?'], correct: 1, explanation: 'Dia duit — literally "God to you". The classic opener.' },
          { type: 'choice', question: 'Someone says "Dia duit" to you. You say…', options: ['Dia duit', 'Slán', 'Dia is Muire duit', 'Go maith'], correct: 2, explanation: '"Dia is Muire duit" — God and Mary to you. The traditional response.' },
          { type: 'listen', irish: 'Dia duit', english: 'Hello', phonetic: 'JEE-uh gwitch', question: 'What did you hear?', options: ['Hello', 'Goodbye', 'Thank you', 'How are you?'], correct: 0 },
          { type: 'write', prompt: 'Type the Irish for "Hello"', answer: 'Dia duit', phonetic: 'JEE-uh gwitch', hint: 'Two words, starts with D' },
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
          { type: 'teach', irish: 'Conas atá tú?', english: 'How are you?', phonetic: 'KUN-us ah-TAW too', note: 'The everyday way to ask how someone is doing.' },
          { type: 'teach', irish: 'Tá mé go maith', english: 'I am well', phonetic: 'taw may guh MAH', note: '"Tá" means "is/am/are" in Irish — you\'ll use it constantly.' },
          { type: 'teach', irish: 'Tá mé go hiontach', english: 'I am wonderful', phonetic: 'taw may guh HUN-tukh', note: '"Go hiontach" — wonderful, amazing.' },
          { type: 'teach', irish: 'Tá mé tuirseach', english: 'I am tired', phonetic: 'taw may TEER-shukh', note: 'Honest answer always welcome!' },
          { type: 'choice', question: 'How do you ask "How are you?" in Irish?', options: ['Tá mé go maith', 'Conas atá tú?', 'Dia duit', 'Slán'], correct: 1, explanation: 'Conas atá tú? — KUN-us ah-TAW too.' },
          { type: 'choice', question: 'What does "Tá mé go maith" mean?', options: ['I am tired', 'I am wonderful', 'I am well', 'How are you?'], correct: 2, explanation: 'Tá mé go maith — "I am well". Tá = am/is/are.' },
          { type: 'listen', irish: 'Conas atá tú?', english: 'How are you?', phonetic: 'KUN-us ah-TAW too', question: 'Translate what you heard:', options: ['I am well', 'How are you?', 'Goodbye', 'Thank you'], correct: 1 },
          { type: 'pairs', prompt: 'Match the Irish to the English', pairs: [['Tá mé go maith', 'I am well'], ['Conas atá tú?', 'How are you?'], ['Tá mé tuirseach', 'I am tired']] },
          { type: 'write', prompt: 'How do you say "I am well"?', answer: 'Tá mé go maith', phonetic: 'taw may guh MAH', hint: 'Three words — starts with Tá' },
        ],
      },
      {
        id: '1-3',
        title: 'Go raibh maith agat',
        subtitle: 'Thank you & Goodbye',
        xp: 20,
        steps: [
          { type: 'chat', name: 'Séan', text: 'You\'re building up a real conversation now. Let\'s add "thank you" and "goodbye" and you\'ll be able to have your first full Irish exchange!' },
          { type: 'teach', irish: 'Go raibh maith agat', english: 'Thank you', phonetic: 'guh ROH mah AH-guth', note: 'Literally "may there be good at you" — a wish of wellbeing.' },
          { type: 'teach', irish: 'Go raibh maith agaibh', english: 'Thank you (to a group)', phonetic: 'guh ROH mah AH-giv', note: 'Irish has separate singular and plural "you" — agat vs agaibh.' },
          { type: 'teach', irish: 'Slán', english: 'Goodbye', phonetic: 'slawn', note: 'Also means "safe" — wishing someone a safe farewell.' },
          { type: 'teach', irish: 'Slán go fóill', english: 'Goodbye for now', phonetic: 'slawn guh foil', note: '"Go fóill" means "for now" — a softer, see-you-soon goodbye.' },
          { type: 'teach', irish: 'Oíche mhaith', english: 'Good night', phonetic: 'EE-huh wah', note: 'Note: "mh" in Irish sounds like "w" or "v" — Irish spelling is logical once you learn the rules!' },
          { type: 'choice', question: 'How do you say "Thank you" in Irish?', options: ['Slán', 'Go raibh maith agat', 'Oíche mhaith', 'Tá mé go maith'], correct: 1, explanation: 'Go raibh maith agat — guh ROH mah AH-guth.' },
          { type: 'choice', question: 'What does "Slán go fóill" mean?', options: ['Good night', 'Thank you', 'Goodbye for now', 'See you tomorrow'], correct: 2, explanation: 'Slán go fóill — goodbye for now. A friendly, casual farewell.' },
          { type: 'listen', irish: 'Slán', english: 'Goodbye', phonetic: 'slawn', question: 'What did you hear?', options: ['Hello', 'Thank you', 'Goodbye', 'Good night'], correct: 2 },
          { type: 'write', prompt: 'How do you say "Thank you"?', answer: 'Go raibh maith agat', phonetic: 'guh ROH mah AH-guth', hint: 'Four words — starts with Go' },
          { type: 'chat', name: 'Séan', text: 'Go hiontach! You can now greet someone, ask how they are, thank them, and say goodbye. That\'s a complete Irish conversation!' },
        ],
      },
      {
        id: '1-4',
        title: 'Comhrá! Conversation',
        subtitle: 'Unit 1 review',
        xp: 30,
        steps: [
          { type: 'chat', name: 'Séan', text: 'Comhrá means conversation. Let\'s put Unit 1 together — a full greeting exchange. I\'ll go first…' },
          { type: 'chat', name: 'Séan', text: 'Dia duit!' },
          { type: 'choice', question: 'You reply to Séan\'s greeting:', options: ['Slán', 'Dia is Muire duit', 'Go raibh maith agat', 'Oíche mhaith'], correct: 1, explanation: 'Dia is Muire duit — the traditional reply to "Dia duit".' },
          { type: 'chat', name: 'Séan', text: 'Conas atá tú?' },
          { type: 'write', prompt: 'Tell Séan you are well:', answer: 'Tá mé go maith', phonetic: 'taw may guh MAH', hint: 'I am well' },
          { type: 'chat', name: 'Séan', text: 'Go maith! Now, how would you ask me "How are you?"' },
          { type: 'write', prompt: 'Ask Séan how he is:', answer: 'Conas atá tú?', phonetic: 'KUN-us ah-TAW too', hint: 'How are you?' },
          { type: 'chat', name: 'Séan', text: 'Tá mé go hiontach, go raibh maith agat! Now it\'s time to say goodbye.' },
          { type: 'choice', question: 'Say a casual "goodbye for now":', options: ['Oíche mhaith', 'Dia duit', 'Slán go fóill', 'Go raibh maith agat'], correct: 2, explanation: 'Slán go fóill — goodbye for now!' },
          { type: 'pairs', prompt: 'Final review — match them all:', pairs: [['Dia duit', 'Hello'], ['Conas atá tú?', 'How are you?'], ['Tá mé go maith', 'I am well'], ['Go raibh maith agat', 'Thank you'], ['Slán', 'Goodbye']] },
          { type: 'chat', name: 'Séan', text: 'Comhghairdeas — congratulations! You\'ve completed Unit 1. Lean ar aghaidh — keep going!' },
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
          { type: 'chat', name: 'Séan', text: 'Dia duit arís! Now we\'ll learn how to introduce yourself. This is where Irish gets really interesting.' },
          { type: 'teach', irish: 'Is mise Séan', english: 'I am Séan', phonetic: 'iss MISH-uh shawn', note: '"Is mise" means "I am" when introducing yourself. "Mise" emphasises "me" specifically.' },
          { type: 'teach', irish: 'Cad is ainm duit?', english: 'What is your name?', phonetic: 'kod iss AN-im ditch', note: 'Literally "what is name to you?" — Irish often uses "to" where English uses "your".' },
          { type: 'teach', irish: 'Is as Éire mé', english: 'I am from Ireland', phonetic: 'iss as AY-ruh may', note: '"As" means "from". Éire is the Irish name for Ireland.' },
          { type: 'teach', irish: 'Cén áit as tú?', english: 'Where are you from?', phonetic: 'kayn awt ass too', note: 'Cén = what/which, áit = place.' },
          { type: 'choice', question: 'How do you say "I am Séan" (introducing yourself)?', options: ['Tá mé Séan', 'Is mise Séan', 'Mé Séan', 'Mise Séan'], correct: 1, explanation: 'Is mise — the emphatic "I am" used for introductions.' },
          { type: 'choice', question: 'What does "Cad is ainm duit?" mean?', options: ['Where are you from?', 'How are you?', 'What is your name?', 'Who are you?'], correct: 2, explanation: 'Cad is ainm duit? — What is your name? Ainm = name.' },
          { type: 'listen', irish: 'Cad is ainm duit?', english: 'What is your name?', phonetic: 'kod iss AN-im ditch', question: 'What did you hear?', options: ['Where are you from?', 'What is your name?', 'How are you?', 'I am well'], correct: 1 },
          { type: 'write', prompt: 'Introduce yourself: "I am [your name]" (use your own name!)', answer: 'Is mise', phonetic: 'iss MISH-uh', hint: 'Two words to start: Is mise...', acceptPrefix: true },
          { type: 'pairs', prompt: 'Match the phrases:', pairs: [['Is mise', 'I am (intro)'], ['Cad is ainm duit?', 'What is your name?'], ['Cén áit as tú?', 'Where are you from?'], ['Is as Éire mé', 'I am from Ireland']] },
        ],
      },
      {
        id: '2-2',
        title: 'Na huimhreacha 1-5',
        subtitle: 'Numbers 1 to 5',
        xp: 20,
        steps: [
          { type: 'chat', name: 'Séan', text: 'Uimhreacha — numbers! Irish numbers are elegant. Let\'s learn 1 to 5 first.' },
          { type: 'teach', irish: 'a haon', english: 'one (1)', phonetic: 'uh HAYN', note: 'The "a" prefix (unstressed) is used before counting numbers.' },
          { type: 'teach', irish: 'a dó', english: 'two (2)', phonetic: 'uh DOH', note: '' },
          { type: 'teach', irish: 'a trí', english: 'three (3)', phonetic: 'uh TREE', note: '' },
          { type: 'teach', irish: 'a ceathair', english: 'four (4)', phonetic: 'uh KAH-her', note: '"ceathair" — the "th" in Irish is silent, like "h".' },
          { type: 'teach', irish: 'a cúig', english: 'five (5)', phonetic: 'uh KOO-ig', note: 'Cúig — the fada (accent) makes the vowel long.' },
          { type: 'choice', question: 'What is "three" in Irish?', options: ['a haon', 'a dó', 'a trí', 'a ceathair'], correct: 2, explanation: 'A trí — uh TREE.' },
          { type: 'choice', question: 'What does "a ceathair" mean?', options: ['1', '2', '3', '4'], correct: 3, explanation: 'A ceathair = four. KAH-her.' },
          { type: 'listen', irish: 'a dó', english: 'two', phonetic: 'uh DOH', question: 'Which number did you hear?', options: ['1', '2', '3', '4'], correct: 1 },
          { type: 'pairs', prompt: 'Match number to Irish:', pairs: [['a haon', '1'], ['a dó', '2'], ['a trí', '3'], ['a ceathair', '4'], ['a cúig', '5']] },
          { type: 'write', prompt: 'How do you say "five"?', answer: 'a cúig', phonetic: 'uh KOO-ig', hint: 'Two words, starts with "a"' },
        ],
      },
      {
        id: '2-3',
        title: 'Na huimhreacha 6-10',
        subtitle: 'Numbers 6 to 10',
        xp: 20,
        steps: [
          { type: 'chat', name: 'Séan', text: 'Leanaimis ar aghaidh — let\'s continue! Numbers 6 to 10. Once you have these, you can count anything!' },
          { type: 'teach', irish: 'a sé', english: 'six (6)', phonetic: 'uh shay', note: '"S" before "é" is pronounced "sh" in Irish.' },
          { type: 'teach', irish: 'a seacht', english: 'seven (7)', phonetic: 'uh shaxt', note: '"Seacht" — sh-sound again, with a "ch" like in "loch" at the end.' },
          { type: 'teach', irish: 'a hocht', english: 'eight (8)', phonetic: 'uh huxt', note: 'The "h" prefix appears before some numbers — a grammatical rule.' },
          { type: 'teach', irish: 'a naoi', english: 'nine (9)', phonetic: 'uh NEE', note: 'Naoi — the "aoi" combination makes an "ee" sound.' },
          { type: 'teach', irish: 'a deich', english: 'ten (10)', phonetic: 'uh JEH', note: '"Deich" — like the start of "Dia duit". D before e/i = J sound.' },
          { type: 'choice', question: 'What is "seven" in Irish?', options: ['a sé', 'a seacht', 'a hocht', 'a naoi'], correct: 1, explanation: 'A seacht — uh SHAXT.' },
          { type: 'choice', question: 'What does "a naoi" mean?', options: ['6', '7', '8', '9'], correct: 3, explanation: 'A naoi = nine. Pronounced "uh NEE".' },
          { type: 'listen', irish: 'a deich', english: 'ten', phonetic: 'uh JEH', question: 'Which number?', options: ['7', '8', '9', '10'], correct: 3 },
          { type: 'pairs', prompt: 'Match them up:', pairs: [['a sé', '6'], ['a seacht', '7'], ['a hocht', '8'], ['a naoi', '9'], ['a deich', '10']] },
          { type: 'write', prompt: 'How do you say "eight"?', answer: 'a hocht', phonetic: 'uh HUXT', hint: 'Two words, the second has an "h"' },
        ],
      },
      {
        id: '2-4',
        title: 'Mé Féin — Review',
        subtitle: 'Unit 2 review',
        xp: 30,
        steps: [
          { type: 'chat', name: 'Séan', text: 'Iontach ar fad! Let\'s review everything from Unit 2. Names, introductions, and numbers.' },
          { type: 'choice', question: 'How do you introduce yourself in Irish?', options: ['Tá mé...', 'Is mise...', 'Mé...', 'Mise atá...'], correct: 1, explanation: 'Is mise — the emphatic introduction formula.' },
          { type: 'choice', question: '"A ceathair" means…', options: ['3', '4', '5', '6'], correct: 1, explanation: 'A ceathair = four. KAH-her.' },
          { type: 'listen', irish: 'Cad is ainm duit?', english: 'What is your name?', phonetic: 'kod iss AN-im ditch', question: 'What question is being asked?', options: ['How are you?', 'Where are you from?', 'What is your name?', 'Who are you?'], correct: 2 },
          { type: 'pairs', prompt: 'Match the numbers:', pairs: [['a seacht', '7'], ['a hocht', '8'], ['a naoi', '9'], ['a deich', '10']] },
          { type: 'write', prompt: 'How do you ask "What is your name?"', answer: 'Cad is ainm duit?', phonetic: 'kod iss AN-im ditch', hint: 'Four words, starts with Cad' },
          { type: 'choice', question: '"Is as Éire mé" means…', options: ['I am Irish', 'I am from Ireland', 'I love Ireland', 'Ireland is great'], correct: 1, explanation: 'Is as Éire mé — I am from Ireland. As = from.' },
          { type: 'chat', name: 'Séan', text: 'Comhghairdeas arís! Two units done. You\'re building real Irish now. Lean ar aghaidh — keep going to Unit 3!' },
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
          { type: 'chat', name: 'Séan', text: 'An teaghlach — the family. Irish culture is deeply family-oriented, and the language reflects that. Let\'s meet the family!' },
          { type: 'teach', irish: 'máthair', english: 'mother', phonetic: 'MAW-her', note: 'The "th" in Irish is like an "h" sound.' },
          { type: 'teach', irish: 'athair', english: 'father', phonetic: 'AH-her', note: 'Again, "th" = "h". Athair — AH-her.' },
          { type: 'teach', irish: 'mo mháthair', english: 'my mother', phonetic: 'muh WAW-her', note: '"Mo" (my) causes lenition — adds an "h" after the first consonant. M + h = "w" sound.' },
          { type: 'teach', irish: 'mo athair', english: 'my father', phonetic: 'muh AH-her', note: 'Athair starts with a vowel, so no lenition needed here.' },
          { type: 'teach', irish: 'deartháir', english: 'brother', phonetic: 'JAR-haw-er', note: 'D before e/i makes a "j" sound in Irish.' },
          { type: 'teach', irish: 'deirfiúr', english: 'sister', phonetic: 'JER-foor', note: 'Deirfiúr — JER-foor.' },
          { type: 'teach', irish: 'páiste', english: 'child', phonetic: 'PAWSH-tchuh', note: 'Páiste — the broad vowel á gives a long "aw" sound.' },
          { type: 'choice', question: 'What is "mother" in Irish?', options: ['athair', 'máthair', 'deirfiúr', 'páiste'], correct: 1, explanation: 'Máthair — MAW-her. The "th" sounds like "h".' },
          { type: 'choice', question: 'What does "mo mháthair" mean?', options: ['my father', 'my sister', 'my mother', 'my brother'], correct: 2, explanation: 'Mo mháthair — my mother. "Mo" adds an h after m, changing the sound.' },
          { type: 'pairs', prompt: 'Match family members:', pairs: [['máthair', 'mother'], ['athair', 'father'], ['deartháir', 'brother'], ['deirfiúr', 'sister'], ['páiste', 'child']] },
          { type: 'write', prompt: 'How do you say "my mother"?', answer: 'mo mháthair', phonetic: 'muh WAW-her', hint: 'Two words — mo + lenited máthair' },
        ],
      },
      {
        id: '3-2',
        title: 'Dathanna',
        subtitle: 'Colours',
        xp: 20,
        steps: [
          { type: 'chat', name: 'Séan', text: 'Dathanna — colours! The Irish landscape is famous for forty shades of green. Let\'s learn some colours.' },
          { type: 'teach', irish: 'glas', english: 'green', phonetic: 'glas', note: 'Glas specifically refers to natural green — grass, fields, the Irish landscape.' },
          { type: 'teach', irish: 'gorm', english: 'blue', phonetic: 'gorm', note: 'Interestingly, gorm also covers some greens — Irish colour terms differ from English.' },
          { type: 'teach', irish: 'dearg', english: 'red', phonetic: 'JA-rug', note: 'D before e = "j" sound. Dearg — JA-rug.' },
          { type: 'teach', irish: 'buí', english: 'yellow', phonetic: 'bwee', note: 'Buí — the "uí" combination gives a "wee" sound.' },
          { type: 'teach', irish: 'bán', english: 'white', phonetic: 'bawn', note: 'Bán also means "fair" or "pale". Bán — BAWN.' },
          { type: 'teach', irish: 'dubh', english: 'black', phonetic: 'duv', note: '"Bh" in Irish is pronounced like "v" or "w". Dubh — DUV.' },
          { type: 'teach', irish: 'donn', english: 'brown', phonetic: 'dun', note: 'Donn — like "done". Also an old Irish word for a noble brown.' },
          { type: 'choice', question: 'What colour is "gorm"?', options: ['green', 'blue', 'red', 'yellow'], correct: 1, explanation: 'Gorm = blue. (Though it can shade into what English calls "green" too!)' },
          { type: 'choice', question: 'How do you say "black" in Irish?', options: ['bán', 'glas', 'dubh', 'donn'], correct: 2, explanation: 'Dubh — DUV. The "bh" makes a "v" sound.' },
          { type: 'listen', irish: 'dearg', english: 'red', phonetic: 'JA-rug', question: 'Which colour did you hear?', options: ['blue', 'green', 'red', 'yellow'], correct: 2 },
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
