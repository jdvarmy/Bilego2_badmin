import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RouterSuspense } from '../../utils/hoc/RouterSuspense';

const Tickets = lazy(() => import('../../pages/Tickets/Tickets'));

const TicketsRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={RouterSuspense(Tickets)} />
      </Routes>
    </div>
  );
};

export default TicketsRouter;
