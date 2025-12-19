import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';

export const SearchScreen: React.FC = () => {
    const navigation = useNavigation();
    const [query, setQuery] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.searchHeader}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="ابحث في القرآن الكريم..."
                    placeholderTextColor={COLORS.neutral.gray[400]}
                    value={query}
                    onChangeText={setQuery}
                    autoFocus
                />
            </View>

            <View style={styles.content}>
                <View style={styles.placeholder}>
                    <Text style={styles.icon}>🔍</Text>
                    <Text style={styles.text}>البحث المتقدم قريباً...</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.cream[50],
    },
    searchHeader: {
        padding: 16,
        backgroundColor: COLORS.neutral.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.neutral.gray[200],
    },
    searchInput: {
        height: 48,
        backgroundColor: COLORS.neutral.gray[100],
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        textAlign: 'right',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholder: {
        alignItems: 'center',
    },
    icon: {
        fontSize: 48,
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        color: COLORS.neutral.gray[500],
    },
});

export default SearchScreen;
