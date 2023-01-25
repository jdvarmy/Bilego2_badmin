import { AppDispatch } from '../../store';
import { setEvent, setEventState, setSelectedDateUid } from './eventsSlice';

export const workerClearEventState = () => (dispatch: AppDispatch) => {
  dispatch(setEvent(null));
  dispatch(setEventState(null));
  dispatch(setSelectedDateUid(undefined));
};
