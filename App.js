import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import NetInfo from '@react-native-community/netinfo';
import { StatusBar } from 'expo-status-bar';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => { });

const NoInternetScreen = ({ onRetry }) => (
  <View style={styles.offlineContainer}>
    <StatusBar style="dark" />
    <Text style={styles.offlineEmoji}>📡</Text>
    <Text style={styles.offlineTitle}>No Internet Connection</Text>
    <Text style={styles.offlineText}>This game requires an active internet connection to play.</Text>
    <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
      <Text style={styles.retryText}>Retry Connection</Text>
    </TouchableOpacity>
  </View>
);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isConnected, setIsConnected] = useState(true); // Default true to avoid flash

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));

        // Initial Network Check
        const state = await NetInfo.fetch();
        // Simply check isConnected. isInternetReachable can be flaky on some simulators/devices initially.
        // We will trust the event listener for updates.
        setIsConnected(state.isConnected);

      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync().catch(() => { });
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  // Only block if we are SURE it's disconnected (false), not null/undefined
  if (isConnected === false) {
    return (
      <View style={styles.container} onLayout={onLayoutRootView}>
        <NoInternetScreen onRetry={() => {
          NetInfo.fetch().then(state => setIsConnected(state.isConnected));
        }} />
      </View>
    );
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  offlineContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  offlineEmoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  offlineTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  offlineText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  retryButton: {
    backgroundColor: '#222',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
