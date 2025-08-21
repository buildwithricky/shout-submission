import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import type { Photo } from '../types/photos';
import type { RootState } from '../store/reduxStore';

// This slice manages the state of liked photos
// Creates my Image reducer with an entity adapter for efficient state management
// Clear Likes Feature : Not implemented, but can be added later

const likedAdapter = createEntityAdapter<Photo>({
  sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const slice = createSlice({
  name: 'images',
  initialState: likedAdapter.getInitialState(),
  reducers: {
    likeToggled: (state, action: PayloadAction<Photo>) => {
      const id = action.payload.id;
      if (state.ids.includes(id)) {
        likedAdapter.removeOne(state, id);
      } else {
        likedAdapter.upsertOne(state, action.payload);
      }
    },
    clearLikes: (state) => {
      likedAdapter.removeAll(state);
    },
  },
});

export const { likeToggled, clearLikes } = slice.actions;
export default slice.reducer;

export const likedSelectors = likedAdapter.getSelectors(
  (state: RootState) => state.imageReducer
);
export const selectIsLiked =
  (id: string) => (state: RootState) => !!likedSelectors.selectById(state, id);
