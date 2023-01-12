import requests from '../../api/api';
import { Event, EventRequest } from '../../typings/types';

export const fetchEventsRequest = () => requests.get<Event[]>(`events`);

export const getEventRequest = (uid: string) => requests.get<Event>(`events/${uid}`);

export const postTemplateEventRequest = () => requests.post<Event>(`events`);

export const putTemplateEventRequest = (data: EventRequest) => requests.put<Event>(`events/${data.uid}`, data);

export const patchEventRequest = (data: EventRequest) => requests.patch<Event>(`events/${data.uid}`, data);
