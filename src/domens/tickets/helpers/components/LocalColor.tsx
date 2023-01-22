import { Box } from '@mui/material';
import React from 'react';

export const LocalColor = (color?: string) => {
  if (!color) {
    return '-';
  }

  return (
    <Box sx={{ backgroundColor: color, overflow: 'hidden', borderRadius: '1rem', height: '100%', width: '25px' }} />
  );
};
