import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../component/Search';
import PokemonDetail from '../component/PokemonDetail';

const Stack = createStackNavigator();

export default function HomeScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Search1" component={Search} />
            <Stack.Screen name="PokemonDetail2" component={PokemonDetail} />
        </Stack.Navigator>
    );
}