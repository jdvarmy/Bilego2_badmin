import { Grid } from '@mui/material';
import React from 'react';

import ContentContainer from '../../components/ContentContainer/ContentContainer';
import { PageHelmet } from '../../components/PageHelmet/PageHelmet';
import PageTitle from '../../components/PageTitle/PageTitle';
import { EventsTable } from '../../domens/events/components/EventsTable/EventsTable';

const title = 'Список событий';

const Events = () => {
  return (
    <>
      <PageHelmet title={title} />
      <PageTitle title={title} />
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
