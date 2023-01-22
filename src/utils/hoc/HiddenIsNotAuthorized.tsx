import React, { ReactElement, ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { selectAuth } from '../../domens/selectors';

const HiddenIsNotAuthorized = ({ children, replace }: { children: ReactNode; replace?: ReactElement }) => {
  const { isAuthenticated } = useSelector(selectAuth);
  return isAuthenticated ? <>{children}</> : replace ? <>{replace}</> : null;
};

export default HiddenIsNotAuthorized;
