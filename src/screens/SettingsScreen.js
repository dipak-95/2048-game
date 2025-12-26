import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { saveBestScore } from '../utils/storage';

const SettingItem = ({ label, value, onPress, theme }) => (
    <TouchableOpacity style={[styles.item, { borderBottomColor: theme.gridBackground }]} onPress={onPress}>
        <View style={styles.labelRow}>
            <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {value && <Text style={[styles.value, { color: theme.textSecondary, marginRight: 10 }]}>{value}</Text>}
            <Text style={{ color: theme.textSecondary }}>{'>'}</Text>
        </View>
    </TouchableOpacity>
);

const SettingsScreen = ({ navigation }) => {
    const { theme, isDark, themePreference, setTheme } = useTheme();

    const handleReset = () => {
        Alert.alert(
            "Reset Best Score",
            "Are you sure you want to reset your best score to 0?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Reset",
                    style: "destructive",
                    onPress: async () => {
                        await saveBestScore(0);
                        Alert.alert("Success", "Best score reset.");
                    }
                }
            ]
        );
    };

    const toggleTheme = () => {
        const modes = ['system', 'light', 'dark'];
        const nextIndex = (modes.indexOf(themePreference) + 1) % modes.length;
        setTheme(modes[nextIndex]);
    };

    const getThemeLabel = () => {
        if (themePreference === 'system') return 'System Default';
        return themePreference === 'light' ? 'Light' : 'Dark';
    };

    return (
        <View style={[styles.mainContainer, { backgroundColor: theme.background }]}>
            {/* Custom Header */}
            <View style={[styles.header, { borderBottomColor: theme.gridBackground }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={[styles.backText, { color: theme.text }]}>{'< Back'}</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Settings</Text>
                <View style={{ width: 60 }} />
            </View>

            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>OPTIONS</Text>
                    <SettingItem
                        label="Theme"
                        value={getThemeLabel()}
                        onPress={toggleTheme}
                        theme={theme}
                    />
                    <SettingItem
                        label="Reset Best Score"
                        onPress={handleReset}
                        theme={theme}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>INFO & HELP</Text>
                    <SettingItem
                        label="How to Play"
                        onPress={() => navigation.navigate('HowToPlay')}
                        theme={theme}
                    />
                    <SettingItem
                        label="Privacy Policy"
                        onPress={() => navigation.navigate('PrivacyPolicy')}
                        theme={theme}
                    />
                    <SettingItem
                        label="Version"
                        value="1.0.0"
                        onPress={() => { }}
                        theme={theme}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 30, // For status bar
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    backButton: {
        padding: 5,
        width: 60,
    },
    backText: {
        fontSize: 18,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 20,
        textTransform: 'uppercase',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
    },
    value: {
        fontSize: 16,
    },
});

export default SettingsScreen;
