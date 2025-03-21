import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { debounce } from 'lodash';

import { ThemedText } from '@/components/ThemedText';
import React, { memo, useCallback, useState } from 'react';
import { Pokemon } from '@/types/pokemon';
import { ThemedView } from './ThemedView';
import axios from 'axios';

type PokemonView = {
  id: number;
  name: string;
  image: string;
};

const PokemonList = ({
  onItemClick,
}: {
  onItemClick?: (id: number) => void;
}) => {
  const [pokemons, setPokemons] = useState<PokemonView[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon');

  const fetchData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.get(nextUrl);
      const data = await response.data;
      const pokemonWithImages = data.results.map((pokemon: Pokemon) => {
        const id = pokemon.url.split('/').slice(-2, -1)[0];
        return {
          id: id,
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      });
      setPokemons((items) => {
        return [...items, ...pokemonWithImages];
      });
      setNextUrl(data.next);
    } catch (error) {
      console.error('Pokemon loading error:', error);
    }
    setLoading(false);
  };

  const listEmptyComponent = () => {
    if (pokemons?.length === 0) {
      return <ThemedText>No data</ThemedText>;
    }
  };

  const handleEndReached = debounce(() => {
    if (!loading) {
      fetchData();
    }
  }, 500);

  return (
    <FlatList
      data={pokemons}
      getItemLayout={(_data, index) => ({
        length: 60,
        offset: 60 * index,
        index,
      })}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ListItem item={item} onItemClick={onItemClick} />
      )}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={listEmptyComponent}
      ListFooterComponent={() =>
        loading && <ActivityIndicator size="large" color="gray" />
      }
      removeClippedSubviews={true}
      initialNumToRender={14}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
    />
  );
};

const ListItem = memo(
  ({
    item,
    onItemClick,
  }: {
    item: PokemonView;
    onItemClick?: (id: number) => void;
  }) => {
    const handlePress = useCallback(() => {
      onItemClick?.(item.id);
    }, [item.id, onItemClick]);

    return (
      <TouchableOpacity onPress={handlePress}>
        <ThemedView style={styles.listItem}>
          <FastImage
            style={styles.image}
            source={{ uri: item.image }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <ThemedText>{item.name}</ThemedText>
        </ThemedView>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => prevProps.item.id === nextProps.item.id
);

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#808080',
    gap: 12,
  },
});

export default PokemonList;
