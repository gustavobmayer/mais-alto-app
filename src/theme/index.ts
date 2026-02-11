// src/theme/index.ts

export default {
  COLORS: {
    // BACKGROUNDS
    BACKGROUND: '#142332',      // Deep Navy
    SURFACE: '#1c2e40',         // Glassmorphism Base
    SURFACE_LIGHT: '#263b52',   // Elementos secundários
    
    // BRANDING
    PRIMARY: '#00cdcd',         // Neon Cyan
    SECONDARY: '#00a8a8',       // Variação ativa
    
    // TEXTO
    TEXT_PRIMARY: '#ebebeb',    // Off-white
    TEXT_SECONDARY: '#6e8296',  // Legendas
    TEXT_HIGHLIGHT: '#ffffff',  // Branco Puro
    
    // FEEDBACK
    DANGER: '#ef4444',          // Erro/Dor
    WARNING: '#f59e0b',         // Atenção
    SUCCESS: '#10b981',         // Sucesso
  },
  
  FONTS: {
    REGULAR: 'Montserrat_400Regular',
    MEDIUM: 'Montserrat_500Medium', // Adicionado
    BOLD: 'Montserrat_700Bold',
    LIGHT: 'Montserrat_300Light',
  },

  // ADICIONADO AGORA PARA CORRIGIR O ERRO
  SIZES: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
    XXL: 48,
  },
  
  BORDERS: {
    RADIUS_SM: 8,
    RADIUS_MD: 12,
    RADIUS_LG: 20,
    RADIUS_FULL: 99,
  }
};