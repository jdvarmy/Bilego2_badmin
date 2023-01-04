import { RootState } from './store';

export const select = (state: RootState) => state;

export const selectSidebar = (state: RootState) => select(state)?.sidebar;

export const selectAuth = (state: RootState) => select(state)?.auth;

export const selectUsers = (state: RootState) => select(state)?.users;

export const selectMedialibrary = (state: RootState) => select(state)?.medialibrary;

export const selectAlert = (state: RootState) => select(state)?.alert;

export const selectEventsStore = (state: RootState) => select(state)?.events;
export const selectEvent = (state: RootState) => selectEventsStore(state).event;
export const selectEventState = (state: RootState) => selectEventsStore(state).eventState;
export const selectEvents = (state: RootState) => selectEventsStore(state).events;
export const selectEventSelectedDate = (state: RootState) => {
  const selected = selectEventsStore(state).selectedDateUid;
  return selectEventsStore(state).eventState?.eventDates?.find((date) => date.uid === selected);
};
export const selectSelectedDateMap = (state: RootState) => selectEventSelectedDate(state)?.map;
export const selectSelectedDateMapSectors = (state: RootState) => {
  const paths = selectSelectedDateMap(state)?.paths;
  if (paths) {
    const uniquePaths = [...new Map(paths.map((path) => [path['id'], path])).values()];
    return uniquePaths.map((item) => ({ name: item.name, uid: item.id }));
  }
};
export const selectEventSelectedDateUid = (state: RootState) => selectEventsStore(state).selectedDateUid;

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

export const selectTaxonomyStore = (state: RootState) => select(state)?.taxonomy;
export const selectTaxonomy = (state: RootState) => selectTaxonomyStore(state)?.taxonomy;
