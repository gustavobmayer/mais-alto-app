import React, { useState, useEffect } from 'react';
import { Vibration } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/ui/Button';

// Mock de um treino ativo
const MOCK_WORKOUT = [
  { id: '1', name: 'Dead Hang (Reglete)', duration: 10, rest: 5 },
  { id: '2', name: 'Pull-ups', duration: 15, rest: 10 },
  { id: '3', name: 'Plank', duration: 20, rest: 10 },
];

export const WorkoutSessionScreen = () => {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [status, setStatus] = useState<'PREPARE' | 'WORK' | 'REST' | 'FINISHED'>('PREPARE');
  const [timeLeft, setTimeLeft] = useState(5);
  const [isActive, setIsActive] = useState(false);

  const currentExercise = MOCK_WORKOUT[exerciseIndex];

  // O Coração do Cronômetro
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handlePhaseChange();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // A Lógica de Transição de Fases
  const handlePhaseChange = () => {
    Vibration.vibrate(500);

    if (status === 'PREPARE') {
      setStatus('WORK');
      setTimeLeft(currentExercise.duration);
    } else if (status === 'WORK') {
      setStatus('REST');
      setTimeLeft(currentExercise.rest);
    } else if (status === 'REST') {
      if (exerciseIndex + 1 < MOCK_WORKOUT.length) {
        setExerciseIndex(exerciseIndex + 1);
        setStatus('WORK');
        setTimeLeft(MOCK_WORKOUT[exerciseIndex + 1].duration);
      } else {
        setStatus('FINISHED');
        setIsActive(false);
      }
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  if (status === 'FINISHED') {
    return (
      <Container status={status}>
        <BigText>TREINO CONCLUÍDO!</BigText>
        <SubText>Bom trabalho, Gustavo.</SubText>
        <Button title="Voltar ao Menu" onPress={() => {}} />
      </Container>
    );
  }

  return (
    <Container status={status}>
      {/* Cabeçalho */}
      <Header>
        <Label>{status === 'WORK' ? 'EXECUTANDO:' : status === 'REST' ? 'PRÓXIMO:' : 'PREPARAR'}</Label>
        <ExerciseTitle>{currentExercise.name}</ExerciseTitle>
      </Header>

      {/* O Relógio Gigante */}
      <TimerWrapper>
        <TimerText>{timeLeft}</TimerText>
        <TimerLabel>SEGUNDOS</TimerLabel>
      </TimerWrapper>

      {/* Controles */}
      <Controls>
        <Button 
          title={isActive ? "PAUSAR" : "INICIAR"} 
          variant={isActive ? "danger" : "primary"}
          onPress={toggleTimer}
        />
        <Button 
          title="PULAR EXERCÍCIO" 
          variant="secondary" 
          onPress={() => {
             setStatus('REST');
             setTimeLeft(0);
          }} 
        />
      </Controls>
    </Container>
  );
};

// --- MUDANÇA: Função auxiliar movida para fora do componente ---
const getBackgroundColor = (status: string, theme: any) => {
  switch (status) {
    case 'WORK': return theme.COLORS.SUCCESS; // Verde
    case 'REST': return theme.COLORS.DANGER;  // Vermelho
    case 'FINISHED': return theme.COLORS.PRIMARY; // Ciano
    default: return theme.COLORS.BACKGROUND;  // Azul Escuro
  }
};

// Estilização
const Container = styled(SafeAreaView)<any>`
  flex: 1;
  /* Agora chamamos a função passando o status e o tema */
  background-color: ${(props: any) => getBackgroundColor(props.status, props.theme)};
  padding: 24px;
  justify-content: space-between;
`;

const Header = styled.View`
  align-items: center;
  margin-top: 20px;
`;

const Label = styled.Text<any>`
  color: rgba(255,255,255,0.8);
  font-family: ${(props: any) => props.theme.FONTS.BOLD};
  font-size: 14px;
  margin-bottom: 8px;
`;

const ExerciseTitle = styled.Text<any>`
  color: #FFF;
  font-family: ${(props: any) => props.theme.FONTS.BOLD};
  font-size: 32px;
  text-align: center;
`;

const TimerWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

const TimerText = styled.Text<any>`
  color: #FFF;
  font-family: ${(props: any) => props.theme.FONTS.BOLD};
  font-size: 120px;
  text-shadow: 0px 4px 10px rgba(0,0,0,0.3);
`;

const TimerLabel = styled.Text`
  color: #FFF;
  font-size: 16px;
  letter-spacing: 4px;
`;

const Controls = styled.View`
  width: 100%;
`;

const BigText = styled.Text`
  color: #FFF;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin-top: 100px;
`;

const SubText = styled.Text`
  color: #FFF;
  font-size: 18px;
  text-align: center;
  margin-bottom: 50px;
`;