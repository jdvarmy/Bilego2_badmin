import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { StatusLoading } from '../../../typings/enum';
import { User } from '../../../typings/types';
import { usersScope } from '../types/types';
import { getUsersAsync } from './usersThuk';

type State = {
  status: StatusLoading;
  users: User[] | null;
};

const initialState: State = {
  status: StatusLoading.init,
  users: null,
};

const slice = createSlice({
  initialState,
  name: 'users',
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addMatcher(
      ({ type }) => type.startsWith(usersScope) && type.endsWith('/pending'),
      (state) => {
        state.status = StatusLoading.loading;
      },
    );
    builder.addMatcher(
      ({ type }) => type.startsWith(usersScope) && type.endsWith('/fulfilled'),
      (state) => {
        state.status = StatusLoading.success;
      },
    );
    builder.addMatcher(
      ({ type }) => type.startsWith(usersScope) && type.endsWith('/rejected'),
      (state) => {
        state.status = StatusLoading.error;
      },
    );
  },
});

export const { actions: usersActions, reducer: usersReducer } = slice;
