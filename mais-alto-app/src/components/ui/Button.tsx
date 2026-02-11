import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';

// Interface das props do Botão (O que ele recebe de fora)
interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  icon?: React.ReactNode;
}

// Interface de Estilo (O que o Styled Components recebe)
// Dica: 'any' aqui é um "truque" temporário seguro para destravar seu progresso 
// se o TypeScript estiver muito restritivo com o tema.
interface StyledProps {
  variant?: string;
  theme?: any; 
  disabled?: boolean;
}

export const Button = ({ title, variant = 'primary', loading, icon, ...rest }: ButtonProps) => {
  // Acessamos o tema via contexto dentro do styled-component, não precisamos importar aqui
  
  return (
    <Container variant={variant} disabled={loading} {...rest}>
      {loading ? (
        // No loading, usamos uma cor fixa ou condicional simples
        <ActivityIndicator color="#FFF" />
      ) : (
        <Content>
          {icon && <IconWrapper>{icon}</IconWrapper>}
          <Title variant={variant}>{title.toUpperCase()}</Title>
        </Content>
      )}
    </Container>
  );
};

const Container = styled.TouchableOpacity<StyledProps>`
  width: 100%;
  height: 56px;
  background-color: ${({ variant, theme }) => 
    variant === 'primary' ? theme.COLORS.PRIMARY : 
    variant === 'danger' ? theme.COLORS.DANGER : 'transparent'};
  border-width: ${({ variant }) => variant === 'secondary' ? '2px' : '0px'};
  border-color: ${({ variant, theme }) => variant === 'secondary' ? theme.COLORS.TEXT_SECONDARY : 'transparent'};
  border-radius: ${({ theme }) => theme.BORDERS.RADIUS_MD}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  margin-bottom: ${({ theme }) => theme.SIZES.MD}px;
`;

const Title = styled.Text<StyledProps>`
  font-family: ${({ theme }) => theme.FONTS.BOLD};
  font-size: 16px;
  color: ${({ variant, theme }) => 
    variant === 'primary' ? theme.COLORS.BACKGROUND : theme.COLORS.TEXT_PRIMARY};
  letter-spacing: 1px;
`;

const Content = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconWrapper = styled.View`
  margin-right: 8px;
`;