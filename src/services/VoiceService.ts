import * as Speech from 'expo-speech';

// Configuração padrão
const OPTIONS = {
  language: 'pt-BR', // Força português
  pitch: 1.0,        // Tom normal
  rate: 0.9,         // Um pouco mais lento para clareza
};

export const VoiceService = {
  // Fala uma frase
  speak: (text: string) => {
    // Para qualquer fala anterior para não encavalar
    Speech.stop();
    Speech.speak(text, OPTIONS);
  },

  // Fala o nome do exercício e a duração
  announceExercise: (name: string, duration: number) => {
    Speech.stop();
    // Ex: "Próximo: Dead Hang. 10 segundos."
    const text = `Próximo: ${name}. ${duration} segundos.`;
    Speech.speak(text, OPTIONS);
  },

  // Contagem regressiva
  countdown: (num: number) => {
    Speech.speak(num.toString(), { ...OPTIONS, rate: 1.1 }); // Um pouco mais rápido
  },

  stop: () => {
    Speech.stop();
  }
};