import requests from '../../../utils/api/api';
import { PagePostProps, PagePostPropsResponseType } from '../../post/types/types';
import { IItem, ItemRequest, itemsScope } from '../type/types';

export const fetchItemsRequest = <ITEM extends IItem>(props?: PagePostProps<ITEM>) =>
  requests.get<PagePostPropsResponseType<ITEM>>(`${itemsScope}`, props);

export const getItemRequest = (uid: string) => requests.get<IItem>(`${itemsScope}/${uid}`);

export const postTemplateItemRequest = () => requests.post<IItem>(`${itemsScope}`);

export const putItemRequest = (data: ItemRequest) => requests.put<IItem>(`${itemsScope}/${data.uid}`, data);

export const deleteItemRequest = (uid: string) => requests.delete<IItem>(`${itemsScope}/${uid}`);
