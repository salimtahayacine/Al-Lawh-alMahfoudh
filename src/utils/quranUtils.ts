import { SURAHS, JUZ_DATA, getSurahById, getJuzById } from '../constants/quranData';
import { APP_CONFIG } from '../constants/config';

/**
 * Quran Utilities
 * Functions for calculating page numbers, Juz, Hizb, and reference conversions
 */

// Ayah reference format: "surahNumber:ayahNumber" (e.g., "2:255")
export interface AyahReference {
    surah: number;
    ayah: number;
}

// Page calculation constants
// Note: These are approximations based on standard Mushaf page layout (604 pages)
const AYAHS_PER_PAGE_APPROX = Math.ceil(APP_CONFIG.totalAyahs / APP_CONFIG.totalPages);

/**
 * Calculate the page number for a given Surah
 * @param surahId - Surah number (1-114)
 * @returns Page number where the Surah starts
 */
export const getPageBySurah = (surahId: number): number => {
    const surah = getSurahById(surahId);
    return surah?.page || 1;
};

/**
 * Calculate which Juz a Surah belongs to
 * @param surahId - Surah number (1-114)
 * @returns Array of Juz numbers that contain this Surah
 */
export const getJuzBySurah = (surahId: number): number[] => {
    const surah = getSurahById(surahId);
    return surah?.juz || [1];
};

/**
 * Calculate which Hizb an Ayah belongs to
 * Each Juz has 2 Hizb, so there are 60 Hizb total
 * Each Hizb has 4 quarters (Rub al-Hizb)
 * @param juzNumber - Juz number (1-30)
 * @returns Array of Hizb numbers in this Juz
 */
export const getHizbByJuz = (juzNumber: number): number[] => {
    if (juzNumber < 1 || juzNumber > 30) {
        return [];
    }
    const firstHizb = (juzNumber - 1) * 2 + 1;
    return [firstHizb, firstHizb + 1];
};

/**
 * Calculate approximate page number for a specific Ayah
 * Note: This is an approximation. For exact page numbers, use API data.
 * @param surahId - Surah number (1-114)
 * @param ayahNumber - Ayah number within the Surah
 * @returns Approximate page number
 */
export const getPageByAyah = (surahId: number, ayahNumber: number): number => {
    const surah = getSurahById(surahId);
    if (!surah) return 1;
    
    // Use the starting page of the Surah as base
    // This is a simplified calculation - actual page depends on Ayah length
    const basePage = surah.page;
    
    // Rough estimate: assume average distribution
    const estimatedOffset = Math.floor(ayahNumber / (surah.numberOfAyahs / 2));
    
    return Math.min(basePage + estimatedOffset, APP_CONFIG.totalPages);
};

/**
 * Parse a Quran reference string (e.g., "2:255" -> { surah: 2, ayah: 255 })
 * @param reference - Reference string in format "surah:ayah"
 * @returns Parsed reference object or null if invalid
 */
export const parseReference = (reference: string): AyahReference | null => {
    if (!reference || typeof reference !== 'string') {
        return null;
    }
    
    const parts = reference.split(':');
    if (parts.length !== 2) {
        return null;
    }
    
    const surah = parseInt(parts[0].trim(), 10);
    const ayah = parseInt(parts[1].trim(), 10);
    
    if (isNaN(surah) || isNaN(ayah)) {
        return null;
    }
    
    return { surah, ayah };
};

/**
 * Format an Ayah reference as a string
 * @param surah - Surah number
 * @param ayah - Ayah number
 * @returns Formatted reference string (e.g., "2:255")
 */
export const formatReference = (surah: number, ayah: number): string => {
    return `${surah}:${ayah}`;
};

/**
 * Validate a Quran reference
 * @param surah - Surah number (1-114)
 * @param ayah - Ayah number within the Surah
 * @returns True if the reference is valid
 */
export const isValidReference = (surah: number, ayah: number): boolean => {
    if (surah < 1 || surah > APP_CONFIG.totalSurahs) {
        return false;
    }
    
    const surahData = getSurahById(surah);
    if (!surahData) {
        return false;
    }
    
    return ayah >= 1 && ayah <= surahData.numberOfAyahs;
};

/**
 * Validate a reference string
 * @param reference - Reference string in format "surah:ayah"
 * @returns True if the reference is valid
 */
export const isValidReferenceString = (reference: string): boolean => {
    const parsed = parseReference(reference);
    if (!parsed) {
        return false;
    }
    return isValidReference(parsed.surah, parsed.ayah);
};

