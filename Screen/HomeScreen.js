import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonList from '../component/PokemonList';
import PokemonDetail from '../component/PokemonDetail';

const Stack = createStackNavigator();

export default function HomeScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="PokemonList" component={PokemonList} />
            <Stack.Screen name="PokemonDetail" component={PokemonDetail} />
        </Stack.Navigator>
    );
}