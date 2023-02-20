import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Item } from '../../../typings/types';

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

const slice = createSlice({
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

export const { actions: itemsActions, reducer: itemsReducer } = slice;
