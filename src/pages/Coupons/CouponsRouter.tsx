import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerSuspense } from '../../hof/routerSuspense';

const Coupons = lazy(() => import('./Coupons'));
const CreateCoupon = lazy(() => import('./CreateCoupon'));

const CouponsRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={routerSuspense(Coupons)} />
        <Route path='create' element={routerSuspense(CreateCoupon)} />
      </Routes>
    </div>
  );
};

export default CouponsRouter;
