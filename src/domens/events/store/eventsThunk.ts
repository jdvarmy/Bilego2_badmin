import { createAsyncThunk } from '@reduxjs/toolkit';

import { useAlertError } from '../../alert/hooks/useAlertError';
import { addAlertSuccessAsync } from '../../alert/store/alertThunk';
import { PagePostProps } from '../../post/types/types';
import { RootState } from '../../store';
import {
  deleteEventRequest,
  fetchEventsRequest,
  getEventRequest,
  postTemplateEventRequest,
  putEventRequest,
} from '../api/eventsRequest';
import { IEvent, eventsScope } from '../types/types';
import { selectEventState } from './eventsSelectors';
import { workerPrepareData } from './worckers';

export const fetchEventsAsync = createAsyncThunk(
  `${eventsScope}/fetchEventsAsync`,
  async (pageProps: PagePostProps<IEvent> | undefined, { rejectWithValue }) => {
    try {
      const { data } = await fetchEventsRequest(pageProps);

      return data;
    } catch (error) {
      useAlertError(error, rejectWithValue);
    }
  },
);

export const getEventAsync = createAsyncThunk(
  `${eventsScope}/getEventAsync`,
  async ({ uid }: { uid: IEvent['uid'] }, { rejectWithValue }) => {
    try {
      const { data } = await getEventRequest(uid);

      return data;
    } catch (error) {
      useAlertError(error, rejectWithValue);
    }
  },
);

export const saveEventAsync = createAsyncThunk(
  `${eventsScope}/saveEventAsync`,
  async (event: Partial<IEvent>, { dispatch, getState, rejectWithValue }) => {
    try {
      const eventState = selectEventState(getState() as RootState);

      const { data } = await putEventRequest(workerPrepareData({ ...eventState, ...event }));
      dispatch(addAlertSuccessAsync({ title: 'Сохранено', text: 'Данные события успешно сохранены!' }));

      return data;
    } catch (error) {
      useAlertError(error, rejectWithValue);
    }
  },
);

export const saveTemplateEventAsync = createAsyncThunk(
  `${eventsScope}/saveTemplateEventAsync`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await postTemplateEventRequest();

      return data;
    } catch (error) {
      useAlertError(error, rejectWithValue);
    }
  },
);

export const deleteEventAsync = createAsyncThunk(
  `${eventsScope}/deleteEventAsync`,
  async ({ uid }: { uid: string; pageProps?: PagePostProps<IEvent> }, { rejectWithValue }) => {
    try {
      await deleteEventRequest(uid);
    } catch (error) {
      useAlertError(error, rejectWithValue);
    }
  },
);
