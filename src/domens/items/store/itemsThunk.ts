import { createAsyncThunk } from '@reduxjs/toolkit';

import { useAlertError } from '../../alert/hooks/useAlertError';
import { addAlertSuccessAsync } from '../../alert/store/alertThunk';
import { PagePostProps } from '../../post/types/types';
import { RootState } from '../../store';
import {
  deleteItemRequest,
  fetchItemsRequest,
  getItemRequest,
  postTemplateItemRequest,
  putItemRequest,
} from '../api/itemsRequest';
import { IItem, itemsScope } from '../type/types';
import { selectItemState } from './itemsSelector';
import { workerPrepareData } from './workers';

export const fetchItemsAsync = createAsyncThunk(
  `${itemsScope}/fetchItemsAsync`,
  async (pageProps: PagePostProps<IItem> | undefined, { rejectWithValue }) => {
    try {
      const { data } = await fetchItemsRequest(pageProps);

      return data;
    } catch (error) {
      useAlertError(error, rejectWithValue);
    }
  },
);

export const getItemAsync = createAsyncThunk(
  `${itemsScope}/getItemAsync`,
  async ({ uid }: { uid: IItem['uid'] }, { rejectWithValue }) => {
    try {
      const { data } = await getItemRequest(uid);

      return data;
    } catch (error) {
      useAlertError(error, rejectWithValue);
    }
  },
);

export const saveItemAsync = createAsyncThunk(
  `${itemsScope}/saveItemAsync`,
  async (item: IItem, { dispatch, getState, rejectWithValue }) => {
    try {
      const itemState = selectItemState(getState() as RootState);

      const { data } = await putItemRequest(workerPrepareData({ ...itemState, ...item }));
      dispatch(addAlertSuccessAsync({ title: 'Сохранено', text: 'Площадка успешно сохранена!' }));

      return data;
    } catch (error) {
      useAlertError(error, rejectWithValue);
    }
  },
);

export const saveTemplateItemAsync = createAsyncThunk(
  `${itemsScope}/saveTemplateItemAsync`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await postTemplateItemRequest();

      return data;
    } catch (error) {
      useAlertError(error, rejectWithValue);
    }
  },
);

export const deleteItemAsync = createAsyncThunk(
  `${itemsScope}/deleteItemAsync`,
  async ({ uid }: { uid: string; pageProps?: PagePostProps<IItem> }, { rejectWithValue }) => {
    try {
      await deleteItemRequest(uid);
    } catch (error) {
      useAlertError(error, rejectWithValue);
    }
  },
);
