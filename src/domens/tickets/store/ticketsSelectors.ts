import { selectSelectedDateMap } from '../../eventDates/store/eventDatesSelectors';
import { select } from '../../../store/selectors';
import { RootState } from '../../../store/store';

export const selectTicketsStore = (state: RootState) => select(state)?.tickets;

export const selectTickets = (state: RootState) => selectTicketsStore(state)?.tickets;

export const selectSelectedTicket = (state: RootState) => selectTicketsStore(state)?.selectedTicket;

export const selectTicketsCircleSelector = (state: RootState) => {
  const tickets = selectTickets(state);
  const mapFile = selectSelectedDateMap(state);
  const ticketIds = tickets?.map((ticket) => ticket.uid);

  if (!mapFile?.seats) return [];
  if (!ticketIds) return [];

  const { seats } = mapFile;
  const circle = seats.filter((seat) => ticketIds.includes(seat.uid));

  return tickets?.map((ticket) => ({ ...ticket, circle: circle.find((c) => c.uid === ticket.uid) }));
};
