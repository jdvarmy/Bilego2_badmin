import { IEvent } from '../../../typings/types';
import requests from '../../../utils/api/api';

export const fetchArtistsRequest = (data?: { search: string }) => requests.get<IEvent['artist']>(`artists`, data);
