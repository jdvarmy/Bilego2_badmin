import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction } from 'react';

import { Artist, IEvent, ServerError } from '../../typings/types';
import { fetchArtistsRequest } from '../../utils/api/requests';
import { addErrorAlertWorker } from '../alert/workers';
import { AppThunk } from '../store';

type State = {
  loading: boolean;
  artistState: Artist | null;
  artists: Artist[] | null;
};

const initialState: State = {
  loading: false,
  artistState: null,
  artists: null,
};

const artists = createSlice({
  initialState,
  name: 'artists',
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
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
});

export const { setLoading, setArtistState, setArtistStateField, setArtists } = artists.actions;

export default artists.reducer;

export const getArtistListForEventAsync =
  (search: string, reactDispatch: Dispatch<SetStateAction<IEvent['artist']>>): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await fetchArtistsRequest({ search });
      reactDispatch(data);
    } catch (e) {
      dispatch(addErrorAlertWorker(e as ServerError));
    } finally {
      dispatch(setLoading(false));
    }
  };
