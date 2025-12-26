import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, Platform, PanResponder, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Grid from '../components/Grid';
import ScoreBoard from '../components/ScoreBoard';
import GameOverlay from '../components/GameOverlay';
import Button from '../components/Button';
import { generateEmptyBoard, addRandomTile, move, isGameOver, hasWon } from '../utils/gameLogic';
import { saveBestScore, getBestScore, saveGameState, getGameState, clearGameState } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';

const HomeScreen = ({ navigation }) => {
    const { theme } = useTheme();

    const [board, setBoard] = useState(generateEmptyBoard());
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameState, setGameState] = useState('playing');
    const [hasContinued, setHasContinued] = useState(false);

    // Load initial data
    useEffect(() => {
        loadGame();
    }, []);

    // Save game state
    useEffect(() => {
        if (gameState === 'playing' && score > 0) {
            saveGameState(board, score);
        }
    }, [board, score, gameState]);

    // Update best score
    useEffect(() => {
        if (score > bestScore) {
            setBestScore(score);
            saveBestScore(score);
        }
    }, [score]);

    const loadGame = async () => {
        const best = await getBestScore();
        setBestScore(best);

        const saved = await getGameState();
        if (saved) {
            setBoard(saved.board);
            setScore(saved.score);
        } else {
            startNewGame();
        }
    };

    const startNewGame = useCallback(() => {
        const empty = generateEmptyBoard();
        const withOne = addRandomTile(empty);
        const withTwo = addRandomTile(withOne);
        setBoard(withTwo);
        setScore(0);
        setGameState('playing');
        setHasContinued(false);
        clearGameState();
    }, []);

    const onMove = (direction) => {
        if (gameState === 'over' || (gameState === 'won' && !hasContinued)) return;

        const result = move(board, direction);

        if (result.moved) {
            const nextBoard = addRandomTile(result.board);
            setBoard(nextBoard);
            setScore(prev => prev + result.score);

            if (hasWon(nextBoard) && !hasContinued && gameState !== 'won') {
                setGameState('won');
                return;
            }

            if (isGameOver(nextBoard)) {
                setGameState('over');
            }
        }
    };

    const keepPlaying = () => {
        setGameState('playing');
        setHasContinued(true);
    };

    // --- Swipe Logic using PanResponder ---
    const panResponder = useRef(
        PanResponder.create({
            // Allow press events to pass through to child components (Buttons)
            onStartShouldSetPanResponder: () => false,
            // Only claim the responder if there's a significant move (swipe)
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                const { dx, dy } = gestureState;
                return Math.abs(dx) > 10 || Math.abs(dy) > 10;
            },
            onPanResponderRelease: (evt, gestureState) => {
                const { dx, dy } = gestureState;
                const threshold = 50;

                if (Math.abs(dx) > Math.abs(dy)) {
                    // Horizontal
                    if (Math.abs(dx) > threshold) {
                        onMove(dx > 0 ? 'right' : 'left');
                    }
                } else {
                    // Vertical
                    if (Math.abs(dy) > threshold) {
                        onMove(dy > 0 ? 'down' : 'up');
                    }
                }
            },
        })
    ).current;

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
            <View style={styles.container}>
                <View style={[styles.content, { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }]} {...panResponder.panHandlers}>
                    <ScoreBoard score={score} bestScore={bestScore} />

                    <View style={styles.controls}>
                        <Button
                            label="New Game"
                            onPress={startNewGame}
                            style={{ backgroundColor: theme.buttonBackground }}
                            textStyle={{ color: theme.buttonText }}
                        />
                        <Button
                            label="Menu"
                            onPress={() => {
                                try {
                                    navigation.navigate('Settings');
                                } catch (e) {
                                    console.warn("Navigation failed", e);
                                }
                            }}
                            style={{ backgroundColor: theme.gridBackground, marginLeft: 10 }}
                            textStyle={{ color: theme.text }}
                        />
                    </View>

                    <View style={styles.gameContainer}>
                        <Grid board={board} />

                        <GameOverlay
                            visible={gameState === 'won'}
                            message="You Win!"
                            buttonText="Keep Playing"
                            onAction={keepPlaying}
                        />

                        <GameOverlay
                            visible={gameState === 'over'}
                            message="Game Over"
                            buttonText="Try Again"
                            onAction={startNewGame}
                        />
                    </View>

                    <View style={styles.footer}>
                        <Text style={{ color: theme.textSecondary, textAlign: 'center' }}>Swipe to move tiles</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 40 : 0,
        justifyContent: 'center',
    },
    controls: {
        flexDirection: 'row',
        marginBottom: 20,
        width: '100%',
        maxWidth: 500,
        paddingHorizontal: 16,
        justifyContent: 'flex-end',
    },
    gameContainer: {
        position: 'relative',
    },
    footer: {
        marginTop: 20,
    }
});

export default HomeScreen;
