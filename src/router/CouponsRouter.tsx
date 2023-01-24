import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RouterSuspense } from '../utils/hoc/RouterSuspense';

const Coupons = lazy(() => import('../pages/Coupons/Coupons'));
const CreateCoupon = lazy(() => import('../pages/Coupons/CreateCoupon'));

const CouponsRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={RouterSuspense(Coupons)} />
        <Route path='create' element={RouterSuspense(CreateCoupon)} />
      </Routes>
    </div>
  );
};

export default CouponsRouter;
