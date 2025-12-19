import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RECITERS, DEFAULT_SETTINGS } from '../../constants/config';

interface AudioState {
    currentReciter: typeof RECITERS[0];
    isPlaying: boolean;
    currentSurahId: number | null;
    currentAyahNumber: number | null;
    duration: number;
    position: number;
    playbackSpeed: number;
    repeatMode: 'none' | 'ayah' | 'surah' | 'page';
    isLoading: boolean;
    error: string | null;
}

const initialState: AudioState = {
    currentReciter: RECITERS[0],
    isPlaying: false,
    currentSurahId: null,
    currentAyahNumber: null,
    duration: 0,
    position: 0,
    playbackSpeed: DEFAULT_SETTINGS.playbackSpeed,
    repeatMode: DEFAULT_SETTINGS.repeatMode,
    isLoading: false,
    error: null,
};

const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        setReciter: (state, action: PayloadAction<typeof RECITERS[0]>) => {
            state.currentReciter = action.payload;
        },
        setPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        play: (state) => {
            state.isPlaying = true;
        },
        pause: (state) => {
            state.isPlaying = false;
        },
        togglePlay: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        setCurrentAudio: (state, action: PayloadAction<{ surahId: number; ayahNumber: number }>) => {
            state.currentSurahId = action.payload.surahId;
            state.currentAyahNumber = action.payload.ayahNumber;
        },
        setDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload;
        },
        setPosition: (state, action: PayloadAction<number>) => {
            state.position = action.payload;
        },
        setPlaybackSpeed: (state, action: PayloadAction<number>) => {
            state.playbackSpeed = action.payload;
        },
        setRepeatMode: (state, action: PayloadAction<'none' | 'ayah' | 'surah' | 'page'>) => {
            state.repeatMode = action.payload;
        },
        setAudioLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setAudioError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        resetAudio: (state) => {
            state.isPlaying = false;
            state.currentSurahId = null;
            state.currentAyahNumber = null;
            state.duration = 0;
            state.position = 0;
        },
    },
});

export const {
    setReciter,
    setPlaying,
    play,
    pause,
    togglePlay,
    setCurrentAudio,
    setDuration,
    setPosition,
    setPlaybackSpeed,
    setRepeatMode,
    setAudioLoading,
    setAudioError,
    resetAudio,
} = audioSlice.actions;

export default audioSlice.reducer;
