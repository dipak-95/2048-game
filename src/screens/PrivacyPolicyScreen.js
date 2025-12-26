import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Section = ({ title, text, theme }) => (
    <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.sectionText, { color: theme.textSecondary }]}>{text}</Text>
    </View>
);

const PrivacyPolicyScreen = ({ navigation }) => {
    const { theme } = useTheme();
    return (
        <View style={[styles.mainContainer, { backgroundColor: theme.background }]}>
            {/* Custom Header */}
            <View style={[styles.header, { borderBottomColor: theme.gridBackground }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={[styles.backText, { color: theme.text }]}>{'< Back'}</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Privacy Policy</Text>
                <View style={{ width: 60 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Section
                    title="No Data Collection"
                    text="This application does not collect, store, or transmit any personal information. We do not use cookies or tracking technologies."
                    theme={theme}
                />
                <Section
                    title="Local Storage"
                    text="All game data, including your high score and theme preferences, is stored locally on your device using standard storage APIs (AsyncStorage). This data is never sent to any external server."
                    theme={theme}
                />
                <Section
                    title="Network Requirement"
                    text="An active internet connection is required to play this game. The app checks for network connectivity upon launch and during gameplay."
                    theme={theme}
                />
                <Section
                    title="Permissions"
                    text="This app requires no special device permissions (e.g., Camera, Location, Contacts) to function."
                    theme={theme}
                />
                <Section
                    title="Contact"
                    text="If you have any questions about this privacy policy, please contact the developer."
                    theme={theme}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 30,
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
    content: {
        padding: 24,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    sectionText: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default PrivacyPolicyScreen;
