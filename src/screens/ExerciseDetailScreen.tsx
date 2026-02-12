import React from 'react';
import { ScrollView, View, ImageBackground, Dimensions, StatusBar, Text } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/ui/Button';
import { AssetService } from '../services/AssetService';
import { ExerciseData } from '../data/exercises';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 450; // Aumentamos para caber a arte do Almanaque

export const ExerciseDetailScreen = ({ route, navigation }: any) => {
  const { exercise } = route.params as { exercise: ExerciseData };
  const exerciseImage = AssetService.getImage(exercise.id) || AssetService.getImage('1');

  return (
    <Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
        
        {/* HEADER: A ARTE DO ALMANAQUE */}
        <ImageHeader source={exerciseImage} resizeMode="cover">
          <GradientOverlay
            colors={['transparent', 'rgba(20, 35, 50, 0.9)', '#142332']}
            locations={[0, 0.7, 1]}
          >
            <HeaderContent>
              <CategoryBadge>{exercise.category.toUpperCase()}</CategoryBadge>
              <Title>{exercise.name}</Title>
              <Definition>"{exercise.definition}"</Definition>
            </HeaderContent>
          </GradientOverlay>
        </ImageHeader>

        <Body>
          {/* 1. LÓGICA VISUAL (O Conceito) */}
          <Section>
            <SectionHeader>👁️ LÓGICA VISUAL</SectionHeader>
            <BodyText>{exercise.visualLogic}</BodyText>
          </Section>

          {/* 2. O MENTAL (Psicologia) */}
          {exercise.mentalFocus && (
            <MentalBox>
              <MentalIcon>🧠</MentalIcon>
              <View style={{ flex: 1 }}>
                <MentalTitle>O MENTAL</MentalTitle>
                <MentalText>{exercise.mentalFocus}</MentalText>
              </View>
            </MentalBox>
          )}

          {/* 3. VARIAÇÕES (Lista) */}
          {exercise.variations && (
            <Section>
              <SectionHeader>🔀 VARIAÇÕES</SectionHeader>
              {exercise.variations.map((v, i) => (
                <VariationItem key={i}>
                  <Bullet>•</Bullet>
                  <VariationText>{v}</VariationText>
                </VariationItem>
              ))}
            </Section>
          )}

          {/* 4. A CIÊNCIA (Biomecânica) */}
          {exercise.science && (
            <ScienceBox>
              <SectionHeader style={{ color: '#00cdcd', borderLeftColor: '#00cdcd' }}>🧬 CIÊNCIA & MECÂNICA</SectionHeader>
              <BodyText style={{ fontSize: 14 }}>{exercise.science}</BodyText>
            </ScienceBox>
          )}

          {/* 5. SEGURANÇA (Alerta) */}
          {exercise.safety && (
            <WarningBox>
              <WarningIcon>⚠️</WarningIcon>
              <View style={{ flex: 1 }}>
                <WarningTitle>SEGURANÇA</WarningTitle>
                <WarningText>{exercise.safety}</WarningText>
              </View>
            </WarningBox>
          )}

          <Spacer />
          <Button title="VOLTAR" onPress={() => navigation.goBack()} />
        </Body>

      </ScrollView>
    </Container>
  );
};

// --- ESTILOS ALMANAQUE ---
const Container = styled.View` flex: 1; background-color: ${({ theme }: any) => theme.COLORS.BACKGROUND}; `;

const ImageHeader = styled(ImageBackground)` width: ${width}px; height: ${HEADER_HEIGHT}px; justify-content: flex-end; `;
const GradientOverlay = styled(LinearGradient)` width: 100%; height: 100%; justify-content: flex-end; padding: 24px; `;

const HeaderContent = styled.View` margin-bottom: 20px; `;
const CategoryBadge = styled.Text` color: ${({ theme }: any) => theme.COLORS.PRIMARY}; background-color: rgba(0, 205, 205, 0.15); align-self: flex-start; padding: 4px 12px; border-radius: 4px; font-weight: bold; font-size: 12px; margin-bottom: 12px; overflow: hidden; `;
const Title = styled.Text` color: #FFF; font-weight: bold; font-size: 32px; margin-bottom: 8px; text-shadow: 0px 2px 10px rgba(0,0,0,0.5); `;
const Definition = styled.Text` color: rgba(255,255,255,0.9); font-style: italic; font-size: 16px; line-height: 24px; border-left-width: 2px; border-left-color: ${({ theme }: any) => theme.COLORS.PRIMARY}; padding-left: 12px; `;

const Body = styled.View` padding: 24px; margin-top: -30px; `;

const Section = styled.View` margin-bottom: 32px; `;
const SectionHeader = styled.Text` color: #FFF; font-weight: bold; font-size: 14px; margin-bottom: 12px; letter-spacing: 1px; `;
const BodyText = styled.Text` color: ${({ theme }: any) => theme.COLORS.TEXT_PRIMARY}; font-size: 16px; line-height: 26px; `;

const MentalBox = styled.View` background-color: rgba(147, 112, 219, 0.1); border: 1px solid #9370DB; padding: 16px; border-radius: 12px; flex-direction: row; align-items: center; margin-bottom: 32px; `;
const MentalIcon = styled.Text` font-size: 24px; margin-right: 16px; `;
const MentalTitle = styled.Text` color: #9370DB; font-weight: bold; font-size: 12px; margin-bottom: 4px; `;
const MentalText = styled.Text` color: #E0E0E0; font-size: 14px; line-height: 20px; `;

const VariationItem = styled.View` flex-direction: row; margin-bottom: 8px; `;
const Bullet = styled.Text` color: ${({ theme }: any) => theme.COLORS.PRIMARY}; margin-right: 8px; font-size: 18px; `;
const VariationText = styled.Text` color: #CCC; font-size: 14px; line-height: 22px; flex: 1; `;

const ScienceBox = styled.View` background-color: ${({ theme }: any) => theme.COLORS.SURFACE}; padding: 16px; border-radius: 12px; margin-bottom: 32px; border-left-width: 4px; border-left-color: ${({ theme }: any) => theme.COLORS.PRIMARY}; `;

const WarningBox = styled.View` background-color: rgba(239, 68, 68, 0.1); border: 1px solid ${({ theme }: any) => theme.COLORS.DANGER}; padding: 20px; border-radius: 12px; margin-bottom: 24px; flex-direction: row; align-items: center; `;
const WarningIcon = styled.Text` font-size: 24px; margin-right: 16px; `;
const WarningTitle = styled.Text` color: ${({ theme }: any) => theme.COLORS.DANGER}; font-weight: bold; font-size: 12px; margin-bottom: 4px; `;
const WarningText = styled.Text` color: ${({ theme }: any) => theme.COLORS.TEXT_PRIMARY}; font-size: 14px; line-height: 20px; `;

const Spacer = styled.View` height: 40px; `;