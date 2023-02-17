import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { loginPage } from '../../../../typings/types';
import { LoginBoxButton, LoginBoxLabel } from './styledComponents';

const LoginButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(loginPage);
  };

  return (
    <LoginBoxButton color='primary' onClick={handleClick}>
      <LockOpenTwoToneIcon sx={{ mr: 1 }} />
      <LoginBoxLabel variant='body1'>Войти</LoginBoxLabel>
    </LoginBoxButton>
  );
};

export default LoginButton;
