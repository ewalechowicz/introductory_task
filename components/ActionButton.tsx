import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';

export default function ActionButton({
  title,
  disabled,
  onPress,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled}
    >
      <ThemedText style={styles.buttonText}>{title}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#d6f5d6',
    paddingVertical: 12,
    paddingHorizontal: 48,
    width: '100%',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
});
