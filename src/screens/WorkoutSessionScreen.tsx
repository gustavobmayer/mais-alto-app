import React, { useState, useEffect } from 'react';
import { Vibration, View } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/ui/Button';
import { StorageService } from '../services/StorageService';
import { Card } from '../components/ui/Card';

interface WorkoutItem {
  id: string;
  name: string;
  category: string;
  phaseColor: string; // A cor da fase (Laranja, Ciano, Roxo)
  duration: number;
  rest: number;
}

export const WorkoutSessionScreen = ({ route, navigation }: any) => {
  const { workout } = route.params || { workout: [] };
  
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [status, setStatus] = useState<'PREPARE' | 'WORK' | 'REST' | 'FEEDBACK' | 'FINISHED'>('PREPARE');
  const [timeLeft, setTimeLeft] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [rpe, setRpe] = useState(5);

  if (!workout || workout.length === 0) {
    return (
      <Container style={{ backgroundColor: '#142332' }}>
        <BigText>NENHUM TREINO</BigText>
        <Button title="VOLTAR" onPress={() => navigation.goBack()} />
      </Container>
    );
  }

  const currentExercise = workout[exerciseIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      handlePhaseChange();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handlePhaseChange = async () => {
    Vibration.vibrate(500);

    if (status === 'PREPARE') {
      setStatus('WORK');
      setTimeLeft(currentExercise.duration);
    } else if (status === 'WORK') {
      // Se o descanso for 0, pula direto pro próximo (ex: alongamentos rápidos)
      if (currentExercise.rest === 0) {
        nextExercise();
      } else {
        setStatus('REST');
        setTimeLeft(currentExercise.rest);
      }
    } else if (status === 'REST') {
      nextExercise();
    }
  };

  const nextExercise = () => {
    if (exerciseIndex + 1 < workout.length) {
      setExerciseIndex(exerciseIndex + 1);
      setStatus('WORK');
      setTimeLeft(workout[exerciseIndex + 1].duration);
    } else {
      setStatus('FEEDBACK');
      setIsActive(false);
    }
  };

  const saveWorkout = async () => {
    const totalTimeSeconds = workout.reduce((acc: number, item: WorkoutItem) => acc + item.duration + item.rest, 0);
    const totalMinutes = Math.ceil(totalTimeSeconds / 60);
    // Salvamos apenas os nomes do bloco principal para não poluir o histórico, ou tudo se preferir
    const exerciseNames = workout.map((item: WorkoutItem) => item.name);

    await StorageService.registerWorkout(totalMinutes, exerciseNames, rpe);
    setStatus('FINISHED');
  };

  const toggleTimer = () => setIsActive(!isActive);

  // --- LÓGICA DE CORES INTELIGENTE ---
  const getBackgroundColor = () => {
    switch (status) {
      case 'REST': return '#FF4444'; // Vermelho Padrão de Descanso
      case 'FEEDBACK': return '#142332';
      case 'FINISHED': return '#00cdcd';
      case 'WORK': return currentExercise.phaseColor || '#00cdcd'; // Usa a cor da fase (Laranja/Roxo/Ciano)
      default: return '#142332';
    }
  };

  // TELA DE FEEDBACK
  if (status === 'FEEDBACK') {
    return (
      <Container style={{ backgroundColor: getBackgroundColor() }}>
        <BigText>FIM DO TREINO!</BigText>
        <SubText>Intensidade da Sessão:</SubText>
        <Card>
          <RpeValue style={{ color: rpe > 7 ? '#FF4444' : rpe < 4 ? '#44FF44' : '#FFFF44' }}>{rpe}</RpeValue>
          <Row>
            <MiniButton onPress={() => setRpe(Math.max(1, rpe - 1))}>-</MiniButton>
            <View style={{ width: 20 }} />
            <MiniButton onPress={() => setRpe(Math.min(10, rpe + 1))}>+</MiniButton>
          </Row>
        </Card>
        <Button title="SALVAR" onPress={saveWorkout} />
      </Container>
    );
  }

  // TELA FINAL
  if (status === 'FINISHED') {
    return (
      <Container style={{ backgroundColor: getBackgroundColor() }}>
        <BigText>SALVO!</BigText>
        <Button title="VOLTAR" onPress={() => navigation.navigate('Dashboard')} />
      </Container>
    );
  }

  // PLAYER
  return (
    <Container style={{ backgroundColor: getBackgroundColor() }}>
      <PhaseBadge>
        <PhaseText>FASE: {currentExercise.category.toUpperCase()}</PhaseText>
      </PhaseBadge>

      <Header>
        <Label>
          {status === 'WORK' ? 'EXECUTANDO' : status === 'REST' ? 'DESCANSE' : 'PREPARAR'} 
          {' '}({exerciseIndex + 1}/{workout.length})
        </Label>
        <ExerciseTitle>{currentExercise.name}</ExerciseTitle>
      </Header>
      
      <TimerWrapper>
        <TimerText>{timeLeft}</TimerText>
        <TimerLabel>SEGUNDOS</TimerLabel>
      </TimerWrapper>

      <Controls>
        <Button 
          title={isActive ? "PAUSAR" : "INICIAR"} 
          variant={isActive ? "danger" : "primary"}
          onPress={toggleTimer}
        />
        <Button 
          title="PULAR >>" 
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

// Estilos
const Container = styled(SafeAreaView)` flex: 1; padding: 24px; justify-content: space-between; `;
const PhaseBadge = styled.View` background-color: rgba(0,0,0,0.3); align-self: center; padding: 4px 12px; border-radius: 12px; margin-bottom: 10px; `;
const PhaseText = styled.Text` color: #FFF; font-size: 10px; font-weight: bold; letter-spacing: 1px; `;

const Header = styled.View` align-items: center; margin-top: 10px; `;
const Label = styled.Text` color: rgba(255,255,255,0.8); font-weight: bold; margin-bottom: 8px; `;
const ExerciseTitle = styled.Text` color: #FFF; font-weight: bold; font-size: 32px; text-align: center; `;
const TimerWrapper = styled.View` align-items: center; justify-content: center; `;
const TimerText = styled.Text` color: #FFF; font-weight: bold; font-size: 120px; text-shadow: 0px 4px 10px rgba(0,0,0,0.3); `;
const TimerLabel = styled.Text` color: #FFF; font-size: 16px; letter-spacing: 4px; `;
const Controls = styled.View` width: 100%; `;
const BigText = styled.Text` color: #FFF; font-size: 40px; font-weight: bold; text-align: center; margin-top: 40px; `;
const SubText = styled.Text` color: #FFF; font-size: 18px; text-align: center; margin-bottom: 20px; `;
const Row = styled.View` flex-direction: row; justify-content: center; margin-top: 20px; `;
const MiniButton = styled.Text` background-color: rgba(255,255,255,0.1); color: #FFF; padding: 15px 30px; border-radius: 8px; font-size: 24px; font-weight: bold; overflow: hidden; `;
const RpeValue = styled.Text` font-size: 80px; font-weight: bold; text-align: center; margin-bottom: 10px; `;