import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/ui/Button';
import { Card, CardTitle } from '../components/ui/Card';
import { EXERCISES_V2 } from '../data/exercises'; // Fonte V2
import { CoachService } from '../services/CoachService';
import { ExerciseDataV2 } from '../data/types';

export const GeneratorScreen = ({ navigation }: any) => {
  const [painLevel, setPainLevel] = useState(0); 
  const [isAmputee, setIsAmputee] = useState(false);
  
  const [generatedWorkout, setWorkout] = useState<any[]>([]);
  const [coachStrategy, setCoachStrategy] = useState<any>(null);
  const lang = 'pt';

  const handleGenerate = async () => {
    // 1. Coach define a estratégia
    const prescription = await CoachService.analyzeReadiness();
    setCoachStrategy(prescription);

    // 2. Filtro de Segurança
    let filteredList = [...EXERCISES_V2];
    
    // Filtro básico de dor (futuramente será mais complexo)
    if (painLevel > 4) {
      // Remove exercícios de "Crimp" ou dedo intenso
      filteredList = filteredList.filter(ex => !ex.tags.includes('Dedos'));
    }

    // 3. O Coach monta a sessão (Atenção: CoachService precisa ser atualizado depois para entender V2)
    // Por enquanto, vamos fazer uma adaptação manual simples para exibir a lista
    const session = filteredList.map(ex => ({
        ...ex,
        // Adaptamos para o formato que a Tela de Sessão espera (flat)
        name: ex.names[lang], 
        category: ex.tags[0] || 'Geral',
        duration: 30, // Padrão
        rest: 30,     // Padrão
        phaseColor: '#00cdcd'
    }));
    
    setWorkout(session);
  };

  const startSession = () => {
    if (generatedWorkout.length === 0) return;
    navigation.navigate('Session', { workout: generatedWorkout });
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Header>COACH V2</Header>
        
        <Card>
          <CardTitle>Check-in</CardTitle>
          <Label>Nível de Dor: <Value>{painLevel}</Value></Label>
          <Row>
            <MiniButton onPress={() => setPainLevel(Math.max(0, painLevel - 1))}>-</MiniButton>
            <MiniButton onPress={() => setPainLevel(Math.min(10, painLevel + 1))}>+</MiniButton>
          </Row>
          <Button 
            title={isAmputee ? "Perfil: Amputado" : "Perfil: Padrão"} 
            variant="secondary"
            onPress={() => setIsAmputee(!isAmputee)}
          />
          <Button title="GERAR TREINO" onPress={handleGenerate} />
        </Card>

        {/* ESTRATÉGIA DO COACH */}
        {coachStrategy && generatedWorkout.length > 0 && (
          <CoachCard color={coachStrategy.color}>
            <CoachTitle style={{ color: coachStrategy.color }}>
              {coachStrategy.strategy === 'RECOVERY' ? '🍃 RECUPERAÇÃO' : '🔥 TREINO TÉCNICO'}
            </CoachTitle>
            <CoachText>{coachStrategy.message}</CoachText>
          </CoachCard>
        )}

        {/* LISTA DE EXERCÍCIOS */}
        {generatedWorkout.length > 0 && (
          <>
            <Title>Sessão Gerada</Title>
            <Button title="▶  INICIAR" variant="primary" onPress={startSession} />
            
            {generatedWorkout.map((ex: any, index: number) => (
              <TouchableOpacity 
                key={index}
                onPress={() => navigation.navigate('ExerciseDetail', { exercise: ex })}
              >
                <ExerciseCard>
                  <ExerciseHeader>
                    <ExerciseName>{ex.names ? ex.names[lang] : ex.name}</ExerciseName>
                    <LevelBadge>{ex.level}</LevelBadge>
                  </ExerciseHeader>
                  <Tags>{ex.tags ? ex.tags.join(' • ') : 'Geral'}</Tags>
                  <Arrow>➔</Arrow>
                </ExerciseCard>
              </TouchableOpacity>
            ))}
          </>
        )}

      </ScrollView>
    </Container>
  );
};

// Estilos
const Container = styled(SafeAreaView)<any>` flex: 1; background-color: ${(props: any) => props.theme.COLORS.BACKGROUND}; `;
const Header = styled.Text<any>` font-family: ${(props: any) => props.theme.FONTS.BOLD}; font-size: 24px; color: ${(props: any) => props.theme.COLORS.PRIMARY}; text-align: center; margin-bottom: 20px; `;
const Label = styled.Text<any>` color: ${(props: any) => props.theme.COLORS.TEXT_PRIMARY}; margin-bottom: 8px; font-size: 16px; `;
const Value = styled.Text<any>` color: ${(props: any) => props.theme.COLORS.DANGER}; font-weight: bold; `;
const Row = styled.View` flex-direction: row; margin-bottom: 16px; gap: 10px; `;
const MiniButton = styled.Text<any>` background-color: ${(props: any) => props.theme.COLORS.SURFACE_LIGHT}; color: #FFF; padding: 10px 20px; border-radius: 8px; font-size: 20px; overflow: hidden; `;
const Title = styled.Text` color: #FFF; font-size: 18px; margin: 20px 0 10px; font-weight: bold; `;

const ExerciseCard = styled.View<any>` background-color: ${(props: any) => props.theme.COLORS.SURFACE}; padding: 16px; border-radius: 8px; margin-bottom: 8px; border-left-width: 4px; border-left-color: ${(props: any) => props.theme.COLORS.PRIMARY}; position: relative; `;
const ExerciseHeader = styled.View` flex-direction: row; justify-content: space-between; align-items: center; `;
const ExerciseName = styled.Text` color: #FFF; font-weight: bold; font-size: 16px; `;
const LevelBadge = styled.Text<any>` color: ${(props: any) => props.theme.COLORS.TEXT_SECONDARY}; font-size: 10px; background-color: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; `;
const Tags = styled.Text` color: #888; font-size: 12px; margin-top: 4px; `;
const Arrow = styled.Text<any>` position: absolute; right: 16px; bottom: 16px; color: ${(props: any) => props.theme.COLORS.PRIMARY}; font-size: 20px; `;

const CoachCard = styled.View<{ color: string }>` background-color: rgba(0,0,0,0.3); border: 1px solid ${(props: any) => props.color}; padding: 16px; border-radius: 12px; margin-top: 20px; `;
const CoachTitle = styled.Text` font-size: 20px; font-weight: bold; margin-bottom: 8px; `;
const CoachText = styled.Text` color: #DDD; font-size: 14px; font-style: italic; `;