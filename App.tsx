import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold, Montserrat_300Light } from '@expo-google-fonts/montserrat';
import * as SplashScreen from 'expo-splash-screen';
import theme from './src/theme';

// Importamos O ROTEADOR, que contem todas as telas
import { AppRoutes } from './src/routes/AppRoutes';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_300Light,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" backgroundColor={theme.COLORS.BACKGROUND} />
        
        {/* Agora o AppRoutes controla qual tela aparece */}
        <AppRoutes />
        
      </ThemeProvider>
    </SafeAreaProvider>
  );
}