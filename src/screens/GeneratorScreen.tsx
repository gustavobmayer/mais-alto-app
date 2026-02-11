import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/ui/Button';
import { Card, CardTitle, CardText } from '../components/ui/Card';
import { generateWorkout, PainMap, UserProfile } from '../services/WorkoutEngine';

export const GeneratorScreen = () => {
  // Estado do "Simulador"
  const [painLevel, setPainLevel] = useState(0); // 0 = Sem dor, 5 = Dor média
  const [isAmputee, setIsAmputee] = useState(false);
  const [generatedWorkout, setWorkout] = useState<any[]>([]);

  const handleGenerate = () => {
    // Montando o Input
    const profile: UserProfile = {
      name: 'Gustavo',
      level: 'Athlete',
      stonePandasProfile: isAmputee ? 'Amputee_Lower' : 'None',
    };

    const pain: PainMap = {
      finger_A2: painLevel, // Nível controlado pelos botões
      shoulder: 0,
      lowerBack: 0,
    };

    // Chamando o Cérebro
    const result = generateWorkout(profile, pain);
    setWorkout(result);
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Header>MOTOR DE IA v1.0</Header>
        
        {/* PAINEL DE CONTROLE */}
        <Card>
          <CardTitle>Simulação de Contexto</CardTitle>
          
          <Label>Dor no Dedo (0-10): <Value>{painLevel}</Value></Label>
          <Row>
            <MiniButton onPress={() => setPainLevel(Math.max(0, painLevel - 1))}>-</MiniButton>
            <MiniButton onPress={() => setPainLevel(Math.min(10, painLevel + 1))}>+</MiniButton>
          </Row>

          <Label>Perfil Stone Pandas:</Label>
          <Button 
            title={isAmputee ? "Perfil: Amputado (Inferior)" : "Perfil: Padrão"} 
            variant="secondary"
            onPress={() => setIsAmputee(!isAmputee)}
          />

          <Button title="GERAR TREINO" onPress={handleGenerate} />
        </Card>

        {/* RESULTADO (O OUTPUT) */}
        <Title>Treino Gerado ({generatedWorkout.length} exercícios)</Title>
        
        {generatedWorkout.map((ex) => (
          <ExerciseCard key={ex.id}>
            <ExerciseName>{ex.name}</ExerciseName>
            <Tags>Tags: {ex.tags.join(', ')}</Tags>
          </ExerciseCard>
        ))}

        {generatedWorkout.length === 0 && (
          <Text style={{ color: '#666', textAlign: 'center' }}>
            Configure os parâmetros e gere um treino.
          </Text>
        )}

      </ScrollView>
    </Container>
  );
};

// Estilos Rápidos
const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props: any) => props.theme.COLORS.BACKGROUND};
`;

const Header = styled.Text`
  font-family: ${(props: any) => props.theme.FONTS.BOLD};
  font-size: 24px;
  color: ${(props: any) => props.theme.COLORS.PRIMARY};
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.Text`
  color: ${(props: any) => props.theme.COLORS.TEXT_PRIMARY};
  margin-bottom: 8px;
  font-size: 16px;
`;

const Value = styled.Text`
  color: ${(props: any) => props.theme.COLORS.DANGER};
  font-weight: bold;
`;

const Row = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
  gap: 10px;
`;

const MiniButton = styled.Text`
  background-color: ${(props: any) => props.theme.COLORS.SURFACE_LIGHT};
  color: #FFF;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 20px;
  overflow: hidden; 
`;

const Title = styled.Text`
  color: #FFF;
  font-size: 18px;
  margin: 20px 0 10px;
  font-weight: bold;
`;

const ExerciseCard = styled.View`
  background-color: ${(props: any) => props.theme.COLORS.SURFACE};
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 8px;
  border-left-width: 4px;
  border-left-color: ${(props: any) => props.theme.COLORS.SUCCESS};
`;

const ExerciseName = styled.Text`
  color: #FFF;
  font-weight: bold;
  font-size: 16px;
`;

const Tags = styled.Text`
  color: #888;
  font-size: 12px;
  margin-top: 4px;
`;