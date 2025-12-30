import { toArabicNumerals } from './arabicUtils';

/**
 * Formatters Utility
 * Functions for formatting numbers, dates, and durations in various formats
 */

/**
 * Format number to Arabic-Indic numerals
 * @param num - Number to format
 * @returns Formatted string with Arabic numerals
 */
export const formatArabicNumber = (num: number): string => {
    return toArabicNumerals(num);
};

/**
 * Format number with leading zeros
 * @param num - Number to format
 * @param length - Total length with padding
 * @returns Padded number string
 */
export const padNumber = (num: number, length: number = 2): string => {
    return num.toString().padStart(length, '0');
};

/**
 * Format audio duration in seconds to MM:SS format
 * @param seconds - Duration in seconds
 * @returns Formatted duration string
 */
export const formatDuration = (seconds: number): string => {
    if (!seconds || seconds < 0) return '00:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${padNumber(mins)}:${padNumber(secs)}`;
};

/**
 * Format audio duration in seconds to HH:MM:SS format
 * @param seconds - Duration in seconds
 * @returns Formatted duration string
 */
export const formatLongDuration = (seconds: number): string => {
    if (!seconds || seconds < 0) return '00:00:00';
    
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${padNumber(hours)}:${padNumber(mins)}:${padNumber(secs)}`;
    }
    
    return `${padNumber(mins)}:${padNumber(secs)}`;
};

/**
 * Format duration in Arabic numerals
 * @param seconds - Duration in seconds
 * @returns Formatted duration with Arabic numerals
 */
export const formatArabicDuration = (seconds: number): string => {
    const formatted = formatDuration(seconds);
    return toArabicNumerals(formatted);
};

/**
 * Parse MM:SS or HH:MM:SS duration string to seconds
 * @param duration - Duration string
 * @returns Total seconds
 */
export const parseDuration = (duration: string): number => {
    if (!duration) return 0;
    
    const parts = duration.split(':').map(p => parseInt(p, 10));
    
    if (parts.length === 2) {
        // MM:SS
        return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
        // HH:MM:SS
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    
    return 0;
};

/**
 * Hijri month names in Arabic
 */
const HIJRI_MONTHS_AR = [
    'محرم',
    'صفر',
    'ربيع الأول',
    'ربيع الثاني',
    'جمادى الأولى',
    'جمادى الثانية',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذو القعدة',
    'ذو الحجة',
];

/**
 * Hijri month names in English
 */
const HIJRI_MONTHS_EN = [
    'Muharram',
    'Safar',
    'Rabi\' al-Awwal',
    'Rabi\' al-Thani',
    'Jumada al-Ula',
    'Jumada al-Akhirah',
    'Rajab',
    'Sha\'ban',
    'Ramadan',
    'Shawwal',
    'Dhu al-Qi\'dah',
    'Dhu al-Hijjah',
];

/**
 * Gregorian month names in Arabic
 */
const GREGORIAN_MONTHS_AR = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
];

/**
 * Format Hijri date
 * @param day - Day of month
 * @param month - Month number (1-12)
 * @param year - Hijri year
 * @param locale - 'ar' or 'en'
 * @returns Formatted Hijri date
 */
export const formatHijriDate = (
    day: number,
    month: number,
    year: number,
    locale: 'ar' | 'en' = 'ar'
): string => {
    const monthName = locale === 'ar' ? HIJRI_MONTHS_AR[month - 1] : HIJRI_MONTHS_EN[month - 1];
    
    if (locale === 'ar') {
        return `${toArabicNumerals(day)} ${monthName} ${toArabicNumerals(year)} هـ`;
    }
    
    return `${day} ${monthName} ${year} AH`;
};

/**
 * Format Gregorian date in Arabic style
 * @param date - Date object
 * @returns Formatted date string in Arabic
 */
export const formatArabicDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    
    return `${toArabicNumerals(day)} ${GREGORIAN_MONTHS_AR[month]} ${toArabicNumerals(year)}`;
};

/**
 * Format date in standard format
 * @param date - Date object
 * @param format - Format type ('short', 'medium', 'long')
 * @returns Formatted date string
 */
export const formatDate = (date: Date, format: 'short' | 'medium' | 'long' = 'medium'): string => {
    const day = padNumber(date.getDate());
    const month = padNumber(date.getMonth() + 1);
    const year = date.getFullYear();
    
    switch (format) {
        case 'short':
            return `${day}/${month}/${year}`;
        case 'medium':
            return `${day}/${month}/${year}`;
        case 'long':
            const monthName = date.toLocaleString('en-US', { month: 'long' });
            return `${day} ${monthName} ${year}`;
        default:
            return `${day}/${month}/${year}`;
    }
};

/**
 * Format relative time (e.g., "2 hours ago")
 * @param date - Date to format
 * @param locale - Language locale
 * @returns Relative time string
 */
export const formatRelativeTime = (date: Date, locale: 'ar' | 'en' = 'en'): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (locale === 'ar') {
        if (diffSecs < 60) return 'الآن';
        if (diffMins < 60) return `منذ ${toArabicNumerals(diffMins)} دقيقة`;
        if (diffHours < 24) return `منذ ${toArabicNumerals(diffHours)} ساعة`;
        if (diffDays < 30) return `منذ ${toArabicNumerals(diffDays)} يوم`;
        return formatArabicDate(date);
    }
    
    if (diffSecs < 60) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return formatDate(date);
};

/**
 * Format time to HH:MM format
 * @param date - Date object
 * @param use24Hour - Use 24-hour format
 * @returns Formatted time string
 */
export const formatTime = (date: Date, use24Hour: boolean = true): string => {
    let hours = date.getHours();
    const minutes = padNumber(date.getMinutes());
    
    if (!use24Hour) {
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${period}`;
    }
    
    return `${padNumber(hours)}:${minutes}`;
};

