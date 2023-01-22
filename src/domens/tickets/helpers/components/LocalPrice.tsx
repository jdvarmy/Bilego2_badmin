import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import { Box, Tooltip } from '@mui/material';
import React from 'react';

import { NotificationsBadge } from '../../../../components/Header/HeaderNotifications/HeaderNotifications';

export const LocalPrice = (props: { service?: number; price?: number } | undefined) => {
  if (!props) {
    return 'Билет не продается';
  }

  return (
    <Box>
      {Number(props?.price) + Number(props?.service)}
      {props?.service ? (
        <Tooltip arrow title={`В стоимость билета входит сервисный сбор ${props.service} рублей`}>
          <NotificationsBadge
            badgeContent={props.service}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            max={9999}
          >
            <CurrencyRubleIcon fontSize='small' sx={{ fontSize: 13 }} />
          </NotificationsBadge>
        </Tooltip>
      ) : (
        <CurrencyRubleIcon fontSize='small' sx={{ fontSize: 13 }} />
      )}
    </Box>
  );
};
