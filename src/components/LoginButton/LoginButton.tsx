import React from 'react';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { loginPage } from '../../typings/types';

const LoginBoxButton = styled(Button)(
  ({ theme }) => `
    padding-left: ${theme.spacing(1)};
    padding-right: ${theme.spacing(1)};
`,
);

const LoginBoxLabel = styled(Typography)(
  ({ theme }) => `
    font-weight: ${theme.typography.fontWeightBold};
    display: block;
`,
);

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
