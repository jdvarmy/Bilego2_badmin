import { Dispatch, SetStateAction } from 'react';

import { UserState } from '../../pages/Users/UserDataContainer';
import { Event, RequestUser, ServerError } from '../../typings/types';
import { addErrorAlertWorker } from '../alert/workers';
import { setLoading } from '../artistsSlice/artistsSlice';
import { AppThunk } from '../store';
import { deleteUserRequest, fetchUsersRequest, getUserRequest, saveUserRequest } from './requests';
import { setUsers } from './usersSlice';

export const getUsersAsync = (): AppThunk => async (dispatch) => {
  try {
    const { data } = await fetchUsersRequest();

    dispatch(setUsers(data));
  } catch (e) {
    dispatch(addErrorAlertWorker(e as ServerError));
  }
};

export const getUserAsync =
  (uid: string, setUser: Dispatch<SetStateAction<UserState>>): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await getUserRequest(uid);

      const { access, uid: _uid, status, avatar, ...user } = data;
      setUser((prev: UserState) => ({
        ...prev,
        ...user,
        status: Boolean(status),
        avatar: avatar ? { id: +avatar.id, name: avatar.name } : undefined,
      }));
    } catch (e) {
      dispatch(addErrorAlertWorker(e as ServerError));
    }
  };

export const saveUserAsync =
  (userData: RequestUser, navigateToUsers: () => void, uid?: string): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await saveUserRequest(userData, uid);
      if (data) {
        navigateToUsers();
      }
    } catch (e) {
      dispatch(addErrorAlertWorker(e as ServerError));
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
      dispatch(addErrorAlertWorker(e as ServerError));
    }
  };

export const getManagerListForEventAsync =
  (search: string, reactDispatch: Dispatch<SetStateAction<Event['eventManager']>>): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await fetchUsersRequest({ search, manager: true });
      reactDispatch(data);
    } catch (e) {
      dispatch(addErrorAlertWorker(e as ServerError));
    } finally {
      dispatch(setLoading(false));
    }
  };
