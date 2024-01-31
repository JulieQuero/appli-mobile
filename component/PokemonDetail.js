import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {Image, Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PokemonList() {
    const navigation = useNavigation();
    const [buttonState, setButtonState] = useState('Add to team');
    const route = useRoute();
    const { id } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const getPokemon = () => {
        return fetch('https://pokeapi.co/api/v2/pokemon/' + id + '/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok - Status: ' + response.status);
                }
                return response.json();
            })
            .then(json => {
                setLoading(false);
                setData(json);
            })
            .catch(error => {
                console.error('Error fetching Pokemon data:', error.message);
            });
    };


    const checkMyTeam = async () => {
        const team = JSON.parse(await AsyncStorage.getItem('team')) || [];
        if (team.includes(id)) {
            setButtonState('Delete from team');
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            checkMyTeam();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);
    const handleButtonClick = async () => {
        const team = JSON.parse(await AsyncStorage.getItem('team')) || [];
        if (buttonState === 'Add to team') {
            if (team.length < 6) {
                team.push(id);
                await AsyncStorage.setItem('team', JSON.stringify(team));
                setButtonState('Delete from team');
            } else {
                alert('Team is full');
            }
        } else {
            const newTeam = team.filter(pokemon => pokemon !== id);
            await AsyncStorage.setItem('team', JSON.stringify(newTeam));
            setButtonState('Add to team');
        }
    };
    useEffect(() => {
        getPokemon();
    }, []);
    return(
        <View style={style.container}>
            <Button title="Back" onPress={() => navigation.goBack()} />
            <View style={style.typesContainer}>
                <Image
                    source={{uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (id) + ".png",}}
                    style={style.image}/>
                <Text style={style.Title}>Name : {data.name}</Text>
                <Text style={style.Title}>ID : {id}</Text>
                <Text style={style.typeText}>Height : {data.height} kg</Text>
                <Text style={style.typeText}>Weight : {data.weight} cm</Text>
            </View>
            <TouchableOpacity onPress={handleButtonClick}>
                <Text>{buttonState}</Text>
            </TouchableOpacity>
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