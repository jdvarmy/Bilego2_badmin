import { Box, Button, Card, CardContent, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { login } from '../../domens/auth/store/authThunk';
import { useAppDispatch } from '../../domens/store';

const Wrapper = styled(Container)(
  () => `
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
`,
);

const AuthLogin = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const handleChange =
    (fn: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
      fn(event.target.value);
    };
  const handleLogin = () => {
    if (email && pass) {
      dispatch(login({ authData: { email, password: pass } }));
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
                    value={email}
                    helperText='Учетные записи раздает только администратор системы (jdvarmy@gmail.com)'
                    variant='standard'
                    onChange={handleChange(setEmail)}
                  />
                </Box>
                <Box sx={{ pb: 3, pl: 3, pr: 3 }}>
                  <TextField
                    id='password'
                    fullWidth
                    required
                    type='password'
                    label='Пароль'
                    value={pass}
                    variant='standard'
                    onChange={handleChange(setPass)}
                  />
                </Box>
                <Divider />
                <Box sx={{ p: 3 }}>
                  <Button type='submit' size='large' variant='contained' onClick={handleLogin}>
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
