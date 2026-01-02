import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QuranStackParamList } from '../types/navigation.types';
import { SurahListScreen } from '../screens/SurahListScreen';
import { JuzListScreen } from '../screens/JuzListScreen';
import { HizbListScreen } from '../screens/HizbListScreen';
import { QuranReaderScreen } from '../screens/QuranReaderScreen';
import { QuranHomeScreen } from '../screens/QuranHomeScreen';
import { COLORS } from '../constants/colors';

const QuranStack = createNativeStackNavigator<QuranStackParamList>();

export const QuranStackNavigator: React.FC = () => {
    return (
        <QuranStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.primary[500],
                },
                headerTintColor: COLORS.neutral.white,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
                animation: 'slide_from_right',
            }}
        >
            <QuranStack.Screen
                name="QuranHome"
                component={QuranHomeScreen}
                options={{
                    title: 'القرآن الكريم',
                }}
            />
            <QuranStack.Screen
                name="SurahList"
                component={SurahListScreen}
                options={{
                    title: 'السور',
                }}
            />
            <QuranStack.Screen
                name="JuzList"
                component={JuzListScreen}
                options={{
                    title: 'الأجزاء',
                }}
            />
            <QuranStack.Screen
                name="HizbList"
                component={HizbListScreen}
                options={{
                    title: 'الأحزاب',
                }}
            />
            <QuranStack.Screen
                name="QuranReader"
                component={QuranReaderScreen}
                options={({ route }) => ({
                    title: 'القراءة',
                })}
            />
        </QuranStack.Navigator>
    );
};

export default QuranStackNavigator;
