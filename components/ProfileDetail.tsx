import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

export default function ProfileDetail({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <View style={styles.infoItem}>
      <ThemedText style={styles.infoTitle}>{title}</ThemedText>
      <ThemedText style={styles.infoText}>{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    color: 'black',
    fontSize: 18,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
});
