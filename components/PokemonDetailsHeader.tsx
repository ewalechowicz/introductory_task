import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

export default function PokemonDetailsHeader({
  imageUrl,
  name,
  type,
}: {
  imageUrl: string;
  name: string;
  type: string;
}) {
  return (
    <View style={styles.header}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.title}>
        <ThemedText style={styles.name}>{name}</ThemedText>
        <ThemedText style={styles.type}>Type: {type}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    display: 'flex',
    paddingVertical: 24,
    gap: 8,
  },
  image: {
    width: 130,
    height: 130,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  name: { fontSize: 24, fontWeight: 'bold', color: 'black' },
  type: { fontSize: 18, color: 'black' },
});
