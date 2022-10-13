import React from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';

const EventSeo = () => {
  return (
    <Card>
      <CardHeader title='SEO' />
      <Divider />
      <CardContent>
        <Box>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={4}>
              Название говорит само за себя
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventSeo;
