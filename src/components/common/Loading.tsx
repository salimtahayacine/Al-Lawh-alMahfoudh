import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
} from 'react-native';
import { COLORS } from '../../constants/colors';

interface LoadingProps {
    size?: 'small' | 'large';
    color?: string;
    text?: string;
    fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
    size = 'large',
    color = COLORS.primary[500],
    text,
    fullScreen = false,
}) => {
    const content = (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color} />
            {text && <Text style={styles.text}>{text}</Text>}
        </View>
    );

    if (fullScreen) {
        return <View style={styles.fullScreen}>{content}</View>;
    }

    return content;
};

// Skeleton loader for content
interface SkeletonProps {
    width?: number | string;
    height?: number;
    borderRadius?: number;
    style?: object;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    width = '100%',
    height = 20,
    borderRadius = 8,
    style,
}) => {
    return (
        <View
            style={[
                styles.skeleton,
                {
                    width,
                    height,
                    borderRadius,
                },
                style,
            ]}
        />
    );
};

// Surah list skeleton
export const SurahListSkeleton: React.FC = () => {
    return (
        <View style={styles.skeletonList}>
            {[...Array(10)].map((_, index) => (
                <View key={index} style={styles.skeletonItem}>
                    <Skeleton width={40} height={40} borderRadius={20} />
                    <View style={styles.skeletonContent}>
                        <Skeleton width="60%" height={16} />
                        <Skeleton width="40%" height={12} style={{ marginTop: 8 }} />
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    fullScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.cream[50],
    },
    text: {
        marginTop: 12,
        fontSize: 16,
        color: COLORS.neutral.gray[600],
    },
    skeleton: {
        backgroundColor: COLORS.neutral.gray[200],
    },
    skeletonList: {
        padding: 16,
    },
    skeletonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 8,
        backgroundColor: COLORS.neutral.white,
        borderRadius: 12,
    },
    skeletonContent: {
        flex: 1,
        marginLeft: 16,
    },
});

export default Loading;
