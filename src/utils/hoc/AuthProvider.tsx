import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import SuspenseLoader from '../../components/SuspenseLoader/SuspenseLoader';
import { checkIsUserLogin } from '../../domens/authSlice/authSlice';
import { selectAuth } from '../../domens/selectors';
import { AppDispatch } from '../../domens/store';
import { UserRole } from '../../typings/enum';
import { loginPage } from '../../typings/types';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, loading, user } = useSelector(selectAuth);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toLogin = () => navigate(loginPage);

  useEffect(() => {
    dispatch(checkIsUserLogin(toLogin));
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && !loading && pathname === '/login') {
      navigate('/');
    }
  }, [isAuthenticated]);

  // todo: сделать нормальную страницу для засланца
  if (user && ![UserRole.admin, UserRole.manager].includes(user.role)) {
    return <>BAD REQUEST, NIGGA</>;
  }

  return loading ? <SuspenseLoader /> : <>{children}</>;
};

export default AuthProvider;
