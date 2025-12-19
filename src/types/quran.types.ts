// Surah (Sourate) interface
export interface Surah {
    id: number;
    name: string;           // الفاتحة (Arabic name)
    transliteration: string; // Al-Fatiha
    translation: string;    // The Opening (English meaning)
    revelation: 'Meccan' | 'Medinan';
    numberOfAyahs: number;
    juz: number[];
    page: number;
}

// Ayah (Verset) interface
export interface Ayah {
    id: number;
    surahId: number;
    numberInSurah: number;
    numberInQuran: number;
    text: string;           // Texte arabe simple
    textUthmani: string;    // Police Uthmani
    juz: number;
    hizb: number;
    page: number;
    sajda?: boolean;        // Verse with prostration
}

// Translation interface
export interface Translation {
    ayahId: number;
    language: string;
    translator: string;
    text: string;
}

// Bookmark interface
export interface Bookmark {
    id: string;
    surahId: number;
    ayahId: number;
    page: number;
    note?: string;
    color?: string;
    createdAt: Date;
}

// Audio Recitation interface
export interface AudioRecitation {
    reciterId: string;
    reciterName: string;
    reciterNameArabic: string;
    surahId: number;
    url: string;
    isDownloaded: boolean;
    localPath?: string;
}

// Reciter interface
export interface Reciter {
    id: string;
    name: string;
    nameArabic: string;
    style?: string;
    baseUrl: string;
}

// Juz (Part) interface
export interface Juz {
    id: number;
    name: string;
    nameArabic: string;
    startSurah: number;
    startAyah: number;
    endSurah: number;
    endAyah: number;
}

// Hizb (Half of Juz) interface
export interface Hizb {
    id: number;
    juzId: number;
    quarter: 1 | 2 | 3 | 4;
    startSurah: number;
    startAyah: number;
}

// Reading Progress interface
export interface ReadingProgress {
    lastReadSurah: number;
    lastReadAyah: number;
    lastReadPage: number;
    lastReadDate: Date;
    totalPagesRead: number;
    completionPercentage: number;
}

// User Settings interface
export interface UserSettings {
    theme: 'light' | 'dark' | 'system';
    fontSize: number;
    fontFamily: 'uthmani' | 'amiri' | 'naskh';
    showTranslation: boolean;
    translationLanguage: string;
    selectedReciter: string;
    autoPlayNext: boolean;
    repeatMode: 'none' | 'ayah' | 'surah' | 'page';
    playbackSpeed: number;
}

// Search Result interface
export interface SearchResult {
    surahId: number;
    surahName: string;
    ayahNumber: number;
    text: string;
    matchedText: string;
}

// Tafsir (Exegesis) interface
export interface Tafsir {
    id: string;
    name: string;
    author: string;
    language: string;
}

export interface TafsirContent {
    tafsirId: string;
    ayahId: number;
    text: string;
}
