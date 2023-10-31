import requests from '../../../utils/api/api';
import { EventDate } from '../types';

export const saveEventDateRequest = (eventUid: string) => requests.post<EventDate>(`events/${eventUid}/dates`);

export const deleteEventDateRequest = (uid: string, eventUid: string) =>
  requests.delete<boolean>(`events/${eventUid}/dates/${uid}`);

export const editEventDateRequest = (eventUid: string, data: Partial<EventDate>) =>
  requests.put<EventDate>(`events/${eventUid}/dates/${data.uid}`, data);
