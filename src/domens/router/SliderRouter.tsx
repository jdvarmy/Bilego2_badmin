import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RouterSuspense } from '../../utils/hoc/RouterSuspense';

const Slider = lazy(() => import('../../pages/Slider/Slider'));

const SliderRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={RouterSuspense(Slider)} />
        <Route path='/slider' element={RouterSuspense(Slider)} />
      </Routes>
    </div>
  );
};

export default SliderRouter;
