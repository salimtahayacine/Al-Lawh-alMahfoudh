import axios from 'axios';
import { Ayah } from '../../types/quran.types';

const BASE_URL = 'https://api.quran.com/api/v4';

// Configure axios
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 15000, // Increased timeout for large surahs
});

export const QuranApi = {
    // Get full surah with text
    getSurah: async (surahId: number): Promise<Ayah[]> => {
        try {
            console.log(`Fetching surah ${surahId} from api.quran.com...`);
            // per_page=300 covers even Al-Baqarah (286 verses)
            const response = await api.get(`/verses/by_chapter/${surahId}`, {
                params: {
                    language: 'en',
                    fields: 'text_uthmani,chapter_id,hizb_number,text_imlaei,page_number,juz_number',
                    per_page: 300,
                }
            });

            if (response.status === 200 && response.data.verses) {
                return response.data.verses.map((verse: any) => ({
                    id: verse.id,
                    surahId: surahId,
                    numberInSurah: verse.verse_number,
                    numberInQuran: verse.id,
                    text: verse.text_uthmani,
                    textUthmani: verse.text_uthmani,
                    juz: verse.juz_number,
                    hizb: verse.hizb_number,
                    page: verse.page_number,
                    sajda: verse.sajdah_number ? true : false, // quran.com returns sajdah info if present
                }));
            }
            throw new Error('Failed to fetch surah');
        } catch (error) {
            console.error('Error fetching surah:', error);
            if (axios.isAxiosError(error) && error.response) {
                console.error('Response data:', error.response.data);
            }
            throw error;
        }
    },

    // Get specific ayah
    getAyah: async (surahId: number, ayahNumber: number): Promise<Ayah> => {
        try {
            const verseKey = `${surahId}:${ayahNumber}`;
            const response = await api.get(`/verses/by_key/${verseKey}`, {
                params: {
                    fields: 'text_uthmani,chapter_id,hizb_number,page_number,juz_number'
                }
            });

            if (response.status === 200 && response.data.verse) {
                const verse = response.data.verse;
                return {
                    id: verse.id,
                    surahId: surahId,
                    numberInSurah: verse.verse_number,
                    numberInQuran: verse.id,
                    text: verse.text_uthmani,
                    textUthmani: verse.text_uthmani,
                    juz: verse.juz_number,
                    hizb: verse.hizb_number,
                    page: verse.page_number,
                    sajda: verse.sajdah_number ? true : false,
                };
            }
            throw new Error('Failed to fetch ayah');
        } catch (error) {
            console.error('Error fetching ayah:', error);
            throw error;
        }
    },

    // Get page
    getPage: async (pageNumber: number): Promise<Ayah[]> => {
        try {
            // per_page=300 covers full page
            const response = await api.get(`/verses/by_page/${pageNumber}`, {
                params: {
                    fields: 'text_uthmani,chapter_id,hizb_number,page_number,juz_number',
                    per_page: 300
                }
            });

            if (response.status === 200 && response.data.verses) {
                return response.data.verses.map((verse: any) => ({
                    id: verse.id,
                    surahId: verse.chapter_id, // API returns chapter_id
                    numberInSurah: verse.verse_number,
                    numberInQuran: verse.id,
                    text: verse.text_uthmani,
                    textUthmani: verse.text_uthmani,
                    juz: verse.juz_number,
                    hizb: verse.hizb_number,
                    page: verse.page_number,
                    sajda: verse.sajdah_number ? true : false,
                }));
            }
            throw new Error('Failed to fetch page');
        } catch (error) {
            console.error('Error fetching page:', error);
            throw error;
        }
    },
};
