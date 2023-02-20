import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';
import ruLocale from 'date-fns/locale/ru';
import React, { useEffect } from 'react';

import AuthProvider from '../../domens/auth/hoc/AuthProvider';
import { getFileListAsync } from '../../domens/medialibrary/store/medialibraryThunk';
import { useAppDispatch } from '../../domens/store';
import ThemeProvider from '../../theme/ThemeProvider';
import Content from './Content';

const Layout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFileListAsync());
  }, [dispatch]);

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
