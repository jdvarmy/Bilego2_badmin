import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ThemeProvider from '../theme/ThemeProvider';
import Content from './Content';
import AuthProvider from '../hoc/AuthProvider';
import ruLocale from 'date-fns/locale/ru';
import { getFileListAsync } from '../domen/medialibrarySlice/medialibrarySlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../domen/store';

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
