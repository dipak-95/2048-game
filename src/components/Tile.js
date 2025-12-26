import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, Animated, Easing } from 'react-native';
import { getTileStyle, getTileTextStyle } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';

const Tile = ({ value, r, c, size, gap, isMerged, isNew }) => {
    const { isDark } = useTheme();

    // Calculate target position
    const targetX = c * (size + gap) + gap;
    const targetY = r * (size + gap) + gap;

    // Animation Values
    const xAnim = useRef(new Animated.Value(targetX)).current;
    const yAnim = useRef(new Animated.Value(targetY)).current;
    const scaleAnim = useRef(new Animated.Value(isNew ? 0 : 1)).current;

    // Update Position
    useEffect(() => {
        Animated.parallel([
            Animated.timing(xAnim, {
                toValue: targetX,
                duration: 150,
                useNativeDriver: true,
                easing: Easing.out(Easing.quad),
            }),
            Animated.timing(yAnim, {
                toValue: targetY,
                duration: 150,
                useNativeDriver: true,
                easing: Easing.out(Easing.quad),
            })
        ]).start();
    }, [r, c, targetX, targetY]);

    // Handle Entry / Merge
    useEffect(() => {
        if (isNew) {
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                tension: 40,
                useNativeDriver: true,
            }).start();
        } else if (isMerged) {
            Animated.sequence([
                Animated.timing(scaleAnim, { toValue: 1.15, duration: 100, useNativeDriver: true }),
                Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
            ]).start();
        } else {
            scaleAnim.setValue(1);
        }
    }, [value, isMerged, isNew]);

    const tileColors = getTileStyle(value, isDark);
    const textColors = getTileTextStyle(value, isDark);

    const fontSizeCnt = value > 1000 ? 0.35 : (value > 100 ? 0.4 : 0.45);

    return (
        <Animated.View style={[
            styles.tile,
            {
                width: size,
                height: size,
                backgroundColor: tileColors.backgroundColor,
                transform: [
                    { translateX: xAnim },
                    { translateY: yAnim },
                    { scale: scaleAnim }
                ]
            }
        ]}>
            <Text style={[styles.text, { color: textColors.color, fontSize: size * fontSizeCnt }]}>
                {value}
            </Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    tile: {
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        fontWeight: 'bold',
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
});

export default Tile;
