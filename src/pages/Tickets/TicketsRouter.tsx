import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerSuspense } from '../../hof/routerSuspense';

const Tickets = lazy(() => import('./Tickets'));

const TicketsRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={routerSuspense(Tickets)} />
      </Routes>
    </div>
  );
};

export default TicketsRouter;
