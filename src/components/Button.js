import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ label, onPress, style, textStyle }) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.7}>
        <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Button;
