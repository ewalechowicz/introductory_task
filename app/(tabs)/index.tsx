import PokemonList from '@/components/PokemonList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useCallback } from 'react';

export default function ListScreen() {
  const router = useRouter();

  const handleItemClick = useCallback(
    (id: number) => {
      router.push({
        pathname: '/details',
        params: { pokemonId: id },
      });
    },
    [router]
  );

  return (
    <SafeAreaView style={styles.container}>
      <PokemonList onItemClick={handleItemClick} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
