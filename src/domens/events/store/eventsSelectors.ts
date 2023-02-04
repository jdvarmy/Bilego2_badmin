import { selectEventDateSelected } from '../../eventDates/store/eventDatesSelectors';
import { select } from '../../selectors';
import { RootState } from '../../store';

export const selectEventsStore = (state: RootState) => select(state)?.events;

export const selectEvent = (state: RootState) => selectEventsStore(state).event;

export const selectEventState = (state: RootState) => selectEventsStore(state).eventState;

export const selectEventStateHeaderImageData = (state: RootState) => {
  const { headerImage, headerText, headerTextColor } = selectEventState(state);

  return { headerImage, headerText, headerTextColor };
};

export const selectEventStateImageData = (state: RootState) => {
  const { image, title } = selectEventState(state);
  const date = selectEventDateSelected(state);

  return { image, title, date: date?.dateFrom };
};

export const selectEvents = (state: RootState) => selectEventsStore(state).events;
