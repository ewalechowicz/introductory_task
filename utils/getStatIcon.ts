export const getStatIcon = (statName: string) => {
  switch (statName) {
    case 'hp':
      return 'heart';
    case 'attack':
      return 'flash';
    case 'defense':
      return 'shield';
    case 'special-attack':
      return 'flame';
    case 'special-defense':
      return 'shield-half';
    case 'speed':
      return 'rocket';
    default:
      return 'help';
  }
};
