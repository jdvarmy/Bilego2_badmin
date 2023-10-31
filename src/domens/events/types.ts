import { City, EventHeaderType } from '../../typings/enum';
import { Artist, MediaSelectData, Post, User } from '../../typings/types';
import { EventDate } from '../eventDates/types';
import { IItem } from '../items/types';
import { ITaxonomy } from '../taxonomy/types';

export const eventsScope = 'events' as const;

export interface IEvent extends Post {
  uid: string;
  item?: Pick<IItem, 'uid' | 'title' | 'city'>;
  artist?: Pick<Artist, 'uid' | 'title'>[];
  city?: City;
  eventManager?: User;
  taxonomy?: Pick<ITaxonomy, 'uid' | 'name' | 'type'>[];
  eventDates?: EventDate[];
  image?: MediaSelectData;
  fragment?: string;
  searchWords?: string;
  ageRestriction?: number;
  isShowOnSlider?: boolean;
  musicLink?: string;
  videoLink?: string;
  headerType?: EventHeaderType;
  headerImage?: MediaSelectData;
  headerMedia?: string;
  headerText?: string;
  headerTextColor?: string;
  concertManagerInfo?: string;
  concertManagerPercentage?: number;
}

export interface EventRequest
  extends Omit<
    IEvent,
    'create' | 'update' | 'eventDates' | 'taxonomy' | 'image' | 'headerImage' | 'item' | 'artist' | 'eventManager'
  > {
  taxonomy?: string[];
  eventDates?: Omit<EventDate, 'eventUid' | 'map'>[];
  image?: number;
  headerImage?: number;
  item?: string;
  artist?: string[];
  eventManager?: string;
}
