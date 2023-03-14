import { createAsyncThunk } from '@reduxjs/toolkit';

import { addAlertSuccessAsync } from '../../alert/store/alertThunk';
import { workerAddError } from '../../alert/store/workers';
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
  async (pageProps: PagePostProps<IItem> | undefined, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await fetchItemsRequest(pageProps);

      return data;
    } catch (error) {
      dispatch(workerAddError(error));
      return rejectWithValue(error);
    }
  },
);

export const getItemAsync = createAsyncThunk(
  `${itemsScope}/getItemAsync`,
  async ({ uid }: { uid: IItem['uid'] }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await getItemRequest(uid);

      return data;
    } catch (error) {
      dispatch(workerAddError(error));
      return rejectWithValue(error);
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
      dispatch(workerAddError(error));
      return rejectWithValue(error);
    }
  },
);

export const saveTemplateItemAsync = createAsyncThunk(
  `${itemsScope}/saveTemplateItemAsync`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await postTemplateItemRequest();

      return data;
    } catch (error) {
      dispatch(workerAddError(error));
      return rejectWithValue(error);
    }
  },
);

export const deleteItemAsync = createAsyncThunk(
  `${itemsScope}/deleteItemAsync`,
  async ({ uid }: { uid: string; pageProps?: PagePostProps<IItem> }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await deleteItemRequest(uid);

      return data;
    } catch (error) {
      dispatch(workerAddError(error));
      return rejectWithValue(error);
    }
  },
);
