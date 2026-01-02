import { useState, useEffect, useCallback, useRef } from 'react';
import { useAudioPlayer, AudioSource } from 'expo-audio';
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

    // Create audio player instance
    const player = useAudioPlayer();

    // Track current audio source
    const [currentSource, setCurrentSource] = useState<string | null>(null);

    // Update playing state when player state changes
    useEffect(() => {
        if (player.playing !== isPlaying) {
            dispatch(setPlaying(player.playing));
        }
    }, [player.playing, isPlaying, dispatch]);

    // Update duration and position
    useEffect(() => {
        if (player.duration) {
            dispatch(setDuration(player.duration * 1000)); // Convert to milliseconds
        }
        if (player.currentTime !== undefined) {
            dispatch(setPosition(player.currentTime * 1000)); // Convert to milliseconds
        }
    }, [player.duration, player.currentTime, dispatch]);

    const playAyah = useCallback(async (surahId: number, ayahNumber: number) => {
        try {
            dispatch(setAudioLoading(true));
            dispatch(setAudioError(null));

            // Get URL
            const uri = AudioApi.getAyahAudioUrl(currentReciter.id, surahId, ayahNumber);

            // Only replace the source if it's different
            if (currentSource !== uri) {
                player.replace({ uri });
                setCurrentSource(uri);
            }

            // Play the audio
            player.play();

            dispatch(setCurrentAudio({ surahId, ayahNumber }));
            dispatch(setPlaying(true));

        } catch (error) {
            console.error('Error playing audio:', error);
            dispatch(setAudioError('Failed to play audio'));
        } finally {
            dispatch(setAudioLoading(false));
        }
    }, [currentReciter, player, currentSource, dispatch]);

    const pauseAudio = useCallback(async () => {
        player.pause();
        dispatch(setPlaying(false));
    }, [player, dispatch]);

    const resumeAudio = useCallback(async () => {
        player.play();
        dispatch(setPlaying(true));
    }, [player, dispatch]);

    const stopAudio = useCallback(async () => {
        player.pause();
        player.seekTo(0);
        dispatch(setPlaying(false));
        dispatch(setPosition(0));
    }, [player, dispatch]);

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
