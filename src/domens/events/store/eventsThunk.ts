import { createAsyncThunk } from '@reduxjs/toolkit';

import { addAlertSuccessAsync } from '../../alert/store/alertThunk';
import { workerAddError } from '../../alert/store/workers';
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
  async (pageProps: PagePostProps<IEvent> | undefined, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await fetchEventsRequest(pageProps);

      return data;
    } catch (error) {
      dispatch(workerAddError(error));
      return rejectWithValue(error);
    }
  },
);

export const getEventAsync = createAsyncThunk(
  `${eventsScope}/getEventAsync`,
  async ({ uid }: { uid: IEvent['uid'] }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await getEventRequest(uid);

      return data;
    } catch (error) {
      dispatch(workerAddError(error));
      return rejectWithValue(error);
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
      dispatch(workerAddError(error));
      return rejectWithValue(error);
    }
  },
);

export const saveTemplateEventAsync = createAsyncThunk(
  `${eventsScope}/saveTemplateEventAsync`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await postTemplateEventRequest();

      return data;
    } catch (error) {
      dispatch(workerAddError(error));
      return rejectWithValue(error);
    }
  },
);

export const deleteEventAsync = createAsyncThunk(
  `${eventsScope}/deleteEventAsync`,
  async ({ uid }: { uid: string; pageProps?: PagePostProps<IEvent> }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await deleteEventRequest(uid);

      return data;
    } catch (error) {
      dispatch(workerAddError(error));
      return rejectWithValue(error);
    }
  },
);
