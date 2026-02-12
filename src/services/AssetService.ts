// src/services/AssetService.ts

// 1. PLACEHOLDER DE SEGURANÇA (Deve ser uma imagem que existe, ex: crimp.png)
const PLACEHOLDER = require('../assets/infographics/crimp.png'); 

// 2. MAPEAMENTO REAL
// Se você tem o arquivo, remova o "//" do início da linha.

const ASSETS_DB: Record<string, any> = {
  // --- PEGADAS ---
  '1': PLACEHOLDER,
  'crimp': PLACEHOLDER, // Se tiver: require('../assets/infographics/crimp.png'),

  'jug': PLACEHOLDER, // require('../assets/infographics/jug.png'),
  'sloper': PLACEHOLDER, // require('../assets/infographics/sloper.png'),
  'pinch': PLACEHOLDER, // require('../assets/infographics/pinch.png'),
  'pocket': PLACEHOLDER, // require('../assets/infographics/pocket.png'),

  // --- MOVIMENTOS (Nomes corrigidos: tudo junto, sem underline) ---
  '2': PLACEHOLDER, 
  'dropknee': PLACEHOLDER, // require('../assets/infographics/dropknee.png'),

  '4': PLACEHOLDER,
  'flag': PLACEHOLDER, // require('../assets/infographics/flag.png'),

  '5': PLACEHOLDER,
  'mantle': PLACEHOLDER, // require('../assets/infographics/mantle.png'),

  'heel_hook': PLACEHOLDER, // require('../assets/infographics/heelhook.png'),
  'toe_hook': PLACEHOLDER, // require('../assets/infographics/toehook.png'),
  'dyno': PLACEHOLDER, // require('../assets/infographics/dyno.png'),
  'gaston': PLACEHOLDER, // require('../assets/infographics/gaston.png'),
  'undercling': PLACEHOLDER, // require('../assets/infographics/undercling.png'),

  // --- AQUECIMENTO ---
  'w1': PLACEHOLDER, // require('../assets/infographics/warmup.png'),
  'w2': PLACEHOLDER,
  'c1': PLACEHOLDER, // require('../assets/infographics/cooldown.png'),
};

export const AssetService = {
  getImage: (id: string) => {
    // Tenta achar imagem específica, senão usa o Placeholder
    return ASSETS_DB[id] || PLACEHOLDER;
  }
};