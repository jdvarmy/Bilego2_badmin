import requests from '../../api/api';
import { EventRequest, IEvent } from '../../typings/types';

export const fetchEventsRequest = () => requests.get<IEvent[]>(`events`);

export const getEventRequest = (uid: string) => requests.get<IEvent>(`events/${uid}`);

export const postTemplateEventRequest = () => requests.post<IEvent>(`events`);

export const putTemplateEventRequest = (data: EventRequest) => requests.put<IEvent>(`events/${data.uid}`, data);

export const patchEventRequest = (data: EventRequest) => requests.patch<IEvent>(`events/${data.uid}`, data);