/**
 * Get the next Ayah reference
 * @param surah - Current Surah number
 * @param ayah - Current Ayah number
 * @returns Next Ayah reference or null if at the end
 */
export const getNextAyah = (surah: number, ayah: number): AyahReference | null => {
    const surahData = getSurahById(surah);
    if (!surahData) return null;
    
    // If not the last Ayah in Surah, go to next Ayah
    if (ayah < surahData.numberOfAyahs) {
        return { surah, ayah: ayah + 1 };
    }
    
    // If last Ayah in Surah, go to first Ayah of next Surah
    if (surah < APP_CONFIG.totalSurahs) {
        return { surah: surah + 1, ayah: 1 };
    }
    
    // End of Quran
    return null;
};

/**
 * Get the previous Ayah reference
 * @param surah - Current Surah number
 * @param ayah - Current Ayah number
 * @returns Previous Ayah reference or null if at the beginning
 */
export const getPreviousAyah = (surah: number, ayah: number): AyahReference | null => {
    // If not the first Ayah in Surah, go to previous Ayah
    if (ayah > 1) {
        return { surah, ayah: ayah - 1 };
    }
    
    // If first Ayah in Surah, go to last Ayah of previous Surah
    if (surah > 1) {
        const prevSurah = getSurahById(surah - 1);
        if (prevSurah) {
            return { surah: surah - 1, ayah: prevSurah.numberOfAyahs };
        }
    }
    
    // Beginning of Quran
    return null;
};

/**
 * Calculate total Ayahs from the beginning of Quran to a specific reference
 * @param surah - Surah number
 * @param ayah - Ayah number
 * @returns Total number of Ayahs from start
 */
export const getTotalAyahsUpTo = (surah: number, ayah: number): number => {
    let total = 0;
    
    // Add all Ayahs from previous Surahs
    for (let i = 1; i < surah; i++) {
        const surahData = getSurahById(i);
        if (surahData) {
            total += surahData.numberOfAyahs;
        }
    }
    
    // Add Ayahs from current Surah
    total += ayah;
    
    return total;
};

/**
 * Get Surah and Ayah from absolute Ayah number
 * @param absoluteAyahNumber - Ayah number from 1 to 6236
 * @returns Ayah reference or null if invalid
 */
export const getAyahFromAbsolute = (absoluteAyahNumber: number): AyahReference | null => {
    if (absoluteAyahNumber < 1 || absoluteAyahNumber > APP_CONFIG.totalAyahs) {
        return null;
    }
    
    let remaining = absoluteAyahNumber;
    
    for (let i = 1; i <= APP_CONFIG.totalSurahs; i++) {
        const surah = getSurahById(i);
        if (!surah) continue;
        
        if (remaining <= surah.numberOfAyahs) {
            return { surah: i, ayah: remaining };
        }
        
        remaining -= surah.numberOfAyahs;
    }
    
    return null;
};

/**
 * Calculate reading progress percentage
 * @param currentSurah - Current Surah number
 * @param currentAyah - Current Ayah number
 * @returns Progress percentage (0-100)
 */
export const calculateProgress = (currentSurah: number, currentAyah: number): number => {
    const totalRead = getTotalAyahsUpTo(currentSurah, currentAyah);
    return Math.min(100, Math.round((totalRead / APP_CONFIG.totalAyahs) * 100));
};

/**
 * Get Surahs in a specific Juz
 * @param juzNumber - Juz number (1-30)
 * @returns Array of Surah IDs in this Juz
 */
export const getSurahsInJuz = (juzNumber: number): number[] => {
    if (juzNumber < 1 || juzNumber > APP_CONFIG.totalJuz) {
        return [];
    }
    
    return SURAHS.filter(surah => surah.juz.includes(juzNumber))
        .map(surah => surah.id);
};

/**
 * Get formatted Surah name with number
 * @param surahId - Surah number
 * @param includeTranslation - Whether to include English translation
 * @returns Formatted Surah name
 */
export const getFormattedSurahName = (surahId: number, includeTranslation = false): string => {
    const surah = getSurahById(surahId);
    if (!surah) return '';
    
    if (includeTranslation) {
        return `${surah.id}. ${surah.name} (${surah.transliteration})`;
    }
    
    return `${surah.id}. ${surah.name}`;
};

export default {
    getPageBySurah,
    getJuzBySurah,
    getHizbByJuz,
    getPageByAyah,
    parseReference,
    formatReference,
    isValidReference,
    isValidReferenceString,
    getNextAyah,
    getPreviousAyah,
    getTotalAyahsUpTo,
    getAyahFromAbsolute,
    calculateProgress,
    getSurahsInJuz,
    getFormattedSurahName,
};
