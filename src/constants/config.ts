// API Endpoints
export const API_ENDPOINTS = {
    QURAN_CLOUD: 'https://api.alquran.cloud/v1',
    QURAN_COM: 'https://api.quran.com/api/v4',
    EVERY_AYAH: 'https://everyayah.com/data',
};

// Default Settings
export const DEFAULT_SETTINGS = {
    theme: 'system' as const,
    fontSize: 24,
    fontFamily: 'uthmani' as const,
    showTranslation: true,
    translationLanguage: 'fr',
    selectedReciter: 'ar.alafasy',
    autoPlayNext: true,
    repeatMode: 'none' as const,
    playbackSpeed: 1.0,
};

// App Constants
export const APP_CONFIG = {
    name: 'اللوح المحفوظ',
    nameEn: 'Al-Lawh Al-Mahfoudh',
    version: '1.0.0',
    totalSurahs: 114,
    totalAyahs: 6236,
    totalPages: 604,
    totalJuz: 30,
    totalHizb: 60,
};

// Supported Languages
export const SUPPORTED_LANGUAGES = [
    { code: 'ar', name: 'العربية', nameEn: 'Arabic' },
    { code: 'fr', name: 'Français', nameEn: 'French' },
    { code: 'en', name: 'English', nameEn: 'English' },
    { code: 'ur', name: 'اردو', nameEn: 'Urdu' },
    { code: 'id', name: 'Bahasa Indonesia', nameEn: 'Indonesian' },
    { code: 'tr', name: 'Türkçe', nameEn: 'Turkish' },
];

// Popular Reciters
export const RECITERS = [
    {
        id: 'ar.alafasy',
        name: 'Mishary Rashid Alafasy',
        nameArabic: 'مشاري راشد العفاسي',
        style: 'Murattal',
        baseUrl: 'https://everyayah.com/data/Alafasy_128kbps',
    },
    {
        id: 'ar.husary',
        name: 'Mahmoud Khalil Al-Husary',
        nameArabic: 'محمود خليل الحصري',
        style: 'Murattal',
        baseUrl: 'https://everyayah.com/data/Husary_128kbps',
    },
    {
        id: 'ar.abdulbasit',
        name: 'Abdul Basit Abdul Samad',
        nameArabic: 'عبد الباسط عبد الصمد',
        style: 'Murattal',
        baseUrl: 'https://everyayah.com/data/Abdul_Basit_Murattal_192kbps',
    },
    {
        id: 'ar.minshawi',
        name: 'Mohamed Siddiq El-Minshawi',
        nameArabic: 'محمد صديق المنشاوي',
        style: 'Murattal',
        baseUrl: 'https://everyayah.com/data/Minshawy_Murattal_128kbps',
    },
    {
        id: 'ar.sudais',
        name: 'Abdurrahmaan As-Sudais',
        nameArabic: 'عبدالرحمن السديس',
        style: 'Murattal',
        baseUrl: 'https://everyayah.com/data/Abdurrahmaan_As-Sudais_192kbps',
    },
];

// Storage Keys
export const STORAGE_KEYS = {
    SETTINGS: '@settings',
    BOOKMARKS: '@bookmarks',
    READING_PROGRESS: '@reading_progress',
    READING_HISTORY: '@reading_history',
    DOWNLOADED_AUDIO: '@downloaded_audio',
    LAST_READ: '@last_read',
};

// Font Sizes
export const FONT_SIZES = {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
    arabic: {
        sm: 20,
        base: 24,
        lg: 28,
        xl: 32,
        '2xl': 36,
        '3xl': 40,
    },
};
