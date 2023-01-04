import React, { ReactNode, useEffect } from 'react';
import { loginPage } from '../typings/types';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsUserLogin } from '../domen/authSlice/authSlice';
import { AppDispatch } from '../domen/store';
import { selectAuth } from '../domen/selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserRole } from '../typings/enum';
import SuspenseLoader from '../components/SuspenseLoader/SuspenseLoader';

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
