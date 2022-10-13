import React from 'react';
import { Box } from '@mui/material';
import HeaderNotifications from '../HeaderNotifications/HeaderNotifications';

function HeaderButtons() {
  return (
    <Box sx={{ mr: 1 }}>
      <Box sx={{ mx: 0.5 }} component='span'>
        <HeaderNotifications />
      </Box>
    </Box>
  );
}

export default HeaderButtons;
