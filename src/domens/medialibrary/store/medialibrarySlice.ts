import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { StatusLoading } from '../../../typings/enum';
import { MapFile, MediaFile } from '../../../typings/types';
import { ItemsPageProps, defaultCountPost } from '../../post/types';
import { medialibraryScope } from '../types';
import { fetchMediaFilesAsync, getMapListAsync } from './medialibraryThunk';

type State = {
  status: StatusLoading;
  files: MediaFile[] | null;
  maps: MapFile[] | null;
  props: ItemsPageProps;
};

const initialState: State = {
  status: StatusLoading.init,
  files: null,
  maps: null,
  props: { offset: 0, total: 0 },
};

const slice = createSlice({
  initialState,
  name: medialibraryScope,
  reducers: {
    setFileList: (state, action: PayloadAction<MediaFile[]>) => {
      state.files = action.payload;
    },
    setMapList: (state, action) => {
      state.maps = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMediaFilesAsync.fulfilled, (state, action) => {
      state.props = action.payload?.props || { offset: 0, total: 0 };
      if (action.payload?.props?.offset > defaultCountPost) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        state.files = [...state.files, ...action.payload?.items];
      } else {
        state.files = action.payload?.items || null;
      }
    });
    builder.addCase(getMapListAsync.fulfilled, (state, action) => {
      state.maps = action.payload;
    });

    builder.addMatcher(
      ({ type }) => type.startsWith(medialibraryScope) && type.endsWith('/pending'),
      (state) => {
        state.status = StatusLoading.loading;
      },
    );
    builder.addMatcher(
      ({ type }) => type.startsWith(medialibraryScope) && type.endsWith('/fulfilled'),
      (state) => {
        state.status = StatusLoading.success;
      },
    );
    builder.addMatcher(
      ({ type }) => type.startsWith(medialibraryScope) && type.endsWith('/rejected'),
      (state) => {
        state.status = StatusLoading.error;
      },
    );
  },
});

export const { actions: medialibraryActions, reducer: medialibraryReducer } = slice;
