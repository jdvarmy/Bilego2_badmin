import React, { ReactElement, ReactNode } from 'react';

import { useStateSelector } from '../../store';
import { selectAuthIsAuthenticated } from '../store/authSelector';

type Props = { children: ReactNode; replace?: ReactElement };

const HiddenIsNotAuthorized = ({ children, replace }: Props) => {
  const isAuthenticated = useStateSelector(selectAuthIsAuthenticated);

  return isAuthenticated ? <>{children}</> : replace ? <>{replace}</> : null;
};

export default HiddenIsNotAuthorized;
