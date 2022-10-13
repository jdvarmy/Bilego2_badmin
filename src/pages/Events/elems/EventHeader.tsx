import React from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';

const EventHeader = () => {
  return (
    <Card>
      <CardHeader title='Заголовок события' />
      <Divider />
      <CardContent>
        <Box>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={4}>
              что будет располагаться в шапке события. Картинка или видео, можно еще и эффект
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventHeader;
