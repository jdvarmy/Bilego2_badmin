import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RouterSuspense } from '../utils/hoc/RouterSuspense';

const Type = lazy(() => import('../pages/Taxonomy/Type'));

const TaxonomyRouter = () => {
  return (
    <Routes>
      <Route path='/' element={RouterSuspense(Type)} />
      <Route path='types' element={RouterSuspense(Type)} />
    </Routes>
  );
};

export default TaxonomyRouter;
