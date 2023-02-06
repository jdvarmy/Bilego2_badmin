import { Ticket, TicketOnSell } from '../../../typings/types';
import requests from '../../../utils/api/api';

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
  requests.delete<Ticket[]>(`tickets/${dateUid}`, { data: ticketsUid });
