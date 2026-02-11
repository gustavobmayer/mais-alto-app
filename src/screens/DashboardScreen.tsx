import React from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

// Mock das Conquistas (Gamificação)
const BADGES = [
  { id: 1, icon: '🦅', name: 'Early Bird', desc: 'Treinou antes das 7am' },
  { id: 2, icon: '🔥', name: 'On Fire', desc: '5 dias seguidos' },
  { id: 3, icon: '🐼', name: 'Stone Panda', desc: 'Acessibilidade Ativa' },
];

export const DashboardScreen = ({ navigation }: any) => {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        
        {/* 1. Header de Boas Vindas */}
        <Header>
          <Greeting>OLÁ, GUSTAVO</Greeting>
          <Status>Nível: ATLETA PRO</Status>
        </Header>

        {/* 2. Área de Gamificação (Badges) */}
        <SectionTitle>SUAS CONQUISTAS</SectionTitle>
        <BadgeScroll horizontal showsHorizontalScrollIndicator={false}>
          {BADGES.map((badge) => (
            <BadgeCard key={badge.id}>
              <BadgeIcon>{badge.icon}</BadgeIcon>
              <BadgeName>{badge.name}</BadgeName>
            </BadgeCard>
          ))}
        </BadgeScroll>

        {/* 3. Menu de Ações (Navegação) */}
        <SectionTitle>O QUE VAMOS FAZER?</SectionTitle>
        
        <Card>
          <ActionRow>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Button 
                title="NOVO TREINO" 
                onPress={() => navigation.navigate('Generator')} 
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button 
                title="SEGURANÇA" 
                variant="secondary"
                onPress={() => navigation.navigate('Waiver')} 
              />
            </View>
          </ActionRow>
          
          <Button 
            title="ÚLTIMA SESSÃO" 
            variant="secondary"
            onPress={() => navigation.navigate('Session')} 
          />
        </Card>

        {/* 4. Estatísticas Rápidas */}
        <StatsRow>
          <StatBox>
            <StatValue>12</StatValue>
            <StatLabel>TREINOS</StatLabel>
          </StatBox>
          <StatBox>
            <StatValue>4h</StatValue>
            <StatLabel>TEMPO TOTAL</StatLabel>
          </StatBox>
          <StatBox>
            <StatValue>A2</StatValue>
            <StatLabel>PONTO DOR</StatLabel>
          </StatBox>
        </StatsRow>

      </ScrollView>
    </Container>
  );
};

// Estilização "Elite"
const Container = styled(SafeAreaView)<any>`
  flex: 1;
  background-color: ${(props: any) => props.theme.COLORS.BACKGROUND};
`;

const Header = styled.View`
  margin-bottom: 30px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props: any) => props.theme.COLORS.SURFACE_LIGHT};
  padding-bottom: 20px;
`;

const Greeting = styled.Text<any>`
  color: #FFF;
  font-family: ${(props: any) => props.theme.FONTS.BOLD};
  font-size: 28px;
`;

const Status = styled.Text<any>`
  color: ${(props: any) => props.theme.COLORS.PRIMARY};
  font-family: ${(props: any) => props.theme.FONTS.REGULAR};
  letter-spacing: 2px;
  font-size: 12px;
  margin-top: 4px;
`;

const SectionTitle = styled.Text<any>`
  color: ${(props: any) => props.theme.COLORS.TEXT_SECONDARY};
  font-family: ${(props: any) => props.theme.FONTS.BOLD};
  font-size: 14px;
  margin-bottom: 12px;
  letter-spacing: 1px;
`;

const BadgeScroll = styled.ScrollView`
  margin-bottom: 30px;
`;

const BadgeCard = styled.View<any>`
  background-color: ${(props: any) => props.theme.COLORS.SURFACE};
  width: 100px;
  height: 120px;
  margin-right: 12px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props: any) => props.theme.COLORS.SURFACE_LIGHT};
`;

const BadgeIcon = styled.Text`
  font-size: 32px;
  margin-bottom: 8px;
`;

const BadgeName = styled.Text`
  color: #FFF;
  font-size: 10px;
  text-align: center;
`;

const ActionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StatsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const StatBox = styled.View<any>`
  background-color: ${(props: any) => props.theme.COLORS.SURFACE_LIGHT};
  width: 30%;
  padding: 16px;
  border-radius: 8px;
  align-items: center;
`;

const StatValue = styled.Text<any>`
  color: ${(props: any) => props.theme.COLORS.PRIMARY};
  font-size: 20px;
  font-weight: bold;
`;

const StatLabel = styled.Text`
  color: #888;
  font-size: 8px;
  margin-top: 4px;
`;