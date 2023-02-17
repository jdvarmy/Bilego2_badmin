import React, { ReactElement, ReactNode } from 'react';

import { selectAuthIsAuthenticated } from '../../domens/auth/store/authSelector';
import { useStateSelector } from '../../domens/store';

type Props = { children: ReactNode; replace?: ReactElement };

const HiddenIsNotAuthorized = ({ children, replace }: Props) => {
  const isAuthenticated = useStateSelector(selectAuthIsAuthenticated);

  return isAuthenticated ? <>{children}</> : replace ? <>{replace}</> : null;
};

export default HiddenIsNotAuthorized;
