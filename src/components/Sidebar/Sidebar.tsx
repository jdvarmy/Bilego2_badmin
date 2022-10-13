import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Box, Drawer, Hidden } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectSidebar } from '../../store/selectors';
import { toggleSidebar } from '../../store/sidebarSlice/sidebarSlice';
import SidebarMenu from './SidebarMenu/SidebarMenu';
import Logo from '../Logo/Logo';
import { AppDispatch } from '../../store/store';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        color: ${theme.sidebar.textColor};
        background: ${theme.sidebar.background};
        box-shadow: ${theme.sidebar.boxShadow};
        height: 100%;
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            position: fixed;
            z-index: 10;
            border-top-right-radius: ${theme.general.borderRadius};
            border-bottom-right-radius: ${theme.general.borderRadius};
        }
`,
);

const TopSection = styled(Box)(
  ({ theme }) => `
        height: 88px;
        margin: 0 ${theme.spacing(2)} ${theme.spacing(2)};
        border-bottom: ${theme.sidebar.dividerBg} solid 1px;
`,
);

function Sidebar() {
  const dispatch: AppDispatch = useDispatch();
  const { isShow } = useSelector(selectSidebar);

  const handleClose = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      <Hidden lgDown>
        <SidebarWrapper>
          <Scrollbars autoHide>
            <TopSection>
              <Logo />
            </TopSection>
            <SidebarMenu />
          </Scrollbars>
        </SidebarWrapper>
      </Hidden>
      <Hidden lgUp>
        <Drawer anchor='left' open={isShow} onClose={handleClose} variant='temporary' elevation={9}>
          <SidebarWrapper>
            <Scrollbars autoHide>
              <TopSection>
                <Logo />
              </TopSection>
              <SidebarMenu />
            </Scrollbars>
          </SidebarWrapper>
        </Drawer>
      </Hidden>
    </>
  );
}

export default Sidebar;
