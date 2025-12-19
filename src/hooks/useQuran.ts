import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
    setCurrentSurah,
    setAyahs,
    setLoading,
    setError
} from '../store/slices/quranSlice';
import { QuranApi } from '../services/api/quranApi';
import { SURAHS } from '../constants/quranData';
import { Surah } from '../types/quran.types';

export const useQuran = () => {
    const dispatch = useDispatch();
    const { currentSurah, ayahs, isLoading, error } = useSelector((state: RootState) => state.quran);

    const loadSurah = useCallback(async (surahId: number) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            // Set current surah metadata immediately
            const surahMeta = SURAHS.find(s => s.id === surahId);
            if (surahMeta) {
                dispatch(setCurrentSurah(surahMeta));
            }

            // Fetch ayahs
            const fetchedAyahs = await QuranApi.getSurah(surahId);
            dispatch(setAyahs(fetchedAyahs));
        } catch (err) {
            dispatch(setError('Failed to load surah. Please check your internet connection.'));
            console.error(err);
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const loadNextSurah = useCallback(() => {
        if (currentSurah && currentSurah.id < 114) {
            loadSurah(currentSurah.id + 1);
        }
    }, [currentSurah, loadSurah]);

    const loadPreviousSurah = useCallback(() => {
        if (currentSurah && currentSurah.id > 1) {
            loadSurah(currentSurah.id - 1);
        }
    }, [currentSurah, loadSurah]);

    return {
        currentSurah,
        ayahs,
        isLoading,
        error,
        loadSurah,
        loadNextSurah,
        loadPreviousSurah,
    };
};
