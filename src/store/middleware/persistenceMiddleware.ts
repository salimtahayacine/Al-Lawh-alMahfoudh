import { Middleware } from '@reduxjs/toolkit';
import { saveBookmarks } from '../../services/storage/asyncStorage';

/**
 * Middleware to persist bookmarks to AsyncStorage whenever they change
 */
export const persistenceMiddleware: Middleware = (store) => (next) => (action: any) => {
    const result = next(action);
    
    // Check if the action affects bookmarks
    if (action.type?.startsWith('bookmarks/')) {
        const state = store.getState();
        // Persist bookmarks to AsyncStorage
        saveBookmarks(state.bookmarks.bookmarks).catch((error) => {
            console.error('Failed to persist bookmarks:', error);
        });
    }
    
    return result;
};
