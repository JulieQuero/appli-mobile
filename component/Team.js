import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Button} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';


export default function TeamScreen() {
    const navigation = useNavigation();
    const [myTeam, setMyTeam] = useState([]);
    const [reload, setReload] = useState(false);

    const fetchData = async () => {
        const teamData = await AsyncStorage.getItem('team');
        const team = teamData ? JSON.parse(teamData) : [];
        const pokemonDetails = await Promise.all(team.map(async (pokemonId) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            const pokemonData = await response.json();
            return {
                id: pokemonId,
                name: pokemonData.name,
                image: pokemonData.sprites.front_default,
            };
        }));
        setMyTeam(pokemonDetails);
        setReload(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={style.touchable} onPress={() => navigation.navigate('PokemonDetail3', {
            id: item.id})
        }>
            <View style={style.container}>
                <Text style={style.title}>{item.name}</Text>
                <Image
                    source={{ uri: item.image }}
                    style={style.image}
                />
            </View>
        </TouchableOpacity>
    );

    const clearTeam = async () => {
        await AsyncStorage.removeItem('team');
        setMyTeam([]);
        setReload(true);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <View>
            <Button title="Clear Team" onPress={clearTeam} />
            {myTeam.length > 0 ? (
                <FlatList
                    data={myTeam}
                    renderItem={renderItem}
                    keyExtractor={({ id }) => id.toString()}
                    numColumns={2}
                />
            ) : (
                <Text>No pokemon in your Team</Text>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'orange',
        paddingTop: 10,
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginBottom: 10,
    },
    touchable: {
        width: 100,
        flex: 1,
        margin: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        borderRadius: 15,
    }
});