/**
 * Format time in Arabic
 * @param date - Date object
 * @returns Formatted time in Arabic numerals
 */
export const formatArabicTime = (date: Date): string => {
    const formatted = formatTime(date);
    return toArabicNumerals(formatted);
};

/**
 * Format file size in human-readable format
 * @param bytes - Size in bytes
 * @param locale - Language locale
 * @returns Formatted size string
 */
export const formatFileSize = (bytes: number, locale: 'ar' | 'en' = 'en'): string => {
    if (bytes === 0) return locale === 'ar' ? '٠ بايت' : '0 Bytes';
    
    const k = 1024;
    const sizes = locale === 'ar'
        ? ['بايت', 'كيلوبايت', 'ميغابايت', 'غيغابايت']
        : ['Bytes', 'KB', 'MB', 'GB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = (bytes / Math.pow(k, i)).toFixed(2);
    
    if (locale === 'ar') {
        return `${toArabicNumerals(size)} ${sizes[i]}`;
    }
    
    return `${size} ${sizes[i]}`;
};

/**
 * Format percentage
 * @param value - Percentage value (0-100)
 * @param locale - Language locale
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, locale: 'ar' | 'en' = 'en'): string => {
    const rounded = Math.round(value);
    
    if (locale === 'ar') {
        return `${toArabicNumerals(rounded)}٪`;
    }
    
    return `${rounded}%`;
};

/**
 * Format ordinal number (1st, 2nd, 3rd, etc.)
 * @param num - Number to format
 * @returns Formatted ordinal string
 */
export const formatOrdinal = (num: number): string => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const value = num % 100;
    
    return num + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
};

/**
 * Format large numbers with separators
 * @param num - Number to format
 * @param locale - Language locale
 * @returns Formatted number string
 */
export const formatNumber = (num: number, locale: 'ar' | 'en' = 'en'): string => {
    const formatted = num.toLocaleString('en-US');
    
    if (locale === 'ar') {
        return toArabicNumerals(formatted);
    }
    
    return formatted;
};

export default {
    formatArabicNumber,
    padNumber,
    formatDuration,
    formatLongDuration,
    formatArabicDuration,
    parseDuration,
    formatHijriDate,
    formatArabicDate,
    formatDate,
    formatRelativeTime,
    formatTime,
    formatArabicTime,
    formatFileSize,
    formatPercentage,
    formatOrdinal,
    formatNumber,
    HIJRI_MONTHS_AR,
    HIJRI_MONTHS_EN,
    GREGORIAN_MONTHS_AR,
};
