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
import { TabParamList } from '../types/navigation.types';
import { useBookmarks } from '../hooks/useBookmarks';
import { Card } from '../components/common/Card';
import { COLORS, SURAHS } from '../constants';
import { Bookmark } from '../types/quran.types';

type NavigationProp = NativeStackNavigationProp<TabParamList>;

export const BookmarksScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const { bookmarks, removeBookmark } = useBookmarks();

    const handleBookmarkPress = (bookmark: Bookmark) => {
        navigation.navigate('Quran', {
            screen: 'QuranReader',
            params: {
                surahId: bookmark.surahId,
                ayahId: bookmark.ayahId
            }
        });
    };

    const getSurahName = (id: number) => {
        return SURAHS.find(s => s.id === id)?.name || '';
    };

    const renderBookmark = ({ item }: { item: Bookmark }) => (
        <Card
            onPress={() => handleBookmarkPress(item)}
            style={styles.card}
            variant="elevated"
        >
            <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>🔖</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.surahName}>
                        سورة {getSurahName(item.surahId)}
                    </Text>
                    <Text style={styles.ayahInfo}>
                        الآية {item.ayahId} • الصفحة {item.page}
                    </Text>
                    <Text style={styles.date}>
                        {new Date(item.createdAt).toLocaleDateString('ar-SA')}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => removeBookmark(item.id)}
                    style={styles.deleteButton}
                >
                    <Text style={styles.deleteIcon}>🗑️</Text>
                </TouchableOpacity>
            </View>
        </Card>
    );

    return (
        <View style={styles.container}>
            {bookmarks.length > 0 ? (
                <FlatList
                    data={bookmarks}
                    renderItem={renderBookmark}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>🔖</Text>
                    <Text style={styles.emptyText}>لا توجد علامات مرجعية</Text>
                    <Text style={styles.emptySubtext}>
                        أضف علامات مرجعية أثناء القراءة للرجوع إليها لاحقاً
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.cream[50],
    },
    listContent: {
        padding: 16,
    },
    card: {
        marginBottom: 12,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.gold[100],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    icon: {
        fontSize: 24,
    },
    infoContainer: {
        flex: 1,
    },
    surahName: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.neutral.gray[900],
    },
    ayahInfo: {
        fontSize: 14,
        color: COLORS.neutral.gray[600],
        marginTop: 4,
    },
    date: {
        fontSize: 12,
        color: COLORS.neutral.gray[400],
        marginTop: 4,
    },
    deleteButton: {
        padding: 8,
    },
    deleteIcon: {
        fontSize: 20,
        color: COLORS.error,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
        opacity: 0.5,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.neutral.gray[600],
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: COLORS.neutral.gray[500],
        textAlign: 'center',
    },
});

export default BookmarksScreen;
