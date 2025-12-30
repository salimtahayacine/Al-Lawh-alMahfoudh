/**
 * Arabic Text Utilities
 * Functions for formatting, normalizing, and working with Arabic text
 */

// Arabic diacritics (tashkeel) Unicode ranges
const ARABIC_DIACRITICS = /[\u064B-\u065F\u0670\u0671]/g;

// Arabic letters range
const ARABIC_LETTERS = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g;

// Arabic numerals
const ARABIC_NUMERALS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

// Arabic diacritics map
const DIACRITICS = {
    FATHA: '\u064E',           // َ
    KASRA: '\u0650',           // ِ
    DAMMA: '\u064F',           // ُ
    SUKUN: '\u0652',           // ْ
    SHADDA: '\u0651',          // ّ
    TANWEEN_FATH: '\u064B',    // ً
    TANWEEN_KASR: '\u064D',    // ٍ
    TANWEEN_DAMM: '\u064C',    // ٌ
    MADDAH: '\u0653',          // ٓ
    HAMZA_ABOVE: '\u0654',     // ٔ
    HAMZA_BELOW: '\u0655',     // ٕ
};

/**
 * Remove all diacritics (tashkeel) from Arabic text
 * @param text - Arabic text with diacritics
 * @returns Text without diacritics
 */
export const removeDiacritics = (text: string): string => {
    if (!text) return '';
    return text.replace(ARABIC_DIACRITICS, '');
};

/**
 * Normalize Arabic text for comparison
 * Removes diacritics and normalizes similar characters
 * @param text - Arabic text to normalize
 * @returns Normalized text
 */
export const normalizeArabic = (text: string): string => {
    if (!text) return '';
    
    let normalized = text;
    
    // Remove diacritics
    normalized = removeDiacritics(normalized);
    
    // Normalize Alef variations to base Alef
    normalized = normalized.replace(/[أإآٱ]/g, 'ا');
    
    // Normalize Teh Marbuta to Heh
    normalized = normalized.replace(/ة/g, 'ه');
    
    // Normalize Yeh variations
    normalized = normalized.replace(/[ىئ]/g, 'ي');
    
    // Remove Tatweel (elongation character)
    normalized = normalized.replace(/ـ/g, '');
    
    // Trim whitespace
    normalized = normalized.trim();
    
    return normalized;
};

/**
 * Check if text contains Arabic characters
 * @param text - Text to check
 * @returns True if text contains Arabic
 */
export const containsArabic = (text: string): boolean => {
    if (!text) return false;
    return ARABIC_LETTERS.test(text);
};

/**
 * Check if text is entirely Arabic
 * @param text - Text to check
 * @returns True if text is all Arabic
 */
