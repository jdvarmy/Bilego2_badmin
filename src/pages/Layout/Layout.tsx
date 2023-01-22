import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';
import ruLocale from 'date-fns/locale/ru';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getFileListAsync } from '../../domens/medialibrarySlice/medialibrarySlice';
import { AppDispatch } from '../../domens/store';
import ThemeProvider from '../../theme/ThemeProvider';
import AuthProvider from '../../utils/hoc/AuthProvider';
import Content from './Content';

const Layout = () => {
  const dispatch: AppDispatch = useDispatch();

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
