import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routerSuspense } from '../../hof/routerSuspense';

const Events = lazy(() => import('./Events'));
const CreateEvent = lazy(() => import('./CreateEvent'));
const EditEvent = lazy(() => import('./EditEvent'));
const TaxonomyRouter = lazy(() => import('../Taxonomy/TaxonomyRouter'));

const EventsRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={routerSuspense(Events)} />
        <Route path='create' element={routerSuspense(CreateEvent)} />
        <Route path='edit' element={routerSuspense(EditEvent)} />
        <Route path='terms/*' element={routerSuspense(TaxonomyRouter)} />
      </Routes>
    </div>
  );
};

export default EventsRouter;
