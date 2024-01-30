import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {Image, Text, View, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';

export default function PokemonList() {
    const route = useRoute();
    const { id } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const getPokemon = () => {
        return fetch('https://pokeapi.co/api/v2/pokemon/' + id +'/')
            .then(response => response.json())
            .then(json => {
                setLoading(false);
                setData(json);
            })
            .catch(error => {
                console.error(error);
            });
    };
    useEffect(() => {
        getPokemon();
    }, []);
    return(
        <View style={style.container}>
            <View style={style.typesContainer}>
                <Image
                    source={{uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (id + 1) + ".png",}}
                    style={style.image}/>
                <Text style={style.Title}>Name : {data.name}</Text>
                <Text style={style.typeText}>Height : {data.height} kg</Text>
                <Text style={style.typeText}>Weight : {data.weight} cm</Text>
            </View>
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
    typeText: {
        padding: 6,
        margin: 2,
        borderRadius: 5,
        fontWeight: 'bold',
    },
    typesContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginTop: 100,
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#F9F9F9',
    },
    Title: {
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginBottom: 10,
    }
});