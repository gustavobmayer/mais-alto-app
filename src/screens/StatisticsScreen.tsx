import React, { useState, useCallback } from 'react';
import { ScrollView, Dimensions, View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { StorageService, WorkoutSessionLog } from '../services/StorageService';
import { Card, CardTitle } from '../components/ui/Card';

const screenWidth = Dimensions.get('window').width;

export const StatisticsScreen = () => {
  const [history, setHistory] = useState<WorkoutSessionLog[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const data = await StorageService.getHistory();
    // Invertemos para ficar do mais antigo para o mais novo (Cronológico)
    setHistory(data.reverse()); 
    setLoading(false);
  };

  // --- PREPARAÇÃO DOS DADOS (PROCESSAMENTO) ---
  const getLast7Workouts = () => {
    // Pega os últimos 7 treinos (ou menos se tiver pouco)
    const recent = history.slice(-7); 
    
    if (recent.length === 0) return null;

    return {
      labels: recent.map(log => {
        const date = new Date(log.date);
        return `${date.getDate()}/${date.getMonth()+1}`;
      }),
      datasets: [{
        data: recent.map(log => log.durationMinutes)
      }]
    };
  };

  const getRpeTrend = () => {
    const recent = history.slice(-7);
    if (recent.length === 0) return null;

    return {
      labels: recent.map((_, i) => `T${i+1}`), // T1, T2, T3...
      datasets: [{
        data: recent.map(log => log.rpe || 0) // Se não tiver RPE, usa 0
      }]
    };
  };

  const chartConfig = {
    backgroundGradientFrom: "#1e293b",
    backgroundGradientTo: "#0f172a",
    color: (opacity = 1) => `rgba(0, 205, 205, ${opacity})`, // Neon Cyan
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 0,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#00cdcd"
    },
    propsForLabels: {
      fontSize: 10,
      fontFamily: "monospace"
    }
  };

  // --- ESTADO VAZIO ---
  if (!loading && history.length < 2) {
    return (
      <Container>
        <Header>ANÁLISE TÁTICA</Header>
        <EmptyState>
          <EmptyText>DADOS INSUFICIENTES</EmptyText>
          <EmptySubText>
            Complete pelo menos 2 treinos para gerar gráficos de tendência e volume.
          </EmptySubText>
        </EmptyState>
      </Container>
    );
  }

  const volumeData = getLast7Workouts();
  const rpeData = getRpeTrend();

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 50 }}>
        <Header>ANÁLISE TÁTICA</Header>

        {/* GRÁFICO 1: VOLUME (DURAÇÃO) */}
        <SectionTitle>VOLUME DE TREINO (MINUTOS)</SectionTitle>
        <ChartCard>
          {volumeData && (
            <BarChart
              data={volumeData}
              width={screenWidth - 64}
              height={220}
              yAxisLabel=""
              yAxisSuffix=" min"
              chartConfig={chartConfig}
              verticalLabelRotation={0}
              showValuesOnTopOfBars
              fromZero
            />
          )}
        </ChartCard>
        <InsightText>
          Sua consistência está criando base aeróbica.
        </InsightText>

        {/* GRÁFICO 2: INTENSIDADE (RPE) */}
        <SectionTitle style={{ marginTop: 20 }}>INTENSIDADE PERCEBIDA (RPE)</SectionTitle>
        <ChartCard>
          {rpeData && (
            <LineChart
              data={rpeData}
              width={screenWidth - 64}
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`, // Tomato Red para RPE
                propsForDots: { r: "4", stroke: "#ff6347" }
              }}
              bezier // Linha curva suave
              fromZero
              segments={5}
            />
          )}
        </ChartCard>
        <InsightText>
          Monitorar a carga interna previne lesões e burnout.
        </InsightText>

        {/* KPI CARDS (Indicadores Chave) */}
        <KpiRow>
          <KpiBox>
            <KpiValue>{history.length}</KpiValue>
            <KpiLabel>TOTAL SESSÕES</KpiLabel>
          </KpiBox>
          <KpiBox>
            <KpiValue>
              {Math.round(history.reduce((acc, curr) => acc + (curr.rpe || 0), 0) / history.length)}
            </KpiValue>
            <KpiLabel>MÉDIA RPE</KpiLabel>
          </KpiBox>
        </KpiRow>

      </ScrollView>
    </Container>
  );
};

// Estilos Profissionais
const Container = styled(SafeAreaView)<any>` flex: 1; background-color: ${(props: any) => props.theme.COLORS.BACKGROUND}; `;
const Header = styled.Text<any>` font-family: ${(props: any) => props.theme.FONTS.BOLD}; font-size: 20px; color: ${(props: any) => props.theme.COLORS.PRIMARY}; text-align: center; margin-bottom: 20px; border-bottom-width: 1px; border-bottom-color: rgba(255,255,255,0.1); padding-bottom: 16px;`;
const SectionTitle = styled.Text<any>` color: #FFF; font-family: ${(props: any) => props.theme.FONTS.BOLD}; font-size: 12px; margin-bottom: 12px; letter-spacing: 1px; text-transform: uppercase; `;

const ChartCard = styled.View<any>`
  background-color: ${(props: any) => props.theme.COLORS.SURFACE};
  padding: 8px;
  border-radius: 16px;
  align-items: center;
  border: 1px solid rgba(255,255,255,0.05);
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 5;
`;

const InsightText = styled.Text` color: #888; font-size: 12px; margin-top: 8px; font-style: italic; text-align: center; `;

const KpiRow = styled.View` flex-direction: row; justify-content: space-between; margin-top: 30px; gap: 16px; `;
const KpiBox = styled.View<any>` flex: 1; background-color: ${(props: any) => props.theme.COLORS.SURFACE_LIGHT}; padding: 20px; border-radius: 12px; align-items: center; border-left-width: 4px; border-left-color: ${(props: any) => props.theme.COLORS.PRIMARY}; `;
const KpiValue = styled.Text<any>` color: #FFF; font-size: 32px; font-weight: bold; `;
const KpiLabel = styled.Text` color: #AAA; font-size: 10px; margin-top: 4px; letter-spacing: 1px; `;

const EmptyState = styled.View` flex: 1; justify-content: center; align-items: center; margin-top: 100px; padding: 40px; `;
const EmptyText = styled.Text<any>` color: ${(props: any) => props.theme.COLORS.PRIMARY}; font-size: 18px; font-weight: bold; margin-bottom: 10px; `;
const EmptySubText = styled.Text` color: #888; font-size: 14px; text-align: center; line-height: 22px; `;