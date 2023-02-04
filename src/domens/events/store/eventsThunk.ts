import { createAsyncThunk } from '@reduxjs/toolkit';

import { IEvent } from '../../../typings/types';
import { addAlertErrorAsync, addAlertSuccessAsync } from '../../alert/store/alertThunk';
import { ServerErrorStatus } from '../../alert/types/types';
import { AppThunk, RootState } from '../../store';
import {
  fetchEventsRequest,
  getEventRequest,
  patchEventRequest,
  postTemplateEventRequest,
  putTemplateEventRequest,
} from '../api/eventsRequest';
import { eventsScope } from '../types/types';
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
  async ({ type }: { type?: IEvent['status'] }, { dispatch, getState, rejectWithValue }) => {
    try {
      const eventState = selectEventState(getState() as RootState);

      const { data } = await putTemplateEventRequest(
        workerPrepareData(type ? { ...eventState, status: type } : eventState),
      );
      dispatch(addAlertSuccessAsync({ title: 'Сохранено', text: 'Событие успешно сохранено!' }));

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

export const editEventAsync = createAsyncThunk(
  `${eventsScope}/editEventAsync`,
  async (event: IEvent, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await patchEventRequest(workerPrepareData(event));
      dispatch(addAlertSuccessAsync({ title: 'Сохранено', text: 'Данные события успешно сохранены!' }));

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
      return rejectWithValue(error);
    }
  },
);

// todo:
export const deleteEventAsync =
  (uid: string): AppThunk =>
  async () => {
    // todo: сделать метод удаления события
    console.log(uid);
  };
