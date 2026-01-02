import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { TabParamList } from '../types/navigation.types';
import { HomeScreen } from '../screens/HomeScreen';
import { QuranStackNavigator } from './StackNavigator';
import { BookmarksScreen } from '../screens/BookmarksScreen';
import { AudioPlayerScreen } from '../screens/AudioPlayerScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator<TabParamList>();

// Simple icon component (we'll use text icons for now, can replace with vector icons later)
const TabIcon: React.FC<{ name: string; focused: boolean }> = ({ name, focused }) => {
    const iconMap: Record<string, string> = {
        Home: '🏠',
        Quran: '📖',
        Audio: '🎧',
        Bookmarks: '🔖',
        More: '☰',
    };

    return (
        <View style={styles.iconContainer}>
            <Text style={[styles.icon, focused && styles.iconFocused]}>
                {iconMap[name] || '•'}
            </Text>
        </View>
    );
};

// Placeholder screen for More
const MoreScreen = () => (
    <View style={styles.placeholder}>
        <Text style={styles.placeholderIcon}>⚙️</Text>
        <Text style={styles.placeholderText}>More Options</Text>
    </View>
);

export const TabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
                tabBarActiveTintColor: COLORS.primary[500],
                tabBarInactiveTintColor: COLORS.neutral.gray[500],
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                headerStyle: {
                    backgroundColor: COLORS.primary[500],
                },
                headerTintColor: COLORS.neutral.white,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'الرئيسية',
                    tabBarLabel: 'الرئيسية',
                }}
            />
            <Tab.Screen
                name="Quran"
                component={QuranStackNavigator}
                options={{
                    title: 'القرآن',
                    tabBarLabel: 'القرآن',
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Audio"
                component={AudioPlayerScreen}
                options={{
                    title: 'الصوت',
                    tabBarLabel: 'الصوت',
                }}
            />
            <Tab.Screen
                name="Bookmarks"
                component={BookmarksScreen}
                options={{
                    title: 'المفضلة',
                    tabBarLabel: 'المفضلة',
                }}
            />
            <Tab.Screen
                name="More"
                component={MoreScreen}
                options={{
                    title: 'المزيد',
                    tabBarLabel: 'المزيد',
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: COLORS.neutral.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.neutral.gray[200],
        paddingTop: 5,
        paddingBottom: 5,
        height: 60,
    },
    tabBarLabel: {
        fontSize: 12,
        fontWeight: '500',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: 24,
        opacity: 0.6,
    },
    iconFocused: {
        opacity: 1,
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.cream[50],
    },
    placeholderIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    placeholderText: {
        fontSize: 18,
        color: COLORS.neutral.gray[600],
    },
});

export default TabNavigator;
