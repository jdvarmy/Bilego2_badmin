import React, { lazy } from 'react';
import { routerSuspense } from '../../hof/routerSuspense';
import { Routes, Route } from 'react-router-dom';

const Orders = lazy(() => import('./Orders'));

const OrdersRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={routerSuspense(Orders)} />
      </Routes>
    </div>
  );
};

export default OrdersRouter;
