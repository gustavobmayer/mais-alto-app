import React, { useState, useEffect } from 'react';
import { Vibration, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/ui/Button';
import { StorageService } from '../services/StorageService';
import { VoiceService } from '../services/VoiceService'; // Import novo
import { Card } from '../components/ui/Card';

interface WorkoutItem {
  id: string;
  name: string;
  category: string;
  phaseColor: string;
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
  
  // Controle de Áudio
  const [isMuted, setIsMuted] = useState(false);

  if (!workout || workout.length === 0) {
    return (
      <Container style={{ backgroundColor: '#142332' }}>
        <BigText>NENHUM TREINO</BigText>
        <Button title="VOLTAR" onPress={() => navigation.goBack()} />
      </Container>
    );
  }

  const currentExercise = workout[exerciseIndex];

  // Efeito para tocar áudio quando muda o exercício ou fase
  useEffect(() => {
    if (isMuted) return;

    if (status === 'PREPARE') {
      VoiceService.speak("Prepare-se.");
    } else if (status === 'REST') {
      VoiceService.speak("Descanso.");
    } else if (status === 'WORK') {
      // Anuncia o nome do exercício
      VoiceService.announceExercise(currentExercise.name, currentExercise.duration);
    }
  }, [status, exerciseIndex, isMuted]);

  // O Relógio Central
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newVal = prev - 1;
          
          // CONTAGEM REGRESSIVA (3, 2, 1)
          if (!isMuted && newVal <= 3 && newVal > 0) {
            VoiceService.countdown(newVal);
          }
          // SOM DE "VAI" OU "ACABOU"
          if (!isMuted && newVal === 0) {
             Vibration.vibrate(500);
             // Pequeno beep ou palavra
             VoiceService.speak(status === 'REST' ? "Vai!" : "Pare.");
          }

          return newVal;
        });
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handlePhaseChange();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isMuted, status]);

  const handlePhaseChange = async () => {
    if (status === 'PREPARE') {
      setStatus('WORK');
      setTimeLeft(currentExercise.duration);
    } else if (status === 'WORK') {
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
      VoiceService.speak("Treino concluído. Como foi?");
    }
  };

  const saveWorkout = async () => {
    const totalTimeSeconds = workout.reduce((acc: number, item: WorkoutItem) => acc + item.duration + item.rest, 0);
    const totalMinutes = Math.ceil(totalTimeSeconds / 60);
    const exerciseNames = workout.map((item: WorkoutItem) => item.name);

    await StorageService.registerWorkout(totalMinutes, exerciseNames, rpe);
    setStatus('FINISHED');
  };

  const toggleTimer = () => setIsActive(!isActive);
  
  // Limpar a fala ao sair da tela
  useEffect(() => {
    return () => VoiceService.stop();
  }, []);

  const getBackgroundColor = () => {
    switch (status) {
      case 'REST': return '#FF4444';
      case 'FEEDBACK': return '#142332';
      case 'FINISHED': return '#00cdcd';
      case 'WORK': return currentExercise.phaseColor || '#00cdcd';
      default: return '#142332';
    }
  };

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

  if (status === 'FINISHED') {
    return (
      <Container style={{ backgroundColor: getBackgroundColor() }}>
        <BigText>SALVO!</BigText>
        <Button title="VOLTAR" onPress={() => navigation.navigate('Dashboard')} />
      </Container>
    );
  }

  return (
    <Container style={{ backgroundColor: getBackgroundColor() }}>
      
      {/* HEADER SUPERIOR COM MUTE */}
      <TopBar>
        <PhaseBadge>
          <PhaseText>FASE: {currentExercise.category.toUpperCase()}</PhaseText>
        </PhaseBadge>
        
        <MuteButton onPress={() => setIsMuted(!isMuted)}>
          <MuteText>{isMuted ? '🔇' : '🔊'}</MuteText>
        </MuteButton>
      </TopBar>

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

// Novo TopBar para alinhar Badge e Mute
const TopBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const PhaseBadge = styled.View` background-color: rgba(0,0,0,0.3); padding: 4px 12px; border-radius: 12px; `;
const PhaseText = styled.Text` color: #FFF; font-size: 10px; font-weight: bold; letter-spacing: 1px; `;

const MuteButton = styled.TouchableOpacity`
  background-color: rgba(255,255,255,0.1);
  width: 40px; height: 40px;
  border-radius: 20px;
  align-items: center; justify-content: center;
`;
const MuteText = styled.Text` font-size: 20px; `;

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