import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Linking, Platform } from 'react-native';
import { Coordinates, CalculationMethod, PrayerTimes, Prayer, Madhab } from 'adhan';
import * as Location from 'expo-location';
import { COLORS } from '../constants/colors';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const PrayerTimesScreen: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [nextPrayer, setNextPrayer] = useState<'none' | 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'>('none');
    const [locationName, setLocationName] = useState('Locating...');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getLocationAndCalculations();
        
        // Update next prayer every minute
        const interval = setInterval(() => {
            if (prayerTimes) {
                const next = prayerTimes.nextPrayer();
                setNextPrayer(next);
            }
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [prayerTimes]);

    const getLocationAndCalculations = async () => {
        try {
            setLoading(true);
            setError(null);

            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Location permission denied. Please enable location services to see prayer times.');
                setLoading(false);
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            // Get address (reverse geocode)
            try {
                const address = await Location.reverseGeocodeAsync({ latitude, longitude });
                if (address && address.length > 0) {
                    const place = address[0];
                    setLocationName(`${place.city || place.region || ''}, ${place.country || ''}`);
                }
            } catch (e) {
                // Ignore geocoding errors
                setLocationName(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            }

            // Calculate Prayer Times
            const coordinates = new Coordinates(latitude, longitude);
            const date = new Date();
            const params = CalculationMethod.MuslimWorldLeague(); // Default, can be improved
            params.madhab = Madhab.Shafi; // Asr factor - use proper enum

            const times = new PrayerTimes(coordinates, date, params);
            setPrayerTimes(times);
            setNextPrayer(times.nextPrayer());
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to get location or calculate times.');
            setLoading(false);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getPrayerName = (prayer: typeof Prayer[keyof typeof Prayer]) => {
        switch (prayer) {
            case Prayer.Fajr: return 'الفجر';
            case Prayer.Sunrise: return 'الشروق';
            case Prayer.Dhuhr: return 'الظهر';
            case Prayer.Asr: return 'العصر';
            case Prayer.Maghrib: return 'المغرب';
            case Prayer.Isha: return 'العشاء';
            default: return '';
        }
    };

    const PrayerRow = ({ name, time, isNext }: { name: string, time: Date, isNext: boolean }) => (
        <View style={[styles.prayerRow, isNext && styles.nextPrayerRow]}>
            <Text style={[styles.prayerName, isNext && styles.nextPrayerText]}>{name}</Text>
            <Text style={[styles.prayerTime, isNext && styles.nextPrayerText]}>{formatTime(time)}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={COLORS.primary[500]} />
                <Text style={styles.loadingText}>Fetching prayer times...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Retry" onPress={getLocationAndCalculations} style={styles.retryButton} />
                <Button
                    title="Open Settings"
                    variant="outline"
                    onPress={() => Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings()}
                    style={styles.settingsButton}
                />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.date}>{new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                <Text style={styles.location}>📍 {locationName}</Text>
            </View>

            {prayerTimes && (
                <Card style={styles.timesCard} variant="elevated">
                    <PrayerRow name="الفجر" time={prayerTimes.fajr} isNext={nextPrayer === Prayer.Fajr} />
                    <PrayerRow name="الشروق" time={prayerTimes.sunrise} isNext={nextPrayer === Prayer.Sunrise} />
                    <PrayerRow name="الظهر" time={prayerTimes.dhuhr} isNext={nextPrayer === Prayer.Dhuhr} />
                    <PrayerRow name="العصر" time={prayerTimes.asr} isNext={nextPrayer === Prayer.Asr} />
                    <PrayerRow name="المغرب" time={prayerTimes.maghrib} isNext={nextPrayer === Prayer.Maghrib} />
                    <PrayerRow name="العشاء" time={prayerTimes.isha} isNext={nextPrayer === Prayer.Isha} />
                </Card>
            )}

            <View style={styles.infoBox}>
                <Text style={styles.infoText}>Calculation Method: Muslim World League</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.cream[50],
    },
    content: {
        padding: 20,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.cream[50],
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    date: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary[600],
        marginBottom: 8,
    },
    location: {
        fontSize: 16,
        color: COLORS.neutral.gray[600],
    },
    timesCard: {
        padding: 0,
        overflow: 'hidden',
    },
    prayerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.neutral.gray[100],
    },
    nextPrayerRow: {
        backgroundColor: COLORS.primary[50],
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary[500],
    },
    prayerName: {
        fontSize: 18,
        color: COLORS.neutral.gray[800],
    },
    prayerTime: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.neutral.gray[900],
    },
    nextPrayerText: {
        color: COLORS.primary[700],
        fontWeight: 'bold',
    },
    loadingText: {
        marginTop: 12,
        color: COLORS.neutral.gray[600],
    },
    errorText: {
        fontSize: 16,
        color: COLORS.error || '#EF4444',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        minWidth: 120,
        marginBottom: 12,
    },
    settingsButton: {
        minWidth: 120,
    },
    infoBox: {
        marginTop: 20,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 12,
        color: COLORS.neutral.gray[400],
    }
});
