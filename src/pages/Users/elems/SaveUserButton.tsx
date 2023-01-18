import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addAlertWorker } from '../../../domen/alert/workers';
import { AppDispatch } from '../../../domen/store';
import { saveUserAsync } from '../../../domen/users/usersThuk';
import { RequestUser } from '../../../typings/types';
import { UserState } from '../UserDataContainer';

type Props = {
  userData: UserState;
  uid?: string;
};

const SaveUserButton = ({ userData, uid }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password, avatar, ...userValues } = userData;

  const handleSaveUser = () => {
    if (!email || (!uid && !password)) {
      dispatch(addAlertWorker({ severity: 'error', title: 'Ошибка', text: 'Не заполнены поля email или пароль' }));
      return;
    }

    const navigateToUsers = () => {
      navigate('/users');
    };
    const userData: RequestUser = {
      email,
      password,
      ...userValues,
      status: +userValues.status ?? 0,
      avatar: typeof avatar === 'object' ? +avatar.id : undefined,
    };

    dispatch(saveUserAsync(userData, navigateToUsers, uid));
  };

  return (
    <Button
      sx={{ mt: { xs: 2, md: 0 }, mx: 2 }}
      variant='contained'
      startIcon={<AddTwoToneIcon fontSize='small' />}
      onClick={handleSaveUser}
    >
      Сохранить
    </Button>
  );
};

export default SaveUserButton;
