import React, { useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet,TouchableOpacity} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera, CameraType } from 'expo-camera';

export default function SettingsScreen() {
    const [isLocked, setIsLocked] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    useEffect(() => {
        const loadScreenOrientation = async () => {
            const orientationSetting = await AsyncStorage.getItem('screenOrientation');
            setIsLocked(orientationSetting === 'locked');
        };

        loadScreenOrientation();
    }, []);

    const toggleOrientationLock = async () => {
        if (isLocked) {
            await ScreenOrientation.unlockAsync();
            await AsyncStorage.setItem('screenOrientation', 'unlocked');
        } else {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
            await AsyncStorage.setItem('screenOrientation', 'locked');
        }
        setIsLocked(!isLocked);
    };

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <View style={{ flex: 1}}>
            <Button color={'black'} title={isLocked ? 'Unlock' : 'Lock'} onPress={toggleOrientationLock} />
            <Camera style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}
const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 16,
        left: 16,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        color: 'black',
    },
});