import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Ticket } from '../../typings/types';

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
