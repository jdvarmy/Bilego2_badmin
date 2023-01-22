import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { Box, Hidden, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectSidebar } from '../../domens/selectors';
import { toggleSidebar } from '../../domens/sidebarSlice/sidebarSlice';
import { AppDispatch } from '../../domens/store';
import HiddenIsNotAuthorized from '../../utils/hoc/HiddenIsNotAuthorized';
import useYodaSays from '../../utils/hooks/useYodaSays';
import LoginButton from '../LoginButton/LoginButton';
import Logo from '../Logo/Logo';
import HeaderButtons from './HeaderButtons/HeaderButtons';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import HeaderUserBox from './HeaderUserBox/HeaderUserBox';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
    height: ${theme.header.height};
    color: ${theme.header.textColor};
    padding: ${theme.spacing(0, 2)};
    right: 0;
    z-index: 5;
    background-color: ${theme.header.background};
    box-shadow: ${theme.header.boxShadow};
    position: fixed;
    justify-content: space-between;
    width: 100%;
    @media (min-width: ${theme.breakpoints.values.lg}px) {
        left: ${theme.sidebar.width};
        width: auto;
    }
`,
);

const Greeting = styled(Typography)(
  ({ theme }) => `
    margin-right: ${theme.spacing(1)};
    font-weight: ${theme.typography.fontWeightBold};
    color: ${theme.palette.secondary.main};
    display: block;
`,
);

const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isShow } = useSelector(selectSidebar);
  const yodaSay = useYodaSays(true);

  const sidebarHandler = () => {
    dispatch(toggleSidebar());
  };

  return (
    <HeaderWrapper display='flex' alignItems='center'>
      <Box display='flex' alignItems='center'>
        <Hidden lgUp>
          <Logo />
        </Hidden>
        <Hidden lgDown>
          <HiddenIsNotAuthorized replace={<Greeting variant='body1'>{yodaSay}</Greeting>}>
            <HeaderMenu />
          </HiddenIsNotAuthorized>
        </Hidden>
      </Box>
      <Box display='flex' alignItems='center'>
        <HiddenIsNotAuthorized replace={<LoginButton />}>
          <HeaderButtons />
          <HeaderUserBox />
          <Hidden lgUp>
            <IconButton color='primary' onClick={sidebarHandler}>
              {!isShow ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
            </IconButton>
          </Hidden>
        </HiddenIsNotAuthorized>
      </Box>
    </HeaderWrapper>
  );
};

export default Header;
