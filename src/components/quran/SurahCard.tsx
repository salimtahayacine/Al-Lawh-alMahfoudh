import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Surah } from '../../types/quran.types';
import { Card } from '../common/Card';
import { COLORS } from '../../constants/colors';

interface SurahCardProps {
    surah: Surah;
    onPress: () => void;
    showDetails?: boolean;
}

// Convert number to Arabic numerals
const toArabicNumber = (num: number): string => {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num
        .toString()
        .split('')
        .map(digit => arabicNumerals[parseInt(digit)])
        .join('');
};

export const SurahCard: React.FC<SurahCardProps> = ({
    surah,
    onPress,
    showDetails = true,
}) => {
    return (
        <Card onPress={onPress} style={styles.card} variant="elevated" padding="none">
            <View style={styles.container}>
                {/* Surah Number */}
                <View style={styles.numberContainer}>
                    <View style={styles.numberBadge}>
                        <Text style={styles.number}>{surah.id}</Text>
                    </View>
                </View>

                {/* Surah Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.arabicName}>{surah.name}</Text>
                    <Text style={styles.transliteration}>{surah.transliteration}</Text>
                    {showDetails && (
                        <Text style={styles.translation}>{surah.translation}</Text>
                    )}
                </View>

                {/* Surah Details */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.ayahCount}>
                        {surah.numberOfAyahs} آية
                    </Text>
                    <View style={[
                        styles.revelationBadge,
                        surah.revelation === 'Meccan' ? styles.meccanBadge : styles.medinanBadge
                    ]}>
                        <Text style={styles.revelationType}>
                            {surah.revelation === 'Meccan' ? 'مكية' : 'مدنية'}
                        </Text>
                    </View>
                </View>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginVertical: 6,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    numberContainer: {
        marginRight: 16,
    },
    numberBadge: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.primary[500],
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        color: COLORS.neutral.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoContainer: {
        flex: 1,
    },
    arabicName: {
        fontSize: 22,
        fontWeight: '600',
        color: COLORS.neutral.gray[900],
        textAlign: 'left',
    },
    transliteration: {
        fontSize: 14,
        color: COLORS.neutral.gray[600],
        marginTop: 2,
    },
    translation: {
        fontSize: 12,
        color: COLORS.neutral.gray[500],
        marginTop: 2,
    },
    detailsContainer: {
        alignItems: 'flex-end',
    },
    ayahCount: {
        fontSize: 14,
        color: COLORS.neutral.gray[600],
        marginBottom: 4,
    },
    revelationBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    meccanBadge: {
        backgroundColor: COLORS.gold[100],
    },
    medinanBadge: {
        backgroundColor: COLORS.primary[100],
    },
    revelationType: {
        fontSize: 11,
        fontWeight: '500',
        color: COLORS.neutral.gray[700],
    },
});

export default SurahCard;
