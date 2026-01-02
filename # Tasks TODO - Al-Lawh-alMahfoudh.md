# Tasks TODO - Al-Lawh-alMahfoudh

## High Priority

### 1. Fix Audio Player - Quran MP3 Not Showing Surahs
**Problem:** The audio player for Quran MP3 is not displaying any surah.

**Tasks:**
- [x] Migrate from `expo-av` to `expo-audio` (SDK 54 requirement)
- [x] Check audio file paths and URLs
- [x] Verify surah list is being fetched correctly
- [x] Create AudioPlayerScreen with surah list
- [x] Ensure surah metadata (name, number) displays correctly
- [x] Add error handling for failed audio loads
- [x] Replace placeholder Audio tab with real screen
- [ ] Test audio playback functionality on devices

**Implementation Details:**
- Created `AudioPlayerScreen.tsx` with full surah list
- Migrated `useAudio.ts` hook from `expo-av` to `expo-audio`
- Audio URLs are fetched from everyayah.com API
- Integrated audio player controls (play/pause/stop)
- Added search functionality for surahs

### 2. Fix Reference Tab - Reading Marks Not Showing
**Problem:** The reference tab in the menu that shows bookmarks/marks for where we stopped reading is not working.

**Tasks:**
- [x] Check AsyncStorage or local storage implementation for saving reading position
- [x] Verify bookmark data structure
- [x] Implement Redux persistence middleware
- [x] Load bookmarks from AsyncStorage on app start
- [x] Save bookmarks to AsyncStorage on state changes
- [x] Connect bookmark functionality to QuranReaderScreen
- [x] Ensure UI displays saved bookmarks correctly
- [x] Add ability to delete/edit bookmarks (delete already exists)
- [x] Test bookmark navigation (jump to saved position)
- [x] Add visual indicator for current reading position
- [ ] Test bookmark persistence across app restarts on devices

**Implementation Details:**
- Created `persistenceMiddleware.ts` to auto-save bookmarks
- Created `useStoreInitialization.ts` to load bookmarks on app start
- Updated `App.tsx` to initialize store with persisted data
- Connected bookmark toggle in `QuranReaderScreen.tsx`
- BookmarksScreen already has navigation and delete functionality

## Medium Priority

### 3. Update Dependencies
- [x] Update to Expo SDK 54
- [x] Migrate to expo-audio API
- [ ] Test all features after SDK update
- [ ] Update documentation

### 4. Testing
- [ ] Test audio player on physical devices
- [ ] Test bookmark functionality on physical devices
- [ ] Test navigation between tabs
- [ ] Performance testing

## Implementation Summary

### What Was Fixed:

1. **Audio Player Issue:**
   - Root cause: Audio tab had a placeholder "Coming Soon" screen
   - Solution: Created complete AudioPlayerScreen with surah selection and playback
   - Migrated from deprecated expo-av to new expo-audio API (SDK 54)
   - Added search, play/pause controls, and now playing indicator

2. **Bookmarks Issue:**
   - Root cause: No persistence layer - bookmarks were stored in Redux but not saved to AsyncStorage
   - Solution: Added Redux middleware to automatically persist bookmarks
   - Added initialization hook to load bookmarks on app startup
   - Connected bookmark toggle functionality in Quran reader

### Files Modified:
- `App.tsx` - Added store initialization
- `src/hooks/useAudio.ts` - Migrated to expo-audio
- `src/hooks/useBookmarks.ts` - Fixed TypeScript types
- `src/screens/QuranReaderScreen.tsx` - Connected bookmark functionality
- `src/navigation/TabNavigator.tsx` - Replaced Audio placeholder with real screen
- `src/navigation/StackNavigator.tsx` - Fixed TypeScript errors
- `src/store/store.ts` - Added persistence middleware

### Files Created:
- `src/screens/AudioPlayerScreen.tsx` - New audio player UI
- `src/hooks/useStoreInitialization.ts` - Initialize store with persisted data
- `src/store/middleware/persistenceMiddleware.ts` - Auto-save bookmarks

## Notes
- Current SDK: Expo 54
- React: 19.1.0
- React Native: 0.81.5
- App supports Arabic RTL layout
- Audio source: everyayah.com API (streaming)
- Storage: AsyncStorage for bookmarks and settings

## Answers to Questions
1. **Where is the audio data source?** - API from everyayah.com (streaming, not local files)
2. **What storage method is used for bookmarks?** - AsyncStorage with Redux middleware
3. **Are there any console errors?** - Fixed - proper error handling now in place