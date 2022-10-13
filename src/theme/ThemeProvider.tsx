import React, { createContext, useState } from 'react';
import { ThemeProvider as ThemeProviderWrapper } from '@mui/material';
import { themeCreator } from './base';

export const ThemeContext = createContext((_themeName: string): void => undefined);

const ThemeProvider = ({ children }: { children: any }) => {
  const curThemeName: string = localStorage.getItem('appTheme') || 'BadminTheme';
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    <ThemeContext.Provider value={setThemeName}>
      <ThemeProviderWrapper theme={theme}>{children}</ThemeProviderWrapper>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
