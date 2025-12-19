import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { QuranStackParamList } from '../types/navigation.types';
import { Card } from '../components/common/Card';
import { COLORS, APP_CONFIG } from '../constants';

type NavigationProp = NativeStackNavigationProp<QuranStackParamList>;

interface NavCardProps {
    title: string;
    subtitle: string;
    icon: string;
    color: string;
    onPress: () => void;
}

const NavCard: React.FC<NavCardProps> = ({ title, subtitle, icon, color, onPress }) => (
    <Card onPress={onPress} style={styles.navCard} variant="elevated">
        <View style={[styles.navIcon, { backgroundColor: color }]}>
            <Text style={styles.navIconText}>{icon}</Text>
        </View>
        <View style={styles.navContent}>
            <Text style={styles.navTitle}>{title}</Text>
            <Text style={styles.navSubtitle}>{subtitle}</Text>
        </View>
        <Text style={styles.navArrow}>←</Text>
    </Card>
);

export const QuranHomeScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>القرآن الكريم</Text>
                <Text style={styles.headerSubtitle}>اختر طريقة التصفح</Text>
            </View>

            {/* Navigation Options */}
            <View style={styles.navGrid}>
                <NavCard
                    title="السور"
                    subtitle={`${APP_CONFIG.totalSurahs} سورة`}
                    icon="📖"
                    color={COLORS.primary[100]}
                    onPress={() => navigation.navigate('SurahList')}
                />

                <NavCard
                    title="الأجزاء"
                    subtitle={`${APP_CONFIG.totalJuz} جزءاً`}
                    icon="📚"
                    color={COLORS.gold[100]}
                    onPress={() => navigation.navigate('JuzList')}
                />

                <NavCard
                    title="الأحزاب"
                    subtitle={`${APP_CONFIG.totalHizb} حزباً`}
                    icon="📑"
                    color={COLORS.primary[100]}
                    onPress={() => navigation.navigate('HizbList')}
                />

                <NavCard
                    title="الصفحات"
                    subtitle={`${APP_CONFIG.totalPages} صفحة`}
                    icon="📄"
                    color={COLORS.gold[100]}
                    onPress={() => navigation.navigate('QuranReader', { surahId: 1 })}
                />
            </View>

            {/* Quick Start */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>بدء سريع</Text>
                <View style={styles.quickStartGrid}>
                    <TouchableOpacity
                        style={styles.quickStartItem}
                        onPress={() => navigation.navigate('QuranReader', { surahId: 1 })}
                    >
                        <Text style={styles.quickStartIcon}>🌅</Text>
                        <Text style={styles.quickStartLabel}>الفاتحة</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.quickStartItem}
                        onPress={() => navigation.navigate('QuranReader', { surahId: 36 })}
                    >
                        <Text style={styles.quickStartIcon}>💚</Text>
                        <Text style={styles.quickStartLabel}>يس</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.quickStartItem}
                        onPress={() => navigation.navigate('QuranReader', { surahId: 55 })}
                    >
                        <Text style={styles.quickStartIcon}>🌟</Text>
                        <Text style={styles.quickStartLabel}>الرحمن</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.quickStartItem}
                        onPress={() => navigation.navigate('QuranReader', { surahId: 67 })}
                    >
                        <Text style={styles.quickStartIcon}>👑</Text>
                        <Text style={styles.quickStartLabel}>الملك</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.quickStartItem}
                        onPress={() => navigation.navigate('QuranReader', { surahId: 18 })}
                    >
                        <Text style={styles.quickStartIcon}>🏔️</Text>
                        <Text style={styles.quickStartLabel}>الكهف</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.quickStartItem}
                        onPress={() => navigation.navigate('QuranReader', { surahId: 78 })}
                    >
                        <Text style={styles.quickStartIcon}>📰</Text>
                        <Text style={styles.quickStartLabel}>النبأ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.cream[50],
    },
    header: {
        backgroundColor: COLORS.primary[500],
        padding: 24,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.neutral.white,
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: COLORS.primary[200],
    },
    navGrid: {
        padding: 16,
        gap: 12,
    },
    navCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    navIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    navIconText: {
        fontSize: 28,
    },
    navContent: {
        flex: 1,
    },
    navTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.neutral.gray[900],
    },
    navSubtitle: {
        fontSize: 14,
        color: COLORS.neutral.gray[600],
        marginTop: 4,
    },
    navArrow: {
        fontSize: 20,
        color: COLORS.primary[500],
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.neutral.gray[900],
        marginBottom: 16,
    },
    quickStartGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    quickStartItem: {
        width: '30%',
        aspectRatio: 1,
        backgroundColor: COLORS.neutral.white,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.neutral.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    quickStartIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    quickStartLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.neutral.gray[700],
    },
});

export default QuranHomeScreen;
