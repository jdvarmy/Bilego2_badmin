import { v4 as uidv4 } from 'uuid';

import { ServerError } from '../../typings/types';
import dateTimeFormatDefault from '../../utils/helpers/dateTimeFormatDefault';
import { AppThunk } from '../store';
import { AlertState, setAlert } from './alertSlice';

const delay = 6000;
const formatter = new Intl.DateTimeFormat('ru', dateTimeFormatDefault);

export const addAlertWorker =
  (data: Pick<AlertState, 'severity' | 'title' | 'text'>, ms = delay): AppThunk =>
  async (dispatch) => {
    dispatch(setAlert({ ...data, date: formatter.format(new Date()), uid: uidv4(), delay: ms }));
  };

export const addErrorAlertWorker =
  (data: ServerError, ms = delay): AppThunk =>
  async (dispatch) => {
    let title = 'Неизвестная ошибка' + data?.message,
      text = 'Возникла ошибка в программе';

    if ('error' in data) {
      title = data.error;
    }
    if ('statusCode' in data && 'message' in data) {
      text = `Код статуса ${data.statusCode}. Сообщение номер ${data.message}!
      Сохрани номер сообщения, он поможет в решении проблемы`;
    }

    dispatch(
      setAlert({
        uid: uidv4(),
        date: formatter.format(new Date()),
        severity: 'error',
        title,
        text,
        delay: ms,
      }),
    );
  };
