import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = ({ title, variant = 'primary', loading, icon, ...rest }: ButtonProps) => {
  return (
    <Container variant={variant} disabled={loading} {...rest}>
      {loading ? (
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

// AQUI ESTÁ A CORREÇÃO: Usamos (props: any) para eliminar o erro de tipagem estrita
const Container = styled.TouchableOpacity<any>`
  width: 100%;
  height: 56px;
  background-color: ${(props: any) => 
    props.variant === 'primary' ? props.theme.COLORS.PRIMARY : 
    props.variant === 'danger' ? props.theme.COLORS.DANGER : 'transparent'};
  border-width: ${(props: any) => props.variant === 'secondary' ? '2px' : '0px'};
  border-color: ${(props: any) => props.variant === 'secondary' ? props.theme.COLORS.TEXT_SECONDARY : 'transparent'};
  border-radius: ${(props: any) => props.theme.BORDERS.RADIUS_MD}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  opacity: ${(props: any) => (props.disabled ? 0.7 : 1)};
  margin-bottom: ${(props: any) => props.theme.SIZES.MD}px;
`;

const Title = styled.Text<any>`
  font-family: ${(props: any) => props.theme.FONTS.BOLD};
  font-size: 16px;
  color: ${(props: any) => 
    props.variant === 'primary' ? props.theme.COLORS.BACKGROUND : props.theme.COLORS.TEXT_PRIMARY};
  letter-spacing: 1px;
`;

const Content = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconWrapper = styled.View`
  margin-right: 8px;
`;