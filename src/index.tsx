import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LayoutRouter from './layout/LayoutRouter';

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
