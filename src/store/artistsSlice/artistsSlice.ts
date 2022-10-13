import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event, Artist } from '../../typings/types';
import { AppThunk } from '../store';
import { Dispatch, SetStateAction } from 'react';
import { fetchArtistsRequest } from '../../api/requests';

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

const delayRandomly = () => {
  const timeout = Math.random() * (3000 - 100) + 100;
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const getArtistListForEventAsync =
  (search: string, reactDispatch: Dispatch<SetStateAction<Event['artist']>>): AppThunk =>
  async (dispatch) => {
    //todo: разобраться с race condition
    const abortController = new AbortController();
    dispatch(setLoading(true));

    try {
      await delayRandomly();
      const { data } = await fetchArtistsRequest({ search }, { signal: abortController.signal });
      if (abortController.signal.aborted) {
        console.log('race');
        return;
      }
      reactDispatch(data);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };
