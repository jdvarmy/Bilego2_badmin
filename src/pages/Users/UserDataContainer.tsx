import { Container, Grid } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../domens/store';
import { getUserAsync } from '../../domens/users/usersThuk';
import { BaseRecordStatus, UserRole } from '../../typings/enum';
import { MediaSelectData, User } from '../../typings/types';
import { usePostStatus } from '../../utils/hooks/usePostStatus';
import SaveUserButton from './elems/SaveUserButton';
import UserMainData from './elems/UserMainData';
import UserOrganizerData from './elems/UserOrganizerData';
import UserSubData from './elems/UserSubData';

export type UserState = Omit<User, 'uid' | 'status' | 'avatar'> & {
  status: boolean;
  password: string;
  sendMail: boolean;
  avatar?: MediaSelectData;
  uid?: string;
};

const initialState: UserState = {
  email: '',
  password: '',
  status: true,
  role: UserRole.subscriber,
  sendMail: false,
  avatar: undefined,
  name: '',
  surname: '',
  birthdate: undefined,
  phone: '',
  concertManagerInfo: '',
  concertManagerPercentage: 0,
};

const UserDataContainer = () => {
  const dispatch: AppDispatch = useDispatch();
  const [values, setValues] = useState<UserState>(initialState);
  const { status, uid } = usePostStatus();

  const isEdit = useMemo(() => status === BaseRecordStatus.edit && !!uid, [status, uid]);

  useEffect(() => {
    if (isEdit) {
      dispatch(getUserAsync(uid as string, setValues));
    }
  }, [dispatch, uid, isEdit]);

  return (
    <>
      <Helmet>
        <title>{isEdit ? 'Редактирование' : 'Регистрация'} пользователя</title>
      </Helmet>
      <Container maxWidth='lg'>
        <Grid container sx={{ my: 3 }} justifyContent='space-between' alignItems='center'>
          <Grid item />
          <Grid item>
            <SaveUserButton userData={values} uid={uid} />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth='lg'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UserMainData userData={values} setUserData={setValues} edit={isEdit} />
          </Grid>
          <Grid item xs={12}>
            <UserSubData userData={values} setUserData={setValues} />
          </Grid>
          {values.role === UserRole.organizer && (
            <Grid item xs={12}>
              <UserOrganizerData userData={values} setUserData={setValues} />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default UserDataContainer;
