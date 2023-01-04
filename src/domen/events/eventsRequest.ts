import requests from '../../api/api';
import { Event } from '../../typings/types';

export const fetchEventsRequest = () => requests.get<Event[]>(`events`);

export const getEventRequest = (uid: string) => requests.get<Event>(`events/${uid}`);

export const saveTemplateEventRequest = () => requests.post<Event>(`events`);

export const patchEventRequest = (data: Event) => requests.patch<Event>(`events/${data.uid}`, data);
