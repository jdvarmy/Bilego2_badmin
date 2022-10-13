import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event, Item } from '../../typings/types';
import { AppThunk } from '../store';
import { Dispatch, SetStateAction } from 'react';
import { fetchItemsRequest } from '../../api/requests';
import { City } from '../../typings/enum';

type State = {
  loading: boolean;
  itemState: Item | null;
  items: Item[] | null;
};

const initialState: State = {
  loading: false,
  itemState: null,
  items: null,
};

const items = createSlice({
  initialState,
  name: 'items',
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setItemState: (state, action: PayloadAction<Item | null>) => {
      state.itemState = action.payload;
    },
    setItemStateField: (state, action: PayloadAction<any>) => {
      state.itemState = { ...state.itemState, ...action.payload };
    },
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setLoading, setItemState, setItemStateField, setItems } = items.actions;

export default items.reducer;

export const getItemListForEventAsync =
  (search: string, reactDispatch: Dispatch<SetStateAction<Event['item'][]>>, params: { city?: City }): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await fetchItemsRequest({ search, ...params });
      reactDispatch(data);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };
