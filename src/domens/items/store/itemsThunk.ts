import { createAsyncThunk } from '@reduxjs/toolkit';

import { addAlertErrorAsync, addAlertSuccessAsync } from '../../alert/store/alertThunk';
import { ServerErrorStatus } from '../../alert/types/types';
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
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await fetchItemsRequest();

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
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
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
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
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
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
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
      return rejectWithValue(error);
    }
  },
);

export const deleteItemAsync = createAsyncThunk(
  `${itemsScope}/deleteItemAsync`,
  async (uid: string, { dispatch, rejectWithValue }) => {
    try {
      await deleteItemRequest(uid);

      dispatch(fetchItemsAsync());
    } catch (error) {
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
      return rejectWithValue(error);
    }
  },
);
