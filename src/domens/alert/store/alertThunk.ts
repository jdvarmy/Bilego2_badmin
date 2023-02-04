import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uidv4 } from 'uuid';

import dateTimeFormatDefault from '../../../utils/helpers/dateTimeFormatDefault';
import { AlertType, SuccessType, alertScope } from '../types/types';

const delay = 6000;
const formatter = new Intl.DateTimeFormat('ru', dateTimeFormatDefault);
const meta = (): { uid: string; date: string } => ({
  uid: uidv4(),
  date: formatter.format(new Date()),
});

export const addAlertErrorAsync = createAsyncThunk(
  `${alertScope}/addAlertErrorAsync`,
  async function ({ message, error, statusCode, ms = delay }: AlertType) {
    let title = 'Неизвестная ошибка ' + message,
      text = 'Возникла ошибка в программе';

    if (error) {
      title = error;
    }
    if (statusCode && message) {
      text = `Код статуса ${statusCode}. Сообщение номер ${message}!`;
    }

    return { ...meta(), severity: 'error', title, text, delay: ms };
  },
);

export const addAlertSuccessAsync = createAsyncThunk(
  `${alertScope}/addAlertSuccessAsync`,
  async function ({ title, text, ms = delay }: SuccessType) {
    return { ...meta(), severity: 'success', title, text, delay: ms };
  },
);
