import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBookmarks } from '../store/slices/bookmarkSlice';
import { loadBookmarks } from '../services/storage/asyncStorage';

/**
 * Hook to initialize the Redux store with persisted data from AsyncStorage
 * Should be called once when the app starts
 */
export const useStoreInitialization = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeStore = async () => {
            try {
                // Load bookmarks from AsyncStorage
                const bookmarks = await loadBookmarks();
                if (bookmarks && bookmarks.length > 0) {
                    dispatch(setBookmarks(bookmarks));
                }
            } catch (error) {
                console.error('Error initializing store:', error);
            }
        };

        initializeStore();
    }, [dispatch]);
};
