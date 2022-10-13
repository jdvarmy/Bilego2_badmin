import React from 'react';
import { Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { NavLink } from 'react-router-dom';

const CreateUserButton = () => {
  return (
    <Grid container sx={{ my: 3 }} justifyContent='space-between' alignItems='center'>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 }, mx: 2 }}
          variant='contained'
          startIcon={<AddTwoToneIcon fontSize='small' />}
          component={NavLink}
          to='create'
        >
          Новый пользователь
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateUserButton;
