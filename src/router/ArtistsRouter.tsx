import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RouterSuspense } from '../utils/hoc/RouterSuspense';

const Artists = lazy(() => import('../pages/Artists/Artists'));
const CreateArtist = lazy(() => import('../pages/Artists/CreateArtist'));

const ArtistsRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={RouterSuspense(Artists)} />
        <Route path='create' element={RouterSuspense(CreateArtist)} />
      </Routes>
    </div>
  );
};

export default ArtistsRouter;
