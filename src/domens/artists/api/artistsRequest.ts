import requests from '../../../utils/api/api';
import { IEvent } from '../../events/types/types';

export const fetchArtistsRequest = (data?: { search: string }) => requests.get<IEvent['artist']>(`artists`, data);
