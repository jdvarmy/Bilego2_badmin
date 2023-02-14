import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import { DateTimePicker } from '@mui/lab';
import { Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react';

import { IEvent } from '../../../../typings/types';
import { useActionCreators } from '../../../../utils/hooks/useActionCreators';
import { eventsActions } from '../../../events/store/eventsSlice';
import { EventDate } from '../../types/types';

type Props = {
  selectDate?: EventDate;
  dates?: IEvent['eventDates'];
};

export const pickerProps = {
  inputFormat: 'dd.MM.yyyy HH:mm',
  mask: '__.__.____ __:__',
  ampm: false,
  ampmInClock: false,
};

const EventDatesTabContent = ({ selectDate, dates }: Props) => {
  const actions = useActionCreators(eventsActions);

  if (!selectDate) {
    return null;
  }

  const handleChangeDateTime =
    (field: keyof Pick<EventDate, 'closeDateTime' | 'dateFrom' | 'dateTo'>) => (date: Date | null) => {
      const eventDates = dates?.map((d) => {
        if (d.uid === selectDate?.uid) {
          return { ...d, [field]: date ? new Date(new Date(date).setSeconds(0, 0)) : null };
        }

        return d;
      });

      actions.setEventStateField({ eventDates });
    };
  const handleCopyStartDate = () => {
    const eventDates = dates?.map((d) => {
      if (d.uid === selectDate?.uid) {
        return { ...d, dateTo: selectDate.dateFrom };
      }

      return d;
    });

    actions.setEventStateField({ eventDates });
  };

  return (
    <Grid sx={{ mt: 3 }} container spacing={3} alignItems='center'>
      <Grid item xs={12}>
        <Typography variant='h5'>Выберите дату и время проведения события</Typography>
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex' }}>
        <DateTimePicker
          renderInput={(props: object) => <TextField focused={!!selectDate.dateFrom} fullWidth {...props} />}
          label='Начало'
          value={selectDate.dateFrom}
          onChange={handleChangeDateTime('dateFrom')}
          {...pickerProps}
        />
        <Tooltip arrow placement='top' title='Копировать дату начала'>
          <IconButton color='secondary' onClick={handleCopyStartDate}>
            <ArrowCircleRightTwoToneIcon />
          </IconButton>
        </Tooltip>
        <DateTimePicker
          renderInput={(props: object) => <TextField focused={!!selectDate.dateTo} fullWidth {...props} />}
          label='Конец'
          value={selectDate.dateTo}
          onChange={handleChangeDateTime('dateTo')}
          {...pickerProps}
        />
      </Grid>
      <Grid item xs={3}>
        <DateTimePicker
          renderInput={(props: object) => <TextField focused={!!selectDate.closeDateTime} fullWidth {...props} />}
          label='Закрытие продаж'
          value={selectDate.closeDateTime}
          onChange={handleChangeDateTime('closeDateTime')}
          {...pickerProps}
        />
      </Grid>
    </Grid>
  );
};

export default EventDatesTabContent;
