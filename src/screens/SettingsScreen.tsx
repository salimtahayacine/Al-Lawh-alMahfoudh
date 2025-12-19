import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Switch,
    TouchableOpacity,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { APP_CONFIG } from '../constants/config';

export const SettingsScreen: React.FC = () => {
    return (
        <ScrollView style={styles.container}>
            {/* App Info */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>☪</Text>
                </View>
                <Text style={styles.appName}>{APP_CONFIG.name}</Text>
                <Text style={styles.version}>Version {APP_CONFIG.version}</Text>
            </View>

            {/* Settings Sections */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>القراءة</Text>

                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>حجم الخط</Text>
                    <View style={styles.settingControl}>
                        <Text style={styles.settingValue}>24</Text>
                    </View>
                </View>

                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>نوع الخط</Text>
                    <View style={styles.settingControl}>
                        <Text style={styles.settingValue}>عثماني</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>المظهر</Text>

                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>الوضع الليلي</Text>
                    <Switch value={false} />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>اخرى</Text>

                <TouchableOpacity style={styles.settingButton}>
                    <Text style={styles.buttonText}>عن التطبيق</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingButton}>
                    <Text style={styles.buttonText}>سياسة الخصوصية</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.cream[50],
    },
    header: {
        alignItems: 'center',
        padding: 32,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.neutral.gray[200],
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: COLORS.primary[500],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    logoText: {
        fontSize: 40,
        color: COLORS.gold[400],
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary[900],
    },
    version: {
        fontSize: 14,
        color: COLORS.neutral.gray[500],
        marginTop: 4,
    },
    section: {
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.neutral.gray[200],
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.primary[500],
        marginBottom: 16,
        textTransform: 'uppercase',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    settingLabel: {
        fontSize: 16,
        color: COLORS.neutral.gray[900],
    },
    settingControl: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingValue: {
        fontSize: 16,
        color: COLORS.neutral.gray[500],
        marginRight: 8,
    },
    settingButton: {
        paddingVertical: 12,
    },
    buttonText: {
        fontSize: 16,
        color: COLORS.neutral.gray[900],
    },
});

export default SettingsScreen;
