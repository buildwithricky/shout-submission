import React, { memo, useCallback, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Image } from 'react-native';
import type { Photo } from '../types/photos';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { likeToggled, selectIsLiked } from '../features/imageSlice';

type Props = { photo: Photo };

function PhotoCardBase({ photo }: Props) {
    const dispatch = useAppDispatch();
    const isLiked = useAppSelector(selectIsLiked(photo.id));
    const [loading, setLoading] = useState(true);

    const aspectRatio = useMemo(() => photo.width / photo.height, [photo.width, photo.height]);

    const onToggle = useCallback(() => {
        dispatch(likeToggled(photo));
    }, [dispatch, photo]);

    return (
        <View style={styles.card}>
            <View style={{ width: '100%', aspectRatio, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }}>
                {loading && <ActivityIndicator size="small" color="#999" />}
                <Image
                    source={{ uri: photo.download_url }}
                    style={{ width: '100%', height: '100%', position: 'absolute' }}
                    resizeMode="cover"
                    onLoadEnd={() => setLoading(false)}
                />
            </View>

            <View style={styles.row}>
                <Text style={styles.author} numberOfLines={1}>by {photo.author}</Text>
                <TouchableOpacity onPress={onToggle} hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}>
                    <Text style={[styles.heart, isLiked && styles.heartActive]}>{isLiked ? '♥' : '♡'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: { marginBottom: 12, backgroundColor: '#fff' },
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12 },
    author: { fontSize: 14, flex: 1, marginRight: 8 },
    heart: { fontSize: 20, opacity: 0.6 },
    heartActive: { opacity: 1 },
});

export const PhotoCard = memo(PhotoCardBase);
