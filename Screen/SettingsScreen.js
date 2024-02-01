import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
    const [isLocked, setIsLocked] = useState(false);

    useEffect(() => {
        // Load the screen orientation setting from AsyncStorage
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

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Setting Screen</Text>
            <Button title={isLocked ? 'Unlock' : 'Lock'} onPress={toggleOrientationLock} />
        </View>
    );
}
