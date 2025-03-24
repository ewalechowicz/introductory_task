import { useState, useCallback } from 'react';
import axios from 'axios';
import { Pokemon } from '@/types/pokemon';

type PokemonView = {
  id: number;
  name: string;
  image: string;
};

export function usePokemonList() {
  const [pokemons, setPokemons] = useState<PokemonView[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon');

  const fetchData = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.get(nextUrl);
      const data = await response.data;
      const pokemonWithImages = data.results.map((pokemon: Pokemon) => {
        const id = pokemon.url.split('/').slice(-2, -1)[0];
        return {
          id: id,
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      });

      setPokemons((prev) => [...prev, ...pokemonWithImages]);
      setNextUrl(data.next);
    } catch (error) {
      console.error('Pokemon loading error:', error);
    }
    setLoading(false);
  }, [loading, nextUrl]);

  return { pokemons, loading, fetchData };
}
