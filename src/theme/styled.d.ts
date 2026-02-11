// src/theme/styled.d.ts
import 'styled-components/native';
import theme from './index';

// Pega o "formato" (tipo) do nosso objeto de tema
type ThemeType = typeof theme;

// E "injeta" esse formato dentro da biblioteca styled-components
declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeType {}
}