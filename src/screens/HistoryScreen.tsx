import React, { useState, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StorageService, WorkoutSessionLog } from '../services/StorageService';

export const HistoryScreen = () => {
  const [history, setHistory] = useState<WorkoutSessionLog[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const loadHistory = async () => {
    const data = await StorageService.getHistory();
    setHistory(data);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  // Função para cor do RPE
  const getRpeColor = (rpe: number = 0) => {
    if (rpe <= 4) return '#44FF44'; // Verde
    if (rpe <= 7) return '#FFFF44'; // Amarelo
    return '#FF4444'; // Vermelho
  };

  const renderItem = ({ item }: { item: WorkoutSessionLog }) => (
    <HistoryCard>
      <DateBadge>
        <DateText>{formatDate(item.date).split(',')[0]}</DateText>
        <TimeText>{formatDate(item.date).split(',')[1]}</TimeText>
      </DateBadge>
      
      <Content>
        <HeaderRow>
          <Title>Treino Completo</Title>
          {/* Badge de RPE se existir */}
          {item.rpe && (
            <RpeBadge color={getRpeColor(item.rpe)}>
              <RpeText>RPE {item.rpe}</RpeText>
            </RpeBadge>
          )}
        </HeaderRow>
        
        <Subtitle>{item.exercisesCount} Exercícios • {item.durationMinutes} min</Subtitle>
        <Details numberOfLines={1}>
          {item.exerciseNames.join(', ')}
        </Details>
      </Content>
      
      <StatusIcon>✅</StatusIcon>
    </HistoryCard>
  );

  return (
    <Container>
      <Header>DIÁRIO DE BORDO</Header>
      
      {history.length === 0 ? (
        <EmptyState>
          <EmptyText>Nenhum treino registrado.</EmptyText>
          <EmptySubText>Complete uma sessão para ver aqui.</EmptySubText>
        </EmptyState>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 24 }}
        />
      )}
    </Container>
  );
};

// Estilos
const Container = styled(SafeAreaView)<any>` flex: 1; background-color: ${(props: any) => props.theme.COLORS.BACKGROUND}; `;
const Header = styled.Text<any>` font-family: ${(props: any) => props.theme.FONTS.BOLD}; font-size: 20px; color: ${(props: any) => props.theme.COLORS.PRIMARY}; text-align: center; margin-bottom: 10px; border-bottom-width: 1px; border-bottom-color: rgba(255,255,255,0.1); padding-bottom: 16px;`;
const HistoryCard = styled.View<any>` background-color: ${(props: any) => props.theme.COLORS.SURFACE}; flex-direction: row; border-radius: 12px; margin-bottom: 12px; overflow: hidden; border-right-width: 4px; border-right-color: ${(props: any) => props.theme.COLORS.SUCCESS}; `;
const DateBadge = styled.View<any>` background-color: ${(props: any) => props.theme.COLORS.SURFACE_LIGHT}; padding: 12px; align-items: center; justify-content: center; width: 70px; `;
const DateText = styled.Text<any>` color: ${(props: any) => props.theme.COLORS.TEXT_PRIMARY}; font-weight: bold; font-size: 12px; `;
const TimeText = styled.Text<any>` color: ${(props: any) => props.theme.COLORS.TEXT_SECONDARY}; font-size: 10px; margin-top: 4px; `;
const Content = styled.View` flex: 1; padding: 12px; justify-content: center; `;
const HeaderRow = styled.View` flex-direction: row; align-items: center; justify-content: space-between; `;
const Title = styled.Text<any>` color: #FFF; font-weight: bold; font-size: 14px; `;
const Subtitle = styled.Text<any>` color: ${(props: any) => props.theme.COLORS.PRIMARY}; font-size: 10px; margin-top: 2px; font-weight: bold;`;
const Details = styled.Text<any>` color: ${(props: any) => props.theme.COLORS.TEXT_SECONDARY}; font-size: 10px; margin-top: 4px; `;
const StatusIcon = styled.Text` padding: 12px; align-self: center; `;
const EmptyState = styled.View` flex: 1; justify-content: center; align-items: center; opacity: 0.5; margin-top: 50px; `;
const EmptyText = styled.Text<any>` color: #FFF; font-size: 18px; font-weight: bold; `;
const EmptySubText = styled.Text<any>` color: #AAA; font-size: 12px; margin-top: 8px; `;

// Estilos novos para RPE
const RpeBadge = styled.View<{ color: string }>` 
  background-color: transparent; 
  border: 1px solid ${(props: any) => props.color};
  padding: 2px 6px; 
  border-radius: 4px; 
`;
const RpeText = styled.Text` color: #FFF; font-size: 8px; font-weight: bold; `;