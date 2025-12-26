import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

import WelcomeScreen from '../screens/WelcomeScreen';
import GameScreen from '../screens/GameScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HowToPlayScreen from '../screens/HowToPlayScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { theme, isDark } = useTheme();

    return (
        <NavigationContainer theme={{
            colors: {
                background: theme.background,
                card: theme.background,
                text: theme.text,
                border: theme.gridBackground,
                primary: theme.buttonBackground,
            },
            dark: isDark,
        }}>
            <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={theme.background} />
            <Stack.Navigator
                screenOptions={{
                    // GLOBAL SAFETY: Hide default headers to avoid platform-specific styling crashes
                    headerShown: false,
                    animationEnabled: true,
                }}
            >
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Game" component={GameScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="HowToPlay" component={HowToPlayScreen} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
