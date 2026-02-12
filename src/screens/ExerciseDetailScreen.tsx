import React from 'react';
import { ScrollView, View, ImageBackground, Dimensions, StatusBar, Text } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/ui/Button';
import { AssetService } from '../services/AssetService';
import { ExerciseDataV2 } from '../data/types'; // Importando o NOVO tipo

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 450;

export const ExerciseDetailScreen = ({ route, navigation }: any) => {
  // AQUI MUDOU: O tipo agora é V2
  const { exercise } = route.params as { exercise: ExerciseDataV2 };
  
  // Imagem (mantemos a lógica do AssetService, que usa IDs string como 'crimp')
  const exerciseImage = AssetService.getImage(exercise.id);

  // Idioma Atual (Futuramente virá de um Contexto Global)
  const lang = 'pt'; 

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
              {/* Categoria agora vem das Tags ou Level */}
              <CategoryBadge>{exercise.level.toUpperCase()}</CategoryBadge>
              
              {/* TÍTULO LOCALIZADO */}
              <Title>{exercise.names[lang]}</Title>
              
              {/* INTRO LOCALIZADA */}
              <Definition>"{exercise.intro[lang]}"</Definition>
            </HeaderContent>
          </GradientOverlay>
        </ImageHeader>

        <Body>
          {/* 1. LÓGICA VISUAL (Descrição Detalhada) */}
          <Section>
            <SectionHeader>👁️ LÓGICA VISUAL</SectionHeader>
            <BodyText>{exercise.description[lang]}</BodyText>
          </Section>

          {/* 2. VARIAÇÕES (Se houver) */}
          {exercise.variations && (
            <Section>
              <SectionHeader>🔀 VARIAÇÕES</SectionHeader>
              <BodyText>{exercise.variations[lang]}</BodyText>
            </Section>
          )}

          {/* 3. CIÊNCIA DO MOVIMENTO (Card Técnico) */}
          {(exercise.anatomy || exercise.biomechanics) && (
            <ScienceBox>
              <SectionHeader style={{ color: '#00cdcd', borderLeftColor: '#00cdcd' }}>🧬 CIÊNCIA & MECÂNICA</SectionHeader>
              
              {exercise.biomechanics && (
                <View style={{ marginBottom: 12 }}>
                  <ScienceLabel>BIOMECÂNICA</ScienceLabel>
                  <ScienceText>{exercise.biomechanics[lang]}</ScienceText>
                </View>
              )}
              
              {exercise.anatomy && (
                <View>
                  <ScienceLabel>ANATOMIA (MOTOR)</ScienceLabel>
                  <ScienceText>{exercise.anatomy[lang]}</ScienceText>
                </View>
              )}
            </ScienceBox>
          )}

          {/* 4. SEGURANÇA (Alerta) */}
          <WarningBox>
            <WarningIcon>⚠️</WarningIcon>
            <View style={{ flex: 1 }}>
              <WarningTitle>SEGURANÇA</WarningTitle>
              <WarningText>{exercise.safety[lang]}</WarningText>
            </View>
          </WarningBox>

          {/* 5. STONE PANDAS (Acessibilidade) */}
          {exercise.stonePandas && (
            <PandaBox>
              <PandaIcon>🐼</PandaIcon>
              <View style={{ flex: 1 }}>
                <PandaTitle>DICA STONE PANDAS</PandaTitle>
                <PandaText>{exercise.stonePandas[lang]}</PandaText>
              </View>
            </PandaBox>
          )}

          <Spacer />
          <Button title="VOLTAR" onPress={() => navigation.goBack()} />
        </Body>

      </ScrollView>
    </Container>
  );
};

// --- ESTILOS ALMANAQUE (Mantidos e Refinados) ---
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

const ScienceBox = styled.View` background-color: ${({ theme }: any) => theme.COLORS.SURFACE}; padding: 16px; border-radius: 12px; margin-bottom: 32px; border-left-width: 4px; border-left-color: ${({ theme }: any) => theme.COLORS.PRIMARY}; `;
const ScienceLabel = styled.Text` color: #00cdcd; font-size: 10px; font-weight: bold; margin-bottom: 4px; letter-spacing: 1px; `;
const ScienceText = styled.Text` color: #EEE; font-size: 14px; line-height: 20px; `;

const WarningBox = styled.View` background-color: rgba(239, 68, 68, 0.1); border: 1px solid ${({ theme }: any) => theme.COLORS.DANGER}; padding: 20px; border-radius: 12px; margin-bottom: 24px; flex-direction: row; align-items: center; `;
const WarningIcon = styled.Text` font-size: 24px; margin-right: 16px; `;
const WarningTitle = styled.Text` color: ${({ theme }: any) => theme.COLORS.DANGER}; font-weight: bold; font-size: 12px; margin-bottom: 4px; `;
const WarningText = styled.Text` color: ${({ theme }: any) => theme.COLORS.TEXT_PRIMARY}; font-size: 14px; line-height: 20px; `;

const PandaBox = styled.View` background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255,255,255,0.1); padding: 16px; border-radius: 12px; flex-direction: row; align-items: center; `;
const PandaIcon = styled.Text` font-size: 24px; margin-right: 16px; `;
const PandaTitle = styled.Text` color: #FFF; font-weight: bold; font-size: 12px; margin-bottom: 4px; `;
const PandaText = styled.Text` color: #CCC; font-size: 12px; line-height: 18px; `;

const Spacer = styled.View` height: 40px; `;