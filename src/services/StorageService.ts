import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  STATS: '@maisalto:stats',
  PAIN: '@maisalto:pain_map',
  PROFILE: '@maisalto:profile',
  HISTORY: '@maisalto:history_log'
};

export interface UserStats {
  totalWorkouts: number;
  totalTimeMinutes: number;
  lastWorkoutDate: string | null;
}

export interface UserProfile {
  name: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  stonePandasMode: 'None' | 'Visual' | 'Motor';
}

export interface WorkoutSessionLog {
  id: string;
  date: string;
  durationMinutes: number;
  exercisesCount: number;
  exerciseNames: string[];
  rpe: number;
}

export const StorageService = {
  // --- ESTATÍSTICAS ---
  saveStats: async (newStats: UserStats) => {
    try { await AsyncStorage.setItem(KEYS.STATS, JSON.stringify(newStats)); } catch (e) { console.error(e); }
  },
  getStats: async (): Promise<UserStats> => {
    try {
      const json = await AsyncStorage.getItem(KEYS.STATS);
      return json ? JSON.parse(json) : { totalWorkouts: 0, totalTimeMinutes: 0, lastWorkoutDate: null };
    } catch (e) { return { totalWorkouts: 0, totalTimeMinutes: 0, lastWorkoutDate: null }; }
  },

  // --- PERFIL ---
  saveProfile: async (profile: UserProfile) => {
    try { await AsyncStorage.setItem(KEYS.PROFILE, JSON.stringify(profile)); } catch (e) { console.error(e); }
  },
  getProfile: async (): Promise<UserProfile> => {
    try {
      const json = await AsyncStorage.getItem(KEYS.PROFILE);
      return json ? JSON.parse(json) : { name: 'Visitante', level: 'Iniciante', stonePandasMode: 'None' };
    } catch (e) { return { name: 'Visitante', level: 'Iniciante', stonePandasMode: 'None' }; }
  },

  // --- HISTÓRICO ---
  saveSessionLog: async (log: WorkoutSessionLog) => {
    try {
      const existingLogs = await StorageService.getHistory();
      const newHistory = [log, ...existingLogs];
      await AsyncStorage.setItem(KEYS.HISTORY, JSON.stringify(newHistory));
    } catch (e) { console.error(e); }
  },
  getHistory: async (): Promise<WorkoutSessionLog[]> => {
    try {
      const json = await AsyncStorage.getItem(KEYS.HISTORY);
      return json ? JSON.parse(json) : [];
    } catch (e) { return []; }
  },

  registerWorkout: async (durationMinutes: number, exerciseNames: string[], rpe: number) => {
    const currentStats = await StorageService.getStats();
    const newStats = {
      totalWorkouts: currentStats.totalWorkouts + 1,
      totalTimeMinutes: currentStats.totalTimeMinutes + durationMinutes,
      lastWorkoutDate: new Date().toISOString(),
    };
    await StorageService.saveStats(newStats);

    const newLog: WorkoutSessionLog = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      durationMinutes,
      exercisesCount: exerciseNames.length,
      exerciseNames,
      rpe
    };
    await StorageService.saveSessionLog(newLog);

    return newStats;
  },

  hasMorningWorkout: async (): Promise<boolean> => {
    const history = await StorageService.getHistory();
    return history.some(log => {
      const date = new Date(log.date);
      return date.getHours() < 8;
    });
  },

  savePainLevel: async (level: number) => { try { await AsyncStorage.setItem(KEYS.PAIN, level.toString()); } catch (e) {} },
  getPainLevel: async (): Promise<number> => { try { const val = await AsyncStorage.getItem(KEYS.PAIN); return val ? parseInt(val) : 0; } catch (e) { return 0; } },

  // --- NOVO: FUNÇÃO NUCLEAR (RESET TOTAL) ---
  clearAllData: async () => {
    try {
      await AsyncStorage.clear(); // Apaga TUDO do app
    } catch(e) {
      console.error("Erro ao limpar dados", e);
    }
  }
};