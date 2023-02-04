import { TicketType } from '../../../typings/enum';
import { MapFile } from '../../../typings/types';

export const eventDatesScope = 'eventDates' as const;

export type EventDate = {
  uid: string;
  eventUid: string;
  type?: TicketType;
  map?: MapFile;
  dateFrom?: Date;
  dateTo?: Date;
  closeDateTime?: Date;
};
