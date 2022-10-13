import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerSuspense } from '../../hof/routerSuspense';

const Items = lazy(() => import('./Items'));
const CreateItem = lazy(() => import('./CreateItem'));
const Taxonomies = lazy(() => import('../Taxonomy/Taxonomy'));

const ItemsRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={routerSuspense(Items)} />
        <Route path='create' element={routerSuspense(CreateItem)} />
        {/*<Route path='terms/:slug' element={routerSuspense(Taxonomies)} />*/}
      </Routes>
    </div>
  );
};

export default ItemsRouter;
