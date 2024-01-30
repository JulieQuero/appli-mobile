import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import HomeScreen from "./Screen/HomeScreen";
import SearchScreen from "./Screen/SearchScreen";
import TeamScreen from "./Screen/TeamScreen";
import SettingsScreen from "./Screen/SettingsScreen";

const Stack = createBottomTabNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Pokedex') {
                            iconName = iconName = focused ? 'home' : 'home-outline';
                        }  else if (route.name === 'Search') {
                            iconName = focused ? 'search' : 'search';
                        } else if (route.name === 'Team') {
                            iconName = focused ? 'people' : 'people-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'cog' : 'cog-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#FD3C2A',
                    inactiveTintColor: 'gray',
                }}
            >
                <Stack.Screen name="Pokedex" component={HomeScreen} />
                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen name="Team" component={TeamScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;