import { CURRICULUM, getLesson, getNextLesson } from './curriculum.js';
import { store } from './store.js';
import { speak, canSpeak } from './audio.js';

// expose curriculum for store's isUnitUnlocked helper
window.__curriculum__ = { CURRICULUM };

// ── Router ──────────────────────────────────────────────────────────────────

const views = {};
let currentView = null;

function navigate(view, params = {}) {
  currentView = view;
  const screen = document.getElementById('screen');
  const nav    = document.getElementById('nav');

  if (view === 'lesson') {
    screen.classList.add('lesson-mode');
    nav.classList.add('hidden');
  } else {
    screen.classList.remove('lesson-mode');
    nav.classList.remove('hidden');
    document.querySelectorAll('.nav-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.view === view));
  }

  screen.innerHTML = '';
  views[view]?.render(params);
  screen.scrollTo(0, 0);
}

// ── Toast ────────────────────────────────────────────────────────────────────

let toastTimer;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'show';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.add('fade');
    setTimeout(() => el.classList.remove('show', 'fade'), 400);
  }, 2200);
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function el(tag, cls, inner) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (inner !== undefined) e.innerHTML = inner;
  return e;
}

function icon(name) {
  const icons = {
    home:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    learn:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    profile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    close:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    play:    `<svg viewBox="0 0 24 24"><polygon fill="white" points="5,3 19,12 5,21"/></svg>`,
    speaker: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/><path d="M19.07 4.93a10 10 0 010 14.14"/></svg>`,
    check:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`,
    lock:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
  };
  return icons[name] ?? '';
}

