import { Box, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import React, { memo } from 'react';

import { City } from '../../../../typings/enum';
import { IEvent } from '../../../../typings/types';
import { EventPlaceArtist } from './EventPlaceArtist';
import { EventPlaceCity } from './EventPlaceCity';
import { EventPlaceItem } from './EventPlaceItem';

type Props = {
  city?: City;
  item?: IEvent['item'];
  artist?: IEvent['artist'];
};

export const EventPlace = memo(function EventPlace({ city, item, artist }: Props) {
  console.log('render EventPlace');

  return (
    <Card>
      <CardHeader title='Место проведения события' />
      <Divider />
      <CardContent>
        <Box>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={4} sx={{ display: 'flex' }}>
              <EventPlaceCity city={city} item={item} />
            </Grid>
            <Grid item xs={4}>
              <EventPlaceItem item={item} city={city} />
            </Grid>
            <Grid item xs={4}>
              <EventPlaceArtist artist={artist} />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
});
