import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { QuranStackParamList } from '../types/navigation.types';
import { Card } from '../components/common/Card';
import { COLORS, JUZ_DATA, SURAHS } from '../constants';

type NavigationProp = NativeStackNavigationProp<QuranStackParamList>;

// Generate Hizb data from Juz (2 hizbs per juz)
const HIZB_DATA = JUZ_DATA.flatMap(juz => [
    {
        id: (juz.id - 1) * 2 + 1,
        juzId: juz.id,
        name: `الحزب ${(juz.id - 1) * 2 + 1}`,
        startSurah: juz.startSurah,
        startAyah: juz.startAyah,
        half: 'first' as const,
    },
    {
        id: (juz.id - 1) * 2 + 2,
        juzId: juz.id,
        name: `الحزب ${(juz.id - 1) * 2 + 2}`,
        // Approximate - in real app would have exact data
        startSurah: juz.startSurah,
        startAyah: juz.startAyah,
        half: 'second' as const,
    },
]);

export const HizbListScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    const handleHizbPress = (hizb: typeof HIZB_DATA[0]) => {
        navigation.navigate('QuranReader', {
            surahId: hizb.startSurah,
            ayahId: hizb.startAyah
        });
    };

    const getStartSurahName = (surahId: number) => {
        const surah = SURAHS.find(s => s.id === surahId);
        return surah?.name || '';
    };

    const renderHizb = ({ item: hizb }: { item: typeof HIZB_DATA[0] }) => (
        <Card onPress={() => handleHizbPress(hizb)} style={styles.hizbCard} variant="elevated">
            <View style={styles.hizbContent}>
                {/* Hizb Number */}
                <View style={styles.numberContainer}>
                    <View style={[
                        styles.numberBadge,
                        hizb.half === 'first' ? styles.firstHalf : styles.secondHalf
                    ]}>
                        <Text style={styles.numberText}>{hizb.id}</Text>
                    </View>
                </View>

                {/* Hizb Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.hizbName}>{hizb.name}</Text>
                    <Text style={styles.juzInfo}>الجزء {hizb.juzId}</Text>
                    <Text style={styles.hizbDetails}>
                        {getStartSurahName(hizb.startSurah)}
                    </Text>
                </View>

                {/* Quarter indicators */}
                <View style={styles.quartersContainer}>
                    <View style={styles.quarter} />
                    <View style={styles.quarter} />
                    <View style={styles.quarter} />
                    <View style={styles.quarter} />
                </View>

                {/* Arrow */}
                <Text style={styles.arrow}>←</Text>
            </View>
        </Card>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>الأحزاب الستون</Text>
                <Text style={styles.headerSubtitle}>
                    كل جزء يحتوي على حزبين
                </Text>
            </View>

            <FlatList
                data={HIZB_DATA}
                renderItem={renderHizb}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                initialNumToRender={20}
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
        backgroundColor: COLORS.primary[500],
        padding: 20,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.neutral.white,
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: COLORS.primary[200],
    },
    listContent: {
        padding: 16,
        paddingBottom: 24,
    },
    hizbCard: {
        marginBottom: 8,
    },
    hizbContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
    },
    numberContainer: {
        marginRight: 14,
    },
    numberBadge: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
    },
    firstHalf: {
        backgroundColor: COLORS.primary[500],
    },
    secondHalf: {
        backgroundColor: COLORS.gold[500],
    },
    numberText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.neutral.white,
    },
    infoContainer: {
        flex: 1,
    },
    hizbName: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.neutral.gray[900],
    },
    juzInfo: {
        fontSize: 12,
        color: COLORS.primary[500],
        fontWeight: '500',
        marginTop: 2,
    },
    hizbDetails: {
        fontSize: 12,
        color: COLORS.neutral.gray[500],
        marginTop: 2,
    },
    quartersContainer: {
        flexDirection: 'row',
        gap: 4,
        marginRight: 12,
    },
    quarter: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.neutral.gray[200],
    },
    arrow: {
        fontSize: 18,
        color: COLORS.primary[500],
    },
});

export default HizbListScreen;
