# Tasks TODO - Al-Lawh-alMahfoudh

## High Priority

### 1. Fix Audio Player - Quran MP3 Not Showing Surahs
**Problem:** The audio player for Quran MP3 is not displaying any surah.

**Tasks:**
- [ ] Migrate from `expo-av` to `expo-audio` (SDK 54 requirement)
- [ ] Check audio file paths and URLs
- [ ] Verify surah list is being fetched correctly
- [ ] Test audio playback functionality
- [ ] Ensure surah metadata (name, number) displays correctly
- [ ] Add error handling for failed audio loads
- [ ] Test on both iOS and Android devices

**Files to check:**
- `components/AudioPlayerQuran.tsx` (if exists)
- Audio-related components in `src/` or `components/`
- API calls fetching Quran audio data

### 2. Fix Reference Tab - Reading Marks Not Showing
**Problem:** The reference tab in the menu that shows bookmarks/marks for where we stopped reading is not working.

**Tasks:**
- [ ] Check AsyncStorage or local storage implementation for saving reading position
- [ ] Verify bookmark data structure
- [ ] Test bookmark creation and retrieval
- [ ] Ensure UI displays saved bookmarks correctly
- [ ] Add ability to delete/edit bookmarks
- [ ] Test bookmark navigation (jump to saved position)
- [ ] Add visual indicator for current reading position

**Files to check:**
- Reference/Bookmark tab component
- Storage utility functions
- Tab navigation configuration

## Medium Priority

### 3. Update Dependencies
- [x] Update to Expo SDK 54
- [ ] Test all features after SDK update
- [ ] Update documentation

### 4. Testing
- [ ] Test audio player on physical devices
- [ ] Test bookmark functionality
- [ ] Test navigation between tabs
- [ ] Performance testing

## Notes
- Current SDK: Expo 54
- React: 19.1.0
- React Native: 0.81.5
- App supports Arabic RTL layout

## Questions to Answer
1. Where is the audio data source? (Local files or API?)
2. What storage method is used for bookmarks? (AsyncStorage, SQLite, etc.)
3. Are there any console errors when trying to play audio or view bookmarks?