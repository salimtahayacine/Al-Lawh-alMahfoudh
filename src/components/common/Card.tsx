import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { COLORS } from '../../constants/colors';

interface CardProps {
    children: React.ReactNode;
    onPress?: () => void;
    style?: ViewStyle;
    variant?: 'elevated' | 'outlined' | 'filled';
    padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
    children,
    onPress,
    style,
    variant = 'elevated',
    padding = 'medium',
}) => {
    const getCardStyle = (): ViewStyle[] => {
        const baseStyles: ViewStyle[] = [styles.base, styles[padding]];

        if (variant === 'elevated') {
            baseStyles.push(styles.elevated);
        } else if (variant === 'outlined') {
            baseStyles.push(styles.outlined);
        } else if (variant === 'filled') {
            baseStyles.push(styles.filled);
        }

        return baseStyles;
    };

    if (onPress) {
        return (
            <TouchableOpacity
                style={[...getCardStyle(), style]}
                onPress={onPress}
                activeOpacity={0.7}
            >
                {children}
            </TouchableOpacity>
        );
    }

    return <View style={[...getCardStyle(), style]}>{children}</View>;
};

const styles = StyleSheet.create({
    base: {
        borderRadius: 16,
        backgroundColor: COLORS.neutral.white,
    },
    // Padding sizes
    none: {
        padding: 0,
    },
    small: {
        padding: 12,
    },
    medium: {
        padding: 16,
    },
    large: {
        padding: 24,
    },
    // Variants
    elevated: {
        shadowColor: COLORS.neutral.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    outlined: {
        borderWidth: 1,
        borderColor: COLORS.neutral.gray[200],
    },
    filled: {
        backgroundColor: COLORS.cream[100],
    },
});

export default Card;
