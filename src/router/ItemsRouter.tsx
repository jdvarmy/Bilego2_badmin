import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RouterSuspense } from '../utils/hoc/RouterSuspense';

const Items = lazy(() => import('../pages/Items/Items'));
const CreateItem = lazy(() => import('../pages/Items/CreateItem'));
const Taxonomies = lazy(() => import('../pages/Taxonomy/Taxonomy'));

const ItemsRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={RouterSuspense(Items)} />
        <Route path='create' element={RouterSuspense(CreateItem)} />
        {/*<Route path='terms/:slug' element={routerSuspense(Taxonomies)} />*/}
      </Routes>
    </div>
  );
};

export default ItemsRouter;
