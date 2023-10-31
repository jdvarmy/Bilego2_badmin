import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppThunk } from '../../../store/store';
import { AlertState, alertScope, isServerErrorStatusGuard } from '../types';
import { addAlertErrorAsync } from './alertThunk';

const delay = 6000;

/**
 * @deprecated
 */
export const addAlertWorker =
  (data: Pick<AlertState, 'severity' | 'title' | 'text'>, ms = delay): AppThunk =>
  async (dispatch) => {
    // dispatch(setAlert({ ...data, date: formatter.format(new Date()), uid: uidv4(), delay: ms }));
  };

export const workerAddError = createAsyncThunk(`${alertScope}/workerAddError`, (error: unknown, { dispatch }) => {
  if (isServerErrorStatusGuard(error)) {
    dispatch(addAlertErrorAsync(error));
  }
});
