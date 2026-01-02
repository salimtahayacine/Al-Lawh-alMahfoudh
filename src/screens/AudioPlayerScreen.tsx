import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { useAudio } from '../hooks/useAudio';
import { COLORS, SURAHS } from '../constants';
import { Surah } from '../types/quran.types';
import { SurahCard } from '../components/quran/SurahCard';

export const AudioPlayerScreen: React.FC = () => {
    const { playSound, pauseSound, stopSound, isPlaying, currentSurahId, currentAyahNumber } = useAudio();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSurahs = useMemo(() => {
        if (!searchQuery.trim()) {
            return SURAHS;
        }

        const query = searchQuery.toLowerCase();
        return SURAHS.filter(
            s =>
                s.name.includes(searchQuery) ||
                s.transliteration.toLowerCase().includes(query) ||
                s.translation.toLowerCase().includes(query) ||
                s.id.toString() === query
        );
    }, [searchQuery]);

    const handleSurahPress = (surah: Surah) => {
        // Play the first ayah of the selected surah
        if (isPlaying && currentSurahId === surah.id) {
            pauseSound();
        } else {
            playSound(surah.id, 1);
        }
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.title}>مشغل القرآن الصوتي</Text>
            
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="البحث عن سورة..."
                    placeholderTextColor={COLORS.neutral.gray[400]}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <Text style={styles.clearIcon}>✕</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Currently Playing Info */}
            {isPlaying && currentSurahId && (
                <View style={styles.nowPlaying}>
                    <Text style={styles.nowPlayingIcon}>🎵</Text>
                    <View style={styles.nowPlayingInfo}>
                        <Text style={styles.nowPlayingText}>قيد التشغيل الآن</Text>
                        <Text style={styles.nowPlayingSurah}>
                            {SURAHS.find(s => s.id === currentSurahId)?.name} - الآية {currentAyahNumber}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={stopSound} style={styles.stopButton}>
                        <Text style={styles.stopIcon}>⏹️</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    const renderSurah = ({ item }: { item: Surah }) => {
        const isCurrentlyPlaying = isPlaying && currentSurahId === item.id;
        
        return (
            <TouchableOpacity
                onPress={() => handleSurahPress(item)}
                style={[
                    styles.surahItem,
                    isCurrentlyPlaying && styles.surahItemPlaying,
                ]}
            >
                <View style={styles.surahNumber}>
                    <Text style={styles.surahNumberText}>{item.id}</Text>
                </View>
                
                <View style={styles.surahInfo}>
                    <Text style={styles.surahName}>{item.name}</Text>
                    <Text style={styles.surahDetails}>
                        {item.transliteration} • {item.numberOfAyahs} آيات • {item.revelation === 'Meccan' ? 'مكية' : 'مدنية'}
                    </Text>
                </View>
                
                <View style={styles.playButtonContainer}>
                    <Text style={styles.playIcon}>
                        {isCurrentlyPlaying ? '⏸️' : '▶️'}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredSurahs}
                renderItem={renderSurah}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>🔍</Text>
                        <Text style={styles.emptyText}>لا توجد نتائج</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.cream[50],
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary[700],
        textAlign: 'center',
        marginBottom: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.neutral.white,
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 12,
        shadowColor: COLORS.neutral.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    searchIcon: {
        fontSize: 18,
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        height: 48,
        fontSize: 16,
        color: COLORS.neutral.gray[900],
    },
    clearIcon: {
        fontSize: 16,
        color: COLORS.neutral.gray[400],
        padding: 4,
    },
    nowPlaying: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary[50],
        borderRadius: 12,
        padding: 12,
        marginTop: 8,
        borderWidth: 1,
        borderColor: COLORS.primary[200],
    },
    nowPlayingIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    nowPlayingInfo: {
        flex: 1,
    },
    nowPlayingText: {
        fontSize: 12,
        color: COLORS.primary[600],
        fontWeight: '600',
    },
    nowPlayingSurah: {
        fontSize: 14,
        color: COLORS.primary[800],
        fontWeight: 'bold',
        marginTop: 2,
    },
    stopButton: {
        padding: 8,
    },
    stopIcon: {
        fontSize: 20,
    },
    listContent: {
        paddingBottom: 24,
    },
    surahItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.neutral.white,
        marginHorizontal: 16,
        marginBottom: 8,
        borderRadius: 12,
        padding: 12,
        shadowColor: COLORS.neutral.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    surahItemPlaying: {
        backgroundColor: COLORS.gold[50],
        borderWidth: 2,
        borderColor: COLORS.primary[300],
    },
    surahNumber: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primary[100],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    surahNumberText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary[700],
    },
    surahInfo: {
        flex: 1,
    },
    surahName: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.neutral.gray[900],
        textAlign: 'right',
    },
    surahDetails: {
        fontSize: 12,
        color: COLORS.neutral.gray[500],
        marginTop: 2,
        textAlign: 'right',
    },
    playButtonContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.primary[500],
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    playIcon: {
        fontSize: 20,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 64,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.neutral.gray[500],
    },
});

export default AudioPlayerScreen;
