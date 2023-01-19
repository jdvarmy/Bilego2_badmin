import { Key } from 'react';

import { City, EventHeaderType, PostStatus, TermType, TermTypeLink, TicketType, UserRole } from './enum';
import { HTTP_URL, HTTP_VERSION } from './env';

export const loginPage = '/login';
export const storageTokenName = '_btoken' as const;
export const axiosBaseUrl = `${HTTP_URL}${HTTP_VERSION}/`;

export type ColorsFormat = 'plain' | 'hex' | 'rgb' | 'number' | 'unknown' | undefined;

export type ServerError = { statusCode: number; message: number; error: string };

export type User = {
  uid?: string;
  email: string;
  role: UserRole;
  name?: string;
  surname?: string;
  birthdate?: Date | null;
  phone?: string;
  avatar?: { id: number; name: string };
  status?: number;
  access?: { ip: string; device: string; update: Date }[];
  concertManagerInfo?: string;
  concertManagerPercentage?: number;
};

export interface Taxonomy {
  id?: Key;
  name: string;
  type: TermType;
  link?: TermTypeLink;
  slug?: string;
  description?: string;
  icon?: Partial<MediaSelectData> | number;
  image?: Partial<MediaSelectData> | number;
  overIndex?: number;
  showInMenu?: boolean;
  showInMainPage?: boolean;
}

interface Post {
  uid?: string;
  slug?: string;
  status?: PostStatus;
  title?: string;
  text?: string;
  create?: Date;
  update?: Date;
  seo?: any;
}

export type EventDate = {
  uid: string;
  eventUid: string;
  type?: TicketType;
  map?: MapFile;
  dateFrom?: Date;
  dateTo?: Date;
  closeDateTime?: Date;
};

export interface IEvent extends Post {
  uid: string;
  item?: Pick<Item, 'uid' | 'title' | 'city'>;
  artist?: Pick<Artist, 'uid' | 'title'>[];
  city?: City;
  eventManager?: User;
  taxonomy?: Pick<Taxonomy, 'id' | 'name' | 'type'>[];
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
  taxonomy?: number[];
  eventDates?: Omit<EventDate, 'eventUid' | 'map'>[];
  image?: number;
  headerImage?: number;
  item?: string;
  artist?: string[];
  eventManager?: string;
}

export interface Item extends Post {
  image?: MediaSelectData | number;
  city?: City;
}
export interface Artist extends Post {
  avatar?: MediaSelectData | number;
}

export interface TicketOnSell {
  uid: string;
  price?: number;
  service?: number;
  dateFrom?: string | Date;
  dateTo?: string | Date;
  color?: string;
  totalPrice?: { service: number; price: number };
}
export interface Ticket {
  uid?: string;
  type?: TicketType;
  name?: string;
  description?: string;
  stock?: number;
  seat?: string | number;
  row?: string | number;
  sector?: string | number;
  sell?: TicketOnSell[];
}

// http
export type RequestAuth = {
  email: string;
  password: string;
  name?: string;
};
export type ResponseAuth = {
  accessToken: string;
  user: User;
};
export type RequestUser = RequestAuth & {
  uid?: string;
  status?: number;
  role?: UserRole;
  sendMail?: boolean;
  avatar?: number;
  surname?: string;
  birthdate?: Date | null;
  phone?: string;
  concertManagerInfo?: string;
  concertManagerPercentage?: number;
};
export type MediaFile = {
  id: number;
  encoding: string;
  mimetype: string;
  name: string;
  originalName: string;
  path: string;
  size: number;
};
export type MediaSelectData = { id: number; name: string; path?: string };
export type TextElement = { fill?: string; 'font-family'?: string; 'font-size'?: number; transform?: string };
export type PathElement = {
  d?: string;
  id?: string;
  name?: string;
  fill?: string;
  stroke?: string;
  strokeMiterlimit?: number;
  strokeWidth?: number;
};
export type CircleElement = {
  uid: string;
  cx: number;
  cy: number;
  fill: string;
  r: number;
  stroke: string;
  strokeMiterlimit?: number;
  strokeWidth?: number;
};
export type DrawCircleType = {
  uid: string;
  x: number;
  y: number;
  r: number;
  seat: string | number;
  row: string | number;
  sector: string | number;
  multi: boolean;
  fill?: string;
  ticket?: Ticket;
};
export type MapFile = {
  uid: string;
  map?: MediaFile;
  minimap?: MediaFile;
  xml?: string;
  viewBox?: string;
  width?: number;
  height?: number;
  background?: {
    type: 'element';
    tagName: 'path' | 'text' | 'circle';
    properties: TextElement & PathElement & CircleElement;
    children: MapFile['background'][];
  }[];
  attributes?: any;
  metadata?: any[];
  paths?: any[];
  seats?: any[];
};
export type ViewBoxSizes = {
  width: number;
  height: number;
};
export type Point = {
  x: number;
  y: number;
};
