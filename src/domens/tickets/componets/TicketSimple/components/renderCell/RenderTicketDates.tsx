import { Box, Tooltip, TooltipProps, Typography, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ICellRendererParams } from 'ag-grid-community';
import React, { memo } from 'react';

import { StatusLabel } from '../../../../../../UI/StatusLabel';
import { TicketOnSell } from '../../../../../../typings/types';
import { localFormatterFunc } from '../../../../../../utils/helpers/dateFormatterFunc';
import { getActualDate } from '../../../../../../utils/helpers/getActualDate';
import { DatePeriodTooltip } from '../DatePeriodTooltip';

const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: '550px',
  },
});

export const RenderTicketDates = memo(({ data: { sell } }: ICellRendererParams) => {
  const { present, isPassed } = getActualDate<TicketOnSell>(sell);
  const presentDate = localFormatterFunc(present);

  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <NoMaxWidthTooltip sx={{ maxWidth: 'none' }} arrow placement='top' title={<DatePeriodTooltip dates={sell} />}>
        <span>
          {presentDate?.date && (
            <StatusLabel color={isPassed ? 'success' : 'secondary'}>{presentDate.date}</StatusLabel>
          )}
        </span>
      </NoMaxWidthTooltip>
      <Typography sx={{ ml: 1 }} variant='subtitle1'>
        {presentDate?.time}
      </Typography>
    </Box>
  );
});

RenderTicketDates.displayName = 'RenderTicketDates';
