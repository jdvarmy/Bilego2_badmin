import axios from 'axios';

import { axiosBaseUrl } from '../../../typings/types';
import requests from '../../../utils/api/api';
import { RequestAuth, ResponseAuth } from '../types/types';

export const refreshRequest = () =>
  axios.get<ResponseAuth>(`${axiosBaseUrl}auth/refresh`, {
    withCredentials: true,
  });

export const registerRequest = (data: RequestAuth) => requests.post<ResponseAuth>(`auth/register`, data);

export const loginRequest = (data: RequestAuth) => requests.post<ResponseAuth>(`auth/login`, data);

export const logoutRequest = () => requests.post<boolean>(`auth/logout`);
