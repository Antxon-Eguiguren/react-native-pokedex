import {useEffect, useState} from 'react';
import {PokemonAPI} from '../api/PokemonAPI';
import {FullPokemon} from '../interfaces/pokemon.interface';

export const usePokemon = (id: string) => {
  const [fullPokemon, setFullPokemon] = useState<FullPokemon>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const getPokemon = async () => {
    try {
      setIsLoading(true);
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const response = await PokemonAPI.get<FullPokemon>(url);
      setFullPokemon(response.data);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return {fullPokemon, isLoading, error};
};
