import React, { ReactNode, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import SuspenseLoader from '../../../components/SuspenseLoader/SuspenseLoader';
import { StatusLoading, UserRole } from '../../../typings/enum';
import { loginPage } from '../../../typings/types';
import { useAppDispatch, useStateSelector } from '../../store';
import { selectAuthStore } from '../store/authSelector';
import { checkIsUserLogin } from '../store/authThunk';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, status, user } = useStateSelector(selectAuthStore);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toLoginPage = useCallback(() => navigate(loginPage), []);
  const toHomePage = useCallback(() => navigate('/'), []);

  useEffect(() => {
    dispatch(checkIsUserLogin())
      .unwrap()
      .catch(() => {
        toLoginPage();
      });
  }, [dispatch, toLoginPage]);

  useEffect(() => {
    if (isAuthenticated && pathname === '/login') {
      toHomePage();
    }
  }, [isAuthenticated, pathname]);

  // todo: сделать нормальную страницу для ответа
  if (user && ![UserRole.admin, UserRole.manager].includes(user.role)) {
    return <>BAD REQUEST, NIGGA</>;
  }

  return [StatusLoading.init, StatusLoading.loading].includes(status) ? <SuspenseLoader key={1} /> : <>{children}</>;
};

export default AuthProvider;
