import {useEffect, useState} from 'react';
import {PokemonAPI} from '../api/PokemonAPI';
import {
  Pokemon,
  PokemonResponse,
  Result,
} from '../interfaces/pokemon.interface';

export const usePokemonsSearch = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const getPokemons = async () => {
    try {
      setIsLoading(true);
      const response = await PokemonAPI.get<PokemonResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=1200',
      );
      mapPokemons(response.data.results);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  const mapPokemons = (poks: Result[]) => {
    const newPokemons: Pokemon[] = poks.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return {id, name, picture};
    });
    setPokemons(newPokemons);
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return {pokemons, isLoading, error};
};