function normalize(str) {
  return str.toLowerCase()
    .replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i')
    .replace(/ó/g,'o').replace(/ú/g,'u')
    .replace(/[^a-z\s']/g, '')
    .replace(/\s+/g, ' ').trim();
}

function checkAnswer(input, answer, acceptPrefix = false) {
  const ni = normalize(input);
  const na = normalize(answer);
  if (acceptPrefix) return na.startsWith(ni) && ni.length > 1;
  return ni === na;
}

// ── HOME VIEW ────────────────────────────────────────────────────────────────

views.home = {
  render() {
    store.checkAndUpdateStreak();
    const state = store.get();
    const screen = document.getElementById('screen');

    // Find next undone lesson
    let nextLesson = null;
    let nextUnit   = null;
    for (const unit of CURRICULUM) {
      for (const lesson of unit.lessons) {
        if (!store.isLessonComplete(lesson.id)) {
          nextLesson = lesson;
          nextUnit = unit;
          break;
        }
      }
      if (nextLesson) break;
    }

    const done = state.totalLessonsToday;
    const goal = state.dailyGoal;
    const greetingHour = new Date().getHours();
    const greeting = greetingHour < 12 ? 'Maidin mhaith!' : greetingHour < 18 ? 'Dia duit!' : 'Tráthnóna maith!';
    const greetEng = greetingHour < 12 ? 'Good morning!' : greetingHour < 18 ? 'Hello!' : 'Good evening!';

    const header = el('div', 'home-header');
    header.innerHTML = `
      <div class="home-header-top">
        <div class="streak-badge">🔥 ${state.streak} ${state.streak === 1 ? 'day' : 'days'}</div>
        <div class="xp-badge">⭐ ${state.xp} XP</div>
      </div>
      <div class="home-greeting">${greeting}</div>
      <div class="home-subtext">${greetEng} Level ${store.getLevel()}</div>
    `;
    screen.appendChild(header);

    const body = el('div', 'home-body');

    // Daily goal
    const daily = el('div', 'daily-card');
    const dots = Array.from({ length: goal }, (_, i) =>
      `<div class="goal-dot${i < done ? ' done' : ''}"></div>`).join('');
    daily.innerHTML = `
      <div class="daily-card-title">Daily Goal</div>
      <div class="goal-track">${dots}</div>
      <div class="goal-label">${done >= goal ? '✅ Goal complete! Keep going!' : `${done} of ${goal} lessons today`}</div>
    `;
    if (nextLesson) {
      const btn = el('button', 'continue-btn', nextLesson ? `▶ ${done === 0 ? 'Start' : 'Continue'} — ${nextLesson.title}` : 'All done! Review?');
      btn.addEventListener('click', () => navigate('lesson', { lessonId: nextLesson.id }));
      daily.appendChild(btn);
    }
    body.appendChild(daily);

    // Units
    body.appendChild(el('div', 'section-title', 'Units'));
    for (const unit of CURRICULUM) {
      const unlocked = store.isUnitUnlocked(unit.id);
      const total = unit.lessons.length;
      const doneCount = unit.lessons.filter(l => store.isLessonComplete(l.id)).length;
      const pct = total > 0 ? Math.round(doneCount / total * 100) : 0;

      const card = el('div', `unit-card${unlocked ? '' : ' locked'}`);
      card.innerHTML = `
        <div class="unit-header">
          <div class="unit-icon" style="background:${unit.color}20">${unit.icon}</div>
          <div class="unit-info">
            <div class="unit-title">${unit.title}</div>
            <div class="unit-subtitle">${unit.subtitle}</div>
          </div>
          ${!unlocked ? `<div style="color:var(--muted)">${icon('lock')}</div>` : ''}
        </div>
        <div class="unit-progress-bar">
          <div class="unit-progress-fill" style="width:${pct}%"></div>
        </div>
        <div class="lesson-list">
          ${unit.lessons.map((l, i) => {
            const done = store.isLessonComplete(l.id);
            const isNext = unlocked && !done && unit.lessons.slice(0, i).every(ll => store.isLessonComplete(ll.id));
            return `
              <div class="lesson-row" data-id="${l.id}" ${!unlocked ? 'style="pointer-events:none"' : ''}>
                <div class="lesson-dot${done ? ' done' : isNext ? ' next' : ''}">
                  ${done ? icon('check') : isNext ? '▶' : `${i + 1}`}
                </div>
                <div class="lesson-info">
                  <div class="lesson-name">${l.title}</div>
                  <div class="lesson-sub">${l.subtitle}</div>
                </div>
                <div class="lesson-xp">+${l.xp} XP</div>
              </div>`;
          }).join('')}
        </div>
      `;

      card.querySelectorAll('.lesson-row[data-id]').forEach(row => {
        row.addEventListener('click', e => {
          e.stopPropagation();
          if (unlocked) navigate('lesson', { lessonId: row.dataset.id });
        });
      });

      body.appendChild(card);
    }

    screen.appendChild(body);
  },
};

// ── LEARN VIEW ───────────────────────────────────────────────────────────────

views.learn = views.home; // same content for now

// ── PROFILE VIEW ─────────────────────────────────────────────────────────────

views.profile = {
  render() {
    const state = store.get();
    const level = store.getLevel();
    const progress = store.getXPToNextLevel();
    const totalDone = Object.keys(state.completedLessons).length;
    const screen = document.getElementById('screen');

    const levelNames = ['', 'Tosaitheoir', 'Foghlaimeoir', 'Mac Léinn', 'Gaeilgeoir', 'Sárfhile', 'Ollamh'];
    const levelName = levelNames[Math.min(level, levelNames.length - 1)] ?? 'Máistir';

    const badges = [
      { emoji: '🇮🇪', name: 'First Steps',  unlocked: totalDone >= 1 },
      { emoji: '🔥', name: '3-Day Streak', unlocked: state.streak >= 3 },
      { emoji: '📖', name: '5 Lessons',    unlocked: totalDone >= 5 },
      { emoji: '⭐', name: '100 XP',       unlocked: state.xp >= 100 },
      { emoji: '🌟', name: '250 XP',       unlocked: state.xp >= 250 },
      { emoji: '🏆', name: 'Unit 1 Done',  unlocked: CURRICULUM[0].lessons.every(l => store.isLessonComplete(l.id)) },
      { emoji: '🦀', name: 'Unit 2 Done',  unlocked: CURRICULUM[1]?.lessons.every(l => store.isLessonComplete(l.id)) },
      { emoji: '💎', name: '500 XP',       unlocked: state.xp >= 500 },
    ];

    screen.innerHTML = `
      <div class="profile-header">
        <div class="profile-avatar">🧑</div>
        <h2 style="color:white">Level ${level}</h2>
        <div class="level-badge">${levelName}</div>
        <div style="margin-top:12px;background:rgba(255,255,255,.15);border-radius:8px;overflow:hidden;height:6px">
          <div style="width:${Math.round(progress.current/progress.needed*100)}%;background:var(--gold);height:100%;border-radius:8px;transition:width .4s"></div>
        </div>
        <div style="font-size:.75rem;color:rgba(255,255,255,.7);margin-top:4px">${progress.current}/${progress.needed} XP to Level ${level + 1}</div>
      </div>
      <div class="profile-body">
        <div class="stats-row">
          <div class="stat-card"><div class="val">🔥${state.streak}</div><div class="lbl">Day Streak</div></div>
          <div class="stat-card"><div class="val">⭐${state.xp}</div><div class="lbl">Total XP</div></div>
          <div class="stat-card"><div class="val">${totalDone}</div><div class="lbl">Lessons Done</div></div>
        </div>
        <div class="section-title" style="margin-bottom:12px">Badges</div>
        <div class="badge-grid">
          ${badges.map(b => `
            <div class="badge${b.unlocked ? '' : ' locked'}">
              <span>${b.emoji}</span>
              <span class="badge-name">${b.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },
};

// ── LESSON ENGINE ─────────────────────────────────────────────────────────────

const engine = {
  lesson: null,
  unit:   null,
  stepIdx: 0,
  hearts: 3,
  sessionXP: 0,
  wrongAnswers: 0,
  stepsPending: [],

  start(lessonId) {
    const found = getLesson(lessonId);
    if (!found) { navigate('home'); return; }
    this.lesson  = found.lesson;
    this.unit    = found.unit;
    this.stepIdx = 0;
    this.hearts  = 3;
    this.sessionXP = 0;
    this.wrongAnswers = 0;
    this.render();
    this.showStep();
  },

  render() {
    const screen = document.getElementById('screen');
    screen.innerHTML = `
      <div class="lesson-header">
        <button class="lesson-close" id="lessonClose">${icon('close')}</button>
        <div class="lesson-progress-bar">
          <div class="lesson-progress-fill" id="lessonProgress" style="width:0%"></div>
        </div>
        <div class="hearts" id="hearts"></div>
      </div>
      <div class="lesson-content" id="lessonContent"></div>
      <div class="lesson-footer" id="lessonFooter"></div>
    `;
    document.getElementById('lessonClose').addEventListener('click', () => {
      if (confirm('Leave this lesson? Your progress will be lost.')) navigate('home');
    });
    this.updateHUD();
  },

  updateHUD() {
    const total = this.lesson.steps.length;
    const pct = Math.round(this.stepIdx / total * 100);
    const prog = document.getElementById('lessonProgress');
    if (prog) prog.style.width = pct + '%';

    const heartsEl = document.getElementById('hearts');
    if (heartsEl) {
      heartsEl.innerHTML = [1,2,3].map(i =>
        `<span class="heart${i > this.hearts ? ' lost' : ''}">❤️</span>`
      ).join('');
    }
  },

  showStep() {
    if (this.stepIdx >= this.lesson.steps.length) {
      this.complete();
      return;
    }
    const step = this.lesson.steps[this.stepIdx];
    const content = document.getElementById('lessonContent');
    const footer  = document.getElementById('lessonFooter');
    if (!content || !footer) return;
    content.innerHTML = '';
    footer.innerHTML  = '';
    this.updateHUD();

    switch (step.type) {
      case 'chat':    this.renderChat(step, content, footer); break;
      case 'teach':   this.renderTeach(step, content, footer); break;
      case 'choice':  this.renderChoice(step, content, footer); break;
      case 'write':   this.renderWrite(step, content, footer); break;
      case 'listen':  this.renderListen(step, content, footer); break;
      case 'pairs':   this.renderPairs(step, content, footer); break;
      default:        this.advance(); break;
    }
  },

  advance() {
    this.stepIdx++;
    this.showStep();
  },

  renderChat(step, content) {
    const wrap = el('div', 'chat-wrap');
    wrap.innerHTML = `
      <div class="chat-avatar">🧑‍🏫</div>
      <div class="chat-bubble">
        <div class="chat-name">${step.name}</div>
        <div>${step.text}</div>
      </div>
    `;
    content.appendChild(wrap);

    const footer = document.getElementById('lessonFooter');
    const btn = el('button', 'cta-btn primary', 'Continue');
    btn.addEventListener('click', () => this.advance());
    footer.appendChild(btn);
  },

  renderTeach(step, content) {
    const card = el('div', 'teach-card');
    card.innerHTML = `
      <div class="irish-text">${step.irish}</div>
      <div class="english" style="margin:8px 0">${step.english}</div>
      <div class="phonetic">${step.phonetic}</div>
      ${step.note ? `<div class="note">${step.note}</div>` : ''}
      <button class="speak-btn" id="speakBtn">
        ${icon('speaker')} <span>Listen</span>
      </button>
    `;
    content.appendChild(card);

    const speakBtn = card.querySelector('#speakBtn');
    speakBtn.addEventListener('click', () => {
      speakBtn.classList.add('playing');
      speak(step.irish, step.tts).then(() => speakBtn.classList.remove('playing'));
    });
    // auto-play
    setTimeout(() => speak(step.irish, step.tts), 300);

    const footer = document.getElementById('lessonFooter');
    const btn = el('button', 'cta-btn primary', 'Got it — next!');
    btn.addEventListener('click', () => this.advance());
    footer.appendChild(btn);
  },

  renderChoice(step, content, footer) {
    const q = el('div', 'question-text', step.question);
    const grid = el('div', 'choices');
    content.appendChild(q);
    content.appendChild(grid);

    step.options.forEach((opt, i) => {
      const btn = el('button', 'choice-btn', opt);
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        grid.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
        const correct = i === step.correct;
        btn.classList.add(correct ? 'correct' : 'wrong');
        if (!correct) {
          grid.querySelectorAll('.choice-btn')[step.correct]?.classList.add('correct');
          this.hearts = Math.max(0, this.hearts - 1);
          this.wrongAnswers++;
          this.updateHUD();
        }
        if (step.explanation) {
          const exp = el('div', 'explanation', (correct ? '✅ ' : '❌ ') + step.explanation);
          content.appendChild(exp);
        }
        footer.innerHTML = '';
        const next = el('button', `cta-btn ${correct ? 'success' : 'danger'}`, correct ? 'Correct! Next →' : 'Got it — continue');
        next.addEventListener('click', () => this.advance());
        footer.appendChild(next);
      });
      grid.appendChild(btn);
    });
  },

  renderWrite(step, content, footer) {
    const prompt = el('div', 'write-prompt', step.prompt);
    content.appendChild(prompt);
    if (step.phonetic) {
      content.appendChild(el('div', 'phonetic mb-16', `🔉 ${step.phonetic}`));
    }

    const wrap = el('div', 'write-input-wrap');
    const input = el('input', 'write-input');
    input.type = 'text';
    input.placeholder = 'Type in Irish…';
    input.autocorrect = 'off';
    input.autocapitalize = 'off';
    input.spellcheck = false;
    wrap.appendChild(input);
    content.appendChild(wrap);

    // Irish special character keyboard
    const keys = el('div', 'irish-keyboard');
    ['á','é','í','ó','ú','Á','É','Í','Ó','Ú'].forEach(ch => {
      const k = el('button', 'iri-key', ch);
      k.type = 'button';
      k.addEventListener('click', () => {
        const pos = input.selectionStart ?? input.value.length;
        input.value = input.value.slice(0, pos) + ch + input.value.slice(pos);
        input.focus();
        input.selectionStart = input.selectionEnd = pos + 1;
      });
      keys.appendChild(k);
    });
    content.appendChild(keys);

    let answered = false;
    const check = () => {
      if (answered) return;
      const val = input.value.trim();
      if (!val) return;
      answered = true;
      input.disabled = true;
      const correct = checkAnswer(val, step.answer, step.acceptPrefix);
      input.classList.add(correct ? 'correct' : 'wrong');

      if (!correct) {
        this.hearts = Math.max(0, this.hearts - 1);
        this.wrongAnswers++;
        this.updateHUD();
        content.appendChild(el('div', 'feedback-wrong',
          `❌ The answer is: <span class="correct-answer">${step.answer}</span>`));
      } else {
        content.appendChild(el('div', 'feedback-correct', '✅ Tá sé sin ceart! Correct!'));
      }

      footer.innerHTML = '';
      const next = el('button', `cta-btn ${correct ? 'success' : 'danger'}`, correct ? 'Next →' : 'Continue');
      next.addEventListener('click', () => this.advance());
      footer.appendChild(next);
    };

    input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
    const btn = el('button', 'cta-btn primary', 'Check');
    btn.addEventListener('click', check);
    footer.appendChild(btn);
    setTimeout(() => input.focus(), 100);
  },

  renderListen(step, content, footer) {
    let hasPlayed = false;
    const card = el('div', 'listen-card');
    card.innerHTML = `
      <button class="listen-play-btn" id="listenPlay">${icon('play')}</button>
      <div class="listen-hint">${hasPlayed ? '' : 'Tap to listen'}</div>
    `;
    content.appendChild(card);

    const playBtn = card.querySelector('#listenPlay');
    playBtn.addEventListener('click', () => {
      playBtn.classList.add('playing');
      speak(step.irish, step.tts).then(() => {
        playBtn.classList.remove('playing');
        if (!hasPlayed) {
          hasPlayed = true;
          card.querySelector('.listen-hint').textContent = 'Tap again to replay';
          showQuestion();
        }
      });
    });

    // auto-play and show question
    setTimeout(() => {
      playBtn.classList.add('playing');
      speak(step.irish, step.tts).then(() => {
        playBtn.classList.remove('playing');
        hasPlayed = true;
        card.querySelector('.listen-hint').textContent = 'Tap to replay';
        showQuestion();
      });
    }, 400);

    const questionArea = el('div');
    content.appendChild(questionArea);

    const showQuestion = () => {
      if (questionArea.children.length) return;
      const q = el('div', 'question-text mt-8', step.question ?? 'What does this mean?');
      const grid = el('div', 'choices');
      questionArea.appendChild(q);
      questionArea.appendChild(grid);

      step.options.forEach((opt, i) => {
        const btn = el('button', 'choice-btn', opt);
        btn.addEventListener('click', () => {
          if (btn.disabled) return;
          grid.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
          const correct = i === step.correct;
          btn.classList.add(correct ? 'correct' : 'wrong');
          if (!correct) {
            grid.querySelectorAll('.choice-btn')[step.correct]?.classList.add('correct');
            this.hearts = Math.max(0, this.hearts - 1);
            this.wrongAnswers++;
            this.updateHUD();
          }
          // show phonetic
          const pho = el('div', 'listen-phonetic', `🔉 ${step.phonetic}`);
          questionArea.appendChild(pho);
          footer.innerHTML = '';
          const next = el('button', `cta-btn ${correct ? 'success' : 'danger'}`, correct ? 'Next →' : 'Continue');
          next.addEventListener('click', () => this.advance());
          footer.appendChild(next);
        });
        grid.appendChild(btn);
      });
    };
  },

  renderPairs(step, content, footer) {
    const prompt = el('div', 'pairs-prompt', step.prompt ?? 'Match the pairs');
    content.appendChild(prompt);

    // Shuffle both columns
    const pairs = [...step.pairs];
    const shuffle = arr => [...arr].sort(() => Math.random() - .5);
    const left  = shuffle(pairs.map(p => p[0]));
    const right = shuffle(pairs.map(p => p[1]));
    const allTerms = [...pairs.map(p => p[0]), ...pairs.map(p => p[1])];
    const pairMap = Object.fromEntries(pairs.flatMap(([a, b]) => [[a, b], [b, a]]));

    const grid = el('div', 'pairs-grid');
    let selected = null;
    let matched = new Set();
    let totalPairs = pairs.length;
    let donePairs = 0;

    const makeBtn = (text, col) => {
      const btn = el('button', 'pair-btn', text);
      btn.dataset.text = text;
      btn.dataset.col = col;
      btn.addEventListener('click', () => {
        if (btn.classList.contains('matched') || btn.classList.contains('wrong-shake')) return;

        if (!selected) {
          selected = btn;
          btn.classList.add('selected');
          return;
        }

        if (selected === btn) {
          selected.classList.remove('selected');
          selected = null;
          return;
        }

        const match = pairMap[selected.dataset.text] === btn.dataset.text;
        if (match) {
          [selected, btn].forEach(b => {
            b.classList.remove('selected');
            b.classList.add('matched');
          });
          selected = null;
          donePairs++;
          if (donePairs === totalPairs) {
            footer.innerHTML = '';
            const next = el('button', 'cta-btn success', 'Iontach! Next →');
            next.addEventListener('click', () => this.advance());
            footer.appendChild(next);
          }
        } else {
          const prev = selected;
          prev.classList.add('wrong-shake');
          btn.classList.add('wrong-shake');
          setTimeout(() => {
            prev.classList.remove('selected', 'wrong-shake');
            btn.classList.remove('wrong-shake');
          }, 400);
          selected = null;
          this.hearts = Math.max(0, this.hearts - 1);
          this.wrongAnswers++;
          this.updateHUD();
        }
      });
      return btn;
    };

    // Interleave left/right in grid (grid is 2-col)
    left.forEach((term, i) => {
      grid.appendChild(makeBtn(term, 'left'));
      grid.appendChild(makeBtn(right[i], 'right'));
    });
    content.appendChild(grid);
    // No initial CTA — it unlocks when all pairs matched
  },

  complete() {
    const xpEarned = store.completeLesson(this.lesson.id, this.lesson.xp);
    store.checkAndUpdateStreak();
    const state = store.get();
    const next = getNextLesson(this.lesson.id);

    const screen = document.getElementById('screen');
    screen.classList.remove('lesson-mode');
    document.getElementById('nav').classList.remove('hidden');
    screen.innerHTML = '';

    const stars = this.wrongAnswers === 0 ? '⭐⭐⭐' : this.wrongAnswers <= 2 ? '⭐⭐' : '⭐';

    const div = el('div', 'complete-screen');
    div.innerHTML = `
      <div class="complete-emoji">🎉</div>
      <div class="complete-title">Maith thú!</div>
      <div class="complete-sub">"${this.lesson.title}" complete!</div>
      <div class="xp-earned">+${xpEarned} XP<small>${stars}</small></div>
      <div class="complete-stats">
        <div class="stat-box"><div class="stat-value">🔥 ${state.streak}</div><div class="stat-label">Day streak</div></div>
        <div class="stat-box"><div class="stat-value">⭐ ${state.xp}</div><div class="stat-label">Total XP</div></div>
        <div class="stat-box"><div class="stat-value">Lv.${store.getLevel()}</div><div class="stat-label">Level</div></div>
      </div>
    `;

    const btnWrap = el('div', '', '');
    if (next) {
      const nextBtn = el('button', 'cta-btn primary', `Next: ${next.title} →`);
      nextBtn.style.cssText = 'margin-bottom:10px';
      nextBtn.addEventListener('click', () => navigate('lesson', { lessonId: next.id }));
      btnWrap.appendChild(nextBtn);
    }
    const homeBtn = el('button', 'cta-btn', 'Back to home');
    homeBtn.style.cssText = 'background:var(--bg);color:var(--text)';
    homeBtn.addEventListener('click', () => navigate('home'));
    btnWrap.appendChild(homeBtn);
    div.appendChild(btnWrap);
    screen.appendChild(div);
  },
};

views.lesson = {
  render({ lessonId }) {
    engine.start(lessonId);
  },
};

// ── INIT ─────────────────────────────────────────────────────────────────────

function init() {
  // Nav
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.view));
  });

  // Register SW
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  navigate('home');
}

document.addEventListener('DOMContentLoaded', init);
