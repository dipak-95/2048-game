import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/Button';

const WelcomeScreen = ({ navigation }) => {
    const { theme, isDark, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.text }]}>2048</Text>

            <View style={styles.buttonContainer}>
                <Button
                    label="Start Game"
                    onPress={() => navigation.navigate('Game')}
                    style={[styles.mainButton, { backgroundColor: theme.buttonBackground }]}
                    textStyle={{ color: theme.buttonText, fontSize: 24 }}
                />

                <Button
                    label="Settings"
                    onPress={() => navigation.navigate('Settings')}
                    style={[styles.secondaryButton, { backgroundColor: theme.gridBackground }]}
                    textStyle={{ color: theme.text }}
                />

                <TouchableOpacity
                    style={[styles.themeButton, { backgroundColor: theme.gridBackground }]}
                    onPress={toggleTheme}
                >
                    <Text style={[styles.themeText, { color: theme.text }]}>
                        {isDark ? "Light Mode" : "Dark Mode"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 80,
        fontWeight: 'bold',
        marginBottom: 60,
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 300,
        alignItems: 'center',
        gap: 20,
    },
    mainButton: {
        width: '100%',
        paddingVertical: 20,
        borderRadius: 12,
    },
    secondaryButton: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 12,
    },
    themeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        width: '100%',
        borderRadius: 12,
        marginTop: 10,
        gap: 10,
    },
    themeText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default WelcomeScreen;
