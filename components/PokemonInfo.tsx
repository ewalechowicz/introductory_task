import { PokemonDetails } from '@/types/pokemon';
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import ParallaxScrollView from './ParallaxScrollView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getStatIcon } from '@/utils/getStatIcon';
import PokemonDetailsHeader from './PokemonDetailsHeader';
import Card from './Card';
import { getReadableName } from '@/utils/format';
import StatsItem from './StatsItem';
import ProfileDetail from './ProfileDetail';

export default function PokemonInfo({ pokemon }: { pokemon: PokemonDetails }) {
  return (
    <ThemedView style={styles.container}>
      <ParallaxScrollView
        headerBackgroundColor={{
          dark: '#ffc9c9',
          light: '#ffc9c9',
        }}
        headerImage={
          <PokemonDetailsHeader
            imageUrl={pokemon.sprites.front_default}
            name={pokemon.name}
            type={pokemon.types?.[0].type.name}
          />
        }
      >
        <ThemedView style={styles.content}>
          <View style={styles.profileInfo}>
            <ProfileDetail title="Experience" value={pokemon.base_experience} />
            <ProfileDetail title="Height" value={pokemon.height} />
            <ProfileDetail title="Weight" value={pokemon.weight} />
          </View>
          <Card title="Stats">
            {pokemon.stats.map((stat, index) => (
              <StatsItem
                key={index}
                name={getReadableName(stat.stat.name)}
                value={stat.base_stat}
                icon={
                  <Ionicons
                    name={getStatIcon(stat.stat.name)}
                    color="#ff8080"
                    size={20}
                  />
                }
              />
            ))}
          </Card>
          <Card title="Abilities">
            {pokemon.abilities.map((ability, index) => (
              <View key={index} style={styles.ability}>
                <ThemedText style={styles.abilityText}>
                  {getReadableName(ability.ability.name)}
                </ThemedText>
                {ability.is_hidden && <Ionicons name="eye-off" size={24} />}
              </View>
            ))}
          </Card>
        </ThemedView>
      </ParallaxScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc9c9',
    marginBottom: Platform.select({ android: 24, ios: 16 }),
  },
  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#ffffff',
    padding: 20,
    display: 'flex',
    gap: 15,
  },
  profileInfo: {
    padding: 15,
    backgroundColor: '#d6f5d6',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ability: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hiddenAbility: {
    backgroundColor: '#e6e6e6',
  },
  abilityText: { fontSize: 16 },
});
