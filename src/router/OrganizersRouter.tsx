import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RouterSuspense } from '../utils/hoc/RouterSuspense';

const Organizers = lazy(() => import('../pages/Organizers/Organizers'));
const CreateOrganizers = lazy(() => import('../pages/Organizers/CreateOrganizer'));

const OrganizersRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={RouterSuspense(Organizers)} />
        <Route path='create' element={RouterSuspense(CreateOrganizers)} />
      </Routes>
    </div>
  );
};

export default OrganizersRouter;
