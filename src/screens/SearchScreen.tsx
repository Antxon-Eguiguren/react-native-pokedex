import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../components/PokemonCard';
import {SearchInput} from '../components/SearchInput';
import {usePokemonsSearch} from '../hooks/usePokemonsSearch';
import {Pokemon} from '../interfaces/pokemon.interface';
import {styles as globalStyles} from '../styles';

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {pokemons, isLoading, error} = usePokemonsSearch();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      return setFilteredPokemons([]);
    }

    if (isNaN(Number(searchTerm))) {
      setFilteredPokemons(
        pokemons.filter(pokemon =>
          pokemon.name
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()),
        ),
      );
    } else {
      const pokemonById = pokemons.find(pokemon => pokemon.id === searchTerm);
      setFilteredPokemons(pokemonById ? [pokemonById] : []);
    }
  }, [searchTerm, pokemons]);

  return (
    <>
      <Image
        style={globalStyles.pokeballBG}
        source={require('../assets/pokebola.png')}
      />
      <View
        style={{marginHorizontal: 20, marginTop: top + 20, marginBottom: 100}}>
        <SearchInput onDebounce={value => setSearchTerm(value)} />
        {filteredPokemons.length > 0 && (
          <FlatList
            data={filteredPokemons}
            keyExtractor={pokemon => pokemon.id}
            numColumns={2}
            renderItem={({item: pokemon}) => <PokemonCard pokemon={pokemon} />}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <Text
                style={{
                  ...globalStyles.title,
                  ...globalStyles.globalMargin,
                  marginTop: top + 20,
                  marginBottom: 20,
                }}>
                {searchTerm}
              </Text>
            }
          />
        )}
        {filteredPokemons.length === 0 && (
          <View>
            <Text style={styles.error}>No pokemons found 😓</Text>
          </View>
        )}
      </View>
      {isLoading && (
        <View>
          <ActivityIndicator style={{height: 100}} color="grey" size={30} />
        </View>
      )}
      {error && (
        <View>
          <Text style={styles.error}>Error fetching the data...</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    marginTop: 40,
    fontSize: 20,
    textAlign: 'center',
  },
});
