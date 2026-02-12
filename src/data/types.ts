export interface LocalizedContent {
  pt: string;
  en: string;
}

export interface ExerciseDataV2 {
  id: string;
  
  names: LocalizedContent;
  tags: string[];
  // ADICIONADO: 'Todos' para exercícios mentais/gerais
  level: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Elite' | 'Todos'; 
  
  intro: LocalizedContent;
  description: LocalizedContent;
  
  variations?: LocalizedContent;
  
  anatomy?: LocalizedContent;
  physiology?: LocalizedContent;
  biomechanics?: LocalizedContent;
  
  safety: LocalizedContent; // Este campo é obrigatório!
  stonePandas?: LocalizedContent;
}