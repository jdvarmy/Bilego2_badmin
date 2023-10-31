import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { addAlertWorker } from '../../alert/store/workers';
import { RequestUser } from '../../auth/types';
import { useAppDispatch } from '../../../store/store';
import { saveUserAsync } from '../store/usersThuk';
import { UserState } from './UserDataContainer';

type Props = {
  userData: UserState;
  uid?: string;
};

const SaveUserButton = ({ userData, uid }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { email, password, avatar, ...userValues } = userData;

  const handleSaveUser = () => {
    if (!email || (!uid && !password)) {
      dispatch(addAlertWorker({ severity: 'error', title: 'Ошибка', text: 'Не заполнены поля email или пароль' }));
      return;
    }

    const user: RequestUser = {
      email,
      password,
      ...userValues,
      status: +userValues.status ?? 0,
      avatar: typeof avatar === 'object' ? +avatar.id : undefined,
    };

    dispatch(saveUserAsync({ user, uid }))
      .unwrap()
      .then(() => {
        navigate('/users');
      });
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
