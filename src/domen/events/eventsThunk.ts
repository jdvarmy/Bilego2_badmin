import { EventRequest, IEvent, ServerError } from '../../typings/types';
import { addAlertWorker, addErrorAlertWorker } from '../alert/workers';
import { AppThunk } from '../store';
import { getEventRequest, patchEventRequest, postTemplateEventRequest, putTemplateEventRequest } from './eventsRequest';
import { selectEventState } from './eventsSelectors';
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
      dispatch(addErrorAlertWorker(e as ServerError));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const saveEventAsync =
  (type?: IEvent['status']): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setLoading(true));

    try {
      const eventState = selectEventState(getState());

      const { data } = await putTemplateEventRequest(prepareData(type ? { ...eventState, status: type } : eventState));
      dispatch(addAlertWorker({ severity: 'success', title: 'Сохранено', text: 'Событие успешно сохранено!' }));
      dispatch(setEvent(data));
      dispatch(setEventState(data));
    } catch (e) {
      dispatch(addErrorAlertWorker(e as ServerError));
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
    dispatch(addErrorAlertWorker(e as ServerError));
  } finally {
    dispatch(setLoading(false));
  }
};

export const editEventAsync =
  (event: IEvent): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await patchEventRequest(prepareData(event));
      dispatch(addAlertWorker({ severity: 'success', title: 'Сохранено', text: 'Данные события успешно сохранены!' }));
      dispatch(setEvent(data));
      dispatch(setEventState(data));
    } catch (e) {
      dispatch(addErrorAlertWorker(e as ServerError));
    } finally {
      dispatch(setLoading(false));
    }
  };

function prepareData(event: IEvent): EventRequest {
  const { eventDates, create, update, taxonomy, image, headerImage, item, artist, eventManager, ...other } = event;

  const filteredEventDates = eventDates?.map((eventDate) => {
    const { uid, type, dateFrom, dateTo, closeDateTime } = eventDate;
    return { uid, type, dateFrom, dateTo, closeDateTime };
  });
  const filteredTaxonomy = taxonomy?.map((tax) => +tax.id);
  const filteredImage = +image?.id ?? undefined;
  const filteredHeaderImage = +headerImage?.id ?? undefined;

  const filteredItem = item?.uid;
  const filteredArtist = artist?.map((a) => a.uid);
  const filteredEventManager = eventManager?.uid;

  return {
    ...other,
    eventDates: filteredEventDates,
    taxonomy: filteredTaxonomy,
    image: filteredImage,
    headerImage: filteredHeaderImage,
    eventManager: filteredEventManager,
    item: filteredItem,
    artist: filteredArtist,
  };
}
