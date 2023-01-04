import { AppThunk } from '../store';
import { getEventRequest, patchEventRequest, saveTemplateEventRequest } from './eventsRequest';
import { Event } from '../../typings/types';
import { setEvent, setEventState, setLoading } from './eventsSlice';

export const getEventAsync =
  (slug: string): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await getEventRequest(slug);
      dispatch(setEvent(data));
      dispatch(setEventState(data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const saveTemplateEventAsync = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const { data } = await saveTemplateEventRequest();
    dispatch(setEvent(data));
    dispatch(setEventState(data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const editEventAsync =
  (event: Event): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await patchEventRequest(event);
      dispatch(setEvent(data));
      dispatch(setEventState(data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };
