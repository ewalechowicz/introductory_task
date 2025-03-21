import { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import axios from 'axios';
import { PokemonDetails } from '@/types/pokemon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PokemonInfo from '@/components/PokemonInfo';
import { ThemedView } from '@/components/ThemedView';
import ActionButton from '@/components/ActionButton';
import { ThemedText } from '@/components/ThemedText';

export default function DetailsScreen() {
  const router = useRouter();
  const { pokemonId } = useLocalSearchParams();

  const [pokemonData, setPokemonData] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      setPokemonData(response.data);
    } catch (error) {
      console.error('Error fetching Pokémon data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const addToFavorite = async () => {
    try {
      await AsyncStorage.setItem('pokemon', JSON.stringify(pokemonData));
      router.push({ pathname: '/favorite' });
    } catch (err) {
      console.log('Cannot add to favorite');
    }
  };

  if (loading)
    return (
      <ThemedView style={styles.noDataContainer}>
        <ActivityIndicator color="#47d147" size={36} />
      </ThemedView>
    );

  return (
    <SafeAreaView style={styles.container}>
      {pokemonData ? (
        <>
          <PokemonInfo pokemon={pokemonData} />
          <ThemedView style={styles.buttonContainer}>
            <ActionButton
              title="Add to favorite"
              onPress={addToFavorite}
              disabled={loading || !pokemonData}
            />
          </ThemedView>
        </>
      ) : (
        <ThemedView style={styles.noDataContainer}>
          <ThemedText>Not found</ThemedText>
        </ThemedView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  noDataContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
