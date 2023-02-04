import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction } from 'react';

import { City } from '../../typings/enum';
import { IEvent, Item } from '../../typings/types';
import { fetchItemsRequest } from '../../utils/api/requests';
import { addErrorAlertWorker } from '../alert/store/workers';
import { ServerErrorStatus } from '../alert/types/types';
import { AppThunk } from '../store';

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
  (search: string, reactDispatch: Dispatch<SetStateAction<IEvent['item'][]>>, params: { city?: City }): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await fetchItemsRequest({ search, ...params });
      reactDispatch(data);
    } catch (e) {
      dispatch(addErrorAlertWorker(e as ServerErrorStatus));
    } finally {
      dispatch(setLoading(false));
    }
  };
