import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RouterSuspense } from '../utils/hoc/RouterSuspense';

const Events = lazy(() => import('../pages/Events/Events'));
const CreateEvent = lazy(() => import('../pages/Events/CreateEvent'));
const EditEvent = lazy(() => import('../pages/Events/EditEvent'));
const TaxonomyEventRouter = lazy(() => import('./TaxonomyEventRouter'));

const EventsRouter = () => {
  return (
    <Routes>
      <Route path='/' element={RouterSuspense(Events)} />
      <Route path='create' element={RouterSuspense(CreateEvent)} />
      <Route path='edit' element={RouterSuspense(EditEvent)} />
      <Route path='terms/*' element={RouterSuspense(TaxonomyEventRouter)} />
    </Routes>
  );
};

export default EventsRouter;
