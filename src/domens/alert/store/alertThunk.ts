import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uidv4 } from 'uuid';

import dateTimeFormatDefault from '../../../utils/helpers/dateTimeFormatDefault';
import { ServerErrorStatus, SuccessType, alertScope, isServerErrorStatusGuard } from '../types';

const delay = 9000;
const formatter = new Intl.DateTimeFormat('ru', dateTimeFormatDefault);
const meta = (): { uid: string; date: string } => ({
  uid: uidv4(),
  date: formatter.format(new Date()),
});

export const addAlertErrorAsync = createAsyncThunk(
  `${alertScope}/addAlertErrorAsync`,
  async function (error: ServerErrorStatus | Error | any) {
    if (isServerErrorStatusGuard(error)) {
      let title = 'Неизвестная ошибка ' + error.message,
        text = 'Возникла ошибка в программе';

      if (error.error) {
        title = error.error;
      }
      if (error.statusCode && error.message) {
        text = `Код статуса ${error.statusCode}. Сообщение номер ${error.message}!`;
      }

      return { ...meta(), severity: 'error', title, text, delay };
    }

    return { ...meta(), severity: 'error', title: 'Run time error', text: error, delay };
  },
);

export const addAlertSuccessAsync = createAsyncThunk(
  `${alertScope}/addAlertSuccessAsync`,
  async function ({ title, text, ms = delay }: SuccessType) {
    return { ...meta(), severity: 'success', title, text, delay: ms };
  },
);
