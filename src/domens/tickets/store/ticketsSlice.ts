import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { StatusLoading } from '../../../typings/enum';
import { Ticket } from '../../../typings/types';
import { ticketsScope } from '../types/types';
import { getTicketsAsync, saveTicketsAsync } from './ticketsThunk';

type State = {
  status: StatusLoading;
  tickets: Ticket[] | null;
  selectedTicket?: Ticket | null;
};

const initialState: State = {
  status: StatusLoading.init,
  tickets: null,
  selectedTicket: null,
};

const slice = createSlice({
  initialState,
  name: ticketsScope,
  reducers: {
    setStatus: (state, action: PayloadAction<StatusLoading>) => {
      state.status = action.payload;
    },
    setTickets: (state, action: PayloadAction<Ticket[] | null>) => {
      state.tickets = action.payload;
    },
    setSelectedTicket: (state, action: PayloadAction<Ticket | null>) => {
      state.selectedTicket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTicketsAsync.fulfilled, (state, action) => {
      state.tickets = action.payload;
    });
    builder.addCase(saveTicketsAsync.fulfilled, (state, action) => {
      state.tickets = action.payload;
    });

    builder.addMatcher(
      ({ type }) => [getTicketsAsync.fulfilled.type, saveTicketsAsync.fulfilled.type].includes(type),
      (state, action) => {
        state.tickets = action.payload;
      },
    );

    builder.addMatcher(
      ({ type }) => type.startsWith(ticketsScope) && type.endsWith('/pending'),
      (state) => {
        state.status = StatusLoading.loading;
      },
    );
    builder.addMatcher(
      ({ type }) => type.startsWith(ticketsScope) && type.endsWith('/fulfilled'),
      (state) => {
        state.status = StatusLoading.success;
      },
    );
    builder.addMatcher(
      ({ type }) => type.startsWith(ticketsScope) && type.endsWith('/rejected'),
      (state) => {
        state.status = StatusLoading.error;
      },
    );
  },
});

export const { actions: ticketsActions, reducer: ticketsReducer } = slice;
