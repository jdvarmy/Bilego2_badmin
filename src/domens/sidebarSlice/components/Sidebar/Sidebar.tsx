import { Drawer, Hidden } from '@mui/material';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

import Logo from '../../../../components/Logo/Logo';
import { useActionCreators } from '../../../../utils/hooks/useActionCreators';
import { useStateSelector } from '../../../store';
import { selectSidebarShow } from '../../store/sidebarSelectors';
import { sidebarActions } from '../../store/sidebarSlice';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import { SidebarWrapper, TopSection } from './styledComponents';

function Sidebar() {
  const actions = useActionCreators(sidebarActions);
  const isShow = useStateSelector(selectSidebarShow);

  const handleClose = () => {
    actions.toggleSidebar();
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
