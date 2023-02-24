import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RouterSuspense } from '../utils/hoc/RouterSuspense';

const Category = lazy(() => import('../pages/Taxonomy/Category'));
const Genre = lazy(() => import('../pages/Taxonomy/Genre'));
const Feeling = lazy(() => import('../pages/Taxonomy/Feeling'));
const Selection = lazy(() => import('../pages/Taxonomy/Selection'));

const TaxonomyEventRouter = () => {
  return (
    <Routes>
      <Route path='/' element={RouterSuspense(Category)} />
      <Route path='category' element={RouterSuspense(Category)} />
      <Route path='genre' element={RouterSuspense(Genre)} />
      <Route path='feeling' element={RouterSuspense(Feeling)} />
      <Route path='selection' element={RouterSuspense(Selection)} />
    </Routes>
  );
};

export default TaxonomyEventRouter;
