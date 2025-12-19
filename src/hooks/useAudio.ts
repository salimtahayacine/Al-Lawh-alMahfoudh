import { useState, useEffect, useCallback, useRef } from 'react';
import { Audio } from 'expo-av';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
    setPlaying,
    setCurrentAudio,
    setDuration,
    setPosition,
    setAudioLoading,
    setAudioError
} from '../store/slices/audioSlice';
import { AudioApi } from '../services/api/audioApi';
import { SURAHS } from '../constants/quranData';

export const useAudio = () => {
    const dispatch = useDispatch();
    const {
        currentReciter,
        isPlaying,
        currentSurahId,
        currentAyahNumber,
        playbackSpeed
    } = useSelector((state: RootState) => state.audio);

    const soundRef = useRef<Audio.Sound | null>(null);

    // Configure audio mode
    useEffect(() => {
        const setupAudio = async () => {
            try {
                await Audio.setAudioModeAsync({
                    playsInSilentModeIOS: true,
                    staysActiveInBackground: true,
                    shouldDuckAndroid: true,
                });
            } catch (error) {
                console.error('Error setting up audio:', error);
            }
        };
        setupAudio();
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    const playAyah = useCallback(async (surahId: number, ayahNumber: number) => {
        try {
            dispatch(setAudioLoading(true));
            dispatch(setAudioError(null));

            // Unload previous sound if any
            if (soundRef.current) {
                await soundRef.current.unloadAsync();
            }

            // Get URL
            const uri = AudioApi.getAyahAudioUrl(currentReciter.id, surahId, ayahNumber);

            // Load new sound
            const { sound } = await Audio.Sound.createAsync(
                { uri },
                { shouldPlay: true, rate: playbackSpeed },
                (status) => {
                    if (status.isLoaded) {
                        dispatch(setDuration(status.durationMillis || 0));
                        dispatch(setPosition(status.positionMillis));
                        dispatch(setPlaying(status.isPlaying));

                        if (status.didJustFinish) {
                            dispatch(setPlaying(false));
                            // Handle auto-play next here if needed
                        }
                    } else if (status.error) {
                        dispatch(setAudioError(status.error));
                    }
                }
            );

            soundRef.current = sound;
            dispatch(setCurrentAudio({ surahId, ayahNumber }));
            dispatch(setPlaying(true));

        } catch (error) {
            console.error('Error playing audio:', error);
            dispatch(setAudioError('Failed to play audio'));
        } finally {
            dispatch(setAudioLoading(false));
        }
    }, [currentReciter, playbackSpeed, dispatch]);

    const pauseAudio = useCallback(async () => {
        if (soundRef.current) {
            await soundRef.current.pauseAsync();
            dispatch(setPlaying(false));
        }
    }, [dispatch]);

    const resumeAudio = useCallback(async () => {
        if (soundRef.current) {
            await soundRef.current.playAsync();
            dispatch(setPlaying(true));
        }
    }, [dispatch]);

    const stopAudio = useCallback(async () => {
        if (soundRef.current) {
            await soundRef.current.stopAsync();
            dispatch(setPlaying(false));
            dispatch(setPosition(0));
        }
    }, [dispatch]);

    return {
        playSound: playAyah,
        pauseSound: pauseAudio,
        resumeSound: resumeAudio,
        stopSound: stopAudio,
        isPlaying,
        currentSurahId,
        currentAyahNumber,
    };
};
