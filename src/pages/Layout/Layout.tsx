import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';
import ruLocale from 'date-fns/locale/ru';
import React from 'react';

import AuthProvider from '../../domens/auth/hoc/AuthProvider';
import ThemeProvider from '../../theme/ThemeProvider';
import Content from './Content';

const Layout = () => {
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
          <AuthProvider>
            <Content />
          </AuthProvider>
        </LocalizationProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Layout;
