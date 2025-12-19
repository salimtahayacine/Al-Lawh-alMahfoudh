// Islamic Color Palette
export const COLORS = {
    // Primary - Islamic Green
    primary: {
        50: '#E8F5E9',
        100: '#C8E6C9',
        200: '#A5D6A7',
        300: '#81C784',
        400: '#66BB6A',
        500: '#1B4D3E',
        600: '#166534',
        700: '#14532D',
        800: '#052E16',
        900: '#022C22',
    },

    // Gold Accents
    gold: {
        50: '#FFF8E1',
        100: '#FFECB3',
        200: '#FFE082',
        300: '#FFD54F',
        400: '#FFCA28',
        500: '#D4AF37',
        600: '#C49B2D',
        700: '#A67C00',
        800: '#8B6914',
        900: '#5D4D1A',
    },

    // Cream/Beige for backgrounds
    cream: {
        50: '#FFFDF7',
        100: '#FFF9E6',
        200: '#FFF5CC',
        300: '#FFF0B3',
        400: '#FFEB99',
        500: '#F5F5DC',
    },

    // Dark mode colors
    dark: {
        50: '#3D3D3D',
        100: '#333333',
        200: '#2D2D2D',
        300: '#262626',
        400: '#1F1F1F',
        500: '#1A1A2E',
        600: '#16213E',
        700: '#0F0F1A',
        800: '#0A0A0F',
        900: '#050507',
    },

    // Neutral
    neutral: {
        white: '#FFFFFF',
        black: '#000000',
        gray: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#EEEEEE',
            300: '#E0E0E0',
            400: '#BDBDBD',
            500: '#9E9E9E',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
        },
    },

    // Semantic colors
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
};

// Light theme
export const LIGHT_THEME = {
    background: COLORS.cream[50],
    surface: COLORS.neutral.white,
    primary: COLORS.primary[500],
    primaryLight: COLORS.primary[100],
    accent: COLORS.gold[500],
    text: {
        primary: COLORS.neutral.gray[900],
        secondary: COLORS.neutral.gray[600],
        disabled: COLORS.neutral.gray[400],
        inverse: COLORS.neutral.white,
    },
    border: COLORS.neutral.gray[200],
    divider: COLORS.neutral.gray[200],
    card: COLORS.neutral.white,
    statusBar: 'dark' as const,
};

// Dark theme
export const DARK_THEME = {
    background: COLORS.dark[500],
    surface: COLORS.dark[400],
    primary: COLORS.primary[400],
    primaryLight: COLORS.primary[700],
    accent: COLORS.gold[400],
    text: {
        primary: COLORS.neutral.gray[50],
        secondary: COLORS.neutral.gray[400],
        disabled: COLORS.neutral.gray[600],
        inverse: COLORS.neutral.black,
    },
    border: COLORS.dark[300],
    divider: COLORS.dark[300],
    card: COLORS.dark[400],
    statusBar: 'light' as const,
};

export type ThemeColors = typeof LIGHT_THEME;
