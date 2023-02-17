import { createSlice } from '@reduxjs/toolkit';

import { StatusLoading } from '../../../typings/enum';
import { User, storageTokenName } from '../../../typings/types';
import { authScope } from '../types/types';
import { checkIsUserLogin, login, logout, register } from './authThunk';

type State = {
  status: StatusLoading;
  isAuthenticated: boolean;
  user: User | null;
};

const initialState: State = {
  status: StatusLoading.init,
  isAuthenticated: false,
  user: null,
};

const slice = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      ({ type }) => [login.fulfilled.type, checkIsUserLogin.fulfilled.type].includes(type),
      (state, action) => {
        const { user, accessToken } = action.payload;

        localStorage.setItem(storageTokenName, accessToken);

        state.isAuthenticated = true;
        state.user = user;
      },
    );

    builder.addMatcher(
      ({ type }) => [register.fulfilled.type, logout.fulfilled.type, checkIsUserLogin.rejected.type].includes(type),
      (state) => {
        localStorage.removeItem(storageTokenName);

        state.isAuthenticated = false;
        state.user = null;
      },
    );

    builder.addMatcher(
      ({ type }) => type.startsWith(authScope) && type.endsWith('/pending'),
      (state) => {
        state.status = StatusLoading.loading;
      },
    );
    builder.addMatcher(
      ({ type }) => type.startsWith(authScope) && type.endsWith('/fulfilled'),
      (state) => {
        state.status = StatusLoading.success;
      },
    );
    builder.addMatcher(
      ({ type }) => type.startsWith(authScope) && type.endsWith('/rejected'),
      (state) => {
        state.status = StatusLoading.error;
      },
    );
  },
});

export const { actions: authActions, reducer: authReducer } = slice;
