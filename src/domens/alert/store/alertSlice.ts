import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AlertState, alertScope } from '../types/types';

const initialState: { show: boolean; message: AlertState; archive: string[] } = {
  show: false,
  message: null,
  archive: [],
};

const slice = createSlice({
  initialState,
  name: alertScope,
  reducers: {
    clearAlert: (state, action: PayloadAction<AlertState>) => {
      state.show = false;
      state.message = null;
      state.archive.push(JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      ({ type }) => type.startsWith(alertScope) && type.endsWith('/fulfilled'),
      (state, action: PayloadAction<AlertState>) => {
        state.show = true;
        state.message = action.payload;
      },
    );
  },
});

export const { reducer: alertReducer, actions: alertActions } = slice;
