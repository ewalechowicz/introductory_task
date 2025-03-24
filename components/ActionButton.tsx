import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

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
    <ThemedView>
      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        activeOpacity={disabled ? 1 : 0.7}
        onPress={onPress}
        disabled={disabled}
      >
        <ThemedText style={styles.buttonText}>{title}</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
  buttonDisabled: {
    opacity: 0.5,
  },
});
