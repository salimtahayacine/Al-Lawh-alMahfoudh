import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation.types';
import { Card } from '../components/common/Card';
import { COLORS, APP_CONFIG, SURAHS } from '../constants';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    // Get a random verse of the day (for demo, using surah Al-Ikhlas)
    const dailySurah = SURAHS.find(s => s.id === 112);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header Banner */}
            <View style={styles.banner}>
                <View style={styles.bannerContent}>
                    <Text style={styles.greeting}>بسم الله الرحمن الرحيم</Text>
                    <Text style={styles.appName}>{APP_CONFIG.name}</Text>
                    <Text style={styles.appNameEn}>{APP_CONFIG.nameEn}</Text>
                </View>
                <View style={styles.bannerDecoration}>
                    <Text style={styles.decorationIcon}>☪</Text>
                </View>
            </View>

            {/* Last Read Section */}
            <Card style={styles.lastReadCard} variant="elevated">
                <View style={styles.lastReadHeader}>
                    <Text style={styles.sectionTitle}>آخر قراءة</Text>
                    <TouchableOpacity>
                        <Text style={styles.continueText}>متابعة ←</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.lastReadContent}>
                    <View style={styles.lastReadInfo}>
                        <Text style={styles.lastSurahName}>سورة الفاتحة</Text>
                        <Text style={styles.lastAyahInfo}>الآية 1 • الصفحة 1</Text>
                    </View>
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: '15%' }]} />
                        </View>
                        <Text style={styles.progressText}>15%</Text>
                    </View>
                </View>
            </Card>

            {/* Quick Access Grid */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>الوصول السريع</Text>
                <View style={styles.quickAccessGrid}>
                    <TouchableOpacity
                        style={styles.quickAccessItem}
                        onPress={() => navigation.navigate('QuranReader', { surahId: 1 })}
                    >
                        <View style={[styles.quickAccessIcon, { backgroundColor: COLORS.primary[100] }]}>
                            <Text style={styles.quickAccessEmoji}>📖</Text>
                        </View>
                        <Text style={styles.quickAccessLabel}>المصحف</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.quickAccessItem}
                        onPress={() => navigation.navigate('Search')}
                    >
                        <View style={[styles.quickAccessIcon, { backgroundColor: COLORS.gold[100] }]}>
                            <Text style={styles.quickAccessEmoji}>🔍</Text>
                        </View>
                        <Text style={styles.quickAccessLabel}>البحث</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.quickAccessItem}
                        onPress={() => navigation.navigate('Qibla')}
                    >
                        <View style={[styles.quickAccessIcon, { backgroundColor: COLORS.primary[100] }]}>
                            <Text style={styles.quickAccessEmoji}>🧭</Text>
                        </View>
                        <Text style={styles.quickAccessLabel}>القبلة</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.quickAccessItem}
                        onPress={() => navigation.navigate('PrayerTimes')}
                    >
                        <View style={[styles.quickAccessIcon, { backgroundColor: COLORS.gold[100] }]}>
                            <Text style={styles.quickAccessEmoji}>🕐</Text>
                        </View>
                        <Text style={styles.quickAccessLabel}>الصلاة</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Daily Verse */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>آية اليوم</Text>
                <Card style={styles.dailyVerseCard} variant="filled">
                    <Text style={styles.dailyVerseText}>
                        قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾
                    </Text>
                    <View style={styles.dailyVerseInfo}>
                        <Text style={styles.dailyVerseSurah}>
                            {dailySurah?.name} - {dailySurah?.transliteration}
                        </Text>
                    </View>
                </Card>
            </View>

            {/* Statistics */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>إحصائيات القرآن</Text>
                <View style={styles.statsGrid}>
                    <Card style={styles.statCard}>
                        <Text style={styles.statValue}>{APP_CONFIG.totalSurahs}</Text>
                        <Text style={styles.statLabel}>سورة</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <Text style={styles.statValue}>{APP_CONFIG.totalAyahs.toLocaleString()}</Text>
                        <Text style={styles.statLabel}>آية</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <Text style={styles.statValue}>{APP_CONFIG.totalJuz}</Text>
                        <Text style={styles.statLabel}>جزء</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <Text style={styles.statValue}>{APP_CONFIG.totalPages}</Text>
                        <Text style={styles.statLabel}>صفحة</Text>
                    </Card>
                </View>
            </View>

            <View style={styles.bottomSpacer} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.cream[50],
    },
    banner: {
        backgroundColor: COLORS.primary[500],
        paddingHorizontal: 24,
        paddingVertical: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bannerContent: {
        flex: 1,
    },
    greeting: {
        fontSize: 18,
        color: COLORS.gold[300],
        marginBottom: 8,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.neutral.white,
    },
    appNameEn: {
        fontSize: 14,
        color: COLORS.primary[200],
        marginTop: 4,
    },
    bannerDecoration: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    decorationIcon: {
        fontSize: 48,
        color: COLORS.gold[400],
    },
    lastReadCard: {
        margin: 16,
        marginTop: -20,
    },
    lastReadHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    continueText: {
        color: COLORS.primary[500],
        fontWeight: '600',
    },
    lastReadContent: {},
    lastReadInfo: {
        marginBottom: 12,
    },
    lastSurahName: {
        fontSize: 20,
        fontWeight: '600',
        color: COLORS.neutral.gray[900],
    },
    lastAyahInfo: {
        fontSize: 14,
        color: COLORS.neutral.gray[600],
        marginTop: 4,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: COLORS.neutral.gray[200],
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.primary[500],
        borderRadius: 4,
    },
    progressText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primary[500],
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.neutral.gray[900],
        marginBottom: 12,
    },
    quickAccessGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    quickAccessItem: {
        width: '22%',
        alignItems: 'center',
    },
    quickAccessIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    quickAccessEmoji: {
        fontSize: 28,
    },
    quickAccessLabel: {
        fontSize: 12,
        color: COLORS.neutral.gray[700],
        textAlign: 'center',
    },
    dailyVerseCard: {
        backgroundColor: COLORS.cream[200],
    },
    dailyVerseText: {
        fontSize: 22,
        lineHeight: 40,
        textAlign: 'center',
        color: COLORS.neutral.gray[900],
        marginBottom: 16,
    },
    dailyVerseInfo: {
        alignItems: 'center',
    },
    dailyVerseSurah: {
        fontSize: 14,
        color: COLORS.primary[600],
        fontWeight: '500',
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary[500],
    },
    statLabel: {
        fontSize: 12,
        color: COLORS.neutral.gray[600],
        marginTop: 4,
    },
    bottomSpacer: {
        height: 24,
    },
});

export default HomeScreen;
