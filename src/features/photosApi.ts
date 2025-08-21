import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Photo } from '../types/photos';

export const photosApi = createApi({
  reducerPath: 'photosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://picsum.photos/v2/' }),
  endpoints: (builder) => ({
    getPhotos: builder.query<Photo[], { page: number; limit: number }>(
      {
        query: ({ page, limit }) => `list?page=${page}&limit=${limit}`,
        keepUnusedDataFor: 60,
      }
    ),
  }),
});

export const { useGetPhotosQuery } = photosApi;
