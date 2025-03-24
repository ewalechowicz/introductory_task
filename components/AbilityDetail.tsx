import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AbilityDetail({
  name,
  hidden,
}: {
  name: string;
  hidden: boolean;
}) {
  return (
    <View style={styles.ability}>
      <ThemedText style={styles.abilityText}>{name}</ThemedText>
      {hidden && <Ionicons name="eye-off" size={24} />}
    </View>
  );
}

const styles = StyleSheet.create({
  ability: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  abilityText: {
    fontSize: 16,
  },
});
