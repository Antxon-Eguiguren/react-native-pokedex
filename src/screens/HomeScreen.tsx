import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../components/PokemonCard';
import {usePokemons} from '../hooks/usePokemons';
import {styles} from '../styles';
import SplashScreen from 'react-native-splash-screen';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {pokemons, getPokemons} = usePokemons();

  useEffect(() => {
    if (pokemons.length > 0) {
      SplashScreen.hide();
    }
  }, [pokemons]);

  return (
    <>
      <Image
        style={styles.pokeballBG}
        source={require('../assets/pokebola.png')}
      />
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={pokemons}
          keyExtractor={pokemon => pokemon.id}
          numColumns={2}
          renderItem={({item: pokemon}) => <PokemonCard pokemon={pokemon} />}
          showsVerticalScrollIndicator={false}
          onEndReached={getPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} color="grey" size={30} />
          }
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                marginTop: top + 20,
                marginBottom: 20,
              }}>
              Pokemon
            </Text>
          }
        />
      </View>
    </>
  );
};
