import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {FullPokemon} from '../interfaces/pokemon.interface';
import {FadeInImage} from './FadeInImage';
import {StatsBar} from './StatsBar';

const screenHeight = Dimensions.get('window').height;

interface Props {
  pokemon: FullPokemon;
  color: string;
}

export const PokemonDetails = ({pokemon, color}: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
        height: screenHeight,
      }}>
      <View style={styles.container}>
        {pokemon.types.length > 0 && (
          <>
            <Text style={styles.title}>Types</Text>
            <View style={{flexDirection: 'row'}}>
              {pokemon.types.map(({type}) => (
                <Text key={type.name} style={styles.regularText}>
                  {type.name.toLocaleUpperCase()}
                </Text>
              ))}
            </View>
          </>
        )}

        <View style={{flexDirection: 'row'}}>
          {pokemon.weight && (
            <View style={{marginRight: 40}}>
              <Text style={styles.title}>Weight</Text>
              <Text style={styles.regularText}>{pokemon.weight}grs</Text>
            </View>
          )}
          {pokemon.height && (
            <View>
              <Text style={styles.title}>Height</Text>
              <Text style={styles.regularText}>{pokemon.height}cms</Text>
            </View>
          )}
        </View>

        {pokemon.sprites && (
          <>
            <Text style={styles.title}>Sprites</Text>
            <ScrollView horizontal={true}>
              {pokemon.sprites.front_default && (
                <FadeInImage
                  uri={pokemon.sprites.front_default}
                  style={styles.basicSprite}
                />
              )}
              {pokemon.sprites.back_default && (
                <FadeInImage
                  uri={pokemon.sprites.back_default}
                  style={styles.basicSprite}
                />
              )}
              {pokemon.sprites.front_shiny && (
                <FadeInImage
                  uri={pokemon.sprites.front_shiny}
                  style={styles.basicSprite}
                />
              )}
              {pokemon.sprites.back_shiny && (
                <FadeInImage
                  uri={pokemon.sprites.back_shiny}
                  style={styles.basicSprite}
                />
              )}
            </ScrollView>
          </>
        )}

        {pokemon.abilities.length > 0 && (
          <>
            <Text style={styles.title}>Base Abilities</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {pokemon.abilities.map(({ability}) => (
                <Text key={ability.name} style={styles.regularText}>
                  {ability.name.toLocaleUpperCase()}
                </Text>
              ))}
            </View>
          </>
        )}

        {pokemon.stats.length > 0 && (
          <View style={{marginBottom: 50}}>
            <Text style={styles.title}>Stats</Text>
            <View>
              {pokemon.stats.map((stat, index) => (
                <View
                  key={stat.stat.name + index}
                  style={{flexDirection: 'row', marginBottom: 5}}>
                  <Text style={{...styles.regularText, width: 170}}>
                    {stat.stat.name.toLocaleUpperCase()}:
                  </Text>
                  <Text
                    style={{
                      ...styles.regularText,
                      fontWeight: 'bold',
                      width: 35,
                    }}>
                    {stat.base_stat}
                  </Text>
                  <StatsBar stat={stat.base_stat} color={color} />
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 370,
    marginBottom: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  regularText: {
    fontSize: 19,
    marginRight: 10,
  },
  basicSprite: {
    width: 85,
    height: 85,
  },
});
