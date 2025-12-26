import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Rule = ({ title, text, theme }) => (
    <View style={styles.rule}>
        <Text style={[styles.ruleTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.ruleText, { color: theme.textSecondary }]}>{text}</Text>
    </View>
);

const HowToPlayScreen = ({ navigation }) => {
    const { theme } = useTheme();
    return (
        <View style={[styles.mainContainer, { backgroundColor: theme.background }]}>
            {/* Custom Header */}
            <View style={[styles.header, { borderBottomColor: theme.gridBackground }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={[styles.backText, { color: theme.text }]}>{'< Back'}</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>How to Play</Text>
                <View style={{ width: 60 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Rule
                    title="Swipe to Move"
                    text="Swipe Up, Down, Left, or Right anywhere on the screen. All tiles on the grid will slide as far as they can in that direction."
                    theme={theme}
                />
                <Rule
                    title="Merge Tiles"
                    text="When two tiles with the same number collide during a move, they merge into a new tile with double the value (e.g., 2 + 2 = 4)."
                    theme={theme}
                />
                <Rule
                    title="Strategy"
                    text="Try to keep your highest value tile in a corner to organize the board effectively."
                    theme={theme}
                />
                <Rule
                    title="Winning"
                    text="The game is won when you create a tile with the value 2048. You can choose to continue playing for a higher score!"
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
    rule: {
        marginBottom: 24,
    },
    ruleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    ruleText: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default HowToPlayScreen;
