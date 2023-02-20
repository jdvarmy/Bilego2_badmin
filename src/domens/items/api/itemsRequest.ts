import { IEvent } from '../../../typings/types';
import requests from '../../../utils/api/api';

export const fetchItemsRequest = (data?: { search: string }) => requests.get<IEvent['item'][]>(`items`, data);
