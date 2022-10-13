import React, { memo } from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import { City } from '../../../typings/enum';
import { Event } from '../../../typings/types';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { EventStateFieldType, setEventStateField } from '../../../store/eventsSlice/eventsSlice';
import EventPlaceCity from './EventPlaceCity';
import EventPlaceItem from './EventPlaceItem';
import EventPlaceArtist from './EventPlaceArtist';

type Props = {
  city?: City;
  item?: Event['item'];
  artist?: Event['artist'];
};

const EventPlace = ({ city, item, artist }: Props) => {
  const dispatch: AppDispatch = useDispatch();

  console.log('render EventPlace');

  const handleDelete = (field: keyof Event) => () => {
    dispatch(setEventStateField({ [field]: undefined } as EventStateFieldType));
  };

  return (
    <Card>
      <CardHeader title='Место проведения события' />
      <Divider />
      <CardContent>
        <Box>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={4} sx={{ display: 'flex' }}>
              <EventPlaceCity city={city} item={item} handleDelete={handleDelete} />
            </Grid>
            <Grid item xs={4}>
              <EventPlaceItem item={item} city={city} handleDelete={handleDelete} />
            </Grid>
            <Grid item xs={4}>
              <EventPlaceArtist artist={artist} handleDelete={handleDelete('artist')} />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default memo(EventPlace);
