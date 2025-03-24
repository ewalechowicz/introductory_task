import { StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export default function Card({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <ThemedView style={styles.card}>
      {title && <ThemedText style={styles.cardTitle}>{title}</ThemedText>}
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});
