import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Importando TODAS as telas
import { DashboardScreen } from '../screens/DashboardScreen';
import { WaiverScreen } from '../screens/WaiverScreen';
import { GeneratorScreen } from '../screens/GeneratorScreen';
import { WorkoutSessionScreen } from '../screens/WorkoutSessionScreen';
import { ExerciseDetailScreen } from '../screens/ExerciseDetailScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { StatisticsScreen } from '../screens/StatisticsScreen';
import { SettingsScreen } from '../screens/SettingsScreen'; // <--- Import Novo

import theme from '../theme';

const Stack = createNativeStackNavigator();

export const AppRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: { backgroundColor: theme.COLORS.BACKGROUND },
          headerTintColor: theme.COLORS.PRIMARY,
          headerTitleStyle: { fontFamily: theme.FONTS.BOLD },
          contentStyle: { backgroundColor: theme.COLORS.BACKGROUND },
        }}
      >
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Editar Perfil', headerBackTitle: 'Voltar' }} />
        <Stack.Screen name="Waiver" component={WaiverScreen} options={{ title: 'Segurança' }} />
        <Stack.Screen name="Generator" component={GeneratorScreen} options={{ title: 'IA Generator' }} />
        <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} options={{ title: 'Técnica', headerBackTitle: 'Voltar' }} />
        <Stack.Screen name="Session" component={WorkoutSessionScreen} options={{ title: 'Treino em Curso', headerShown: false }} />
        
        {/* NOVA ROTA DO HISTÓRICO */}
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Histórico' }} />
        <Stack.Screen name="Statistics" component={StatisticsScreen} options={{ title: 'Analytics' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configurações' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};