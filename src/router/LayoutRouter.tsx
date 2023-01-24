import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Layout from '../pages/Layout/Layout';
import Page404 from '../pages/Page404/Page404';
import { RouterSuspense } from '../utils/hoc/RouterSuspense';

const MainPageRouter = RouterSuspense(lazy(() => import('./SliderRouter')));
const EventsRouter = RouterSuspense(lazy(() => import('./EventsRouter')));
const CouponsRouter = RouterSuspense(lazy(() => import('./CouponsRouter')));
const ItemsRouter = RouterSuspense(lazy(() => import('./ItemsRouter')));
const ArtistsRouter = RouterSuspense(lazy(() => import('./ArtistsRouter')));
const OrganizersRouter = RouterSuspense(lazy(() => import('./OrganizersRouter')));
const UsersRouter = RouterSuspense(lazy(() => import('./UsersRouter')));
const Login = RouterSuspense(lazy(() => import('../pages/Auth/AuthLogin')));

const TicketsRouter = RouterSuspense(lazy(() => import('./TicketsRouter')));
const OrdersRouter = RouterSuspense(lazy(() => import('./OrdersRouter')));

const LayoutRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='main/*' element={MainPageRouter} />
        <Route path='events/*' element={EventsRouter} />
        <Route path='coupons/*' element={CouponsRouter} />
        <Route path='items/*' element={ItemsRouter} />
        <Route path='artists/*' element={ArtistsRouter} />
        <Route path='organizers/*' element={OrganizersRouter} />
        <Route path='users/*' element={UsersRouter} />
        <Route path='tickets/*' element={TicketsRouter} />
        <Route path='orders/*' element={OrdersRouter} />
        <Route path='login' element={Login} />
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default LayoutRouter;
