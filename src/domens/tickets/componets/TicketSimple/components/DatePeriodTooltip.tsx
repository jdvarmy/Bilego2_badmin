import { Grid } from '@mui/material';
import React from 'react';

import { TicketOnSell } from '../../../../../typings/types';
import { localFormatterFunc } from '../../../../../utils/helpers/dateFormatterFunc';

type Props = { dates: TicketOnSell[] };
export const DatePeriodTooltip = ({ dates }: Props) => {
  // todo: Отсортировать массив по датам..?
  return (
    <Grid container spacing={2}>
      {dates.map((dateItem) => (
        <Grid key={dateItem.uid} item xs={12}>
          <>
            {localFormatterFunc(dateItem).date}
            {' / '}
            {!!dateItem.service && `цена: ${dateItem.price} сервис: ${dateItem.service}  / `} всего:{' '}
            {dateItem.price + dateItem.service}
          </>
        </Grid>
      ))}
    </Grid>
  );
};
