import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
    addBookmark,
    removeBookmark,
    updateBookmarkNote
} from '../store/slices/bookmarkSlice';
import { Bookmark } from '../types/quran.types';

export const useBookmarks = () => {
    const dispatch = useDispatch();
    const bookmarks = useSelector((state: RootState) => state.bookmarks.bookmarks);

    const isBookmarked = useCallback((surahId: number, ayahId: number) => {
        return bookmarks.some((b: Bookmark) => b.surahId === surahId && b.ayahId === ayahId);
    }, [bookmarks]);

    const toggleBookmark = useCallback((surahId: number, ayahId: number, page: number) => {
        if (isBookmarked(surahId, ayahId)) {
            // Find the bookmark to remove
            const bookmark = bookmarks.find((b: Bookmark) => b.surahId === surahId && b.ayahId === ayahId);
            if (bookmark) {
                dispatch(removeBookmark(bookmark.id));
            }
        } else {
            dispatch(addBookmark({
                surahId,
                ayahId,
                page,
            }));
        }
    }, [bookmarks, dispatch, isBookmarked]);

    const remove = useCallback((id: string) => {
        dispatch(removeBookmark(id));
    }, [dispatch]);

    return {
        bookmarks,
        isBookmarked,
        toggleBookmark,
        removeBookmark: remove,
    };
};
