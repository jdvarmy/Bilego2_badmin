import { selectEventState } from '../../events/store/eventsSelectors';
import { RootState } from '../../store';

export const selectEventDatesStore = (state: RootState) => state?.eventDates;

export const selectEventDateSelectedUid = (state: RootState) => selectEventDatesStore(state).selectedDateUid;

export const selectEventDates = (state: RootState) => selectEventState(state)?.eventDates;

export const selectEventDateSelected = (state: RootState) => {
  const selectedDateUid = selectEventDateSelectedUid(state);

  return selectEventDates(state)?.find((date) => date.uid === selectedDateUid);
};

export const selectSelectedDateMap = (state: RootState) => selectEventDateSelected(state)?.map;

export const selectSelectedDateMapSectors = (state: RootState) => {
  const paths = selectSelectedDateMap(state)?.paths;

  if (paths) {
    const uniquePaths = [...new Map(paths.map((path) => [path['id'], path])).values()];

    return uniquePaths.map((item) => ({ name: item.name, uid: item.id }));
  }

  return undefined;
};
