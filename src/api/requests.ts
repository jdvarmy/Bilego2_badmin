import { EventDate, IEvent, MediaFile, RequestAuth, ResponseAuth, Ticket, TicketOnSell } from '../typings/types';
import requests from './api';

export const registerRequest = (data: RequestAuth) => requests.post<ResponseAuth>(`auth/register`, data);
export const loginRequest = (data: RequestAuth) => requests.post<ResponseAuth>(`auth/login`, data);
export const logoutRequest = () => requests.post<boolean>(`auth/logout`);

export const fetchMedialibraryRequest = () => requests.get<MediaFile[]>(`media`);
export const getFileMedialibraryRequest = (id: number) => requests.get<MediaFile>(`media/${id}`);
export const uploadFileMedialibraryRequest = (data: FormData) =>
  requests.post<boolean>(`media/upload`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const removeFileMedialibraryRequest = (id: number) => requests.delete<boolean>(`media/${id}`);

export const fetchMapItemsRequest = () => requests.get<any[]>(`map`);
export const uploadFileMapItemsRequest = (data: FormData) => requests.post<boolean>(`map/upload`, data);

export const saveEventDateRequest = (eventUid: string) => requests.post<EventDate>(`events/${eventUid}/dates`);
export const deleteEventDateRequest = (uid: string, eventUid: string) =>
  requests.delete<boolean>(`events/${eventUid}/dates/${uid}`);
export const editEventDateRequest = (eventUid: string, data: Partial<EventDate>) =>
  requests.put<EventDate>(`events/${eventUid}/dates`, data);

export const fetchItemsRequest = (data?: any) => requests.get<IEvent['item'][]>(`items`, data);
export const fetchArtistsRequest = (data?: { search: string }) => requests.get<IEvent['artist']>(`artists`, data);

export const fetchTicketsRequest = (dateUid: string) => requests.get<Ticket[]>(`tickets/${dateUid}`);
export const saveTicketsRequest = (
  type: 'edit' | 'save',
  dateUid: string,
  data: { tickets: Ticket[]; sell: TicketOnSell[] },
) =>
  type === 'edit'
    ? requests.put<Ticket[]>(`tickets/${dateUid}`, data)
    : requests.post<Ticket[]>(`tickets/${dateUid}`, data);
export const deleteTicketsRequest = (dateUid: string, ticketsUid: string[]) =>
  requests.delete<boolean>(`tickets/${dateUid}`, { data: ticketsUid });
