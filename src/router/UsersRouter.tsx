import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RouterSuspense } from '../utils/hoc/RouterSuspense';

const Users = lazy(() => import('../pages/Users/Users'));
const UserDataContainer = lazy(() => import('../pages/Users/UserDataContainer'));

const UsersRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={RouterSuspense(Users)} />
        <Route path='create' element={RouterSuspense(UserDataContainer)} />
        <Route path='edit/:uid' element={RouterSuspense(UserDataContainer)} />
      </Routes>
    </div>
  );
};

export default UsersRouter;
