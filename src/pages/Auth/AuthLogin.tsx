import React, { useState } from 'react';
import { Box, Button, Card, Divider, Container, Grid, Typography, TextField, CardContent } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice/authSlice';
import { AppDispatch } from '../../store/store';

const Wrapper = styled(Container)(
  () => `
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
`,
);

const AuthLogin = () => {
  const dispatch: AppDispatch = useDispatch();
  const [emailValue, setEmailValue] = useState<string>('');
  const [passValue, setPassValue] = useState<string>('');

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };
  const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassValue(event.target.value);
  };
  const handleLogin = () => {
    if (emailValue && passValue) {
      dispatch(login({ email: emailValue, password: passValue }));
    }
  };

  return (
    <>
      <Helmet>
        <title>Вход в админ-панель</title>
      </Helmet>
      <Wrapper maxWidth='md'>
        <Grid container direction='row' justifyContent='center' alignItems='stretch' spacing={3}>
          <Grid item xs={12}>
            <Box pb={2}>
              <Typography variant='h3'>Вход в админку</Typography>
              <Typography variant='subtitle2'>Введите свои данные для продолжения</Typography>
            </Box>
            <Card component='form'>
              <CardContent>
                <Box sx={{ p: 3 }}>
                  <TextField
                    id='email'
                    fullWidth
                    required
                    label='Email'
                    value={emailValue}
                    helperText='Учетные записи раздает только администратор системы (jdvarmy@gmail.com)'
                    variant='standard'
                    onChange={handleChangeEmail}
                  />
                </Box>
                <Box sx={{ pb: 3, pl: 3, pr: 3 }}>
                  <TextField
                    id='password'
                    fullWidth
                    required
                    type='password'
                    label='Пароль'
                    value={passValue}
                    variant='standard'
                    onChange={handleChangePass}
                  />
                </Box>
                <Divider />
                <Box sx={{ p: 3 }}>
                  <Button size='large' variant='contained' onClick={handleLogin}>
                    Войти
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
};

export default AuthLogin;
