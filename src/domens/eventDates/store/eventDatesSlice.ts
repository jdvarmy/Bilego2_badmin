import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { StatusLoading } from '../../../typings/enum';
import { eventDatesScope } from '../types';
import { deleteEventDateAsync, saveTemplateEventDateAsync } from './eventDateThunk';

type State = {
  status: StatusLoading;
  // выбранная дата при редактировании события
  selectedDateUid?: string;
};

const initialState: State = {
  status: StatusLoading.init,
  selectedDateUid: undefined,
};

const slice = createSlice({
  initialState,
  name: eventDatesScope,
  reducers: {
    setSelectedDateUid: (state, action: PayloadAction<string | undefined>) => {
      state.selectedDateUid = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveTemplateEventDateAsync.fulfilled, (state, action) => {
      state.selectedDateUid = action.payload.uid;
    });

    builder.addCase(deleteEventDateAsync.fulfilled, (state, action) => {
      console.log('We are deleted:', action.payload);
    });

    builder.addMatcher(
      ({ type }) => type.startsWith(eventDatesScope) && type.endsWith('/pending'),
      (state) => {
        state.status = StatusLoading.loading;
      },
    );
    builder.addMatcher(
      ({ type }) => type.startsWith(eventDatesScope) && type.endsWith('/fulfilled'),
      (state) => {
        state.status = StatusLoading.success;
      },
    );
    builder.addMatcher(
      ({ type }) => type.startsWith(eventDatesScope) && type.endsWith('/rejected'),
      (state) => {
        state.status = StatusLoading.error;
      },
    );
  },
});

export const { actions: eventDatesActions, reducer: eventDatesReducer } = slice;
