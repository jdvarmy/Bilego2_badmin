import React from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';

const EventTaxonomy = () => {
  return (
    <Card>
      <CardHeader title='Классификация' />
      <Divider />
      <CardContent>
        <Box>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={4}>
              Здесь будут располагаться классификация события: категории, жанры, настроения, подборки
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventTaxonomy;
