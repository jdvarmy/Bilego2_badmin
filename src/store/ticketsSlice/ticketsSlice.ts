import { Ticket, TicketOnSell } from '../../typings/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { fetchTicketsRequest, deleteTicketsRequest, saveTicketsRequest } from '../../api/requests';
import { TicketType } from '../../typings/enum';

type State = {
  loading: boolean;
  tickets: Ticket[] | null;
  selectedTicket?: Ticket | null;
};
const initialState: State = {
  loading: false,
  tickets: null,
  selectedTicket: null,
};

const tickets = createSlice({
  initialState,
  name: 'tickets',
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTickets: (state, action: PayloadAction<Ticket[] | null>) => {
      state.tickets = action.payload;
    },
    setSelectedTicket: (state, action: PayloadAction<Ticket | null>) => {
      state.selectedTicket = action.payload;
    },
  },
});

export const { setLoading, setTickets, setSelectedTicket } = tickets.actions;

export default tickets.reducer;

export const getTicketsAsync =
  (dateUid: string): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await fetchTicketsRequest(dateUid);
      dispatch(setTickets(data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const saveTicketsAsync =
  (reqType: 'edit' | 'save', dateUid: string, ticket: Ticket, sell: TicketOnSell[]): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setLoading(true));
    const { selectedCircles } = getState().circle;

    let tickets = [] as Ticket[];
    // обработка билетов с карты клуба
    if (ticket.type === TicketType.map && selectedCircles) {
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
    } else {
      // обработка обычных билетов, без карты
      tickets = [ticket];
    }

    try {
      const { data } = await saveTicketsRequest(reqType, dateUid, { tickets, sell });
      dispatch(setTickets(data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteTicketsAsync =
  (ticketsUid: string[]): AppThunk =>
  async (dispatch, getState) => {
    const dateUid = getState().events.selectedDateUid;
    if (!dateUid) {
      return;
    }

    dispatch(setLoading(true));

    try {
      await deleteTicketsRequest(dateUid, ticketsUid);
      dispatch(getTicketsAsync(dateUid));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };
