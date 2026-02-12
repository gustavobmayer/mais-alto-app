import React, { useState, useCallback } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { StorageService, UserStats, UserProfile } from '../services/StorageService';

// Definição da Estrutura da Badge
interface Badge {
  id: string;
  icon: string;
  name: string;
  desc: string;
  unlocked: boolean;
}

export const DashboardScreen = ({ navigation }: any) => {
  const [stats, setStats] = useState<UserStats>({ totalWorkouts: 0, totalTimeMinutes: 0, lastWorkoutDate: null });
  const [profile, setProfile] = useState<UserProfile>({ name: 'Visitante', level: 'Iniciante', stonePandasMode: 'None' });
  const [badges, setBadges] = useState<Badge[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const s = await StorageService.getStats();
    const p = await StorageService.getProfile();
    const hasMorning = await StorageService.hasMorningWorkout();

    setStats(s);
    setProfile(p);

    const calculatedBadges: Badge[] = [
      { 
        id: '1', 
        icon: '🥉', 
        name: 'Primeiro Passo', 
        desc: 'Complete 1 treino', 
        unlocked: s.totalWorkouts >= 1 
      },
      { 
        id: '2', 
        icon: '🔥', 
        name: 'Consistência', 
        desc: 'Complete 3 treinos', 
        unlocked: s.totalWorkouts >= 3 
      },
      { 
        id: '3', 
        icon: '🐼', 
        name: 'Stone Panda', 
        desc: 'Modo Acessibilidade', 
        unlocked: p.stonePandasMode !== 'None' 
      },
      { 
        id: '4', 
        icon: '☀️', 
        name: 'Madrugador', 
        desc: 'Treino antes das 8h', 
        unlocked: hasMorning 
      },
    ];
    
    setBadges(calculatedBadges);
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        
        {/* TOPO: PERFIL + SETTINGS (CONFIGURAÇÕES) */}
        <TopRow>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ flex: 1 }}>
            <Header>
              <View>
                <Greeting>OLÁ, {profile.name.toUpperCase()}</Greeting>
                <Status>Nível: {profile.level.toUpperCase()} • {profile.stonePandasMode !== 'None' ? '🐼 ATIVO' : 'PADRÃO'}</Status>
              </View>
              <AvatarPlaceholder>
                <AvatarText>{profile.name.charAt(0)}</AvatarText>
              </AvatarPlaceholder>
            </Header>
          </TouchableOpacity>
          
          {/* BOTÃO DE SETTINGS (ENGRENAGEM) */}
          <SettingsButton onPress={() => navigation.navigate('Settings')}>
            <SettingsIcon>⚙️</SettingsIcon>
          </SettingsButton>
        </TopRow>

        {/* ÁREA DE BADGES INTELIGENTES */}
        <SectionTitle>SUAS CONQUISTAS ({badges.filter(b => b.unlocked).length}/{badges.length})</SectionTitle>
        <BadgeScroll horizontal showsHorizontalScrollIndicator={false}>
          {badges.map((badge) => (
            <BadgeCard key={badge.id} unlocked={badge.unlocked}>
              <BadgeIcon unlocked={badge.unlocked}>
                {badge.unlocked ? badge.icon : '🔒'}
              </BadgeIcon>
              <BadgeName>{badge.name}</BadgeName>
              {!badge.unlocked && <BadgeDesc>{badge.desc}</BadgeDesc>}
            </BadgeCard>
          ))}
        </BadgeScroll>

        {/* MENU */}
        <SectionTitle>O QUE VAMOS FAZER?</SectionTitle>
        <Card>
          <ActionRow>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Button title="NOVO TREINO" onPress={() => navigation.navigate('Generator')} />
            </View>
            <View style={{ flex: 1 }}>
              <Button title="SEGURANÇA" variant="secondary" onPress={() => navigation.navigate('Waiver')} />
            </View>
          </ActionRow>
          <Button 
            title="DIÁRIO DE TREINOS" 
            variant="secondary"
            onPress={() => navigation.navigate('History')} 
          />
        </Card>

        {/* ESTATÍSTICAS COM BOTÃO DE DETALHES */}
        <TouchableOpacity onPress={() => navigation.navigate('Statistics')}>
          <SectionTitle style={{ marginTop: 20, color: '#00cdcd', textDecorationLine: 'underline' }}>
            VER ANÁLISE COMPLETA ➔
          </SectionTitle>
        </TouchableOpacity>

        <StatsRow>
          <StatBox>
            <StatValue>{stats.totalWorkouts}</StatValue>
            <StatLabel>TREINOS</StatLabel>
          </StatBox>
          <StatBox>
            <StatValue>{stats.totalTimeMinutes}m</StatValue>
            <StatLabel>TEMPO TOTAL</StatLabel>
          </StatBox>
          <StatBox>
            <StatValue>{profile.stonePandasMode === 'None' ? 'OFF' : 'ON'}</StatValue>
            <StatLabel>PANDA MODE</StatLabel>
          </StatBox>
        </StatsRow>

      </ScrollView>
    </Container>
  );
};

