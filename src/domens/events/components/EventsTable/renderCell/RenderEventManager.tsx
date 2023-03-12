import { Box, Typography } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';
import React, { memo } from 'react';

export const RenderEventManager = memo(({ data }: ICellRendererParams | undefined) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <Typography variant='subtitle1'>{data?.eventManager?.name}</Typography>
      <Typography sx={{ ml: 1 }} variant='subtitle1'>
        {data?.eventManager?.surname}
      </Typography>
    </Box>
  );
});

RenderEventManager.displayName = 'RenderEventManager';
