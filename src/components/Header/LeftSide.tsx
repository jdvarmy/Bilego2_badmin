import { Hidden } from '@mui/material';
import React from 'react';

import HiddenIsNotAuthorized from '../../domens/auth/hoc/HiddenIsNotAuthorized';
import useYodaSays from '../../utils/hooks/useYodaSays';
import Logo from '../Logo/Logo';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import { Greeting } from './styledComponents';

export const LeftSide = () => {
  const yodaSay = useYodaSays(true);

  return (
    <>
      <Hidden lgUp>
        <Logo />
      </Hidden>
      <Hidden lgDown>
        <HiddenIsNotAuthorized replace={<Greeting variant='body1'>{yodaSay}</Greeting>}>
          <HeaderMenu />
        </HiddenIsNotAuthorized>
      </Hidden>
    </>
  );
};
