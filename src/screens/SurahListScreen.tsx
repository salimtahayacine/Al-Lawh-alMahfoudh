import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { QuranStackParamList } from '../types/navigation.types';
import { SurahCard } from '../components/quran/SurahCard';
import { COLORS, SURAHS } from '../constants';
import { Surah } from '../types/quran.types';

type NavigationProp = NativeStackNavigationProp<QuranStackParamList>;

export const SurahListScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | 'meccan' | 'medinan'>('all');

    const filteredSurahs = useMemo(() => {
        let result = SURAHS;

        // Apply revelation filter
        if (filter === 'meccan') {
            result = result.filter(s => s.revelation === 'Meccan');
        } else if (filter === 'medinan') {
            result = result.filter(s => s.revelation === 'Medinan');
        }

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                s =>
                    s.name.includes(searchQuery) ||
                    s.transliteration.toLowerCase().includes(query) ||
                    s.translation.toLowerCase().includes(query) ||
                    s.id.toString() === query
            );
        }

        return result;
    }, [searchQuery, filter]);

    const handleSurahPress = (surah: Surah) => {
        navigation.navigate('QuranReader', { surahId: surah.id });
    };

    const renderHeader = () => (
        <View style={styles.header}>
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

            {/* Filter Tabs */}
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[styles.filterTab, filter === 'all' && styles.filterTabActive]}
                    onPress={() => setFilter('all')}
                >
                    <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
                        الكل ({SURAHS.length})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterTab, filter === 'meccan' && styles.filterTabActive]}
                    onPress={() => setFilter('meccan')}
                >
                    <Text style={[styles.filterText, filter === 'meccan' && styles.filterTextActive]}>
                        مكية ({SURAHS.filter(s => s.revelation === 'Meccan').length})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterTab, filter === 'medinan' && styles.filterTabActive]}
                    onPress={() => setFilter('medinan')}
                >
                    <Text style={[styles.filterText, filter === 'medinan' && styles.filterTextActive]}>
                        مدنية ({SURAHS.filter(s => s.revelation === 'Medinan').length})
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderSurah = ({ item }: { item: Surah }) => (
        <SurahCard surah={item} onPress={() => handleSurahPress(item)} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredSurahs}
                renderItem={renderSurah}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                initialNumToRender={15}
                maxToRenderPerBatch={10}
                windowSize={5}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>📖</Text>
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
    filterContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    filterTab: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: COLORS.neutral.white,
        alignItems: 'center',
    },
    filterTabActive: {
        backgroundColor: COLORS.primary[500],
    },
    filterText: {
        fontSize: 13,
        color: COLORS.neutral.gray[600],
        fontWeight: '500',
    },
    filterTextActive: {
        color: COLORS.neutral.white,
    },
    listContent: {
        paddingBottom: 24,
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

export default SurahListScreen;
