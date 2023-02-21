import { Box } from '@mui/material';
import React, { memo } from 'react';

import { LeftSide } from './LeftSide';
import { RightSide } from './RightSide';
import { HeaderWrapper } from './styledComponents';

export const Header = memo(function Header() {
  return (
    <HeaderWrapper display='flex' alignItems='center'>
      <Box display='flex' alignItems='center'>
        <LeftSide />
      </Box>
      <Box display='flex' alignItems='center'>
        <RightSide />
      </Box>
    </HeaderWrapper>
  );
});
