import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation.types';
import TabNavigator from './TabNavigator';
import { QuranReaderScreen } from '../screens/QuranReaderScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { QiblaScreen } from '../screens/QiblaScreen';
import { PrayerTimesScreen } from '../screens/PrayerTimesScreen';
import { COLORS } from '../constants/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: COLORS.primary[500],
                    },
                    headerTintColor: COLORS.neutral.white,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen
                    name="Main"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="QuranReader"
                    component={QuranReaderScreen}
                    options={({ route }) => ({
                        title: 'القرآن الكريم',
                        headerTitleAlign: 'center',
                    })}
                />
                <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{
                        title: 'البحث',
                        headerTitleAlign: 'center',
                        presentation: 'modal',
                    }}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        title: 'الإعدادات',
                        headerTitleAlign: 'center',
                    }}
                />
                <Stack.Screen
                    name="Qibla"
                    component={QiblaScreen}
                    options={{
                        title: 'اتحاه القبلة',
                        headerTitleAlign: 'center',
                    }}
                />
                <Stack.Screen
                    name="PrayerTimes"
                    component={PrayerTimesScreen}
                    options={{
                        title: 'أوقات الصلاة',
                        headerTitleAlign: 'center',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
