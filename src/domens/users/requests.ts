import { UserRole } from '../../typings/enum';
import { RequestUser, User } from '../../typings/types';
import requests from '../../utils/api/api';

export const fetchUsersRequest = (data?: { search?: string; role?: UserRole }) => requests.get<User[]>(`users`, data);

export const getUserRequest = (uid: string) => requests.get<User>(`users/${uid}`);

export const saveUserRequest = (data: RequestUser, uid?: string) => {
  if (uid) {
    return requests.put<boolean>(`users/save/${uid}`, data);
  }
  return requests.post<boolean>(`users/save`, data);
};

export const deleteUserRequest = (uid: string) => requests.delete<boolean>(`users/${uid}`);
