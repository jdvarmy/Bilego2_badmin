import React from 'react';
import { Container, Grid, Typography } from '@mui/material';

type Props = {
  title: string;
};

const PageTitle = ({ title }: Props) => {
  return (
    <Container maxWidth='lg'>
      <Grid container sx={{ my: 3 }} justifyContent='space-between' alignItems='center'>
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
