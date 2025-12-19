import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSettings } from '../../types/quran.types';
import { DEFAULT_SETTINGS } from '../../constants/config';

interface SettingsState extends UserSettings {
    isInitialized: boolean;
}

const initialState: SettingsState = {
    ...DEFAULT_SETTINGS,
    isInitialized: false,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        initializeSettings: (state, action: PayloadAction<Partial<UserSettings>>) => {
            return { ...state, ...action.payload, isInitialized: true };
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
            state.theme = action.payload;
        },
        setFontSize: (state, action: PayloadAction<number>) => {
            state.fontSize = action.payload;
        },
        increaseFontSize: (state) => {
            if (state.fontSize < 48) {
                state.fontSize += 2;
            }
        },
        decreaseFontSize: (state) => {
            if (state.fontSize > 16) {
                state.fontSize -= 2;
            }
        },
        setFontFamily: (state, action: PayloadAction<'uthmani' | 'amiri' | 'naskh'>) => {
            state.fontFamily = action.payload;
        },
        toggleTranslation: (state) => {
            state.showTranslation = !state.showTranslation;
        },
        setShowTranslation: (state, action: PayloadAction<boolean>) => {
            state.showTranslation = action.payload;
        },
        setTranslationLanguage: (state, action: PayloadAction<string>) => {
            state.translationLanguage = action.payload;
        },
        setSelectedReciter: (state, action: PayloadAction<string>) => {
            state.selectedReciter = action.payload;
        },
        setAutoPlayNext: (state, action: PayloadAction<boolean>) => {
            state.autoPlayNext = action.payload;
        },
        setRepeatMode: (state, action: PayloadAction<'none' | 'ayah' | 'surah' | 'page'>) => {
            state.repeatMode = action.payload;
        },
        setPlaybackSpeed: (state, action: PayloadAction<number>) => {
            state.playbackSpeed = action.payload;
        },
        resetSettings: () => {
            return { ...DEFAULT_SETTINGS, isInitialized: true };
        },
    },
});

export const {
    initializeSettings,
    setTheme,
    setFontSize,
    increaseFontSize,
    decreaseFontSize,
    setFontFamily,
    toggleTranslation,
    setShowTranslation,
    setTranslationLanguage,
    setSelectedReciter,
    setAutoPlayNext,
    setRepeatMode,
    setPlaybackSpeed,
    resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
