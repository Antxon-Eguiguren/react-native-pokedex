import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Pokemon} from '../interfaces/pokemon.interface';
import {FadeInImage} from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState<string>('grey');
  const isMounted = useRef(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (!isMounted.current) {
      return;
    }

    const getColors = async () => {
      const colors = await ImageColors.getColors(pokemon.picture, {
        fallback: 'grey',
      });

      switch (colors.platform) {
        case 'android':
          setBgColor(colors.dominant!);
          break;
        case 'ios':
          setBgColor(colors.primary);
          break;
        default:
          setBgColor('grey');
          break;
      }
    };

    getColors();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Pokemon', {pokemon, color: bgColor})}>
      <View style={{...styles.container, backgroundColor: bgColor}}>
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>
        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>
        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: 120,
    width: windowWidth * 0.4,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 5,
    left: 10,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -20,
    right: -20,
    opacity: 0.5,
  },
  pokemonImage: {
    width: 110,
    height: 110,
    position: 'absolute',
    bottom: -5,
    right: -8,
  },
});
