import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { debounce } from 'lodash';
import { ThemedText } from '@/components/ThemedText';
import React, { memo, useCallback } from 'react';
import { ThemedView } from './ThemedView';
import { usePokemonList } from '@/hooks/usePokemonList';

type PokemonView = {
  id: number;
  name: string;
  image: string;
};

export default function PokemonList({
  onItemClick,
}: {
  onItemClick?: (id: number) => void;
}) {
  const { pokemons, loading, fetchData } = usePokemonList();

  const listEmptyComponent = () => {
    if (pokemons?.length === 0 && !loading) {
      return <ThemedText>No data</ThemedText>;
    }
  };

  const handleEndReached = debounce(() => {
    if (!loading) {
      fetchData();
    }
  }, 300);

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
}

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
