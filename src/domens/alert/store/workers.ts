import { AppThunk } from '../../store';
import { AlertState } from '../types/types';

const delay = 6000;

/**
 * @deprecated
 */
export const addAlertWorker =
  (data: Pick<AlertState, 'severity' | 'title' | 'text'>, ms = delay): AppThunk =>
  async (dispatch) => {
    // dispatch(setAlert({ ...data, date: formatter.format(new Date()), uid: uidv4(), delay: ms }));
  };
