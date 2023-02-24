import { createAsyncThunk } from '@reduxjs/toolkit';

import { addAlertErrorAsync, addAlertSuccessAsync } from '../../alert/store/alertThunk';
import { ServerErrorStatus } from '../../alert/types/types';
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
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await fetchEventsRequest();

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
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
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
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
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
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
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
      return rejectWithValue(error);
    }
  },
);

export const deleteEventAsync = createAsyncThunk(
  `${eventsScope}/deleteEventAsync`,
  async (uid: string, { dispatch, rejectWithValue }) => {
    try {
      await deleteEventRequest(uid);

      dispatch(fetchEventsAsync());
    } catch (error) {
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
      return rejectWithValue(error);
    }
  },
);
