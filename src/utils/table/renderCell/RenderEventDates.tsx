import { Box, Typography } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';
import React, { memo } from 'react';

import { StatusLabel } from '../../../UI/StatusLabel';
import { EventDate } from '../../../typings/types';
import { getActualDate } from '../../helpers/getActualDate';

const formatterDate = new Intl.DateTimeFormat('ru', {
  year: '2-digit',
  month: 'short',
  day: 'numeric',
  hour: undefined,
  minute: undefined,
});
const formatterTime = new Intl.DateTimeFormat('ru', {
  year: undefined,
  month: undefined,
  day: undefined,
  hour: '2-digit',
  minute: '2-digit',
});

export const RenderEventDates = memo(({ data: { eventDates } }: ICellRendererParams) => {
  const { past, present, future, passed } = getActualDate(eventDates);
  const presentDate = localFormatter(present);

  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      {presentDate?.date && <StatusLabel color={passed ? 'success' : 'secondary'}>{presentDate.date}</StatusLabel>}
      <Typography sx={{ ml: 1 }} variant='subtitle1'>
        {presentDate?.time}
      </Typography>
    </Box>
  );
});

RenderEventDates.displayName = 'RenderEventDates';

function localFormatter({ dateFrom, dateTo }: EventDate) {
  const formattedDate: { date: string | undefined; time: string | undefined } = { date: undefined, time: undefined };

  if (dateFrom && dateTo) {
    const _dateFrom = formatterDate.format(new Date(dateFrom));
    const _dateTo = formatterDate.format(new Date(dateTo));
    const _timeFrom = formatterTime.format(new Date(dateFrom));
    const _timeTo = formatterTime.format(new Date(dateTo));

    if (_dateFrom === _dateTo) {
      formattedDate.date = _dateTo;
    } else {
      formattedDate.date = `${_dateFrom} - ${_dateTo}`;
    }

    formattedDate.time = `${_timeFrom} - ${_timeTo}`;
  }

  return formattedDate;
}
