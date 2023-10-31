import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as qs from 'qs';

import { ResponseAuth } from '../../domens/auth/types';
import { axiosBaseUrl, storageTokenName } from '../../typings/types';

const baseConfig = {
  baseURL: axiosBaseUrl,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const instance = axios.create(baseConfig);

enum RequestMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}

instance.interceptors.request.use((request) => {
  if (request.headers) {
    const token = localStorage.getItem(storageTokenName);

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
  }

  return request;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if ([403].includes(error.response?.status) && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;

      try {
        const { data } = await axios.get<ResponseAuth>(`${axiosBaseUrl}auth/refresh`, {
          withCredentials: true,
        });

        localStorage.setItem(storageTokenName, data.accessToken);

        return instance.request(originalRequest);
      } catch (e) {
        return e;
      }
    }

    return Promise.reject(error.response.data);
  },
);

const baseRequest = <R>({ method, url, ...config }: AxiosRequestConfig): Promise<AxiosResponse<R>> =>
  instance({ method, url, ...config });

const requests: Record<
  RequestMethod,
  <R>(url: string, data?: object, cfg?: AxiosRequestConfig) => Promise<AxiosResponse<R>>
> = {
  get: (url, data, cfg) => {
    if (data) {
      // @ts-ignore
      Object.keys(data).forEach((key) => !data[key] ?? delete data[key]);
    }

    return baseRequest({
      method: RequestMethod.Get,
      url: data ? `${url}${qs.stringify(data, { addQueryPrefix: true })}` : url,
      ...cfg,
    });
  },

  post: (url, data, cfg) => baseRequest({ method: RequestMethod.Post, url, data, ...cfg }),

  put: (url, data, cfg) => baseRequest({ method: RequestMethod.Put, url, data, ...cfg }),

  patch: (url, data, cfg) => baseRequest({ method: RequestMethod.Patch, url, data, ...cfg }),

  delete: (url, cfg) => baseRequest({ method: RequestMethod.Delete, url, ...cfg }),
};

export default requests;
