import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
    BEST_SCORE: '@2048_best_score',
    THEME_PREFERENCE: '@2048_theme_pref',
    GAME_STATE: '@2048_game_state', // Optional: save game progress
};

export const saveBestScore = async (score) => {
    try {
        const currentBest = await getBestScore();
        if (score > currentBest) {
            await AsyncStorage.setItem(KEYS.BEST_SCORE, score.toString());
            return true; // New best score
        }
    } catch (e) {
        console.warn('Failed to save best score', e);
    }
    return false;
};

export const getBestScore = async () => {
    try {
        const value = await AsyncStorage.getItem(KEYS.BEST_SCORE);
        return value ? parseInt(value, 10) : 0;
    } catch (e) {
        return 0;
    }
};

export const saveThemePreference = async (theme) => {
    try {
        // theme: 'light' | 'dark' | 'system'
        await AsyncStorage.setItem(KEYS.THEME_PREFERENCE, theme);
    } catch (e) {
        console.warn('Failed to save theme', e);
    }
};

export const getThemePreference = async () => {
    try {
        return await AsyncStorage.getItem(KEYS.THEME_PREFERENCE);
    } catch (e) {
        return null;
    }
};

export const saveGameState = async (board, score) => {
    try {
        const state = JSON.stringify({ board, score });
        await AsyncStorage.setItem(KEYS.GAME_STATE, state);
    } catch (e) {
        console.warn('Failed to save state', e);
    }
}

export const getGameState = async () => {
    try {
        const state = await AsyncStorage.getItem(KEYS.GAME_STATE);
        return state ? JSON.parse(state) : null;
    } catch (e) {
        return null;
    }
}

export const clearGameState = async () => {
    try {
        await AsyncStorage.removeItem(KEYS.GAME_STATE);
    } catch (e) { }
}

export const resetAllData = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) { }
}
