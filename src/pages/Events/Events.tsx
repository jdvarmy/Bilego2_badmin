import { Grid } from '@mui/material';
import React from 'react';

import ContentContainer from '../../components/ContentContainer/ContentContainer';
import { PageHelmet } from '../../components/PageHelmet/PageHelmet';
import PageTitle from '../../components/PageTitle/PageTitle';
import { EventsTable } from '../../domens/events/components/EventsTable/EventsTable';

const Events = () => {
  return (
    <>
      <PageHelmet title='Список событий' />
      <PageTitle title='Список событий' />
      <ContentContainer>
        <Grid container spacing={3} sx={{ mb: 3 }} flexDirection='column' flexWrap='nowrap'>
          <Grid item />
          <Grid item xs={12} flex={1}>
            <EventsTable />
          </Grid>
        </Grid>
      </ContentContainer>
    </>
  );
};

export default Events;
