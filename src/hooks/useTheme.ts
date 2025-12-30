import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useColorScheme } from 'react-native';
import { RootState } from '../store/store';
import { setTheme } from '../store/slices/settingsSlice';

/**
 * Custom hook for theme management
 * Manages light/dark/system theme preferences and provides themed colors
 */

export interface ThemeColors {
    // Background colors
    background: string;
    backgroundSecondary: string;
    surface: string;
    surfaceVariant: string;
    
    // Text colors
    text: string;
    textSecondary: string;
    textTertiary: string;
    
    // Primary colors
    primary: string;
    primaryLight: string;
    primaryDark: string;
    
    // Accent colors
    accent: string;
    accentLight: string;
    
    // Status colors
    success: string;
    warning: string;
    error: string;
    info: string;
    
    // Border colors
    border: string;
    borderLight: string;
    
    // Special
    overlay: string;
    shadow: string;
}

const lightTheme: ThemeColors = {
    background: '#FFFFFF',
    backgroundSecondary: '#F5F5F5',
    surface: '#FFFFFF',
    surfaceVariant: '#F0F0F0',
    
    text: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',
    
    primary: '#2E7D32',
    primaryLight: '#4CAF50',
    primaryDark: '#1B5E20',
    
    accent: '#00796B',
    accentLight: '#26A69A',
    
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    
    border: '#E0E0E0',
    borderLight: '#F0F0F0',
    
    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.15)',
};

const darkTheme: ThemeColors = {
    background: '#121212',
    backgroundSecondary: '#1E1E1E',
    surface: '#1E1E1E',
    surfaceVariant: '#2C2C2C',
    
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    textTertiary: '#808080',
    
    primary: '#66BB6A',
    primaryLight: '#81C784',
    primaryDark: '#4CAF50',
    
    accent: '#4DB6AC',
    accentLight: '#80CBC4',
    
    success: '#66BB6A',
    warning: '#FFB74D',
    error: '#EF5350',
    info: '#42A5F5',
    
    border: '#333333',
    borderLight: '#404040',
    
    overlay: 'rgba(0, 0, 0, 0.7)',
    shadow: 'rgba(0, 0, 0, 0.3)',
};

export const useTheme = () => {
    const dispatch = useDispatch();
    const themePreference = useSelector((state: RootState) => state.settings.theme);
    const systemColorScheme = useColorScheme();

    // Determine actual theme based on preference and system settings
    const isDark = useMemo(() => {
        if (themePreference === 'system') {
            return systemColorScheme === 'dark';
        }
        return themePreference === 'dark';
    }, [themePreference, systemColorScheme]);

    // Get current theme colors
    const colors = useMemo(() => {
        return isDark ? darkTheme : lightTheme;
    }, [isDark]);

    // Theme switching functions
    const toggleTheme = useCallback(() => {
        const newTheme = isDark ? 'light' : 'dark';
        dispatch(setTheme(newTheme));
    }, [isDark, dispatch]);

    const setLightTheme = useCallback(() => {
        dispatch(setTheme('light'));
    }, [dispatch]);

    const setDarkTheme = useCallback(() => {
        dispatch(setTheme('dark'));
    }, [dispatch]);

    const setSystemTheme = useCallback(() => {
        dispatch(setTheme('system'));
    }, [dispatch]);

    // Helper to get color with opacity
    const withOpacity = useCallback((color: string, opacity: number): string => {
        // Handle hex colors
        if (color.startsWith('#')) {
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
        // Handle rgba colors
        if (color.startsWith('rgba')) {
            return color.replace(/[\d.]+\)$/g, `${opacity})`);
        }
        // Handle rgb colors
        if (color.startsWith('rgb')) {
            return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
        }
        return color;
    }, []);

    // Get appropriate text color for a background
    const getContrastText = useCallback((backgroundColor: string): string => {
        // Simple contrast calculation - could be enhanced
        return isDark ? darkTheme.text : lightTheme.text;
    }, [isDark]);

    return {
        // Theme state
        isDark,
        isLight: !isDark,
        themePreference,
        colors,
        
        // Theme switching
        toggleTheme,
        setLightTheme,
        setDarkTheme,
        setSystemTheme,
        
        // Helper functions
        withOpacity,
        getContrastText,
        
        // Direct theme access
        lightTheme,
        darkTheme,
    };
};

export default useTheme;
