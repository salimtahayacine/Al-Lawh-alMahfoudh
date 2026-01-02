import { configureStore } from '@reduxjs/toolkit';
import quranReducer from './slices/quranSlice';
import audioReducer from './slices/audioSlice';
import settingsReducer from './slices/settingsSlice';
import bookmarkReducer from './slices/bookmarkSlice';
import { persistenceMiddleware } from './middleware/persistenceMiddleware';

export const store = configureStore({
    reducer: {
        quran: quranReducer,
        audio: audioReducer,
        settings: settingsReducer,
        bookmarks: bookmarkReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types for serializable check
                ignoredActions: ['bookmarks/addBookmark'],
                // Ignore these paths in the state
                ignoredPaths: ['bookmarks.bookmarks'],
            },
        }).concat(persistenceMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
