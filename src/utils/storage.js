// Storage Utility for Angle Adventure
const STORAGE_KEY = 'angle_adventure_data_v1';

const defaultData = {
  studentName: '',
  companion: 'kiki', // 'kiki' or 'lala'
  score: 0,
  completedMissions: [], // [1, 2, 3, 4, 5, 6, 'final']
  badges: [], // ['shape-explorer', ...]
  currentMissionIndex: 1,
  quizAnswers: {},
  review: null,
  audioSettings: {
    bgmEnabled: true,
    sfxEnabled: true,
    voiceEnabled: true,
    volume: 0.6
  },
  lastUpdated: null
};

export const loadAppData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultData };
    const parsed = JSON.parse(raw);
    return { ...defaultData, ...parsed };
  } catch (e) {
    console.error('Error loading storage data', e);
    return { ...defaultData };
  }
};

export const saveAppData = (data) => {
  try {
    const toSave = {
      ...data,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    return true;
  } catch (e) {
    console.error('Error saving storage data', e);
    return false;
  }
};

export const resetProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    console.error('Error resetting progress', e);
    return false;
  }
};
