import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Surah, Ayah } from '../../types/quran.types';
import { SURAHS } from '../../constants/quranData';

interface QuranState {
    surahs: Surah[];
    currentSurah: Surah | null;
    currentAyah: Ayah | null;
    currentPage: number;
    currentJuz: number;
    ayahs: Ayah[];
    isLoading: boolean;
    error: string | null;
}

const initialState: QuranState = {
    surahs: SURAHS,
    currentSurah: null,
    currentAyah: null,
    currentPage: 1,
    currentJuz: 1,
    ayahs: [],
    isLoading: false,
    error: null,
};

const quranSlice = createSlice({
    name: 'quran',
    initialState,
    reducers: {
        setCurrentSurah: (state, action: PayloadAction<Surah | null>) => {
            state.currentSurah = action.payload;
        },
        setCurrentAyah: (state, action: PayloadAction<Ayah | null>) => {
            state.currentAyah = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setCurrentJuz: (state, action: PayloadAction<number>) => {
            state.currentJuz = action.payload;
        },
        setAyahs: (state, action: PayloadAction<Ayah[]>) => {
            state.ayahs = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        navigateToSurah: (state, action: PayloadAction<number>) => {
            const surah = SURAHS.find(s => s.id === action.payload);
            if (surah) {
                state.currentSurah = surah;
                state.currentPage = surah.page;
                state.currentJuz = surah.juz[0];
            }
        },
        navigateToPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
            // Find the surah that contains this page
            const surah = SURAHS.find(
                (s, index) =>
                    s.page <= action.payload &&
                    (index === SURAHS.length - 1 || SURAHS[index + 1].page > action.payload)
            );
            if (surah) {
                state.currentSurah = surah;
            }
        },
        nextPage: (state) => {
            if (state.currentPage < 604) {
                state.currentPage += 1;
            }
        },
        previousPage: (state) => {
            if (state.currentPage > 1) {
                state.currentPage -= 1;
            }
        },
    },
});

export const {
    setCurrentSurah,
    setCurrentAyah,
    setCurrentPage,
    setCurrentJuz,
    setAyahs,
    setLoading,
    setError,
    navigateToSurah,
    navigateToPage,
    nextPage,
    previousPage,
} = quranSlice.actions;

export default quranSlice.reducer;
