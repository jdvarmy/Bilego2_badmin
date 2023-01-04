import React from 'react';
import { Box, Hidden, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { APP_VERSION } from '../../typings/env';
import LogoIcon from '../../icons/LogoIcon';
import useYodaSays from '../../hooks/useYodaSays';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../domen/selectors';
import { loginPage } from '../../typings/types';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
    color: ${theme.palette.text.primary};
    padding: ${theme.spacing(0, 1, 0, 0)};
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 88px;
    align-items: flex-start;
    text-decoration: none;
    font-weight: ${theme.typography.fontWeightBold};
`,
);

const LogoSignWrapper = styled(Box)(
  () => `
    height: 38px;
    margin-top: 4px;
    transform: scale(.8);
`,
);

const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
    padding-left: ${theme.spacing(1)};
`,
);

const VersionBadge = styled(Box)(
  ({ theme }) => `
    background: ${theme.palette.success.main};
    color: ${theme.palette.success.contrastText};
    padding: ${theme.spacing(0.4, 1)};
    margin-left: ${theme.spacing(1)};
    border-radius: ${theme.general.borderRadiusSm};
    text-align: center;
    display: inline-block;
    line-height: 1;
    vertical-align: top;
    font-size: ${theme.typography.pxToRem(11)};
`,
);

const LogoText = styled(Box)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(10)};
    font-weight: ${theme.typography.fontWeightBold};
`,
);

function Logo() {
  const { isAuthenticated } = useSelector(selectAuth);
  const yodaSay = useYodaSays();

  return (
    <>
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
    </>
  );
}

export default Logo;
