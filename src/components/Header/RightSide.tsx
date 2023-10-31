import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { Hidden, IconButton } from '@mui/material';
import React from 'react';

import LoginButton from '../../domens/auth/components/LoginButton/LoginButton';
import HiddenIsNotAuthorized from '../../domens/auth/hoc/HiddenIsNotAuthorized';
import { selectSidebarShow } from '../../domens/sidebarSlice/store/sidebarSelectors';
import { sidebarActions } from '../../domens/sidebarSlice/store/sidebarSlice';
import { useStateSelector } from '../../store/store';
import { useActionCreators } from '../../utils/hooks/useActionCreators';
import HeaderButtons from './HeaderButtons/HeaderButtons';
import HeaderUserBox from './HeaderUserBox/HeaderUserBox';

export const RightSide = () => {
  const actions = useActionCreators(sidebarActions);
  const isShow = useStateSelector(selectSidebarShow);

  const sidebarHandler = () => {
    actions.toggleSidebar();
  };

  return (
    <HiddenIsNotAuthorized replace={<LoginButton />}>
      <HeaderButtons />
      <HeaderUserBox />
      <Hidden lgUp>
        <IconButton color='primary' onClick={sidebarHandler}>
          {!isShow ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
        </IconButton>
      </Hidden>
    </HiddenIsNotAuthorized>
  );
};
