import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import {PokemonDetails} from '../components/PokemonDetails';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends StackScreenProps<RootStackParams, 'PokemonDetail'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {pokemon, color} = route.params;
  const {top} = useSafeAreaInsets();
  const {fullPokemon, isLoading, error} = usePokemon(pokemon.id);

  return (
    <View>
      <View style={{...styles.headerContainer, backgroundColor: color}}>
        <TouchableOpacity
          style={{...styles.backButton, marginTop: top + 20}}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} color="white" />
        </TouchableOpacity>
        <Text style={{...styles.name, marginTop: top + 50}}>
          {pokemon.name + '\n'}#{pokemon.id}
        </Text>
        <Image
          style={styles.pokeball}
          source={require('../assets/pokebola-blanca.png')}
        />
        <FadeInImage uri={pokemon.picture} style={styles.picture} />
      </View>

      {isLoading && (
        <View>
          <ActivityIndicator
            size={40}
            color={color}
            style={styles.activityIndicator}
          />
        </View>
      )}

      {error && (
        <View>
          <Text style={styles.error}>Error fetching the data...</Text>
        </View>
      )}

      {fullPokemon && <PokemonDetails pokemon={fullPokemon} color={color} />}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  name: {
    color: 'white',
    fontSize: 30,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: 10,
    opacity: 0.5,
  },
  picture: {
    width: 300,
    height: 300,
    position: 'absolute',
    bottom: -15,
  },
  error: {
    marginTop: 40,
    fontSize: 20,
    textAlign: 'center',
  },
  activityIndicator: {
    height: 100,
    marginTop: 40,
  },
});
