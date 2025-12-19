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
import { Juz } from '../types/quran.types';

type NavigationProp = NativeStackNavigationProp<QuranStackParamList>;

// Convert number to Arabic numerals
const toArabicNumber = (num: number): string => {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num
        .toString()
        .split('')
        .map(digit => arabicNumerals[parseInt(digit)])
        .join('');
};

export const JuzListScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    const handleJuzPress = (juz: Juz) => {
        navigation.navigate('QuranReader', {
            surahId: juz.startSurah,
            ayahId: juz.startAyah
        });
    };

    const getStartSurahName = (juz: Juz) => {
        const surah = SURAHS.find(s => s.id === juz.startSurah);
        return surah?.name || '';
    };

    const renderJuz = ({ item: juz }: { item: Juz }) => (
        <Card onPress={() => handleJuzPress(juz)} style={styles.juzCard} variant="elevated">
            <View style={styles.juzContent}>
                {/* Juz Number */}
                <View style={styles.numberContainer}>
                    <View style={styles.numberBadge}>
                        <Text style={styles.numberText}>{juz.id}</Text>
                    </View>
                </View>

                {/* Juz Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.juzArabicName}>{juz.nameArabic}</Text>
                    <Text style={styles.juzName}>{juz.name}</Text>
                    <Text style={styles.juzDetails}>
                        يبدأ من: {getStartSurahName(juz)} - آية {juz.startAyah}
                    </Text>
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
                <Text style={styles.headerTitle}>الأجزاء الثلاثون</Text>
                <Text style={styles.headerSubtitle}>
                    تصفح القرآن حسب الأجزاء
                </Text>
            </View>

            <FlatList
                data={JUZ_DATA}
                renderItem={renderJuz}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
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
    juzCard: {
        marginBottom: 12,
    },
    juzContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    numberContainer: {
        marginRight: 16,
    },
    numberBadge: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.gold[500],
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.neutral.white,
    },
    infoContainer: {
        flex: 1,
    },
    juzArabicName: {
        fontSize: 20,
        fontWeight: '600',
        color: COLORS.neutral.gray[900],
        marginBottom: 2,
    },
    juzName: {
        fontSize: 14,
        color: COLORS.neutral.gray[600],
        marginBottom: 4,
    },
    juzDetails: {
        fontSize: 12,
        color: COLORS.neutral.gray[500],
    },
    arrow: {
        fontSize: 20,
        color: COLORS.primary[500],
    },
});

export default JuzListScreen;
