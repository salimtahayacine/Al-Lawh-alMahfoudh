import { RECITERS } from '../../constants/config';

export const AudioApi = {
    // Generate audio URL for a specific ayah
    getAyahAudioUrl: (reciterId: string, surahId: number, ayahNumber: number): string => {
        const reciter = RECITERS.find(r => r.id === reciterId) || RECITERS[0];

        // Format numbers to 3 digits (e.g. 001, 012, 114)
        const formattedSurah = surahId.toString().padStart(3, '0');
        const formattedAyah = ayahNumber.toString().padStart(3, '0');

        return `${reciter.baseUrl}/${formattedSurah}${formattedAyah}.mp3`;
    },

    // Get reciter info
    getReciter: (reciterId: string) => {
        return RECITERS.find(r => r.id === reciterId);
    }
};
