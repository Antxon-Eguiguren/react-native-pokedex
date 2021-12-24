import {useEffect, useRef, useState} from 'react';
import {PokemonAPI} from '../api/PokemonAPI';
import {
  Pokemon,
  PokemonResponse,
  Result,
} from '../interfaces/pokemon.interface';

export const usePokemons = () => {
  const nextPageURL = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const getPokemons = async () => {
    try {
      setIsLoading(true);
      const response = await PokemonAPI.get<PokemonResponse>(
        nextPageURL.current,
      );
      nextPageURL.current = response.data.next;
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
    setPokemons([...pokemons, ...newPokemons]);
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return {getPokemons, pokemons, isLoading, error};
};
