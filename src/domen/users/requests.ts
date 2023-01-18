import requests from '../../api/api';
import { RequestUser, User } from '../../typings/types';

export const fetchUsersRequest = (data?: { search?: string; manager?: boolean }) => requests.get<User[]>(`users`, data);

export const getUserRequest = (uid: string) => requests.get<User>(`users/${uid}`);

export const saveUserRequest = (data: RequestUser, uid?: string) => {
  if (uid) {
    return requests.put<boolean>(`users/save/${uid}`, data);
  }
  return requests.post<boolean>(`users/save`, data);
};

export const deleteUserRequest = (uid: string) => requests.delete<boolean>(`users/${uid}`);
