import { Container, Grid } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { BaseRecordStatus, UserRole } from '../../../typings/enum';
import { MediaSelectData, User } from '../../../typings/types';
import { usePostStatus } from '../../../utils/hooks/usePostStatus';
import { useAppDispatch } from '../../../store/store';
import { getUserAsync } from '../store/usersThuk';
import SaveUserButton from './SaveUserButton';
import UserMainData from './UserMainData';
import UserOrganizerData from './UserOrganizerData';
import UserSubData from './UserSubData';

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
  const dispatch = useAppDispatch();
  const [values, setValues] = useState<UserState>(initialState);
  const { status, uid } = usePostStatus();

  const isEdit = useMemo(() => status === BaseRecordStatus.edit && !!uid, [status, uid]);

  useEffect(() => {
    if (isEdit) {
      dispatch(getUserAsync({ uid }))
        .unwrap()
        .then((user) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { access, uid, status, avatar, ...userProps } = user;

          setValues((prev: UserState) => ({
            ...prev,
            ...userProps,
            status: Boolean(status),
            avatar: avatar ? { id: +avatar.id, name: avatar.name } : undefined,
          }));
        });
    }
  }, [dispatch, uid, isEdit]);

  return (
    <>
      <Helmet>
        <title>{isEdit ? 'Редактирование' : 'Регистрация'} пользователя</title>
      </Helmet>
      <Container maxWidth='xl'>
        <Grid container sx={{ my: 3 }} justifyContent='space-between' alignItems='center'>
          <Grid item />
          <Grid item>
            <SaveUserButton userData={values} uid={uid} />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth='xl'>
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
