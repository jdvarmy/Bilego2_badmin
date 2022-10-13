import React, { SyntheticEvent } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from '@mui/material';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import { UserRole } from '../../../typings/enum';
import { UserState } from '../UserDataContainer';
import { v4 as uidv4 } from 'uuid';

const userRoleMap: Record<UserRole, string> = {
  [UserRole.admin]: 'Администратор',
  [UserRole.manager]: 'Менеджер сайта',
  [UserRole.organizer]: 'Организатор',
  [UserRole.subscriber]: 'Подписчик',
};

type Props = {
  userData: UserState;
  setUserData: (values: UserState) => void;
  edit?: boolean;
};

const UserMainData = ({ userData, setUserData, edit }: Props) => {
  const { email, password, role, status, sendMail } = userData;

  const handleChange = (field: keyof UserState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [field]: event.target.value });
  };
  const handleChangeCheckbox =
    (field: keyof UserState) => (_event: SyntheticEvent<Element, Event>, checked: boolean) => {
      setUserData({ ...userData, [field]: checked });
    };
  const generatePassword = () => {
    setUserData({ ...userData, password: uidv4().split('-').at(0) || '' });
  };

  return (
    <Card>
      <CardHeader title={`${edit ? 'Редактирование' : 'Регистрация'} пользователя`} />
      <Divider />
      <CardContent>
        <Box>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={4}>
              <TextField
                label='Email'
                type='email'
                fullWidth
                value={email}
                focused={!!email}
                onChange={handleChange('email')}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Логин'
                type='text'
                InputProps={{ readOnly: true }}
                fullWidth
                value={email || 'Логин будет сформирован автоматически'}
              />
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4} sx={{ display: 'flex' }}>
              <TextField
                label='Пароль'
                type='text'
                fullWidth
                value={password}
                focused={!!password}
                onChange={handleChange('password')}
              />
              <IconButton color='primary' onClick={generatePassword}>
                <VpnKeyTwoToneIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                value={role}
                label='Роль пользователя'
                fullWidth
                focused
                onChange={handleChange('role')}
              >
                {Object.entries(userRoleMap).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={12}>
              <FormControlLabel
                value={status}
                control={<Checkbox defaultChecked color='success' />}
                label='Активировать пользователя?'
                labelPlacement='end'
                onChange={handleChangeCheckbox('status')}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                value={sendMail}
                control={<Checkbox color='success' />}
                label='Отправить письмо на почту с информацией о регистрации?'
                labelPlacement='end'
                onChange={handleChangeCheckbox('sendMail')}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserMainData;
