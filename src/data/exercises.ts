export interface ExerciseData {
  id: string; 
  name: string;
  category: string; 
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  tags: string[];
  
  // CAMPOS DO ALMANAQUE
  definition: string;
  visualLogic: string;
  mentalFocus?: string;
  science?: string;
  variations?: string[];
  safety?: string;
  stonePandasTip?: string;
}

export const EXERCISES: ExerciseData[] = [
  // --- 1. CRIMP ---
  { 
    id: 'crimp', // ID de Texto para facilitar
    name: 'Crimp (Reglete)', 
    category: 'Força',
    level: 'Avançado',
    tags: ['Dedos', 'Polias', 'Tensão'],
    definition: 'Transformar os dedos em garras de aço para dominar bordas minúsculas.',
    visualLogic: 'Imagine que seus dedos são ganchos. Em vez de se pendurar passivamente, você arqueia os dedos criando uma "ponte" tensa.',
    mentalFocus: 'Aceite a tensão. O cérebro quer soltar porque dói, mas a tensão traz segurança.',
    science: 'Mecânica: Efeito Corda de Arco. O Flexor Profundo é o motor principal.',
    variations: ['Half Crimp (90°)', 'Full Crimp (Fechado)', 'Open Crimp (Aberto)'],
    safety: 'ALERTA: Se sentir dor na base do dedo (A2), pare. Evite Full Crimp em treinos.',
    stonePandasTip: 'B1: Use a unha do polegar para medir a profundidade antes de crimpar.',
  },

  // --- 2. JUG ---
  {
    id: 'jug',
    name: 'Jug (Agarrão)',
    category: 'Recuperação',
    level: 'Iniciante',
    tags: ['Descanso', 'Mãos', 'Básico'],
    definition: 'A recompensa: uma agarra tão boa que parece um balde.',
    visualLogic: 'A alça de uma caneca gigante. A gravidade trabalha a seu favor.',
    mentalFocus: 'Celebração e Calma. Respire e baixe a frequência cardíaca.',
    science: 'Preensão Cilíndrica. Exige força muscular mínima.',
    variations: ['Mini-Jug', 'Handle (Alça)'],
    safety: 'Cuidado com "flappers" (arrancar pele) se girar a mão rápido demais.',
  },

  // --- 3. DROP KNEE ---
  { 
    id: 'dropknee', 
    name: 'Drop Knee (Egípcio)', 
    category: 'Técnica',
    level: 'Intermediário',
    tags: ['Quadril', 'Pés', 'Alcance'],
    definition: 'Girar o joelho para dentro para "quebrar" o quadril contra a parede.',
    visualLogic: 'Imagine esmagar um inseto com o dedão do pé enquanto gira o joelho para o chão.',
    mentalFocus: 'Confie na torção. Parece instável, mas trava o corpo na parede.',
    science: 'Vetor de Força: Transforma um puxão vertical em tensão diagonal.',
    variations: ['Deep Drop Knee (Joelho baixo)', 'High Drop Knee'],
    safety: 'Não force se sentir dor no ligamento medial do joelho.',
    stonePandasTip: 'Amputados: Foque na rotação do tronco.',
  },

  // --- 4. FLAGGING ---
  {
    id: 'flag',
    name: 'Flagging (Bandeira)',
    category: 'Equilíbrio',
    level: 'Intermediário',
    tags: ['Core', 'Estabilidade', 'Contrapeso'],
    definition: 'Usar a perna livre como contrapeso para anular o giro.',
    visualLogic: 'Como a cauda de um macaco ou o balancim de um equilibrista.',
    mentalFocus: 'Consciência da perna "morta". Não a deixe solta.',
    science: 'Centro de Gravidade: Manipulação do CG para mantê-lo dentro da base de apoio.',
    variations: ['Outside Flag (Normal)', 'Inside Flag (Cruzada)', 'Back Flag'],
    safety: 'Mantenha o core ativado para não sobrecarregar o ombro de apoio.',
  },

  // --- 5. MANTLE ---
  {
    id: 'mantle',
    name: 'Mantle (Virada)',
    category: 'Força',
    level: 'Avançado',
    tags: ['Tríceps', 'Ombro', 'Topout'],
    definition: 'Sair da piscina. A transição crítica de puxar para empurrar.',
    visualLogic: 'Empurre a borda para baixo até o quadril estar na altura da mão.',
    mentalFocus: 'Comprometimento. A transição exige um movimento explosivo e decisivo.',
    science: 'Cadeia Cinética: Bíceps (Puxada) -> Peitoral/Tríceps (Empurrada).',
    variations: ['Knee Mantle (Usa o joelho)', 'Rockover'],
    safety: 'Cuidado com o ombro na rotação interna.',
  },

  // --- 6. HEEL HOOK ---
  {
    id: 'heel_hook',
    name: 'Heel Hook (Gancho)',
    category: 'Técnica',
    level: 'Intermediário',
    tags: ['Posterior', 'Pés', 'Boulder'],
    definition: 'Transformar a perna em um terceiro braço usando o calcanhar.',
    visualLogic: 'Como fechar uma gaveta puxando com o calcanhar.',
    mentalFocus: 'Intenção. Um calcanhar solto não funciona; tem que puxar ativamente.',
    science: 'Ativação massiva dos Isquiotibiais (Posterior da coxa).',
    variations: ['High Heel', 'Toe-Cam'],
    safety: 'Alto risco para o ligamento do joelho se o pé girar bruscamente.',
  }
];