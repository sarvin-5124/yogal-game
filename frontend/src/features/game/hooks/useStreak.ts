import { getTodayIST, getYesterdayIST } from "../../../shared/utils/date";

type StreakData = {
  currentStreak: number;
  lastPlayedDate: string;
};

const STORAGE_KEY = "yogal_streak";

function readStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { currentStreak: 0, lastPlayedDate: "" };
    return JSON.parse(raw) as StreakData;
  } catch {
    return { currentStreak: 0, lastPlayedDate: "" };
  }
}

export function getStreak(): StreakData {
  return readStreak();
}

export function updateStreak(): StreakData {
  const today = getTodayIST();
  const yesterday = getYesterdayIST();
  const current = readStreak();

  let newStreak: number;
  if (current.lastPlayedDate === today) {
    newStreak = current.currentStreak;
  } else if (current.lastPlayedDate === yesterday) {
    newStreak = current.currentStreak + 1;
  } else {
    newStreak = 1;
  }

  const updated: StreakData = {
    currentStreak: newStreak,
    lastPlayedDate: today,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
