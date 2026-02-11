import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Importando todas as nossas telas
import { DashboardScreen } from '../screens/DashboardScreen';
import { WaiverScreen } from '../screens/WaiverScreen';
import { GeneratorScreen } from '../screens/GeneratorScreen';
import { WorkoutSessionScreen } from '../screens/WorkoutSessionScreen';

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
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ headerShown: false }} // Dashboard não precisa de barra superior
        />
        <Stack.Screen name="Waiver" component={WaiverScreen} options={{ title: 'Segurança' }} />
        <Stack.Screen name="Generator" component={GeneratorScreen} options={{ title: 'IA Generator' }} />
        <Stack.Screen name="Session" component={WorkoutSessionScreen} options={{ title: 'Treino em Curso', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};