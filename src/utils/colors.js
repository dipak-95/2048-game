export const lightTheme = {
    background: '#faf8ef',
    text: '#776e65',
    textSecondary: '#8f7a66',
    gridBackground: '#bbada0',
    emptyCell: '#cdc1b4',
    buttonBackground: '#8f7a66',
    buttonText: '#f9f6f2',
    overlay: 'rgba(238, 228, 218, 0.73)',
    scoreBackground: '#bbada0',
    scoreTitle: '#eee4da',
    scoreValue: '#ffffff',
};

export const darkTheme = {
    background: '#121212',
    text: '#f9f9f9',
    textSecondary: '#a5a5a5',
    gridBackground: '#3a3a3c',
    emptyCell: '#48484a',
    buttonBackground: '#5c5c5e',
    buttonText: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.7)',
    scoreBackground: '#3a3a3c',
    scoreTitle: '#8e8e93',
    scoreValue: '#ffffff',
};

export const tileColors = {
    2: { bg: '#eee4da', text: '#776e65' },
    4: { bg: '#ede0c8', text: '#776e65' },
    8: { bg: '#f2b179', text: '#f9f6f2' },
    16: { bg: '#f59563', text: '#f9f6f2' },
    32: { bg: '#f67c5f', text: '#f9f6f2' },
    64: { bg: '#f65e3b', text: '#f9f6f2' },
    128: { bg: '#edcf72', text: '#f9f6f2' },
    256: { bg: '#edcc61', text: '#f9f6f2' },
    512: { bg: '#edc850', text: '#f9f6f2' },
    1024: { bg: '#edc53f', text: '#f9f6f2' },
    2048: { bg: '#edc22e', text: '#f9f6f2' }, // Golden
    super: { bg: '#3c3a32', text: '#f9f6f2' }, // For > 2048
};

export const getTileStyle = (value, isDark) => {
    if (value === 0) return {};
    const conf = tileColors[value] || tileColors.super;
    // In dark mode, we might want to adjust tile brightness if needed, 
    // but standard 2048 colors usually pop well on dark too.
    return {
        backgroundColor: conf.bg,
    };
};

export const getTileTextStyle = (value, isDark) => {
    if (value === 0) return {};
    const conf = tileColors[value] || tileColors.super;
    return {
        color: conf.text,
    };
};
