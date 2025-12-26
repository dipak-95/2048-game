import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../utils/colors';
import { saveThemePreference, getThemePreference } from '../utils/storage';
import SplashView from '../components/SplashView';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemScheme = useColorScheme(); // 'light' or 'dark'
    const [themePreference, setThemePreference] = useState('system');
    const [isReady, setIsReady] = useState(false);
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        // Load saved preference on mount
        const loadTheme = async () => {
            const saved = await getThemePreference();
            if (saved) {
                setThemePreference(saved);
            }
            setIsReady(true);
        };
        loadTheme();
    }, []);

    const changeTheme = (pref) => {
        setThemePreference(pref);
        saveThemePreference(pref);
    };

    // Determine active theme
    const activeMode =
        themePreference === 'system' ? (systemScheme || 'light') : themePreference;

    const colors = activeMode === 'dark' ? darkTheme : lightTheme;
    const isDark = activeMode === 'dark';

    if (!isReady) {
        // Return a temporary splash with "system" guess while loading storage
        const tempTheme = (!systemScheme || systemScheme === 'light') ? lightTheme : darkTheme;
        return (
            <SplashView
                onFinish={() => { }}
                theme={tempTheme}
            />
        );
    }

    return (
        <ThemeContext.Provider value={{
            theme: colors,
            isDark,
            themePreference,
            setTheme: changeTheme
        }}>
            {children}
            {showSplash && (
                <SplashView
                    onFinish={() => setShowSplash(false)}
                    theme={colors}
                />
            )}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
