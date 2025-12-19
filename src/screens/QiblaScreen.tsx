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
    const [sensorAvailable, setSensorAvailable] = useState(true);

    useEffect(() => {
        checkSensorAndInitialize();
        return () => _unsubscribe();
    }, []);

    const checkSensorAndInitialize = async () => {
        try {
            const available = await Magnetometer.isAvailableAsync();
            if (!available) {
                setSensorAvailable(false);
                setError('Magnetometer sensor not available on this device.');
                setLoading(false);
                return;
            }
            _subscribe();
            getLocation();
        } catch (err) {
            console.error('Sensor check error:', err);
            setError('Could not access device sensors.');
            setLoading(false);
        }
    };

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
            let { x, y, z } = magnetometer;
            // Calculate angle from magnetic field
            // atan2 gives angle in radians, convert to degrees
            angle = Math.atan2(y, x) * (180 / Math.PI);
            // Normalize to 0-360 range
            angle = (angle + 360) % 360;
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

    // Calculate rotation for compass and qibla arrow
    // The compass dial rotates to align North with the actual magnetic north
    // The qibla arrow points to the qibla direction relative to north
    const compassRotation = -magnetometer; // Rotate compass to align with north
    const qiblaArrowRotation = qiblaDirection - magnetometer; // Arrow points to qibla

    // Check if user is facing qibla (within 10 degrees tolerance)
    const isFacingQibla = Math.abs(qiblaArrowRotation % 360) < 10 || Math.abs(qiblaArrowRotation % 360) > 350;

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
                <Text style={[styles.statusText, isFacingQibla && styles.facingQibla]}>
                    {isFacingQibla ? 'You are facing Qibla! 🕋' : 'Rotate phone to face Qibla'}
                </Text>
            </View>

            <View style={styles.compassContainer}>
                {/* Compass Rose (Background) - rotates to align North */}
                <View style={[styles.compass, { transform: [{ rotate: `${compassRotation}deg` }] }]}>
                    <Text style={[styles.cardinal, styles.north]}>N</Text>
                    <Text style={[styles.cardinal, styles.east]}>E</Text>
                    <Text style={[styles.cardinal, styles.south]}>S</Text>
                    <Text style={[styles.cardinal, styles.west]}>W</Text>

                    <View style={styles.crosshairVertical} />
                    <View style={styles.crosshairHorizontal} />
                </View>

                {/* Qibla Arrow - points to Qibla direction */}
                <View style={[styles.qiblaArrow, { transform: [{ rotate: `${qiblaArrowRotation}deg` }] }]}>
                    <View style={styles.arrowPointer}>
                        <Text style={styles.kaabaIcon}>🕋</Text>
                        <View style={styles.arrowLine} />
                    </View>
                </View>

            </View>

            <Text style={styles.footerText}>
                Calibrate compass by moving phone in figure-8 motion if direction seems incorrect.
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
    facingQibla: {
        color: COLORS.primary[600],
        fontWeight: 'bold',
        fontSize: 18,
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

    qiblaArrow: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    arrowPointer: {
        alignItems: 'center',
        marginTop: 45, // Offset from top edge
    },
    kaabaIcon: {
        fontSize: 32,
    },
    arrowLine: {
        width: 3,
        height: 120,
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
