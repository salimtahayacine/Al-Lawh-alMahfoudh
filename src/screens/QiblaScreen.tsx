import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Dimensions, Platform } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';
import { Coordinates, Qibla } from 'adhan';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');

export const QiblaScreen: React.FC = () => {
    const [subscription, setSubscription] = useState<any>(null);
    const [magnetometer, setMagnetometer] = useState(0);
    const [qiblaDirection, setQiblaDirection] = useState(0); // Direction of Qibla from North
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        _subscribe();
        getLocation();
        return () => _unsubscribe();
    }, []);

    const _subscribe = () => {
        setSubscription(
            Magnetometer.addListener((data) => {
                setMagnetometer(_angle(data));
            })
        );
        Magnetometer.setUpdateInterval(100);
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    const _angle = (magnetometer: any) => {
        let angle = 0;
        if (magnetometer) {
            let { x, y } = magnetometer;
            if (Math.atan2(y, x) >= 0) {
                angle = Math.atan2(y, x) * (180 / Math.PI);
            } else {
                angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
            }
        }
        return Math.round(angle);
    };

    const getLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Location permission denied. Compass needs location to find Qibla.');
                setLoading(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            // Calculate Qibla
            const coordinates = new Coordinates(latitude, longitude);
            const qibla = Qibla(coordinates);
            setQiblaDirection(qibla);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Could not fetch location.');
            setLoading(false);
        }
    };

    // Calculate rotation:
    // Compass should point North.
    // If phone is pointing North (0deg), magnet is 0 (or 270 depending on axis).
    // Let's assume standard behavior: 0 = North.
    // If I rotate phone right (90deg East), magnet shows 90.
    // To keep North fixed visually, I verify logic... usually:
    // Rotation = 360 - magnet.

    // BUT we want to show Qibla.
    // We rotate the COMPASS dial so that North aligns with actual North.
    // Compass Image rotation = -magnetometer
    // Qibla Indicator rotation = -magnetometer + qiblaDirection

    // Actually, common Qibla UI:
    // 1. A compass rose that rotates to match North (-magnetometer)
    // 2. An arrow on top that points to Qibla (Fixed relative to rose? No, fixed relative to North).
    // So Arrow rotation relative to screen = qiblaDirection - magnetometer.

    const compassRotation = 360 - magnetometer; // or -magnetometer
    // Note: React Native transform rotation is clockwise.

    // Let's try simpler:
    // Arrow points to Qibla.
    // Arrow Rotation = Qibla - Magnetometer.
    // If Qibla is 90 (East) and Phone points North (0), Arrow -> 90.
    // If Phone points East (90), Magnetometer -> 90. Arrow -> 0.

    const arrowRotation = qiblaDirection - magnetometer;

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={COLORS.primary[500]} />
                <Text style={styles.text}>Calibrating...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.directionText}>{Math.round(qiblaDirection)}° from North</Text>
                <Text style={styles.statusText}>
                    {Math.abs(arrowRotation % 360) < 5 ? 'You are facing Qibla! 🕋' : 'Rotate phone'}
                </Text>
            </View>

            <View style={styles.compassContainer}>
                {/* Compass Rose (Background) */}
                <View style={[styles.compass, { transform: [{ rotate: `${-magnetometer}deg` }] }]}>
                    <Text style={[styles.cardinal, styles.north]}>N</Text>
                    <Text style={[styles.cardinal, styles.east]}>E</Text>
                    <Text style={[styles.cardinal, styles.south]}>S</Text>
                    <Text style={[styles.cardinal, styles.west]}>W</Text>

                    {/* Tick marks could go here */}
                    <View style={styles.crosshairVertical} />
                    <View style={styles.crosshairHorizontal} />
                </View>

                {/* Qibla Arrow (Foreground) -> Points to Qibla relative to North */}
                {/* Wait, if Compass is rotated by -magnetometer (North is Up), then Qibla should be rotated by qiblaDirection relative to Compass? */}
                {/* Yes. If Compass is North-Up, Qibla is just qiblaDirection. */}
                {/* Visual hierarchy: 
                    Static Container
                       Rotated Compass Rose (points North)
                          Qibla Arrow (Fixed at qiblaDirection on the rose?)
                */}
                {/* Setup: 
                    Compass Rose rotates so real North matches 'N' on screen.
                    Arrow is fixed ON The Rose at Qibla angle. 
                */}

                <View style={[styles.qiblaPointerContainer, { transform: [{ rotate: `${-magnetometer}deg` }] }]}>
                    <View style={[styles.qiblaArrow, { transform: [{ rotate: `${qiblaDirection}deg` }] }]}>
                        <Text style={styles.kaabaIcon}>🕋</Text>
                        <View style={styles.arrowLine} />
                    </View>
                </View>

            </View>

            <Text style={styles.footerText}>
                Authenticate compass by doing figure-8 motion if invalid.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.cream[50], // Darker theme usually better for compass?
        alignItems: 'center',
        paddingTop: 50,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 50,
    },
    directionText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary[600],
    },
    statusText: {
        fontSize: 16,
        color: COLORS.neutral.gray[600],
        marginTop: 8,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    text: {
        marginTop: 10,
        color: COLORS.neutral.gray[600],
    },
    compassContainer: {
        width: width * 0.8,
        height: width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    compass: {
        width: '100%',
        height: '100%',
        borderRadius: width * 0.4,
        borderWidth: 4,
        borderColor: COLORS.neutral.gray[300],
        backgroundColor: COLORS.neutral.white,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    cardinal: {
        position: 'absolute',
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.neutral.gray[400],
    },
    north: { top: 10, color: COLORS.primary[500] },
    south: { bottom: 10 },
    east: { right: 10 },
    west: { left: 10 },

    crosshairVertical: {
        width: 1,
        height: '100%',
        backgroundColor: COLORS.neutral.gray[100],
        position: 'absolute',
    },
    crosshairHorizontal: {
        height: 1,
        width: '100%',
        backgroundColor: COLORS.neutral.gray[100],
        position: 'absolute',
    },

    qiblaPointerContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qiblaArrow: {
        width: 40,
        height: '100%', // Span full diameter
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'flex-start', // Top is 0 degrees
        paddingTop: 45, // Offset from edge
    },
    kaabaIcon: {
        fontSize: 32,
        transform: [{ rotate: '180deg' }], // Because text renders upright, but 0deg is up? 
        // Logic: if 0deg is Top, and we rotate clockwise...
        // text is fine.
    },
    arrowLine: {
        width: 2,
        height: '35%',
        backgroundColor: COLORS.gold[500],
        marginTop: 5,
    },
    footerText: {
        position: 'absolute',
        bottom: 40,
        color: COLORS.neutral.gray[400],
        textAlign: 'center',
        paddingHorizontal: 20,
    }
});
