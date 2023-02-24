import requests from '../../../utils/api/api';
import { IEvent } from '../../events/types/types';
import { IItem, ItemRequest, itemsScope } from '../type/types';

export const fetchItemsRequest = () => requests.get<IItem[]>(`${itemsScope}`);

export const getItemRequest = (uid: string) => requests.get<IItem>(`${itemsScope}/${uid}`);

export const postTemplateItemRequest = () => requests.post<IItem>(`${itemsScope}`);

export const putItemRequest = (data: ItemRequest) => requests.put<IItem>(`${itemsScope}/${data.uid}`, data);

export const deleteItemRequest = (uid: string) => requests.delete<IItem>(`${itemsScope}/${uid}`);

///////
export const fetchItemsRequestForEvent = (data?: { search: string }) =>
  requests.get<IEvent['item'][]>(`${itemsScope}`, data);
