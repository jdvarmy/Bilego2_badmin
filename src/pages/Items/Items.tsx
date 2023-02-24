import { Grid } from '@mui/material';
import React from 'react';

import ContentContainer from '../../components/ContentContainer/ContentContainer';
import { PageHelmet } from '../../components/PageHelmet/PageHelmet';
import PageTitle from '../../components/PageTitle/PageTitle';
import { ItemsTable } from '../../domens/items/components/ItemsTable/ItemsTable';

const Items = () => {
  return (
    <>
      <PageHelmet title='Список площадок' />
      <PageTitle title='Список площадок' />
      <ContentContainer>
        <Grid container spacing={3} sx={{ mb: 3 }} flexDirection='column' flexWrap='nowrap'>
          <Grid item />
          <Grid item xs={12} flex={1}>
            <ItemsTable />
          </Grid>
        </Grid>
      </ContentContainer>
    </>
  );
};

export default Items;
