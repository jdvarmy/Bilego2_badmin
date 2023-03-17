import { createAsyncThunk } from '@reduxjs/toolkit';

import { addAlertErrorAsync } from '../../alert/store/alertThunk';
import { loginRequest, logoutRequest, refreshRequest, registerRequest } from '../api/authRequest';
import { RequestAuth, authScope } from '../types/types';

export const register = createAsyncThunk(
  `${authScope}/register`,
  async ({ authData }: { authData: RequestAuth }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await registerRequest(authData);

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error));
      return rejectWithValue(error);
    }
  },
);

export const login = createAsyncThunk(
  `${authScope}/login`,
  async ({ authData }: { authData: RequestAuth }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await loginRequest(authData);

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error));
      return rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk(`${authScope}/logout`, async (_, { dispatch, rejectWithValue }) => {
  try {
    await logoutRequest();

    return true;
  } catch (error) {
    dispatch(addAlertErrorAsync(error));
    return rejectWithValue(error);
  }
});

export const checkIsUserLogin = createAsyncThunk(
  `${authScope}/checkIsUserLogin`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await refreshRequest();

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error));
      return rejectWithValue(error);
    }
  },
);
