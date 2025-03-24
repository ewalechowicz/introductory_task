import { Platform, SafeAreaView, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { PokemonDetails } from '@/types/pokemon';
import PokemonInfo from '@/components/PokemonInfo';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import ActionButton from '@/components/ActionButton';

export default function FavoriteScreen() {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );

  const getDataFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem('pokemon');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setPokemonDetails(parsedData);
      } else {
        setPokemonDetails(null);
      }
    } catch (error) {
      console.error('Error getting data from AsyncStorage: ', error);
    }
  };

  const removeFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('pokemon');
    } catch (err) {
      console.log('Cannot add to storage');
    } finally {
      getDataFromStorage();
    }
  };

  useEffect(() => {
    getDataFromStorage();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {pokemonDetails ? (
        <>
          <PokemonInfo pokemon={pokemonDetails} />
          <View style={styles.buttonContainer}>
            <ActionButton title="Delete favorite" onPress={removeFromStorage} />
          </View>
        </>
      ) : (
        <NoDataScreen />
      )}
    </SafeAreaView>
  );
}

const NoDataScreen = () => {
  return (
    <ThemedView style={styles.noDataScreen}>
      <ThemedText>No favorite pokemon</ThemedText>
      <Link href="/">
        <ThemedText style={styles.link} type="link">
          Go to list
        </ThemedText>
      </Link>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  noDataScreen: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    color: '#47d147',
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: Platform.select({ ios: 80, android: 0 }),
  },
});
