import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerSuspense } from '../../hof/routerSuspense';

const Artists = lazy(() => import('./Artists'));
const CreateArtist = lazy(() => import('./CreateArtist'));

const ArtistsRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={routerSuspense(Artists)} />
        <Route path='create' element={routerSuspense(CreateArtist)} />
      </Routes>
    </div>
  );
};

export default ArtistsRouter;
