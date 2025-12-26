import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ScoreBox = ({ label, score, theme }) => (
    <View style={[styles.scoreBox, { backgroundColor: theme.scoreBackground }]}>
        <Text style={[styles.scoreTitle, { color: theme.scoreTitle }]}>{label}</Text>
        <Text style={[styles.scoreValue, { color: theme.scoreValue }]}>{score}</Text>
    </View>
);

const ScoreBoard = ({ score, bestScore }) => {
    const { theme } = useTheme();
    return (
        <View style={styles.container}>
            <View style={styles.scoresContainer}>
                <ScoreBox label="SCORE" score={score} theme={theme} />
                <ScoreBox label="BEST" score={bestScore} theme={theme} />
            </View>
            {/* Subtitle removed to save space in header mode, or we can make it optional if needed. 
                For now, seeing the screenshot, it's just cluttered. */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Minimal container
    },
    scoresContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    scoreBox: {
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 60,
    },
    scoreTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    scoreValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ScoreBoard;
