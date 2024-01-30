import {StyleSheet, View, Text, FlatList, Button, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import PokemonDetail from '../component/PokemonDetail';
export default function SearchScreen() {
    const navigation = useNavigation();
    const [pokemons, setPokemons] = useState([]);
    const [search, setSearch] = useState('');

    const fetchData = () => {
        fetch('https://pokeapi.co/api/v2/pokedex/1/')
            .then(response => response.json())
            .then(data => {
                setPokemons(data.pokemon_entries);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const renderItem = ({item, index}) => (
        <TouchableOpacity
            style={{
                width: 100,
                flex: 1,
                margin: 10,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'orange',
                borderRadius: 15,
            }} onPress={() => navigation.navigate('PokemonDetail', {
            id: item.entry_number})
        }>
            <View style={style.container}>
                <Text style={style.title}>
                    {item.pokemon_species.name}
                </Text>
                <Image
                    source={{uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (item.entry_number) + ".png",}}
                    style={style.image}/>
            </View>
        </TouchableOpacity>
    )

    const filteredPokemons = pokemons.filter(pokemon => pokemon.pokemon_species.name.toLowerCase().includes(search.toLowerCase()));
    //const filteredPokemons = [];
    return (
        <View>
            <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search here..."
                style = {style.typeTextInput}
            />
            {search.length > 0  ? (
                filteredPokemons.length > 0  ? (
                        <FlatList
                            data={filteredPokemons}
                            renderItem={renderItem}
                            keyExtractor={({id}) => id}
                            numColumns={2}
                        />
                    ) : (
                        <Text style={style.error}>No pokemon found</Text>
                    )
            ): null }

        </View>
    );
}
const style = StyleSheet.create({
    typeTextInput: {
        borderWidth:1,
        borderColor:'#009688',
        borderRadius:5,
        margin:10,
        padding:10
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
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
});