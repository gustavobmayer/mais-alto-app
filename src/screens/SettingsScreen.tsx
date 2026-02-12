import React from 'react';
import { Alert, ScrollView, Linking } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StorageService } from '../services/StorageService';

export const SettingsScreen = ({ navigation }: any) => {

  const handleReset = () => {
    Alert.alert(
      "TEM CERTEZA?",
      "Isso apagará todo seu histórico, perfil e conquistas. Essa ação é irreversível.",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "SIM, APAGAR TUDO", 
          style: "destructive",
          onPress: async () => {
            await StorageService.clearAllData();
            Alert.alert("Reiniciando", "Dados apagados com sucesso.");
            // Reseta a navegação e volta pro Dashboard (que estará zerado)
            navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            });
          }
        }
      ]
    );
  };

  const handleSupport = () => {
    Linking.openURL('https://maisalto.com.br/suporte'); // URL Fictícia
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Header>AJUSTES</Header>

        {/* SEÇÃO 1: DADOS */}
        <SectionHeader>GESTÃO DE DADOS</SectionHeader>
        <SettingItem onPress={handleReset}>
          <Icon>🗑️</Icon>
          <SettingText style={{ color: '#FF4444' }}>Apagar Todos os Dados</SettingText>
          <Chevron>➔</Chevron>
        </SettingItem>

        {/* SEÇÃO 2: SOBRE */}
        <SectionHeader>SOBRE O APP</SectionHeader>
        <SettingItem onPress={handleSupport}>
          <Icon>🛟</Icon>
          <SettingText>Suporte / Ajuda</SettingText>
          <Chevron>➔</Chevron>
        </SettingItem>

        <SettingItem disabled>
          <Icon>📱</Icon>
          <SettingText>Versão</SettingText>
          <VersionBadge>Alpha 1.0</VersionBadge>
        </SettingItem>

        <FooterText>
          Mais Alto Escalada © 2026{'\n'}
          Feito com ❤️ em Londrina, PR
        </FooterText>

      </ScrollView>
    </Container>
  );
};

// Estilos
const Container = styled(SafeAreaView)<any>` flex: 1; background-color: ${(props: any) => props.theme.COLORS.BACKGROUND}; `;
const Header = styled.Text<any>` font-family: ${(props: any) => props.theme.FONTS.BOLD}; font-size: 24px; color: ${(props: any) => props.theme.COLORS.PRIMARY}; text-align: center; margin-bottom: 30px; `;

const SectionHeader = styled.Text` color: #666; font-size: 12px; margin-bottom: 8px; letter-spacing: 1px; font-weight: bold; margin-top: 20px; `;

const SettingItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${(props: any) => props.theme.COLORS.SURFACE};
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 8px;
  border: 1px solid rgba(255,255,255,0.05);
`;

const Icon = styled.Text` font-size: 20px; margin-right: 16px; `;
const SettingText = styled.Text` color: #FFF; font-size: 16px; flex: 1; `;
const Chevron = styled.Text` color: #666; font-size: 16px; `;
const VersionBadge = styled.Text<any>` color: ${(props: any) => props.theme.COLORS.PRIMARY}; font-size: 12px; font-weight: bold; `;

const FooterText = styled.Text` color: #444; text-align: center; margin-top: 50px; font-size: 12px; line-height: 18px; `;