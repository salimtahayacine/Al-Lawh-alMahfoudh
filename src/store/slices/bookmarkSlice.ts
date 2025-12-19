import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bookmark } from '../../types/quran.types';

interface BookmarkState {
    bookmarks: Bookmark[];
    isLoading: boolean;
}

const initialState: BookmarkState = {
    bookmarks: [],
    isLoading: false,
};

const bookmarkSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        setBookmarks: (state, action: PayloadAction<Bookmark[]>) => {
            state.bookmarks = action.payload;
        },
        addBookmark: (state, action: PayloadAction<Omit<Bookmark, 'id' | 'createdAt'>>) => {
            const newBookmark: Bookmark = {
                ...action.payload,
                id: Date.now().toString(),
                createdAt: new Date(),
            };
            state.bookmarks.unshift(newBookmark);
        },
        removeBookmark: (state, action: PayloadAction<string>) => {
            state.bookmarks = state.bookmarks.filter(b => b.id !== action.payload);
        },
        updateBookmarkNote: (state, action: PayloadAction<{ id: string; note: string }>) => {
            const bookmark = state.bookmarks.find(b => b.id === action.payload.id);
            if (bookmark) {
                bookmark.note = action.payload.note;
            }
        },
        clearAllBookmarks: (state) => {
            state.bookmarks = [];
        },
        setBookmarksLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const {
    setBookmarks,
    addBookmark,
    removeBookmark,
    updateBookmarkNote,
    clearAllBookmarks,
    setBookmarksLoading,
} = bookmarkSlice.actions;

// Selectors
export const selectBookmarkByAyah = (state: { bookmarks: BookmarkState }, surahId: number, ayahId: number) =>
    state.bookmarks.bookmarks.find(b => b.surahId === surahId && b.ayahId === ayahId);

export const selectBookmarksBySurah = (state: { bookmarks: BookmarkState }, surahId: number) =>
    state.bookmarks.bookmarks.filter(b => b.surahId === surahId);

export default bookmarkSlice.reducer;
