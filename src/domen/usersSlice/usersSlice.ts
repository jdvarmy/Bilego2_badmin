import { RequestUser, User } from '../../typings/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { deleteUserRequest, getUserRequest, fetchUsersRequest, saveUserRequest } from '../../api/requests';
import { UserState } from '../../pages/Users/UserDataContainer';
import { Dispatch, SetStateAction } from 'react';

type State = {
  users: User[] | null;
};

const initialState: State = {
  users: null,
};

const users = createSlice({
  initialState,
  name: 'users',
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = users.actions;

export default users.reducer;

export const getUsersAsync = (): AppThunk => async (dispatch) => {
  try {
    const { data } = await fetchUsersRequest();

    dispatch(setUsers(data));
  } catch (e) {
    console.log(e);
  }
};

export const getUserAsync =
  (uid: string, setUser: Dispatch<SetStateAction<UserState>>): AppThunk =>
  async () => {
    try {
      const { data } = await getUserRequest(uid);

      const { access: _access, uid: _uid, status, avatar, ...user } = data;
      setUser((prev: UserState) => ({
        ...prev,
        ...user,
        status: Boolean(status),
        avatar: avatar ? { id: +avatar.id, name: avatar.name } : undefined,
      }));
    } catch (e) {
      console.log(e);
    }
  };

export const saveUserAsync =
  (userData: RequestUser, navigateToUsers: () => void, uid?: string): AppThunk =>
  async () => {
    try {
      const { data } = await saveUserRequest(userData, uid);
      if (data) {
        navigateToUsers();
      }
    } catch (e) {
      console.log(e);
    }
  };

export const deleteUserAsync =
  (uid: string): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await deleteUserRequest(uid);

      if (data) {
        dispatch(getUsersAsync());
      }
    } catch (e) {
      console.log(e);
    }
  };
