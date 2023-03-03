import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { StatusLoading } from '../../../typings/enum';
import { ItemsPageProps } from '../../post/types/types';
import { IItem, itemsScope } from '../type/types';
import { fetchItemsAsync, getItemAsync, saveItemAsync, saveTemplateItemAsync } from './itemsThunk';

type State = {
  status: StatusLoading;
  // используется для хранения данных площадки, синхронизовано с данными в БД
  item: IItem | undefined;
  // используется для хранения стейта площадки, синхронизовано с "клиентом"
  itemState: IItem | undefined;
  items: IItem[] | undefined;
  pagination: ItemsPageProps | undefined;
};

const initialState: State = {
  status: StatusLoading.init,
  item: undefined,
  itemState: undefined,
  items: undefined,
  pagination: undefined,
};

const slice = createSlice({
  initialState,
  name: 'items',
  reducers: {
    setItem: (state, action: PayloadAction<IItem | undefined>) => {
      state.item = action.payload;
    },
    setItemState: (state, action: PayloadAction<IItem | undefined>) => {
      state.itemState = action.payload;
    },
    setItemStateField: (state, action: PayloadAction<Partial<IItem>>) => {
      state.itemState = { ...state.itemState, ...action.payload };
    },
    setItems: (state, action: PayloadAction<IItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Работаем с площадками
    builder.addCase(fetchItemsAsync.fulfilled, (state, action) => {
      // Не используется
      state.items = action.payload?.items ?? undefined;
      state.pagination = action.payload?.props ?? undefined;
    });

    builder.addCase(getItemAsync.fulfilled, (state, action) => {
      state.item = action.payload;
      state.itemState = action.payload;
    });

    // Помощники
    builder.addMatcher(
      ({ type }) => [saveItemAsync.fulfilled.type, saveTemplateItemAsync.fulfilled.type].includes(type),
      (state, action: PayloadAction<IItem>) => {
        state.item = action.payload;
        state.itemState = action.payload;
      },
    );

    builder.addMatcher(
      ({ type }) => type.startsWith(itemsScope) && type.endsWith('/pending'),
      (state) => {
        state.status = StatusLoading.loading;
      },
    );
    builder.addMatcher(
      ({ type }) => type.startsWith(itemsScope) && type.endsWith('/fulfilled'),
      (state) => {
        state.status = StatusLoading.success;
      },
    );
    builder.addMatcher(
      ({ type }) => type.startsWith(itemsScope) && type.endsWith('/rejected'),
      (state) => {
        state.status = StatusLoading.error;
      },
    );
  },
});

export const { actions: itemsActions, reducer: itemsReducer } = slice;
