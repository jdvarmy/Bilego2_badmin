import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerSuspense } from '../../hof/routerSuspense';

const Category = lazy(() => import('./Category'));
const Genre = lazy(() => import('./Genre'));
const Feeling = lazy(() => import('./Feeling'));
const Selection = lazy(() => import('./Selection'));

const TaxonomyRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={routerSuspense(Category)} />
        <Route path='category' element={routerSuspense(Category)} />
        <Route path='genre' element={routerSuspense(Genre)} />
        <Route path='feeling' element={routerSuspense(Feeling)} />
        <Route path='selection' element={routerSuspense(Selection)} />
      </Routes>
    </div>
  );
};

export default TaxonomyRouter;
