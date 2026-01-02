import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { QuranStackParamList } from '../types/navigation.types';
import { useQuran } from '../hooks/useQuran';
import { useAudio } from '../hooks/useAudio';
import { useBookmarks } from '../hooks/useBookmarks';
import { AyahCard } from '../components/quran/AyahCard';
import { SurahHeader } from '../components/quran/SurahHeader';
import { COLORS } from '../constants/colors';
import { Loading } from '../components/common/Loading';

type Props = NativeStackScreenProps<QuranStackParamList, 'QuranReader'>;

export const QuranReaderScreen: React.FC<Props> = ({ route, navigation }) => {
    const { surahId, ayahId } = route.params;
    const { currentSurah, ayahs, isLoading, error, loadSurah } = useQuran();
    const { playSound, pauseSound, isPlaying, currentSurahId, currentAyahNumber } = useAudio();
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (surahId) {
            loadSurah(surahId);
        }
    }, [surahId, loadSurah]);

    // Scroll to specific ayah if provided
    useEffect(() => {
        if (ayahId && ayahs.length > 0 && flatListRef.current) {
            const index = ayahs.findIndex((a: any) => a.numberInSurah === ayahId);
            if (index !== -1) {
                setTimeout(() => {
                    flatListRef.current?.scrollToIndex({
                        index,
                        animated: true,
                        viewPosition: 0,
                    });
                }, 500);
            }
        }
    }, [ayahId, ayahs]);

    const handlePlayAyah = (surahId: number, ayahId: number) => {
        if (isPlaying && currentSurahId === surahId && currentAyahNumber === ayahId) {
            pauseSound();
        } else {
            playSound(surahId, ayahId);
        }
    };

    const handleBookmarkToggle = (surahId: number, ayahId: number, page: number) => {
        toggleBookmark(surahId, ayahId, page);
    };

    if (isLoading && ayahs.length === 0) {
        return <Loading fullScreen text="جاري تحميل السورة..." />;
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={ayahs}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    currentSurah ? <SurahHeader surah={currentSurah} /> : null
                }
                renderItem={({ item }) => (
                    <AyahCard
                        ayah={item}
                        isHighlighted={currentSurahId === item.surahId && currentAyahNumber === item.numberInSurah}
                        isBookmarked={isBookmarked(item.surahId, item.numberInSurah)}
                        onPlayPress={() => handlePlayAyah(item.surahId, item.numberInSurah)}
                        onBookmarkPress={() => handleBookmarkToggle(item.surahId, item.numberInSurah, item.page || 1)}
                    />
                )}
                onScrollToIndexFailed={(info) => {
                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    wait.then(() => {
                        flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                    });
                }}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.cream[50],
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.cream[50],
    },
    errorText: {
        color: COLORS.error,
        fontSize: 16,
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: 20,
    },
});

export default QuranReaderScreen;
