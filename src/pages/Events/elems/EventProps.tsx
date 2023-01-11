import { Box, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectEventState } from '../../../domen/events/eventsSelectors';
import { setEventStateField } from '../../../domen/events/eventsSlice';
import { AppDispatch } from '../../../domen/store';
import { Event } from '../../../typings/types';

const EventProps = () => {
  const dispatch: AppDispatch = useDispatch();
  const event = useSelector(selectEventState);

  const handleChange = (field: keyof Event) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEventStateField({ [field]: event.target.value }));
  };
  return (
    <Card>
      <CardHeader title='Данные события' />
      <Divider />
      <CardContent>
        <Box>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={12}>
              <TextField
                sx={{ mb: 2 }}
                label='Отрывок'
                multiline
                rows={2}
                fullWidth
                value={event?.fragment || ''}
                focused={!!event?.fragment}
                onChange={handleChange('fragment')}
              />
              <TextField
                label='Поисковые запросы события'
                multiline
                rows={1}
                fullWidth
                value={event?.searchWords || ''}
                focused={!!event?.searchWords}
                onChange={handleChange('searchWords')}
                helperText='Поисковые запросы разделяются символом "запятая" (,)'
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventProps;
