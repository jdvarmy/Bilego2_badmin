import { selectSelectedDateMap } from '../events/eventsSelectors';
import { select } from '../selectors';
import { RootState } from '../store';

export const selectTicketsStore = (state: RootState) => select(state)?.tickets;

export const selectTicketsCircleSelector = (state: RootState) => {
  const mapFile = selectSelectedDateMap(state);
  if (!mapFile?.seats) {
    return [];
  }

  const { tickets } = selectTicketsStore(state);
  const { seats: _seats } = mapFile;

  const ticketIds = tickets?.map((ticket) => ticket.uid);
  if (!ticketIds) {
    return [];
  }

  const circle = _seats.filter((seat) => ticketIds.includes(seat.uid));

  return tickets?.map((ticket) => ({ ...ticket, circle: circle.find((c) => c.uid === ticket.uid) }));
};
