import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { deleteEventDateRequest, editEventDateRequest, saveEventDateRequest } from '../../api/requests';
import { Event, EventDate, ServerError } from '../../typings/types';
import { addErrorAlertWorker } from '../alert/workers';
import { AppThunk } from '../store';

type State = {
  loading: boolean;
  // используется для хранения данных события, синхронизовано с данными в БД
  event: Event | null;
  // используется для хранения стейта события, синхронизовано с "клиентом"
  eventState: Event | null;
  events: Event[] | null;
  selectedDateUid?: string;
};

const initialState: State = {
  loading: false,
  event: null,
  eventState: null,
  events: null,
  selectedDateUid: undefined,
};

const events = createSlice({
  initialState,
  name: 'events',
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setEvent: (state, action: PayloadAction<Event | null>) => {
      state.event = action.payload;
    },
    setEventState: (state, action: PayloadAction<Event | null>) => {
      state.eventState = action.payload;
    },
    setEventStateField: (state, action: PayloadAction<Partial<Event>>) => {
      state.eventState = { ...state.eventState, ...action.payload };
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    setSelectedDateUid: (state, action: PayloadAction<string | undefined>) => {
      state.selectedDateUid = action.payload;
    },
  },
});

export const { setLoading, setEvent, setEventState, setEvents, setEventStateField, setSelectedDateUid } =
  events.actions;

export default events.reducer;

export const saveTemplateEventDateAsync =
  (eventUid: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setLoading(true));
    const eventDates = getState().events.eventState?.eventDates || [];

    try {
      const { data } = await saveEventDateRequest(eventUid);
      dispatch(setEventStateField({ eventDates: [...eventDates, data] }));
      dispatch(setSelectedDateUid(data.uid));
    } catch (e) {
      dispatch(addErrorAlertWorker(e as ServerError));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteEventDateAsync =
  (uid: string, eventUid: string): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      await deleteEventDateRequest(uid, eventUid);
    } catch (e) {
      dispatch(addErrorAlertWorker(e as ServerError));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const editEventDateAsync =
  (uid: string, reqData: Partial<EventDate>): AppThunk =>
  async (dispatch, getState) => {
    const { eventState } = getState().events;
    dispatch(setLoading(true));

    try {
      if (!eventState?.uid) {
        return;
      }
      const { data } = await editEventDateRequest(eventState.uid, { ...reqData, uid });

      const localEventDates = eventState?.eventDates?.map((d) => {
        if (d.uid === data.uid) {
          return data;
        }
        return d;
      });
      dispatch(setEventStateField({ eventDates: localEventDates }));
    } catch (e) {
      dispatch(addErrorAlertWorker(e as ServerError));
    } finally {
      dispatch(setLoading(false));
    }
  };
