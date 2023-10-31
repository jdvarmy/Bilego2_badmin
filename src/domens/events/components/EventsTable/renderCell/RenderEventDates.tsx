import { Box, Typography } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';
import React, { memo } from 'react';

import { StatusLabel } from '../../../../../ui/StatusLabel';
import { localFormatterFunc } from '../../../../../utils/helpers/dateFormatterFunc';
import { getActualDate } from '../../../../../utils/helpers/getActualDate';

export const RenderEventDates = memo(({ data }: ICellRendererParams | undefined) => {
  if (!data || !data?.eventDates) {
    return null;
  }

  const { past, present, future, isPassed } = getActualDate(data.eventDates, false);
  const presentDate = localFormatterFunc(present);

  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      {presentDate?.date && <StatusLabel color={isPassed ? 'success' : 'secondary'}>{presentDate.date}</StatusLabel>}
      <Typography sx={{ ml: 1 }} variant='subtitle1'>
        {presentDate?.time}
      </Typography>
    </Box>
  );
});

RenderEventDates.displayName = 'RenderEventDates';