// ESTILOS
const Container = styled(SafeAreaView)<any>` flex: 1; background-color: ${(props: any) => props.theme.COLORS.BACKGROUND}; `;

// Estilos do Topo (Header + Settings)
const TopRow = styled.View` flex-direction: row; align-items: center; gap: 10px; margin-bottom: 20px; `;
const SettingsButton = styled.TouchableOpacity<any>` width: 50px; height: 75px; justify-content: center; align-items: center; margin-bottom: 20px; border-left-width: 1px; border-left-color: rgba(255,255,255,0.1);`;
const SettingsIcon = styled.Text` font-size: 24px; color: #FFF; opacity: 0.5; `;

const Header = styled.View<any>` border-bottom-width: 1px; border-bottom-color: ${(props: any) => props.theme.COLORS.SURFACE_LIGHT}; padding-bottom: 20px; flex-direction: row; justify-content: space-between; align-items: center; `;
const Greeting = styled.Text<any>` color: #FFF; font-family: ${(props: any) => props.theme.FONTS.BOLD}; font-size: 20px; width: 200px;`;
const Status = styled.Text<any>` color: ${(props: any) => props.theme.COLORS.PRIMARY}; font-family: ${(props: any) => props.theme.FONTS.REGULAR}; letter-spacing: 1px; font-size: 10px; margin-top: 4px; `;
const AvatarPlaceholder = styled.View<any>` width: 50px; height: 50px; border-radius: 25px; background-color: ${(props: any) => props.theme.COLORS.SURFACE_LIGHT}; border: 1px solid ${(props: any) => props.theme.COLORS.PRIMARY}; align-items: center; justify-content: center; `;
const AvatarText = styled.Text<any>` color: #FFF; font-weight: bold; font-size: 20px; `;

const SectionTitle = styled.Text<any>` color: ${(props: any) => props.theme.COLORS.TEXT_SECONDARY}; font-family: ${(props: any) => props.theme.FONTS.BOLD}; font-size: 14px; margin-bottom: 12px; letter-spacing: 1px; `;
const BadgeScroll = styled.ScrollView` margin-bottom: 30px; `;

const BadgeCard = styled.View<{ unlocked: boolean }>` 
  background-color: ${({ unlocked, theme }: any) => unlocked ? theme.COLORS.SURFACE : 'rgba(255,255,255,0.05)'}; 
  width: 110px; 
  height: 130px; 
  margin-right: 12px; 
  border-radius: 12px; 
  align-items: center; 
  justify-content: center; 
  border: 1px solid ${({ unlocked, theme }: any) => unlocked ? theme.COLORS.SURFACE_LIGHT : 'transparent'};
  opacity: ${({ unlocked }: any) => unlocked ? 1 : 0.6};
`;

const BadgeIcon = styled.Text<{ unlocked: boolean }>` 
  font-size: 32px; 
  margin-bottom: 8px;
  opacity: ${({ unlocked }: any) => unlocked ? 1 : 0.5};
`;

const BadgeName = styled.Text` color: #FFF; font-size: 10px; text-align: center; font-weight: bold; `;
const BadgeDesc = styled.Text` color: #888; font-size: 8px; text-align: center; margin-top: 4px; padding: 0 4px;`;

const ActionRow = styled.View` flex-direction: row; justify-content: space-between; `;
const StatsRow = styled.View` flex-direction: row; justify-content: space-between; margin-top: 20px; `;
const StatBox = styled.View<any>` background-color: ${(props: any) => props.theme.COLORS.SURFACE_LIGHT}; width: 30%; padding: 16px; border-radius: 8px; align-items: center; `;
const StatValue = styled.Text<any>` color: ${(props: any) => props.theme.COLORS.PRIMARY}; font-size: 20px; font-weight: bold; `;
const StatLabel = styled.Text` color: #888; font-size: 8px; margin-top: 4px; `;