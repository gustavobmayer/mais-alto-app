import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/ui/Button';
import { Card, CardTitle } from '../components/ui/Card';
import { StorageService, UserProfile } from '../services/StorageService';

export const ProfileScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState<UserProfile['level']>('Iniciante');
  const [pandaMode, setPandaMode] = useState<UserProfile['stonePandasMode']>('None');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await StorageService.getProfile();
    setName(data.name);
    setLevel(data.level);
    setPandaMode(data.stonePandasMode);
  };

  const handleSave = async () => {
    if (name.length === 0) {
      Alert.alert("Erro", "O nome não pode ficar vazio.");
      return;
    }

    await StorageService.saveProfile({
      name,
      level,
      stonePandasMode: pandaMode
    });

    Alert.alert("Sucesso", "Perfil atualizado!");
    navigation.goBack(); // Volta para o Dashboard
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Header>MEU PERFIL</Header>

        {/* 1. DADOS PESSOAIS */}
        <Card>
          <CardTitle>Identidade</CardTitle>
          <InputLabel>Seu Nome (ou Apelido)</InputLabel>
          <Input 
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
            placeholderTextColor="#666"
          />
        </Card>

        {/* 2. NÍVEL TÉCNICO */}
        <Card>
          <CardTitle>Nível de Experiência</CardTitle>
          <OptionRow>
            {['Iniciante', 'Intermediário', 'Avançado'].map((l) => (
              <Selectable 
                key={l} 
                selected={level === l} 
                onPress={() => setLevel(l as any)}
              >
                <SelectText selected={level === l}>{l}</SelectText>
              </Selectable>
            ))}
          </OptionRow>
        </Card>

        {/* 3. STONE PANDAS (ACESSIBILIDADE) */}
        <Card>
          <CardTitle>Modo Stone Pandas 🐼</CardTitle>
          <InputLabel>Adaptação do App e Treinos</InputLabel>
          
          <Button 
            title={pandaMode === 'None' ? "⭕ PADRÃO (Sem Adaptação)" : "⭕ PADRÃO"} 
            variant={pandaMode === 'None' ? 'primary' : 'secondary'}
            onPress={() => setPandaMode('None')}
          />
          <Button 
            title={pandaMode === 'Visual' ? "👁️ DEFICIÊNCIA VISUAL (Ativo)" : "👁️ DEFICIÊNCIA VISUAL"} 
            variant={pandaMode === 'Visual' ? 'primary' : 'secondary'}
            onPress={() => setPandaMode('Visual')}
          />
          <Button 
            title={pandaMode === 'Motor' ? "🦾 AMPUTADO/MOTOR (Ativo)" : "🦾 AMPUTADO/MOTOR"} 
            variant={pandaMode === 'Motor' ? 'primary' : 'secondary'}
            onPress={() => setPandaMode('Motor')}
          />
        </Card>

        <Button title="SALVAR PERFIL" onPress={handleSave} />

      </ScrollView>
    </Container>
  );
};

// Estilos
const Container = styled(SafeAreaView)<any>` flex: 1; background-color: ${(props: any) => props.theme.COLORS.BACKGROUND}; `;
const Header = styled.Text<any>` font-family: ${(props: any) => props.theme.FONTS.BOLD}; font-size: 24px; color: ${(props: any) => props.theme.COLORS.PRIMARY}; text-align: center; margin-bottom: 20px; `;
const InputLabel = styled.Text<any>` color: ${(props: any) => props.theme.COLORS.TEXT_SECONDARY}; margin-bottom: 8px; font-size: 12px; `;

const Input = styled.TextInput<any>`
  background-color: ${(props: any) => props.theme.COLORS.SURFACE_LIGHT};
  color: #FFF;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  border: 1px solid ${(props: any) => props.theme.COLORS.PRIMARY};
  margin-bottom: 16px;
`;

const OptionRow = styled.View` flex-direction: row; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; `;

const Selectable = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${({ selected, theme }: any) => selected ? theme.COLORS.PRIMARY : theme.COLORS.SURFACE_LIGHT};
  padding: 10px 16px;
  border-radius: 20px;
  border: 1px solid ${({ theme }: any) => theme.COLORS.PRIMARY};
`;

const SelectText = styled.Text<{ selected: boolean }>`
  color: ${({ selected, theme }: any) => selected ? theme.COLORS.BACKGROUND : theme.COLORS.TEXT_PRIMARY};
  font-weight: bold;
  font-size: 12px;
`;