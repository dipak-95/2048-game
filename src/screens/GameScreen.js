import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Grid from '../components/Grid';
import ScoreBoard from '../components/ScoreBoard';
import GameOverlay from '../components/GameOverlay';
import { generateEmptyBoard, addRandomTile, move, isGameOver, hasWon } from '../utils/gameLogic';
import { saveBestScore, getBestScore, saveGameState, getGameState, clearGameState } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';

const GameScreen = ({ navigation }) => {
    const { theme } = useTheme();

    const [board, setBoard] = useState(generateEmptyBoard());
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameState, setGameState] = useState('playing');
    const [hasContinued, setHasContinued] = useState(false);

    useEffect(() => {
        loadGame();
    }, []);

    useEffect(() => {
        if (gameState === 'playing' && score > 0) {
            saveGameState(board, score);
        }
    }, [board, score, gameState]);

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

    // --- SIMPLE TOUCH EVENTS ---
    const touchStart = useRef({ x: 0, y: 0 });

    const handleTouchStart = (e) => {
        touchStart.current = {
            x: e.nativeEvent.pageX,
            y: e.nativeEvent.pageY
        };
    };

    const handleTouchEnd = (e) => {
        const touchEnd = {
            x: e.nativeEvent.pageX,
            y: e.nativeEvent.pageY
        };

        const dx = touchEnd.x - touchStart.current.x;
        const dy = touchEnd.y - touchStart.current.y;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        // Threshold of 30px to consider it a swipe
        if (Math.max(absDx, absDy) > 30) {
            if (absDx > absDy) {
                onMove(dx > 0 ? 'right' : 'left');
            } else {
                onMove(dy > 0 ? 'down' : 'up');
            }
        }
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
            {/* We attach touch handlers here to capture everything on screen safely */}
            <View
                style={styles.root}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <View style={[styles.header, { borderBottomColor: theme.gridBackground }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={[styles.backText, { color: theme.text }]}>{'< Back'}</Text>
                    </TouchableOpacity>

                    <View style={styles.scoreContainer}>
                        <ScoreBoard score={score} bestScore={bestScore} />
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.gridContainer}>
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

                    <View style={styles.controls}>
                        <TouchableOpacity onPress={startNewGame} style={[styles.controlBtn, { backgroundColor: theme.buttonBackground }]}>
                            <Text style={{ color: theme.buttonText, fontWeight: 'bold', fontSize: 18 }}>Restart</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ color: theme.textSecondary, marginTop: 20 }}>Swipe anywhere to move</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    root: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 10,
        width: '100%',
    },
    backButton: {
        padding: 5,
        minWidth: 60,
    },
    backText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    scoreContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginLeft: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridContainer: {
        position: 'relative',
        padding: 10,
    },
    controls: {
        marginTop: 30,
    },
    controlBtn: {
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 8,
    }
});

export default GameScreen;
