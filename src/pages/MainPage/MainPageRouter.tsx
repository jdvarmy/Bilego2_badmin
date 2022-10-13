import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerSuspense } from '../../hof/routerSuspense';

const Slider = lazy(() => import('./Slider'));

const MainPageRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={routerSuspense(Slider)} />
        <Route path='/slider' element={routerSuspense(Slider)} />
      </Routes>
    </div>
  );
};

export default MainPageRouter;
