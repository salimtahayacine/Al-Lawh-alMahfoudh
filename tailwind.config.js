/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                // Islamic color palette
                primary: {
                    50: '#E8F5E9',
                    100: '#C8E6C9',
                    200: '#A5D6A7',
                    300: '#81C784',
                    400: '#66BB6A',
                    500: '#1B4D3E', // Main Islamic green
                    600: '#166534',
                    700: '#14532D',
                    800: '#052E16',
                    900: '#022C22',
                },
                gold: {
                    50: '#FFF8E1',
                    100: '#FFECB3',
                    200: '#FFE082',
                    300: '#FFD54F',
                    400: '#FFCA28',
                    500: '#D4AF37', // Main gold
                    600: '#C49B2D',
                    700: '#A67C00',
                    800: '#8B6914',
                    900: '#5D4D1A',
                },
                cream: {
                    50: '#FFFDF7',
                    100: '#FFF9E6',
                    200: '#FFF5CC',
                    300: '#FFF0B3',
                    400: '#FFEB99',
                    500: '#F5F5DC', // Main cream/beige
                },
                dark: {
                    50: '#3D3D3D',
                    100: '#333333',
                    200: '#2D2D2D',
                    300: '#262626',
                    400: '#1F1F1F',
                    500: '#1A1A2E', // Main dark
                    600: '#16213E',
                    700: '#0F0F1A',
                    800: '#0A0A0F',
                    900: '#050507',
                }
            },
            fontFamily: {
                arabic: ['Amiri', 'serif'],
                uthmani: ['KFGQPC Uthmanic Script HAFS', 'serif'],
            },
        },
    },
    plugins: [],
}
