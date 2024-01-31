import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from "./Screen/HomeScreen";
import SearchScreen from "./Screen/SearchScreen";
import TeamScreen from "./Screen/TeamScreen";
import SettingsScreen from "./Screen/SettingsScreen";

const Tab = createBottomTabNavigator();

function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: '#FD3C2A',
                    tabBarInactiveTintColor: 'gray',
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Pokedex') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Search') {
                            iconName = focused ? 'search' : 'search';
                        } else if (route.name === 'Team') {
                            iconName = focused ? 'people' : 'people-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'cog' : 'cog-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="Pokedex" component={HomeScreen} />
                <Tab.Screen name="Search" component={SearchScreen} />
                <Tab.Screen name="Team" component={TeamScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default App;
