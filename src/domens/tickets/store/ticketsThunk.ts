import { createAsyncThunk } from '@reduxjs/toolkit';

import { TicketType } from '../../../typings/enum';
import { Ticket, TicketOnSell } from '../../../typings/types';
import { addAlertErrorAsync, addAlertSuccessAsync } from '../../alert/store/alertThunk';
import { ServerErrorStatus } from '../../alert/types/types';
import { selectSelectedCircles } from '../../circle/store/circleSelectors';
import { selectEventDateSelectedUid } from '../../eventDates/store/eventDatesSelectors';
import { RootState } from '../../store';
import { deleteTicketsRequest, fetchTicketsRequest, saveTicketsRequest } from '../api/ticketsRequest';
import { ticketsScope } from '../types/types';

export const getTicketsAsync = createAsyncThunk(
  `${ticketsScope}/getTicketsAsync`,
  async ({ dateUid }: { dateUid: string }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await fetchTicketsRequest(dateUid);

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
      return rejectWithValue(error);
    }
  },
);

export const saveTicketsAsync = createAsyncThunk(
  `${ticketsScope}/saveTicketsAsync`,
  async (
    data: { reqType: 'edit' | 'save'; dateUid: string; ticket: Ticket; sell: TicketOnSell[] },
    { dispatch, getState, rejectWithValue },
  ) => {
    const { reqType, dateUid, ticket, sell } = data;
    const selectedCircles = selectSelectedCircles(getState() as RootState);

    const tickets: Ticket[] = [];
    // обработка билетов с карты клуба
    switch (ticket.type) {
      case TicketType.map:
        if (!selectedCircles) {
          return;
        }

        selectedCircles.forEach(({ uid, seat, row, sector }) => {
          tickets.push({
            ...ticket,
            uid,
            // здесь приоритет имеет то что ввел юзер в форме, вдруг юзер захочет изменить название у сектора билета, например
            seat: ticket.seat ?? seat,
            row: ticket.row ?? row,
            sector: ticket.sector ?? sector,
          });
        });

        break;
      case TicketType.simple:
        tickets.push(ticket);
        break;
    }

    if (!tickets.length) {
      return;
    }

    try {
      const { data } = await saveTicketsRequest(reqType, dateUid, { tickets, sell });
      dispatch(addAlertSuccessAsync({ title: 'Сохранено', text: 'Билеты успешно сохранены!' }));

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
      return rejectWithValue(error);
    }
  },
);

export const deleteTicketsAsync = createAsyncThunk(
  `${ticketsScope}/deleteTicketsAsync`,
  async ({ ticketsUid }: { ticketsUid: string[] }, { dispatch, getState, rejectWithValue }) => {
    const dateUid = selectEventDateSelectedUid(getState() as RootState);
    if (!dateUid) {
      return;
    }
    try {
      const { data } = await deleteTicketsRequest(dateUid, ticketsUid);

      if (Array.isArray(data) && data.length) {
        dispatch(addAlertSuccessAsync({ title: 'Удалено', text: 'Билеты успешно удалены!' }));
        dispatch(getTicketsAsync({ dateUid }));
      }
    } catch (error) {
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
      return rejectWithValue(error);
    }
  },
);
