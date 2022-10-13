import React, { memo } from 'react';
import { Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectEventSelectedDate } from '../../store/selectors';
import TicketsInitialContent from './TicketsInitialContent';
import TicketControls from './controls/TicketControls';
import TicketsContent from './content/TicketsContent';

const Tickets = () => {
  const selectedDate = useSelector(selectEventSelectedDate);

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
