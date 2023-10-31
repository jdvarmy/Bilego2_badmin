import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { StatusLoading } from '../../../typings/enum';
import { Artist } from '../../../typings/types';
import { artistsScope } from '../types';

type State = {
  status: StatusLoading;
  artistState: Artist | null;
  artists: Artist[] | null;
};

const initialState: State = {
  status: StatusLoading.init,
  artistState: null,
  artists: null,
};

const slice = createSlice({
  initialState,
  name: 'artists',
  reducers: {
    setArtistState: (state, action: PayloadAction<Artist | null>) => {
      state.artistState = action.payload;
    },
    setArtistStateField: (state, action: PayloadAction<any>) => {
      state.artistState = { ...state.artistState, ...action.payload };
    },
    setArtists: (state, action: PayloadAction<Artist[]>) => {
      state.artists = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      ({ type }) => type.startsWith(artistsScope) && type.endsWith('/pending'),
      (state) => {
        state.status = StatusLoading.loading;
      },
    );
    builder.addMatcher(
      ({ type }) => type.startsWith(artistsScope) && type.endsWith('/fulfilled'),
      (state) => {
        state.status = StatusLoading.success;
      },
    );
    builder.addMatcher(
      ({ type }) => type.startsWith(artistsScope) && type.endsWith('/rejected'),
      (state) => {
        state.status = StatusLoading.error;
      },
    );
  },
});

export const { actions: artistsActions, reducer: artistsReducer } = slice;
