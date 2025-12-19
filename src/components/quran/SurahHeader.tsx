import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Surah } from '../../types/quran.types';
import { COLORS, BISMILLAH } from '../../constants';

interface SurahHeaderProps {
    surah: Surah;
    showBismillah?: boolean;
}

export const SurahHeader: React.FC<SurahHeaderProps> = ({
    surah,
    showBismillah = true,
}) => {
    // Surah At-Tawbah (9) doesn't start with Bismillah
    const shouldShowBismillah = showBismillah && surah.id !== 9 && surah.id !== 1;

    return (
        <View style={styles.container}>
            {/* Surah Name Banner */}
            <View style={styles.banner}>
                <View style={styles.decoration}>
                    <Text style={styles.decorationText}>❋</Text>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.surahName}>{surah.name}</Text>
                    <Text style={styles.surahInfo}>
                        {surah.transliteration} • {surah.numberOfAyahs} آية
                    </Text>
                </View>

                <View style={styles.decoration}>
                    <Text style={styles.decorationText}>❋</Text>
                </View>
            </View>

            {/* Surah Details */}
            <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>النزول</Text>
                    <Text style={styles.detailValue}>
                        {surah.revelation === 'Meccan' ? 'مكية' : 'مدنية'}
                    </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>الجزء</Text>
                    <Text style={styles.detailValue}>{surah.juz[0]}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>الصفحة</Text>
                    <Text style={styles.detailValue}>{surah.page}</Text>
                </View>
            </View>

            {/* Bismillah */}
            {shouldShowBismillah && (
                <View style={styles.bismillahContainer}>
                    <Text style={styles.bismillah}>{BISMILLAH}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary[500],
        paddingTop: 20,
        paddingBottom: 24,
        paddingHorizontal: 16,
    },
    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    decoration: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    decorationText: {
        fontSize: 24,
        color: COLORS.gold[400],
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    surahName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.neutral.white,
        textAlign: 'center',
    },
    surahInfo: {
        fontSize: 14,
        color: COLORS.primary[100],
        marginTop: 4,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
    },
    detailItem: {
        flex: 1,
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 12,
        color: COLORS.primary[200],
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.neutral.white,
    },
    divider: {
        width: 1,
        height: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    bismillahContainer: {
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
    },
    bismillah: {
        fontSize: 26,
        color: COLORS.gold[300],
        fontWeight: '500',
    },
});

export default SurahHeader;
