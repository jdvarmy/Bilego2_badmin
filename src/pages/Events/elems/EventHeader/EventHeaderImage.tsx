import { Grid } from '@mui/material';
import React from 'react';

import TextFieldImage from '../../../../components/TextFieldImage/TextFieldImage';

export const EventHeaderImage = () => {
  return (
    <Grid spacing={3} container alignItems='center'>
      <Grid item xs={6}>
        <TextFieldImage size='small' />
      </Grid>
      <Grid item xs={6}>
        image here
      </Grid>
    </Grid>
  );
};
