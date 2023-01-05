import { Grid } from '@mui/material';
import React from 'react';

import { EventHeaderType } from '../../../../typings/enum';
import { EventHeaderImage } from './EventHeaderImage';

const TabContent = ({ tab }: { tab: EventHeaderType }) => {
  return (
    <Grid container alignItems='center'>
      <Grid item xs={12}>
        {tab === EventHeaderType.image && <EventHeaderImage />}
        {tab === EventHeaderType.video && tab}
        {tab === EventHeaderType.filter && tab}
      </Grid>
    </Grid>
  );
};

export default TabContent;
