import React, { ReactNode, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import SuspenseLoader from '../../../components/SuspenseLoader/SuspenseLoader';
import { StatusLoading, UserRole } from '../../../typings/enum';
import { loginPage } from '../../../typings/types';
import { useAppDispatch } from '../../store';
import { selectAuthStore } from '../store/authSelector';
import { checkIsUserLogin } from '../store/authThunk';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, status, user } = useSelector(selectAuthStore);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toLoginPage = useCallback(() => navigate(loginPage), []);

  useEffect(() => {
    dispatch(checkIsUserLogin())
      .unwrap()
      .catch(() => {
        toLoginPage();
      });
  }, [dispatch, toLoginPage]);

  useEffect(() => {
    if (isAuthenticated && pathname === '/login') {
      navigate('/');
    }
  }, [isAuthenticated, navigate, pathname]);

  // todo: сделать нормальную страницу для ответа
  if (user && ![UserRole.admin, UserRole.manager].includes(user.role)) {
    return <>BAD REQUEST, NIGGA</>;
  }

  return [StatusLoading.init, StatusLoading.loading].includes(status) ? <SuspenseLoader /> : <>{children}</>;
};

export default AuthProvider;
