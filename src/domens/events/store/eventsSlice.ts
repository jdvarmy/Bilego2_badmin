import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { StatusLoading } from '../../../typings/enum';
import { IEvent } from '../../../typings/types';
import { editEventDateAsync, saveTemplateEventDateAsync } from '../../eventDates/store/eventDateThunk';
import { eventsScope } from '../types/types';
import { editEventAsync, fetchEventsAsync, getEventAsync, saveEventAsync, saveTemplateEventAsync } from './eventsThunk';

type State = {
  status: StatusLoading;
  // используется для хранения данных события, синхронизовано с данными в БД
  event: IEvent | null;
  // используется для хранения стейта события, синхронизовано с "клиентом"
  eventState: IEvent | null;
  // список событий
  events: IEvent[] | null;
};

const initialState: State = {
  status: StatusLoading.init,
  event: null,
  eventState: null,
  events: null,
};

const slice = createSlice({
  initialState,
  name: eventsScope,
  reducers: {
    setStatus: (state, action: PayloadAction<StatusLoading>) => {
      state.status = action.payload;
    },
    setEvent: (state, action: PayloadAction<IEvent | null>) => {
      state.event = action.payload;
    },
    setEventState: (state, action: PayloadAction<IEvent | null>) => {
      state.eventState = action.payload;
    },
    setEventStateField: (state, action: PayloadAction<Partial<IEvent>>) => {
      state.eventState = { ...state.eventState, ...action.payload };
    },
    setEvents: (state, action: PayloadAction<IEvent[]>) => {
      state.events = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Работаем с событиями
    builder.addCase(fetchEventsAsync.fulfilled, (state, action) => {
      state.events = action.payload;
    });

    builder.addCase(getEventAsync.fulfilled, (state, action) => {
      state.event = action.payload;
      state.eventState = action.payload;
    });

    // Работаем с датами события
    builder.addCase(saveTemplateEventDateAsync.fulfilled, (state, action) => {
      state.eventState.eventDates.push(action.payload);
      state.event.eventDates.push(action.payload);
    });
    builder.addCase(editEventDateAsync.fulfilled, (state, action) => {
      const index = state.event.eventDates.findIndex((date) => date.uid === action.payload.uid);
      const indexState = state.eventState.eventDates.findIndex((date) => date.uid === action.payload.uid);

      if (index + 1) {
        state.event.eventDates.splice(index, 1, action.payload);
      }
      if (indexState + 1) {
        state.eventState.eventDates.splice(indexState, 1, action.payload);
      }

      return undefined;
    });

    // Помощники
    builder.addMatcher(
      ({ type }) =>
        [editEventAsync.fulfilled.type, saveEventAsync.fulfilled.type, saveTemplateEventAsync.fulfilled.type].includes(
          type,
        ),
      (state, action: PayloadAction<IEvent>) => {
        state.event = action.payload;
        state.eventState = action.payload;
      },
    );

    builder.addMatcher(
      ({ type }) => type.startsWith(eventsScope) && type.endsWith('/pending'),
      (state) => {
        state.status = StatusLoading.loading;
      },
    );
    builder.addMatcher(
      ({ type }) => type.startsWith(eventsScope) && type.endsWith('/fulfilled'),
      (state) => {
        state.status = StatusLoading.success;
      },
    );
    builder.addMatcher(
      ({ type }) => type.startsWith(eventsScope) && type.endsWith('/rejected'),
      (state) => {
        state.status = StatusLoading.error;
      },
    );
  },
});

export const { actions: eventsActions, reducer: eventsReducer } = slice;
