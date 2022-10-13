import React from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';

const EventGallery = () => {
  return (
    <Card>
      <CardHeader title='Галерея' />
      <Divider />
      <CardContent>
        <Box>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={4}>
              Галерея картинок и видяшек события
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventGallery;
