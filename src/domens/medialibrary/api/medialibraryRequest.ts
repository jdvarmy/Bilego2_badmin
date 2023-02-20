import { MediaFile } from '../../../typings/types';
import requests from '../../../utils/api/api';

export const fetchMedialibraryRequest = () => requests.get<MediaFile[]>(`media`);

export const getFileMedialibraryRequest = (id: number) => requests.get<MediaFile>(`media/${id}`);

export const uploadFileMedialibraryRequest = (data: FormData) =>
  requests.post<boolean>(`media/upload`, data, { headers: { 'Content-Type': 'multipart/form-data' } });

export const removeFileMedialibraryRequest = (id: number) => requests.delete<boolean>(`media/${id}`);

export const fetchMapItemsRequest = () => requests.get<any[]>(`map`);

export const uploadFileMapItemsRequest = (data: FormData) =>
  requests.post<boolean>(`map/upload`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
