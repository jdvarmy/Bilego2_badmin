import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RouterSuspense } from '../utils/hoc/RouterSuspense';

const Items = lazy(() => import('../pages/Items/Items'));
const CreateItem = lazy(() => import('../pages/Items/CreateItem'));
const EditItem = lazy(() => import('../pages/Items/EditItem'));
const TaxonomyItemRouter = lazy(() => import('./TaxonomyItemRouter'));

const ItemsRouter = () => {
  return (
    <Routes>
      <Route path='/' element={RouterSuspense(Items)} />
      <Route path='create' element={RouterSuspense(CreateItem)} />
      <Route path='edit' element={RouterSuspense(EditItem)} />
      <Route path='terms/*' element={RouterSuspense(TaxonomyItemRouter)} />
    </Routes>
  );
};

export default ItemsRouter;
