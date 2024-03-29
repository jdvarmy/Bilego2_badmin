import { UserRole } from '../../../typings/enum';
import { User } from '../../../typings/types';
import requests from '../../../utils/api/api';
import { RequestUser } from '../../auth/types';

export const fetchUsersRequest = (data?: { search?: string; role?: UserRole }) => requests.get<User[]>(`users`, data);

export const getUserRequest = (uid: string) => requests.get<User>(`users/${uid}`);

export const saveUserRequest = (data: RequestUser, uid?: string) => {
  return uid ? requests.put<boolean>(`users/${uid}`, data) : requests.post<boolean>(`users`, data);
};

export const deleteUserRequest = (uid: string) => requests.delete<boolean>(`users/${uid}`);
