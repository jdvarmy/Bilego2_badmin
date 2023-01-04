import { selectSelectedDateMap } from './events/eventsSelectors';
import { RootState } from './store';

export const select = (state: RootState) => state;

export const selectSidebar = (state: RootState) => select(state)?.sidebar;

export const selectAuth = (state: RootState) => select(state)?.auth;

export const selectUsers = (state: RootState) => select(state)?.users;

export const selectMedialibrary = (state: RootState) => select(state)?.medialibrary;

export const selectAlert = (state: RootState) => select(state)?.alert;

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

export const selectCircleStore = (state: RootState) => select(state)?.circle;
