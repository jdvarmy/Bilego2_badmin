import { Box, Typography } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';
import React, { memo } from 'react';

import { StatusLabel } from '../../../../../../UI/StatusLabel';
import { TicketOnSell } from '../../../../../../typings/types';
import { localFormatterFunc } from '../../../../../../utils/helpers/dateFormatterFunc';
import { getActualDate } from '../../../../../../utils/helpers/getActualDate';

export const RenderTicketDates = memo(({ data: { sell } }: ICellRendererParams) => {
  const { past, present, future, isPassed } = getActualDate<TicketOnSell>(sell);
  const presentDate = localFormatterFunc(present);

  console.log(present);

  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      {presentDate?.date && <StatusLabel color={isPassed ? 'success' : 'secondary'}>{presentDate.date}</StatusLabel>}
      <Typography sx={{ ml: 1 }} variant='subtitle1'>
        {presentDate?.time}
      </Typography>
    </Box>
  );
});

RenderTicketDates.displayName = 'RenderTicketDates';
