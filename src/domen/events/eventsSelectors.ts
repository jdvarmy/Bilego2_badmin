import { select } from '../selectors';
import { RootState } from '../store';

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
