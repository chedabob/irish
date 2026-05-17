const KEY = 'gaeilge_v1';

const defaults = {
  xp: 0,
  streak: 0,
  lastStudied: null,
  completedLessons: {},
  sessionXP: 0,
  totalLessonsToday: 0,
  dailyGoal: 2,
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : { ...defaults };
  } catch {
    return { ...defaults };
  }
}

function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

let state = load();

export const store = {
  get() { return { ...state }; },

  checkAndUpdateStreak() {
    const today = new Date().toDateString();
    const last = state.lastStudied;
    if (last === today) return;

    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const newStreak = last === yesterday ? state.streak + 1 : (last ? 0 : 1);

    state = {
      ...state,
      streak: newStreak,
      lastStudied: today,
      totalLessonsToday: last === today ? state.totalLessonsToday : 0,
    };
    save(state);
  },

  completeLesson(lessonId, xp) {
    const today = new Date().toDateString();
    const alreadyDone = !!state.completedLessons[lessonId];
    const earnedXP = alreadyDone ? Math.floor(xp / 2) : xp;

    state = {
      ...state,
      xp: state.xp + earnedXP,
      completedLessons: {
        ...state.completedLessons,
        [lessonId]: { xp: earnedXP, completedAt: Date.now() },
      },
      lastStudied: today,
      totalLessonsToday: state.totalLessonsToday + 1,
    };
    save(state);
    return earnedXP;
  },

  isLessonComplete(lessonId) {
    return !!state.completedLessons[lessonId];
  },

  isUnitUnlocked(unitId) {
    if (unitId === 1) return true;
    // Unit N unlocks when all lessons of unit N-1 are done
    const { CURRICULUM } = /** @type {any} */ (window.__curriculum__);
    const prevUnit = CURRICULUM.find(u => u.id === unitId - 1);
    if (!prevUnit) return false;
    return prevUnit.lessons.every(l => state.completedLessons[l.id]);
  },

  getLevel() {
    const xp = state.xp;
    if (xp < 100) return 1;
    if (xp < 250) return 2;
    if (xp < 500) return 3;
    if (xp < 1000) return 4;
    if (xp < 2000) return 5;
    return Math.floor(xp / 400) + 1;
  },

  getXPToNextLevel() {
    const thresholds = [0, 100, 250, 500, 1000, 2000];
    const xp = state.xp;
    const level = this.getLevel();
    const current = thresholds[level - 1] ?? (level - 1) * 400;
    const next = thresholds[level] ?? level * 400;
    return { current: xp - current, needed: next - current };
  },
};
