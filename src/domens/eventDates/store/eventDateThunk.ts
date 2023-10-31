import { createAsyncThunk } from '@reduxjs/toolkit';

import { addAlertErrorAsync } from '../../alert/store/alertThunk';
import { deleteEventDateRequest, editEventDateRequest, saveEventDateRequest } from '../api/eventDatesRequest';
import { EventDate, eventDatesScope } from '../types';

export const saveTemplateEventDateAsync = createAsyncThunk(
  `${eventDatesScope}/saveTemplateEventDateAsync`,
  async ({ eventUid }: { eventUid: string }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await saveEventDateRequest(eventUid);

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error));
      return rejectWithValue(error);
    }
  },
);

export const deleteEventDateAsync = createAsyncThunk(
  `${eventDatesScope}/deleteEventDateAsync`,
  async ({ uid, eventUid }: { uid: string; eventUid: string }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await deleteEventDateRequest(uid, eventUid);

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error));
      return rejectWithValue(error);
    }
  },
);

export const editEventDateAsync = createAsyncThunk(
  `${eventDatesScope}/editEventDateAsync`,
  async (eventDate: EventDate, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await editEventDateRequest(eventDate.eventUid, eventDate);

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error));
      return rejectWithValue(error);
    }
  },
);
