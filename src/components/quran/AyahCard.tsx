import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ayah } from '../../types/quran.types';
import { COLORS } from '../../constants/colors';

interface AyahCardProps {
    ayah: Ayah;
    fontSize?: number;
    showNumber?: boolean;
    isHighlighted?: boolean;
    isBookmarked?: boolean;
    onPress?: () => void;
    onLongPress?: () => void;
    onPlayPress?: () => void;
    onBookmarkPress?: () => void;
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

export const AyahCard: React.FC<AyahCardProps> = ({
    ayah,
    fontSize = 24,
    showNumber = true,
    isHighlighted = false,
    isBookmarked = false,
    onPress,
    onLongPress,
    onPlayPress,
    onBookmarkPress,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                isHighlighted && styles.highlighted,
            ]}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.7}
        >
            {/* Ayah Text */}
            <View style={styles.textContainer}>
                <Text style={[styles.ayahText, { fontSize }]}>
                    {ayah.text || ayah.textUthmani}
                    {showNumber && (
                        <Text style={styles.ayahNumber}>
                            {' ﴿' + toArabicNumber(ayah.numberInSurah) + '﴾'}
                        </Text>
                    )}
                </Text>
            </View>

            {/* Action buttons */}
            <View style={styles.actionsContainer}>
                <View style={styles.ayahNumberBadge}>
                    <Text style={styles.ayahNumberText}>{ayah.numberInSurah}</Text>
                </View>

                {onPlayPress && (
                    <TouchableOpacity onPress={onPlayPress} style={styles.actionButton}>
                        <Text style={styles.actionIcon}>▶️</Text>
                    </TouchableOpacity>
                )}

                {onBookmarkPress && (
                    <TouchableOpacity onPress={onBookmarkPress} style={styles.actionButton}>
                        <Text style={styles.actionIcon}>
                            {isBookmarked ? '🔖' : '📑'}
                        </Text>
                    </TouchableOpacity>
                )}

                {ayah.sajda && (
                    <View style={styles.sajdaBadge}>
                        <Text style={styles.sajdaText}>سجدة</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: COLORS.neutral.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.neutral.gray[100],
    },
    highlighted: {
        backgroundColor: COLORS.gold[50],
    },
    textContainer: {
        marginBottom: 12,
    },
    ayahText: {
        fontFamily: 'System', // Will use Uthmani font when available
        lineHeight: 48,
        textAlign: 'right',
        color: COLORS.neutral.gray[900],
        writingDirection: 'rtl',
    },
    ayahNumber: {
        color: COLORS.primary[500],
        fontSize: 20,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 12,
    },
    ayahNumberBadge: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primary[100],
        alignItems: 'center',
        justifyContent: 'center',
    },
    ayahNumberText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.primary[700],
    },
    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.neutral.gray[100],
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionIcon: {
        fontSize: 16,
    },
    sajdaBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: COLORS.gold[100],
        borderRadius: 8,
    },
    sajdaText: {
        fontSize: 10,
        color: COLORS.gold[700],
        fontWeight: '600',
    },
});

export default AyahCard;
