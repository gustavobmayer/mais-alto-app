import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
// A correção do aviso amarelo está aqui: usamos a SafeAreaView correta
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/ui/Button';
import { Card, CardTitle, CardText } from '../components/ui/Card';

export const WaiverScreen = () => {
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState<'neutral' | 'success' | 'error'>('neutral');

  // Lógica do Quiz (Gamificação da Segurança)
  const questions = [
    {
      id: 1,
      videoPlaceholder: 'VÍDEO 01: QUEDA SEGURA',
      question: 'Ao cair do boulder, qual a postura correta?',
      options: [
        { label: 'Colocar as mãos no chão', correct: false },
        { label: 'Rolar e proteger o pescoço', correct: true },
      ],
    },
    {
      id: 2,
      videoPlaceholder: 'VÍDEO 02: ZONA DE QUEDA',
      question: 'Onde você NUNCA deve ficar parado?',
      options: [
        { label: 'Em cima do colchão, embaixo de alguém', correct: true },
        { label: 'Na área de descanso (café)', correct: false },
      ],
    },
  ];

  const currentQuestion = questions[step];

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setFeedback('success');
      setTimeout(() => {
        if (step < questions.length - 1) {
          setStep(step + 1);
          setFeedback('neutral');
        } else {
          Alert.alert('BEM-VINDO AO CLUBE', 'Você completou o protocolo de segurança.');
        }
      }, 1000); // 1 segundo de "Glória" verde antes de mudar
    } else {
      setFeedback('error');
      Alert.alert('ATENÇÃO', 'Resposta incorreta. Assista ao vídeo novamente.');
      setTimeout(() => setFeedback('neutral'), 1500);
    }
  };

  return (
    <Container>
      {/* 1. O Player de Vídeo (Mock/Simulado) */}
      <VideoContainer feedback={feedback}>
        <VideoText>{currentQuestion?.videoPlaceholder || 'PROTOCOLO CONCLUÍDO'}</VideoText>
        <PlayIcon>▶</PlayIcon>
      </VideoContainer>

      {/* 2. Área Interativa (Quiz) */}
      <Content>
        <Header>
          <StepText>PASSO {step + 1} / {questions.length}</StepText>
          <Title>Protocolo de Segurança</Title>
        </Header>

        <Card>
          <CardTitle style={{ textAlign: 'center' }}>{currentQuestion?.question}</CardTitle>
          <CardText style={{ textAlign: 'center', marginBottom: 20 }}>
            Selecione a ação correta para continuar.
          </CardText>

          {currentQuestion?.options.map((opt, index) => (
            <Button
              key={index}
              title={opt.label}
              variant={feedback === 'error' ? 'danger' : 'secondary'}
              onPress={() => handleAnswer(opt.correct)}
            />
          ))}
        </Card>
      </Content>
    </Container>
  );
};

// Estilos
const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }: any) => theme.COLORS.BACKGROUND};
`;

const Content = styled.View`
  flex: 1;
  padding: 24px;
  justify-content: flex-end; /* Joga o card para baixo */
`;

const VideoContainer = styled.View<{ feedback: string }>`
  height: 45%;
  width: 100%;
  background-color: ${({ theme }: any) => theme.COLORS.SURFACE_LIGHT};
  justify-content: center;
  align-items: center;
  border-bottom-width: 4px;
  border-color: ${({ feedback, theme }: any) => 
    feedback === 'success' ? theme.COLORS.SUCCESS : 
    feedback === 'error' ? theme.COLORS.DANGER : theme.COLORS.PRIMARY};
`;

const VideoText = styled.Text`
  font-family: ${({ theme }: any) => theme.FONTS.BOLD};
  color: ${({ theme }: any) => theme.COLORS.TEXT_SECONDARY};
  letter-spacing: 2px;
`;

const PlayIcon = styled.Text`
  font-size: 48px;
  color: ${({ theme }: any) => theme.COLORS.PRIMARY};
  opacity: 0.5;
  margin-top: 16px;
`;

const Header = styled.View`
  margin-bottom: 24px;
`;

const StepText = styled.Text`
  font-family: ${({ theme }: any) => theme.FONTS.BOLD};
  color: ${({ theme }: any) => theme.COLORS.PRIMARY};
  font-size: 12px;
  margin-bottom: 8px;
`;

const Title = styled.Text`
  font-family: ${({ theme }: any) => theme.FONTS.BOLD};
  color: ${({ theme }: any) => theme.COLORS.TEXT_PRIMARY};
  font-size: 24px;
`;