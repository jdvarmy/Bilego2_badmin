import { Box } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';
import React, { memo } from 'react';

import { getActualSell } from '../../../../../../utils/helpers/getActualSell';

export const RenderTicketColor = memo(({ data: { sell } }: ICellRendererParams) => {
  const actualSell = getActualSell(sell);

  return (
    <Box
      sx={{
        backgroundColor: actualSell.color,
        overflow: 'hidden',
        borderRadius: '1rem',
        height: '25px',
        width: '25px',
      }}
    />
  );
});

RenderTicketColor.displayName = 'RenderTicketColor';
