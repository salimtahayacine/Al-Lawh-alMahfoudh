import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { COLORS } from '../../constants/colors';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    icon,
    style,
    textStyle,
}) => {
    const getButtonStyle = (): ViewStyle[] => {
        const baseStyles: ViewStyle[] = [styles.base, styles[size]];

        if (variant === 'primary') {
            baseStyles.push(styles.primary);
        } else if (variant === 'secondary') {
            baseStyles.push(styles.secondary);
        } else if (variant === 'outline') {
            baseStyles.push(styles.outline);
        } else if (variant === 'ghost') {
            baseStyles.push(styles.ghost);
        }

        if (disabled) {
            baseStyles.push(styles.disabled);
        }

        return baseStyles;
    };

    const getTextStyle = (): TextStyle[] => {
        const baseStyles: TextStyle[] = [styles.text, styles[`${size}Text`]];

        if (variant === 'primary') {
            baseStyles.push(styles.primaryText);
        } else if (variant === 'secondary') {
            baseStyles.push(styles.secondaryText);
        } else if (variant === 'outline') {
            baseStyles.push(styles.outlineText);
        } else if (variant === 'ghost') {
            baseStyles.push(styles.ghostText);
        }

        if (disabled) {
            baseStyles.push(styles.disabledText);
        }

        return baseStyles;
    };

    return (
        <TouchableOpacity
            style={[...getButtonStyle(), style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? COLORS.neutral.white : COLORS.primary[500]}
                    size="small"
                />
            ) : (
                <>
                    {icon}
                    <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        gap: 8,
    },
    // Sizes
    small: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    medium: {
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    large: {
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    // Variants
    primary: {
        backgroundColor: COLORS.primary[500],
    },
    secondary: {
        backgroundColor: COLORS.gold[500],
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: COLORS.primary[500],
    },
    ghost: {
        backgroundColor: 'transparent',
    },
    disabled: {
        opacity: 0.5,
    },
    // Text styles
    text: {
        fontWeight: '600',
    },
    smallText: {
        fontSize: 14,
    },
    mediumText: {
        fontSize: 16,
    },
    largeText: {
        fontSize: 18,
    },
    primaryText: {
        color: COLORS.neutral.white,
    },
    secondaryText: {
        color: COLORS.neutral.white,
    },
    outlineText: {
        color: COLORS.primary[500],
    },
    ghostText: {
        color: COLORS.primary[500],
    },
    disabledText: {
        color: COLORS.neutral.gray[400],
    },
});

export default Button;
