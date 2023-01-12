import { Event, EventRequest } from '../../typings/types';
import { AppThunk } from '../store';
import { getEventRequest, patchEventRequest, postTemplateEventRequest, putTemplateEventRequest } from './eventsRequest';
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

export const saveEventAsync =
  (event: Event): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await putTemplateEventRequest(prepareData(event));
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
    const { data } = await postTemplateEventRequest();
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
      const { data } = await patchEventRequest(prepareData(event));
      dispatch(setEvent(data));
      dispatch(setEventState(data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

function prepareData(event: Event): EventRequest {
  const { eventDates, create, update, taxonomy, image, headerImage, ...other } = event;

  const filteredEventDates = eventDates?.map((eventDate) => {
    const { uid, type, dateFrom, dateTo, closeDateTime } = eventDate;
    return { uid, type, dateFrom, dateTo, closeDateTime };
  });
  const filteredTaxonomy = taxonomy?.map((tax) => +tax.id);
  const filteredImage = +image?.id ?? undefined;
  const filteredHeaderImage = +headerImage?.id ?? undefined;

  return {
    ...other,
    eventDates: filteredEventDates,
    taxonomy: filteredTaxonomy,
    image: filteredImage,
    headerImage: filteredHeaderImage,
  };
}
