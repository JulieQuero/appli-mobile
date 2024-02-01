import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {FlatList, Image, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import PokemonDetail from './PokemonDetail';
import { useNavigation } from '@react-navigation/native';

export default function PokemonList() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    const getPokemon = () => {
        return fetch('https://pokeapi.co/api/v2/pokedex/1/')
            .then(response => response.json())
            .then(json => {
                setLoading(false);
                setData(json.pokemon_entries);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
    getPokemon();
}, []);

    const renderItem = ({item, index}) => (
        <TouchableOpacity
            style={style.touchable} onPress={() => navigation.navigate('PokemonDetail1', {
            id: index + 1})
            }>
            <View style={style.container}>
                <Text style={style.title}>
                    {item.pokemon_species.name}
                </Text>
                <Image
                    source={{uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (index + 1) + ".png",}}
                    style={style.image}/>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={{
            flex: 1,
            padding: 24,
            flexDirection: 'row',
        }}>
            <FlatList
                data={data}
                keyExtractor={({ pokemon_species }) => pokemon_species.name}
                renderItem={renderItem}
                numColumns={2}
            />
        </View>
    );
}
const style = StyleSheet.create({
    image: {
        width: 70,
        height: 70,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginBottom: 10,
    },
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'orange',
        paddingTop: 10,
        alignItems: 'center',
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