import PokemonList from '@/components/PokemonList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function ListScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <PokemonList
        onItemClick={(id) => {
          router.push({
            pathname: '/details',
            params: { pokemonId: id },
          });
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
