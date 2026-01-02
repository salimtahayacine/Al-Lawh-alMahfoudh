import { Middleware } from '@reduxjs/toolkit';
import { saveBookmarks } from '../../services/storage/asyncStorage';

/**
 * Middleware to persist bookmarks to AsyncStorage whenever they change
 * Uses debouncing to avoid excessive writes
 */
let saveTimeout: NodeJS.Timeout | null = null;

export const persistenceMiddleware: Middleware = (store) => (next) => (action: any) => {
    const result = next(action);
    
    // Check if the action affects bookmarks
    if (action.type?.startsWith('bookmarks/')) {
        // Clear any pending save
        if (saveTimeout) {
            clearTimeout(saveTimeout);
        }
        
        // Debounce saves to AsyncStorage (wait 500ms after last change)
        saveTimeout = setTimeout(() => {
            const state = store.getState();
            saveBookmarks(state.bookmarks.bookmarks).catch((error) => {
                console.error('Failed to persist bookmarks:', error);
            });
        }, 500);
    }
    
    return result;
};
