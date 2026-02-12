import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/ui/Button';
import { Card, CardTitle } from '../components/ui/Card';
import { EXERCISES } from '../data/exercises';
import { CoachService } from '../services/CoachService';

export const GeneratorScreen = ({ navigation }: any) => {
  const [painLevel, setPainLevel] = useState(0); 
  const [isAmputee, setIsAmputee] = useState(false);
  
  const [generatedWorkout, setWorkout] = useState<any[]>([]);
  const [coachStrategy, setCoachStrategy] = useState<any>(null);

  const handleGenerate = async () => {
    // 1. Consulta o Coach (Inteligência)
    const prescription = await CoachService.analyzeReadiness();
    setCoachStrategy(prescription);

    // 2. Aplica Filtros Básicos (Segurança)
    let filteredList = [...EXERCISES];
    
    if (painLevel > 4) {
      filteredList = filteredList.filter(ex => !ex.tags.includes('Crimp'));
    }
    if (isAmputee) {
      filteredList = filteredList.filter(ex => !ex.tags.includes('HighImpact'));
    }

    // 3. Aplica Estratégia do Coach (AGORA COM AWAIT)
    // O erro estava aqui: o Coach precisa de tempo para buscar o aquecimento ideal
    const finalWorkout = await CoachService.applyStrategy(filteredList, prescription);
    
    setWorkout(finalWorkout);
  };

  const startSession = () => {
    if (generatedWorkout.length === 0) return;
    navigation.navigate('Session', { workout: generatedWorkout });
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Header>COACH ADAPTATIVO</Header>
        
        <Card>
          <CardTitle>Check-in Diário</CardTitle>
          <Label>Dor no Dedo (0-10): <Value>{painLevel}</Value></Label>
          <Row>
            <MiniButton onPress={() => setPainLevel(Math.max(0, painLevel - 1))}>-</MiniButton>
            <MiniButton onPress={() => setPainLevel(Math.min(10, painLevel + 1))}>+</MiniButton>
          </Row>
          <Button 
            title={isAmputee ? "Perfil: Amputado" : "Perfil: Padrão"} 
            variant="secondary"
            onPress={() => setIsAmputee(!isAmputee)}
          />
          <Button title="ANALISAR E GERAR" onPress={handleGenerate} />
        </Card>

        {/* CARTÃO DE INSIGHT DO COACH */}
        {coachStrategy && generatedWorkout.length > 0 && (
          <CoachCard color={coachStrategy.color}>
            <CoachLabel>ESTRATÉGIA DO DIA:</CoachLabel>
            <CoachTitle style={{ color: coachStrategy.color }}>
              {coachStrategy.strategy === 'RECOVERY' ? '🍃 RECUPERAÇÃO' : 
               coachStrategy.strategy === 'OVERLOAD' ? '🔥 SOBRECARGA' : '⚖️ MANUTENÇÃO'}
            </CoachTitle>
            <CoachText>{coachStrategy.message}</CoachText>
            
            <StatRow>
              <View>
                <StatLabel>DESCANSO</StatLabel>
                <StatValue>{coachStrategy.restModifier}x</StatValue>
              </View>
              <View>
                <StatLabel>VOLUME</StatLabel>
                <StatValue>{coachStrategy.volumeModifier === 0 ? 'NORMAL' : coachStrategy.volumeModifier}</StatValue>
              </View>
            </StatRow>
          </CoachCard>
        )}

        {generatedWorkout.length > 0 && (
          <>
            <Title>Sessão Completa ({generatedWorkout.length} etapas)</Title>
            
            <Button 
              title="▶  INICIAR SESSÃO" 
              variant="primary" 
              onPress={startSession}
            />

            <Subtitle>Estrutura: Warmup ➔ Main ➔ Cooldown</Subtitle>
            
            {generatedWorkout.map((ex: any, index: number) => (
              <TouchableOpacity 
                key={index} // Usamos index pois agora temos exercícios repetidos ou injetados sem ID único fixo
                onPress={() => navigation.navigate('ExerciseDetail', { exercise: ex })}
              >
                <ExerciseCard style={{ borderLeftColor: ex.phaseColor || '#00cdcd' }}>
                  <ExerciseHeader>
                    <ExerciseName>{ex.name}</ExerciseName>
                    <LevelBadge>{ex.category}</LevelBadge>
                  </ExerciseHeader>
                  <Tags>
                    {ex.duration}s ON / {ex.rest}s OFF • {ex.tags ? ex.tags.slice(0,2).join(', ') : 'Geral'}
                  </Tags>
                  <Arrow style={{ color: ex.phaseColor || '#00cdcd' }}>➔</Arrow>
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
const Subtitle = styled.Text` color: #666; font-size: 12px; margin-bottom: 10px; `;

const ExerciseCard = styled.View<any>` background-color: ${(props: any) => props.theme.COLORS.SURFACE}; padding: 16px; border-radius: 8px; margin-bottom: 8px; border-left-width: 4px; border-left-color: ${(props: any) => props.theme.COLORS.PRIMARY}; position: relative; `;
const ExerciseHeader = styled.View` flex-direction: row; justify-content: space-between; align-items: center; `;
const ExerciseName = styled.Text` color: #FFF; font-weight: bold; font-size: 16px; `;
const LevelBadge = styled.Text<any>` color: ${(props: any) => props.theme.COLORS.TEXT_SECONDARY}; font-size: 10px; background-color: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; `;
const Tags = styled.Text` color: #888; font-size: 12px; margin-top: 4px; `;
const Arrow = styled.Text<any>` position: absolute; right: 16px; bottom: 16px; color: ${(props: any) => props.theme.COLORS.PRIMARY}; font-size: 20px; `;

const CoachCard = styled.View<{ color: string }>`
  background-color: rgba(0,0,0,0.3);
  border: 1px solid ${(props: any) => props.color};
  padding: 16px;
  border-radius: 12px;
  margin-top: 20px;
`;
const CoachLabel = styled.Text` color: #888; font-size: 10px; letter-spacing: 2px; margin-bottom: 4px; `;
const CoachTitle = styled.Text` font-size: 20px; font-weight: bold; margin-bottom: 8px; `;
const CoachText = styled.Text` color: #DDD; font-size: 14px; margin-bottom: 16px; font-style: italic; `;
const StatRow = styled.View` flex-direction: row; gap: 30px; border-top-width: 1px; border-top-color: rgba(255,255,255,0.1); padding-top: 10px; `;
const StatLabel = styled.Text` color: #888; font-size: 8px; `;
const StatValue = styled.Text` color: #FFF; font-size: 14px; font-weight: bold; `;