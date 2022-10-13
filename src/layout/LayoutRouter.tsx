import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Page404 from '../pages/Page404/Page404';
import Layout from './Layout';
import { routerSuspense } from '../hof/routerSuspense';

const MainPageRouter = routerSuspense(lazy(() => import('../pages/MainPage/MainPageRouter')));
const EventsRouter = routerSuspense(lazy(() => import('../pages/Events/EventsRouter')));
const CouponsRouter = routerSuspense(lazy(() => import('../pages/Coupons/CouponsRouter')));
const ItemsRouter = routerSuspense(lazy(() => import('../pages/Items/ItemsRouter')));
const ArtistsRouter = routerSuspense(lazy(() => import('../pages/Artists/ArtistsRouter')));
const OrganizersRouter = routerSuspense(lazy(() => import('../pages/Organizers/OrganizersRouter')));
const UsersRouter = routerSuspense(lazy(() => import('../pages/Users/UsersRouter')));
const Login = routerSuspense(lazy(() => import('../pages/Auth/AuthLogin')));

const TicketsRouter = routerSuspense(lazy(() => import('../pages/Tickets/TicketsRouter')));
const OrdersRouter = routerSuspense(lazy(() => import('../pages/Orders/OrdersRouter')));

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
