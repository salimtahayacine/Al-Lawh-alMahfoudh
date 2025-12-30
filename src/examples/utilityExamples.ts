/**
 * Example Integration Tests
 * These examples show how the new utilities integrate with each other
 * and with existing code in the application.
 */

// Example 1: Complete bookmark workflow with storage and utilities
export async function bookmarkWorkflowExample() {
    const { saveBookmarks, loadBookmarks } = await import('../services/storage/asyncStorage');
    const { formatArabicDate } = await import('../utils/formatters');
    const { isValidReference, formatReference } = await import('../utils/quranUtils');
    
    // Validate reference before creating bookmark
    if (isValidReference(2, 255)) {
        const bookmarks = await loadBookmarks();
        
        const newBookmark = {
            id: Date.now().toString(),
            surahId: 2,
            ayahId: 255,
            page: 42,
            note: 'Ayat Al-Kursi',
            color: '#4CAF50',
            createdAt: new Date(),
        };
        
        bookmarks.push(newBookmark);
        await saveBookmarks(bookmarks);
        
        console.log(`Bookmark saved: ${formatReference(2, 255)}`);
        console.log(`Date: ${formatArabicDate(newBookmark.createdAt)}`);
    }
}

// Example 2: Reading progress with multiple utilities
export async function readingProgressExample() {
    const { saveReadingProgress, loadReadingProgress } = await import('../services/storage/asyncStorage');
    const { calculateProgress, getPageBySurah } = await import('../utils/quranUtils');
    const { formatPercentage } = await import('../utils/formatters');
    
    const currentSurah = 2;
    const currentAyah = 100;
    
    const progress = {
        lastReadSurah: currentSurah,
        lastReadAyah: currentAyah,
        lastReadPage: getPageBySurah(currentSurah),
        lastReadDate: new Date(),
        totalPagesRead: 50,
        completionPercentage: calculateProgress(currentSurah, currentAyah),
    };
    
    await saveReadingProgress(progress);
    console.log(`Progress: ${formatPercentage(progress.completionPercentage, 'ar')}`);
}

// Example 3: Search in Quran with Arabic utilities
export async function searchQuranExample() {
    const { searchArabic, highlightSearchTerm, normalizeArabic } = await import('../utils/arabicUtils');
    const { formatArabicNumber } = await import('../utils/formatters');
    
    const ayahText = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
    const searchTerm = 'الله';
    
    // Search without diacritics
    const found = searchArabic(ayahText, searchTerm);
    
    if (found) {
        // Highlight the search term
        const highlighted = highlightSearchTerm(ayahText, searchTerm, '**', '**');
        console.log(`Found: ${highlighted}`);
        
        // Show result number in Arabic
        console.log(`Result: ${formatArabicNumber(1)}`);
    }
}

// Example 4: Theme-aware component with utilities
export function ThemedQuranDisplayExample() {
    // In a real React component:
    // const { colors, isDark } = useTheme();
    // const { formatDuration } = formatters;
    // const { removeDiacritics } = arabicUtils;
    
    // Example of how it would be used:
    const exampleAudioDuration = 125; // seconds
    const exampleArabicText = 'بِسْمِ اللَّهِ';
    
    return {
        // backgroundColor: colors.background,
        // textColor: colors.text,
        // duration: formatDuration(exampleAudioDuration),
        // cleanText: removeDiacritics(exampleArabicText),
        info: 'This demonstrates theme integration with utilities'
    };
}

// Example 5: Settings persistence with theme
export async function settingsPersistenceExample() {
    const { saveSettings, loadSettings } = await import('../services/storage/asyncStorage');
    // In real app: const { isDark, setTheme } = useTheme();
    
    // Load saved settings
    const savedSettings = await loadSettings();
    
    if (savedSettings) {
        // Apply theme from settings
        console.log(`Loaded theme: ${savedSettings.theme}`);
        console.log(`Font size: ${savedSettings.fontSize}`);
        
        // Update settings
        savedSettings.theme = 'dark';
        savedSettings.fontSize = 28;
        await saveSettings(savedSettings);
    }
}

// Example 6: Format Hijri date for prayer times display
export function hijriDateFormattingExample() {
    const { formatHijriDate, formatArabicTime } = require('../utils/formatters');
    
    const hijriDate = formatHijriDate(15, 6, 1446, 'ar');
    const prayerTime = formatArabicTime(new Date());
    
    console.log(`Hijri: ${hijriDate}`);
    console.log(`Time: ${prayerTime}`);
}

// Example 7: Navigation between Ayahs
export function ayahNavigationExample() {
    const { getNextAyah, getPreviousAyah, formatReference, isValidReference } = require('../utils/quranUtils');
    
    let currentSurah = 2;
    let currentAyah = 255;
    
    if (isValidReference(currentSurah, currentAyah)) {
        console.log(`Current: ${formatReference(currentSurah, currentAyah)}`);
        
        const next = getNextAyah(currentSurah, currentAyah);
        if (next) {
            console.log(`Next: ${formatReference(next.surah, next.ayah)}`);
        }
        
        const prev = getPreviousAyah(currentSurah, currentAyah);
        if (prev) {
            console.log(`Previous: ${formatReference(prev.surah, prev.ayah)}`);
        }
    }
}

// Example 8: Audio duration formatting for player
export function audioPlayerExample() {
    const { formatDuration, formatArabicDuration, parseDuration } = require('../utils/formatters');
    
    const durationInSeconds = 245; // 4:05
    
    // Format for display
    const formatted = formatDuration(durationInSeconds);
    const arabicFormatted = formatArabicDuration(durationInSeconds);
    
    console.log(`Duration: ${formatted}`);
    console.log(`Arabic: ${arabicFormatted}`);
    
    // Parse back to seconds if needed
    const parsed = parseDuration(formatted);
    console.log(`Parsed: ${parsed} seconds`);
}

export default {
    bookmarkWorkflowExample,
    readingProgressExample,
    searchQuranExample,
    ThemedQuranDisplayExample,
    settingsPersistenceExample,
    hijriDateFormattingExample,
    ayahNavigationExample,
    audioPlayerExample,
};
