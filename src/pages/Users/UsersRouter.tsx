import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerSuspense } from '../../hof/routerSuspense';

const Users = lazy(() => import('./Users'));
const UserDataContainer = lazy(() => import('./UserDataContainer'));

const UsersRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={routerSuspense(Users)} />
        <Route path='create' element={routerSuspense(UserDataContainer)} />
        <Route path='edit/:uid' element={routerSuspense(UserDataContainer)} />
      </Routes>
    </div>
  );
};

export default UsersRouter;
