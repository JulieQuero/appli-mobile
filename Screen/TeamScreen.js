
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Team from '../component/Team';
import PokemonDetail from '../component/PokemonDetail';

const Stack = createStackNavigator();

export default function HomeScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Team1" component={Team} />
            <Stack.Screen name="PokemonDetail3" component={PokemonDetail} />
        </Stack.Navigator>
    );
}