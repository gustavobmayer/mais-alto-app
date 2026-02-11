import styled from 'styled-components/native';

export const Card = styled.View`
  background-color: ${({ theme }) => theme.COLORS.SURFACE};
  padding: ${({ theme }) => theme.SIZES.MD}px;
  border-radius: ${({ theme }) => theme.BORDERS.RADIUS_MD}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.SURFACE_LIGHT};
  margin-bottom: ${({ theme }) => theme.SIZES.MD}px;
  width: 100%;
  
  /* Sombra sutil para dar profundidade */
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4.65px;
  elevation: 8; 
`;

export const CardTitle = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BOLD};
  font-size: 18px;
  color: ${({ theme }) => theme.COLORS.TEXT_PRIMARY};
  margin-bottom: ${({ theme }) => theme.SIZES.SM}px;
`;

export const CardText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.TEXT_SECONDARY};
  line-height: 22px;
`;