import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import { Box, Tooltip } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';
import React, { memo } from 'react';

import { StatusLabel } from '../../../../../../UI/StatusLabel';
import { NotificationsBadge } from '../../../../../../components/Header/HeaderNotifications/HeaderNotifications';
import { getActualSell } from '../../../../../../utils/helpers/getActualSell';

export const RenderTicketPrice = memo(({ data: { sell } }: ICellRendererParams) => {
  const actualSell = getActualSell(sell);

  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      {actualSell && (
        <Tooltip arrow placement='top' title={`В стоимость билета входит сервисный сбор ${actualSell.service} рублей`}>
          <NotificationsBadge
            badgeContent={actualSell.service}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            max={9999}
          >
            <StatusLabel color='info'>
              {actualSell?.price + actualSell?.service}
              <CurrencyRubleIcon fontSize='small' sx={{ fontSize: 13 }} />
            </StatusLabel>
          </NotificationsBadge>
        </Tooltip>
      )}
    </Box>
  );
});

RenderTicketPrice.displayName = 'RenderTicketPrice';
