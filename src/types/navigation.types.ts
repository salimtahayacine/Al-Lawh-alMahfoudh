import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

// Root Stack Navigator Params
export type RootStackParamList = {
    Main: NavigatorScreenParams<TabParamList>;
    QuranReader: { surahId: number; ayahId?: number };
    Search: undefined;
    Settings: undefined;
    Qibla: undefined;
    PrayerTimes: undefined;
};

// Bottom Tab Navigator Params
export type TabParamList = {
    Home: undefined;
    Quran: NavigatorScreenParams<QuranStackParamList>;
    Audio: undefined;
    Bookmarks: undefined;
    More: undefined;
};

// Quran Stack Navigator Params
export type QuranStackParamList = {
    QuranHome: undefined;
    SurahList: undefined;
    JuzList: undefined;
    HizbList: undefined;
    QuranReader: { surahId: number; ayahId?: number; page?: number };
};

// Settings Stack Navigator Params
export type SettingsStackParamList = {
    SettingsHome: undefined;
    ThemeSettings: undefined;
    AudioSettings: undefined;
    TranslationSettings: undefined;
    About: undefined;
};

// Screen Props Types
export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<TabParamList, T>,
        NativeStackScreenProps<RootStackParamList>
    >;

export type QuranStackScreenProps<T extends keyof QuranStackParamList> =
    CompositeScreenProps<
        NativeStackScreenProps<QuranStackParamList, T>,
        TabScreenProps<'Quran'>
    >;

// Navigation type for hooks
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
