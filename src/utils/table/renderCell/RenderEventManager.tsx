import { Box, Typography } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

export const RenderEventManager = ({ data: { eventManager } }: ICellRendererParams) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <Typography variant='subtitle1'>{eventManager?.name}</Typography>
      <Typography sx={{ ml: 1 }} variant='subtitle1'>
        {eventManager?.surname}
      </Typography>
    </Box>
  );
};
