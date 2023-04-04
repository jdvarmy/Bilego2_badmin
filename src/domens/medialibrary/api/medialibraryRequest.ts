import { MediaFile } from '../../../typings/types';
import requests from '../../../utils/api/api';
import { PagePostProps, PagePostPropsResponseType } from '../../post/types/types';
import { mapScope, mediaScope } from '../types/types';

export const fetchMedialibraryRequest = <MEDIA extends MediaFile>(props?: PagePostProps<MEDIA>) =>
  requests.get<PagePostPropsResponseType<MEDIA>>(mediaScope, props);

export const getFileMedialibraryRequest = (id: number) => requests.get<MediaFile>(`${mediaScope}/${id}`);

export const uploadFileMedialibraryRequest = (data: FormData) =>
  requests.post<boolean>(`media/upload`, data, { headers: { 'Content-Type': 'multipart/form-data' } });

export const removeFileMedialibraryRequest = (id: number) => requests.delete<boolean>(`${mediaScope}/${id}`);

export const fetchMapItemsRequest = () => requests.get<any[]>(mapScope);

export const uploadFileMapItemsRequest = (data: FormData) =>
  requests.post<boolean>(`${mapScope}/upload`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
