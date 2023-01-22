import { Box, Typography } from '@mui/material';
import React from 'react';

export const LocalTitle = (row: any) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start!important',
      }}
    >
      <Typography variant='h5'>{row?.name?.name}</Typography>
      <Typography variant='body2' sx={{ fontSize: '12px' }}>
        {row?.name?.description}
      </Typography>
    </Box>
  );
};
