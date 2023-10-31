import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './store/store';
import './index.css';
import LayoutRouter from './router/LayoutRouter';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    {/*<StrictMode>*/}
    <HelmetProvider>
      <BrowserRouter>
        <LayoutRouter />
      </BrowserRouter>
    </HelmetProvider>
    {/*</StrictMode>*/}
  </Provider>,
);
