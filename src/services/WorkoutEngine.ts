// src/services/WorkoutEngine.ts

// 1. Definição dos Tipos de Dados (O que entra e o que sai)
export interface UserProfile {
  name: string;
  level: 'Novice' | 'Athlete' | 'Health';
  stonePandasProfile: 'None' | 'Visual_B1' | 'Amputee_Lower';
}

export interface PainMap {
  finger_A2: number; // 0 a 10
  shoulder: number;  // 0 a 10
  lowerBack: number; // 0 a 10
}

export interface Exercise {
  id: string;
  name: string;
  type: 'Strength' | 'Mobility' | 'Endurance';
  tags: string[]; // ex: ['Crimp', 'Jump', 'Core']
  videoUrl?: string;
}

// 2. O Banco de Exercícios (Mock do Almanaque)
const EXERCISE_DATABASE: Exercise[] = [
  { id: '1', name: 'Dead Hang (Reglete)', type: 'Strength', tags: ['Crimp', 'Finger'] },
  { id: '2', name: 'Open Hand Hang', type: 'Strength', tags: ['OpenHand', 'Finger'] },
  { id: '3', name: 'Box Jump', type: 'Endurance', tags: ['Jump', 'HighImpact'] },
  { id: '4', name: 'Seated Press', type: 'Strength', tags: ['UpperBody', 'SafeSeated'] },
  { id: '5', name: 'Floor Core', type: 'Mobility', tags: ['Core'] },
];

// 3. O Algoritmo (A Mágica)
export const generateWorkout = (user: UserProfile, pain: PainMap): Exercise[] => {
  let workout = [...EXERCISE_DATABASE]; // Começa com tudo
  const logs: string[] = []; // Para a gente ver o que o algoritmo fez

  // REGRA 1: Protocolo de Dor (The Climbing Doctor)
  // Se a dor na polia A2 for > 4, PROIBIDO fazer Reglete (Crimp)
  if (pain.finger_A2 > 4) {
    workout = workout.filter(ex => !ex.tags.includes('Crimp'));
    logs.push('⚠️ ALERTA DE DOR: Exercícios de "Crimp" removidos (Polia A2 inflamada).');
  }

  // REGRA 2: Acessibilidade (Stone Pandas)
  // Se for Amputado Inferior, substituir Saltos por Press Sentado
  if (user.stonePandasProfile === 'Amputee_Lower') {
    workout = workout.filter(ex => !ex.tags.includes('Jump'));
    logs.push('♿ ADAPTAÇÃO: Saltos removidos para perfil Amputee_Lower.');
  }

  // REGRA 3: Nível do Usuário
  if (user.level === 'Novice') {
    // Iniciantes focam mais em volume/core do que força bruta de dedo
    logs.push('🔰 MODO INICIANTE: Foco ajustado para condicionamento.');
  }

  console.log('LOG DO ALGORITMO:', logs);
  return workout;
};