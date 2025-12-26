import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const SplashView = ({ onFinish, theme }) => {
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animate In
        Animated.parallel([
            Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
            Animated.timing(opacityAnim, { toValue: 1, duration: 800, useNativeDriver: true })
        ]).start();

        // Wait then fade out
        const timer = setTimeout(() => {
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true
            }).start(({ finished }) => {
                if (finished && onFinish) onFinish();
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const bg = theme ? theme.background : '#faf8ef';

    return (
        <View style={[styles.container, { backgroundColor: bg }]}>
            <Animated.View style={[
                styles.logoContainer,
                {
                    opacity: opacityAnim,
                    transform: [{ scale: scaleAnim }]
                }
            ]}>
                <View style={[styles.logoBox, { backgroundColor: '#edc22e' }]}>
                    <Text style={styles.logoText}>2048</Text>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoBox: {
        width: 100,
        height: 100,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    logoText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#f9f6f2',
    },
});

export default SplashView;
