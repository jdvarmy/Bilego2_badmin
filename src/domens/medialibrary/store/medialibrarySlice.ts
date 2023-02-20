import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { StatusLoading } from '../../../typings/enum';
import { MapFile, MediaFile } from '../../../typings/types';
import { medialibraryScope } from '../types/types';
import { getFileListAsync, getMapListAsync } from './medialibraryThunk';

type State = {
  status: StatusLoading;
  files: MediaFile[] | null;
  maps: MapFile[] | null;
};

const initialState: State = {
  status: StatusLoading.init,
  files: null,
  maps: null,
};

const slice = createSlice({
  initialState,
  name: 'medialibrary',
  reducers: {
    setFileList: (state, action: PayloadAction<MediaFile[]>) => {
      state.files = action.payload;
    },
    setMapList: (state, action) => {
      state.maps = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFileListAsync.fulfilled, (state, action) => {
      state.files = action.payload;
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
