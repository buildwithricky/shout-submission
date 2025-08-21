import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, View } from 'react-native';
import { useGetPhotosQuery } from '../features/photosApi';
import type { Photo } from '../types/photos';
import { PhotoCard } from '../components/PhotoCard';

const LIMIT = 8;

export default function AllPhotosScreen() {
    const [page, setPage] = useState(1);
    const [items, setItems] = useState<Photo[]>([]);
    const { data, isFetching, isLoading, isError, refetch } =
        useGetPhotosQuery({ page, limit: LIMIT });

    useEffect(() => {
        if (data && data.length) {
            setItems((prev) => {
                const map = new Map(prev.map((p) => [p.id, p]));
                data.forEach((p) => map.set(p.id, p));
                const merged = Array.from(map.values());
                // Prefetch images
                data.forEach(photo => Image.prefetch(photo.download_url));
                return merged;
            });
        }
    }, [data]);

    const onEndReached = useCallback(() => {
        if (!isFetching) setPage((p) => p + 1);
    }, [isFetching]);

    const onRefresh = useCallback(() => {
        setItems([]);
        setPage(1);
        refetch();
    }, [refetch]);

    const renderItem = useCallback(({ item }: { item: Photo }) => (
        <PhotoCard photo={item} />
    ), []);

    const keyExtractor = useCallback((p: Photo) => p.id, []);

    return (
        <FlatList
            data={items}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.6}
            removeClippedSubviews
            initialNumToRender={6}
            windowSize={7}
            maxToRenderPerBatch={8}
            updateCellsBatchingPeriod={50}
            ListFooterComponent={
                isFetching ? (
                    <View style={{ paddingVertical: 16 }}><ActivityIndicator /></View>
                ) : null
            }
            refreshControl={
                <RefreshControl refreshing={isLoading && items.length === 0} onRefresh={onRefresh} />
            }
        />
    );
}
