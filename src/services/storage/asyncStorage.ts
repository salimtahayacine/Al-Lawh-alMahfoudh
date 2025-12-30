import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../constants/config';
import { Bookmark, UserSettings, ReadingProgress } from '../../types/quran.types';

/**
 * AsyncStorage Service for local data persistence
 * Handles storage of bookmarks, user settings, and reading history
 */

// Generic save function
export const save = async <T>(key: string, data: T): Promise<void> => {
    try {
        const jsonData = JSON.stringify(data);
        await AsyncStorage.setItem(key, jsonData);
    } catch (error) {
        console.error(`Error saving data with key ${key}:`, error);
        throw error;
    }
};

// Generic load function
export const load = async <T>(key: string): Promise<T | null> => {
    try {
        const jsonData = await AsyncStorage.getItem(key);
        if (jsonData === null) {
            return null;
        }
        return JSON.parse(jsonData) as T;
    } catch (error) {
        console.error(`Error loading data with key ${key}:`, error);
        return null;
    }
};

// Generic remove function
export const remove = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing data with key ${key}:`, error);
        throw error;
    }
};

// Clear all storage
export const clear = async (): Promise<void> => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error('Error clearing storage:', error);
        throw error;
    }
};

// Bookmark-specific functions
export const saveBookmarks = async (bookmarks: Bookmark[]): Promise<void> => {
    await save(STORAGE_KEYS.BOOKMARKS, bookmarks);
};

export const loadBookmarks = async (): Promise<Bookmark[]> => {
    const bookmarks = await load<Bookmark[]>(STORAGE_KEYS.BOOKMARKS);
    return bookmarks || [];
};

// Settings-specific functions
export const saveSettings = async (settings: UserSettings): Promise<void> => {
    await save(STORAGE_KEYS.SETTINGS, settings);
};

export const loadSettings = async (): Promise<UserSettings | null> => {
    return await load<UserSettings>(STORAGE_KEYS.SETTINGS);
};

// Reading progress functions
export const saveReadingProgress = async (progress: ReadingProgress): Promise<void> => {
    await save(STORAGE_KEYS.READING_PROGRESS, progress);
};

export const loadReadingProgress = async (): Promise<ReadingProgress | null> => {
    return await load<ReadingProgress>(STORAGE_KEYS.READING_PROGRESS);
};

// Reading history functions
interface ReadingHistoryEntry {
    surahId: number;
    ayahId: number;
    page: number;
    timestamp: number;
}

export const saveReadingHistory = async (entry: ReadingHistoryEntry): Promise<void> => {
    try {
        const history = await load<ReadingHistoryEntry[]>(STORAGE_KEYS.READING_HISTORY) || [];
        // Add new entry at the beginning
        history.unshift(entry);
        // Keep only last 50 entries
        const limitedHistory = history.slice(0, 50);
        await save(STORAGE_KEYS.READING_HISTORY, limitedHistory);
    } catch (error) {
        console.error('Error saving reading history:', error);
        throw error;
    }
};

export const loadReadingHistory = async (): Promise<ReadingHistoryEntry[]> => {
    const history = await load<ReadingHistoryEntry[]>(STORAGE_KEYS.READING_HISTORY);
    return history || [];
};

// Last read position functions
interface LastReadPosition {
    surahId: number;
    ayahId: number;
    page: number;
    timestamp: number;
}

export const saveLastRead = async (position: LastReadPosition): Promise<void> => {
    await save(STORAGE_KEYS.LAST_READ, position);
};

export const loadLastRead = async (): Promise<LastReadPosition | null> => {
    return await load<LastReadPosition>(STORAGE_KEYS.LAST_READ);
};

// Downloaded audio functions
interface DownloadedAudio {
    surahId: number;
    reciterId: string;
    localPath: string;
    timestamp: number;
}

export const saveDownloadedAudio = async (audioData: DownloadedAudio): Promise<void> => {
    try {
        const downloads = await load<DownloadedAudio[]>(STORAGE_KEYS.DOWNLOADED_AUDIO) || [];
        // Check if already exists
        const existingIndex = downloads.findIndex(
            d => d.surahId === audioData.surahId && d.reciterId === audioData.reciterId
        );
        
        if (existingIndex >= 0) {
            downloads[existingIndex] = audioData;
        } else {
            downloads.push(audioData);
        }
        
        await save(STORAGE_KEYS.DOWNLOADED_AUDIO, downloads);
    } catch (error) {
        console.error('Error saving downloaded audio:', error);
        throw error;
    }
};

export const loadDownloadedAudio = async (): Promise<DownloadedAudio[]> => {
    const downloads = await load<DownloadedAudio[]>(STORAGE_KEYS.DOWNLOADED_AUDIO);
    return downloads || [];
};

export const removeDownloadedAudio = async (surahId: number, reciterId: string): Promise<void> => {
    try {
        const downloads = await load<DownloadedAudio[]>(STORAGE_KEYS.DOWNLOADED_AUDIO) || [];
        const filtered = downloads.filter(
            d => !(d.surahId === surahId && d.reciterId === reciterId)
        );
        await save(STORAGE_KEYS.DOWNLOADED_AUDIO, filtered);
    } catch (error) {
        console.error('Error removing downloaded audio:', error);
        throw error;
    }
};

// Multi-key operations
export const getAllKeys = async (): Promise<readonly string[]> => {
    try {
        return await AsyncStorage.getAllKeys();
    } catch (error) {
        console.error('Error getting all keys:', error);
        return [];
    }
};

export const multiGet = async (keys: string[]): Promise<readonly (readonly [string, string | null])[]> => {
    try {
        return await AsyncStorage.multiGet(keys);
    } catch (error) {
        console.error('Error in multiGet:', error);
        return [];
    }
};

export const multiRemove = async (keys: string[]): Promise<void> => {
    try {
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error('Error in multiRemove:', error);
        throw error;
    }
};

// Export all functions as default object
export default {
    save,
    load,
    remove,
    clear,
    saveBookmarks,
    loadBookmarks,
    saveSettings,
    loadSettings,
    saveReadingProgress,
    loadReadingProgress,
    saveReadingHistory,
    loadReadingHistory,
    saveLastRead,
    loadLastRead,
    saveDownloadedAudio,
    loadDownloadedAudio,
    removeDownloadedAudio,
    getAllKeys,
    multiGet,
    multiRemove,
};