export const isArabic = (text: string): boolean => {
    if (!text) return false;
    const arabicChars = text.match(ARABIC_LETTERS);
    // Remove whitespace, digits, and common punctuation
    const totalLetters = text.replace(/[\s\d.,;!?()[\]{}'"]/g, '').length;
    return arabicChars !== null && arabicChars.length === totalLetters;
};

/**
 * Count Arabic words in text
 * @param text - Arabic text
 * @returns Number of words
 */
export const countWords = (text: string): number => {
    if (!text) return 0;
    const words = text.trim().split(/\s+/);
    return words.filter(word => containsArabic(word)).length;
};

/**
 * Convert Western/English numerals to Arabic-Indic numerals
 * @param num - Number or string with Western numerals
 * @returns String with Arabic numerals
 */
export const toArabicNumerals = (num: number | string): string => {
    const str = num.toString();
    let result = '';
    
    for (let i = 0; i < str.length; i++) {
        const digit = parseInt(str[i], 10);
        if (!isNaN(digit)) {
            result += ARABIC_NUMERALS[digit];
        } else {
            result += str[i];
        }
    }
    
    return result;
};

/**
 * Convert Arabic-Indic numerals to Western numerals
 * @param text - String with Arabic numerals
 * @returns String with Western numerals
 */
export const fromArabicNumerals = (text: string): string => {
    if (!text) return '';
    
    let result = text;
    ARABIC_NUMERALS.forEach((arabicNum, index) => {
        result = result.replace(new RegExp(arabicNum, 'g'), index.toString());
    });
    
    return result;
};

/**
 * Search for a term in Arabic text (ignoring diacritics)
 * @param text - Text to search in
 * @param searchTerm - Term to search for
 * @returns True if found
 */
export const searchArabic = (text: string, searchTerm: string): boolean => {
    if (!text || !searchTerm) return false;
    
    const normalizedText = normalizeArabic(text);
    const normalizedSearch = normalizeArabic(searchTerm);
    
    return normalizedText.includes(normalizedSearch);
};

/**
 * Find all occurrences of a term in Arabic text
 * @param text - Text to search in
 * @param searchTerm - Term to search for
 * @returns Array of match positions
 */
export const findAllOccurrences = (text: string, searchTerm: string): number[] => {
    if (!text || !searchTerm) return [];
    
    const normalizedText = normalizeArabic(text);
    const normalizedSearch = normalizeArabic(searchTerm);
    const positions: number[] = [];
    
    let index = normalizedText.indexOf(normalizedSearch);
    while (index !== -1) {
        positions.push(index);
        index = normalizedText.indexOf(normalizedSearch, index + 1);
    }
    
    return positions;
};

/**
 * Highlight search term in Arabic text
 * @param text - Original text
 * @param searchTerm - Term to highlight
 * @param highlightStart - String to insert before match (e.g., '<mark>')
 * @param highlightEnd - String to insert after match (e.g., '</mark>')
 * @returns Text with highlights
 */
export const highlightSearchTerm = (
    text: string,
    searchTerm: string,
    highlightStart = '<mark>',
    highlightEnd = '</mark>'
): string => {
    if (!text || !searchTerm) return text;
    
    const normalizedText = normalizeArabic(text);
    const normalizedSearch = normalizeArabic(searchTerm);
    
    const positions = findAllOccurrences(text, searchTerm);
    if (positions.length === 0) return text;
    
    let result = '';
    let lastIndex = 0;
    
    positions.forEach(pos => {
        // Find the actual position in original text considering diacritics
        let actualPos = 0;
        let normalizedPos = 0;
        
        while (normalizedPos < pos && actualPos < text.length) {
            if (!ARABIC_DIACRITICS.test(text[actualPos])) {
                normalizedPos++;
            }
            actualPos++;
        }
        
        // Find end position
        let searchLength = 0;
        let actualSearchLength = 0;
        
        while (searchLength < normalizedSearch.length && actualPos + actualSearchLength < text.length) {
            if (!ARABIC_DIACRITICS.test(text[actualPos + actualSearchLength])) {
                searchLength++;
            }
            actualSearchLength++;
        }
        
        result += text.substring(lastIndex, actualPos);
        result += highlightStart;
        result += text.substring(actualPos, actualPos + actualSearchLength);
        result += highlightEnd;
        
        lastIndex = actualPos + actualSearchLength;
    });
    
    result += text.substring(lastIndex);
    
    return result;
};

/**
 * Get text direction (RTL for Arabic)
 * @param text - Text to check
 * @returns 'rtl' for Arabic text, 'ltr' otherwise
 */
export const getTextDirection = (text: string): 'rtl' | 'ltr' => {
    return containsArabic(text) ? 'rtl' : 'ltr';
};

/**
 * Format Arabic text for display
 * Ensures proper spacing and formatting
 * @param text - Arabic text
 * @returns Formatted text
 */
export const formatForDisplay = (text: string): string => {
    if (!text) return '';
    
    let formatted = text;
    
    // Replace multiple spaces with single space
    formatted = formatted.replace(/\s+/g, ' ');
    
    // Trim whitespace
    formatted = formatted.trim();
    
    // Ensure proper spacing around punctuation
    formatted = formatted.replace(/\s*([،؛؟])\s*/g, '$1 ');
    
    return formatted;
};

/**
 * Extract Arabic text from mixed content
 * @param text - Mixed Arabic and non-Arabic text
 * @returns Only the Arabic portions
 */
export const extractArabic = (text: string): string => {
    if (!text) return '';
    
    const matches = text.match(ARABIC_LETTERS);
    return matches ? matches.join('') : '';
};

/**
 * Check if character is an Arabic diacritic
 * @param char - Character to check
 * @returns True if diacritic
 */
export const isDiacritic = (char: string): boolean => {
    return ARABIC_DIACRITICS.test(char);
};

/**
 * Get only base letters (remove diacritics and whitespace)
 * @param text - Arabic text
 * @returns Base letters only
 */
export const getBaseLetters = (text: string): string => {
    if (!text) return '';
    return removeDiacritics(text).replace(/\s/g, '');
};

/**
 * Compare two Arabic texts ignoring diacritics and formatting
 * @param text1 - First text
 * @param text2 - Second text
 * @returns True if texts match
 */
export const compareArabic = (text1: string, text2: string): boolean => {
    if (!text1 && !text2) return true;
    if (!text1 || !text2) return false;
    
    return normalizeArabic(text1) === normalizeArabic(text2);
};

export default {
    removeDiacritics,
    normalizeArabic,
    containsArabic,
    isArabic,
    countWords,
    toArabicNumerals,
    fromArabicNumerals,
    searchArabic,
    findAllOccurrences,
    highlightSearchTerm,
    getTextDirection,
    formatForDisplay,
    extractArabic,
    isDiacritic,
    getBaseLetters,
    compareArabic,
    DIACRITICS,
};
