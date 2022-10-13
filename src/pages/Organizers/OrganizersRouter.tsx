import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerSuspense } from '../../hof/routerSuspense';

const Organizers = lazy(() => import('./Organizers'));
const CreateOrganizers = lazy(() => import('./CreateOrganizer'));

const OrganizersRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={routerSuspense(Organizers)} />
        <Route path='create' element={routerSuspense(CreateOrganizers)} />
      </Routes>
    </div>
  );
};

export default OrganizersRouter;
