import React, { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { likedSelectors } from '../features/imageSlice';
import { useAppSelector } from '../hooks/hooks';
import { PhotoCard } from '../components/PhotoCard';
import type { Photo } from '../types/photos';

export default function LikedPhotosScreen() {
  const liked = useAppSelector(likedSelectors.selectAll);

  const renderItem = useCallback(({ item }: { item: Photo }) => (
    <PhotoCard photo={item} />
  ), []);

  if (!liked.length) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>No liked photos yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={liked}
      keyExtractor={(p) => p.id}
      renderItem={renderItem}
      removeClippedSubviews
      windowSize={7}
    />
  );
}
