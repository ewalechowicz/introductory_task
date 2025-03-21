import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { ThemedText } from './ThemedText';

export default function Card({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <ThemedText style={styles.cardTitle}>{title}</ThemedText>
      {children}
    </View>
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
