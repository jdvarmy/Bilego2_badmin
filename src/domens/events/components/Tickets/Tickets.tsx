import { Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { isEqual } from '../../../../utils/helpers/isEqual';
import TicketControls from '../../../tickets/componets/TicketControls/TicketControls';
import TicketsContent from '../../../tickets/componets/TicketsContent/TicketsContent';
import { selectEventSelectedDate } from '../../store/eventsSelectors';
import TicketsInitialContent from './TicketsInitialContent';

const Tickets = () => {
  const selectedDate = useSelector(selectEventSelectedDate, isEqual);

  console.log('render Tickets');

  return (
    <Card>
      <CardHeader title='Билеты' />
      <Divider />
      <CardContent>
        <Grid container alignItems='center' spacing={3}>
          {!selectedDate?.type ? (
            <TicketsInitialContent selectedDate={selectedDate} />
          ) : (
            <>
              <Grid item xs={12}>
                <TicketsContent type={selectedDate?.type} selectedDateUid={selectedDate?.uid} />
              </Grid>
              <Grid item xs={12}>
                <TicketControls type={selectedDate?.type} dateUid={selectedDate.uid} />
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default memo(Tickets);
