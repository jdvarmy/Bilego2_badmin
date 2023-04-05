import { Container, Grid, Typography } from '@mui/material';
import React from 'react';

type Props = {
  title: string;
};

const PageTitle = ({ title }: Props) => {
  return (
    <Container maxWidth='xl'>
      <Grid container sx={{ mb: 3 }} justifyContent='space-between' alignItems='center'>
        <Grid item xs>
          <Typography variant='h1' sx={{ mt: 4, mb: 0 }}>
            {title}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PageTitle;
