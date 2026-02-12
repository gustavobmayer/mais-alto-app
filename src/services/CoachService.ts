import { StorageService, WorkoutSessionLog } from './StorageService';
import { EXERCISES, ExerciseData } from '../data/exercises';

export type TrainingStrategy = 'RECOVERY' | 'MAINTENANCE' | 'OVERLOAD';

interface CoachPrescription {
  strategy: TrainingStrategy;
  message: string;
  color: string;
  restModifier: number;
  volumeModifier: number;
}

// BANCO DE DADOS DE ATIVAÇÃO (AQUECIMENTO)
const WARMUP_DB = [
  { id: 'w1', name: 'Polichinelos', category: 'Warmup', tags: ['Cardio'], duration: 45, rest: 10 },
  { id: 'w2', name: 'Rotação de Ombros', category: 'Warmup', tags: ['Mobility'], duration: 30, rest: 0 },
  { id: 'w3', name: 'Tendon Gliding (Mãos)', category: 'Warmup', tags: ['Finger'], duration: 30, rest: 10 }, // Para quem tem dor
];

// BANCO DE DADOS DE COMPENSAÇÃO (DESAQUECIMENTO)
const COOLDOWN_DB = [
  { id: 'c1', name: 'Alongamento de Antebraço', category: 'Cooldown', tags: ['Stretch'], duration: 45, rest: 0 },
  { id: 'c2', name: 'Respiração Box Breathing', category: 'Cooldown', tags: ['Mindset'], duration: 60, rest: 0 },
];

export const CoachService = {
  analyzeReadiness: async (): Promise<CoachPrescription> => {
    const history = await StorageService.getHistory();
    
    if (history.length === 0) {
      return { strategy: 'MAINTENANCE', message: 'Estabelecendo base.', color: '#00cdcd', restModifier: 1, volumeModifier: 0 };
    }

    const lastSession = history[0];
    const lastRPE = lastSession.rpe || 5;
    const daysSinceLastWorkout = (new Date().getTime() - new Date(lastSession.date).getTime()) / (1000 * 3600 * 24);

    if (lastRPE >= 8) {
      if (daysSinceLastWorkout < 2) {
        return { strategy: 'RECOVERY', message: 'Foco em recuperação ativa.', color: '#44FF44', restModifier: 1.5, volumeModifier: -2 };
      }
    }

    if (lastRPE <= 4 && daysSinceLastWorkout >= 1) {
      return { strategy: 'OVERLOAD', message: 'Aumentando a intensidade.', color: '#FF4444', restModifier: 0.8, volumeModifier: 0 };
    }

    return { strategy: 'MAINTENANCE', message: 'Progressão padrão.', color: '#00cdcd', restModifier: 1, volumeModifier: 0 };
  },

  // AQUI A MÁGICA ACONTECE: O SANDUÍCHE
  applyStrategy: async (originalList: ExerciseData[], prescription: CoachPrescription): Promise<any[]> => {
    let mainBlock = [...originalList];

    // 1. Ajuste de Volume no Bloco Principal
    if (prescription.volumeModifier < 0) {
      mainBlock = mainBlock.slice(0, mainBlock.length + prescription.volumeModifier);
    }

    // 2. Transforma o Bloco Principal em formato de Sessão
    const formattedMain = mainBlock.map(ex => {
      let baseDuration = ex.category === 'Força' ? 10 : 30;
      let baseRest = ex.category === 'Força' ? 45 : 30;
      const adaptedRest = Math.ceil(baseRest * prescription.restModifier);

      return {
        id: ex.id,
        name: ex.name,
        category: 'Main', // Marcamos como bloco principal
        phaseColor: '#00cdcd', // Ciano (Foco)
        duration: baseDuration,
        rest: adaptedRest
      };
    });

    // 3. Injeção de Aquecimento (Contextual)
    const painLevel = await StorageService.getPainLevel();
    const warmup = [];
    
    // Sempre adiciona cardio leve
    warmup.push({ ...WARMUP_DB[0], category: 'Warmup', phaseColor: '#FFA500' }); // Laranja
    
    // Se tiver dor no dedo, adiciona Tendon Gliding
    if (painLevel > 3) {
      warmup.push({ ...WARMUP_DB[2], category: 'Warmup', phaseColor: '#FFA500' });
    } else {
      warmup.push({ ...WARMUP_DB[1], category: 'Warmup', phaseColor: '#FFA500' });
    }

    // 4. Injeção de Cool-down
    const cooldown = [
      { ...COOLDOWN_DB[0], category: 'Cooldown', phaseColor: '#9370DB' } // Roxo
    ];

    // RETORNA A SESSÃO COMPLETA: Warmup -> Main -> Cooldown
    return [...warmup, ...formattedMain, ...cooldown];
  }
};