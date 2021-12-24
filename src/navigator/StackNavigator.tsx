import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Pokemon} from '../interfaces/pokemon.interface';
import {HomeScreen} from '../screens/HomeScreen';
import {PokemonScreen} from '../screens/PokemonScreen';

export type RootStackParams = {
  Home: undefined;
  Pokemon: {
    pokemon: Pokemon;
    color: string;
  };
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Pokemon" component={PokemonScreen} />
    </Stack.Navigator>
  );
};
