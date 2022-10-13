import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event, EventDate } from '../../typings/types';
import { AppThunk } from '../store';
import {
  getEventRequest,
  deleteEventDateRequest,
  editEventDateRequest,
  saveEventDateRequest,
  saveEventRequest,
  saveTemplateEventRequest,
} from '../../api/requests';

export type EventStateFieldType = Record<keyof Event, any>;
type State = {
  loading: boolean;
  eventState: Event | null;
  events: Event[] | null;
  selectedDateUid?: string;
};

const initialState: State = {
  loading: false,
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
    setEventState: (state, action: PayloadAction<Event | null>) => {
      state.eventState = action.payload;
    },
    setEventStateField: (state, action: PayloadAction<EventStateFieldType>) => {
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

export const { setLoading, setEventState, setEvents, setEventStateField, setSelectedDateUid } = events.actions;

export default events.reducer;

export const getEventAsync =
  (slug: string): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await getEventRequest(slug);
      dispatch(setEventState(data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const saveTemplateEventAsync = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const { data } = await saveTemplateEventRequest();
    dispatch(setEventState(data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const saveEventAsync =
  (event: Event): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await saveEventRequest(event);
      dispatch(setEventState(data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const saveTemplateEventDateAsync =
  (eventUid: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setLoading(true));
    const eventDates = getState().events.eventState?.eventDates || [];

    try {
      const { data } = await saveEventDateRequest(eventUid);
      dispatch(setEventStateField({ eventDates: [...eventDates, data] } as EventStateFieldType));
      dispatch(setSelectedDateUid(data.uid));
    } catch (e) {
      console.log(e);
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
      console.log(e);
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
      dispatch(setEventStateField({ eventDates: localEventDates } as EventStateFieldType));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };
