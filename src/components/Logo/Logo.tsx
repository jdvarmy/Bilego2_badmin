import { Hidden, Tooltip } from '@mui/material';
import React from 'react';

import { selectAuthIsAuthenticated } from '../../domens/auth/store/authSelector';
import { useStateSelector } from '../../domens/store';
import LogoIcon from '../../theme/icons/LogoIcon';
import { APP_VERSION } from '../../typings/env';
import { loginPage } from '../../typings/types';
import useYodaSays from '../../utils/hooks/useYodaSays';
import { LogoSignWrapper, LogoText, LogoTextWrapper, LogoWrapper, VersionBadge } from './styledComponents';

function Logo() {
  const isAuthenticated = useStateSelector(selectAuthIsAuthenticated);
  const yodaSay = useYodaSays();

  return (
    <LogoWrapper to={isAuthenticated ? '/' : loginPage}>
      <LogoSignWrapper>
        <LogoIcon />
        <Tooltip title={`Version ${APP_VERSION}`} arrow placement='right'>
          <VersionBadge>{APP_VERSION}</VersionBadge>
        </Tooltip>
      </LogoSignWrapper>
      <Hidden smDown>
        <LogoTextWrapper>
          <LogoTextWrapper>
            <LogoText>{yodaSay}</LogoText>
          </LogoTextWrapper>
        </LogoTextWrapper>
      </Hidden>
    </LogoWrapper>
  );
}

export default Logo;
