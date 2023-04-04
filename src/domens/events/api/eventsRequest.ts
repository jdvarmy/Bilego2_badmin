import requests from '../../../utils/api/api';
import { PagePostProps, PagePostPropsResponseType } from '../../post/types/types';
import { EventRequest, IEvent, eventsScope } from '../types/types';

export const fetchEventsRequest = <EVENT extends IEvent>(props?: PagePostProps<EVENT>) =>
  requests.get<PagePostPropsResponseType<EVENT>>(eventsScope, props);

export const getEventRequest = (uid: string) => requests.get<IEvent>(`${eventsScope}/${uid}`);

export const postTemplateEventRequest = () => requests.post<IEvent>(eventsScope);

export const putEventRequest = (data: EventRequest) => requests.put<IEvent>(`${eventsScope}/${data.uid}`, data);

export const deleteEventRequest = (uid: string) => requests.delete<IEvent>(`${eventsScope}/${uid}`);
