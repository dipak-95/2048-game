import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const GameOverlay = ({ visible, message, buttonText, onAction }) => {
    const { theme } = useTheme();
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start();
        } else {
            opacity.setValue(0);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Animated.View
            style={[styles.container, { backgroundColor: theme.overlay, opacity }]}>
            <Text style={[styles.message, { color: theme.text }]}>{message}</Text>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.buttonBackground }]}
                onPress={onAction}
                activeOpacity={0.8}
            >
                <Text style={[styles.buttonText, { color: theme.buttonText }]}>{buttonText}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        borderRadius: 8,
    },
    message: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default GameOverlay;
