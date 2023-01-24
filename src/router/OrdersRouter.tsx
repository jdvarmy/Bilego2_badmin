import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RouterSuspense } from '../utils/hoc/RouterSuspense';

const Orders = lazy(() => import('../pages/Orders/Orders'));

const OrdersRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={RouterSuspense(Orders)} />
      </Routes>
    </div>
  );
};

export default OrdersRouter;
