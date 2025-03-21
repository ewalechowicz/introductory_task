import { View } from 'react-native';
import { ThemedText } from './ThemedText';
import { StyleSheet } from 'react-native';
import { ReactElement } from 'react';

export default function StatsItem({
  name,
  value,
  icon,
}: {
  name: string;
  value: number | string;
  icon: ReactElement;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.nameSection}>
        {icon}
        <ThemedText style={styles.name}>{name}</ThemedText>
      </View>
      <ThemedText style={styles.value}>{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  nameSection: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  name: {
    color: '#404040',
  },
  value: {
    fontWeight: 'bold',
  },
});
