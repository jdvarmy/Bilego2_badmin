import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserRole } from '../../../typings/enum';
import { addAlertErrorAsync } from '../../alert/store/alertThunk';
import { RequestUser } from '../../auth/types';
import { deleteUserRequest, fetchUsersRequest, getUserRequest, saveUserRequest } from '../api/usersRequests';
import { usersScope } from '../types';

export const getUsersAsync = createAsyncThunk(
  `${usersScope}/getUsersAsync`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await fetchUsersRequest();

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error));
      return rejectWithValue(error);
    }
  },
);

export const getUserAsync = createAsyncThunk(
  `${usersScope}/getUserAsync`,
  async ({ uid }: { uid: string }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await getUserRequest(uid);

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error));
      return rejectWithValue(error);
    }
  },
);

export const saveUserAsync = createAsyncThunk(
  `${usersScope}/saveUserAsync`,
  async ({ user, uid }: { user: RequestUser; uid?: string }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await saveUserRequest(user, uid);

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error));
      return rejectWithValue(error);
    }
  },
);

export const deleteUserAsync = createAsyncThunk(
  `${usersScope}/deleteUserAsync`,
  async ({ uid }: { uid: string }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await deleteUserRequest(uid);

      if (data) {
        dispatch(getUsersAsync());
      }
    } catch (error) {
      dispatch(addAlertErrorAsync(error));
      return rejectWithValue(error);
    }
  },
);

export const getManagerListForEventAsync = createAsyncThunk(
  `${usersScope}/getManagerListForEventAsync`,
  async ({ search }: { search: string }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await fetchUsersRequest({ search, role: UserRole.organizer });

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error));
      return rejectWithValue(error);
    }
  },
);
