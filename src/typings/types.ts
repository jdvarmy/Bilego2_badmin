import { PagePostPropsResponseType } from '../domens/post/types/types';
import { PostStatus, TicketType, UserRole } from './enum';
import { HTTP_URL, HTTP_VERSION } from './env';

export const loginPage = '/login';
export const storageTokenName = '_btoken' as const;
export const axiosBaseUrl = `${HTTP_URL}${HTTP_VERSION}/`;

export function isObjectGuard(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}
export function isPagePostPropsResponseTypeGuard<T>(data: unknown): data is PagePostPropsResponseType<T> {
  return typeof data === 'object' && 'items' in data && 'props' in data;
}

export type ColorsFormat = 'plain' | 'hex' | 'rgb' | 'number' | 'unknown' | undefined;

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

export interface Post {
  uid?: string;
  slug?: string;
  status?: PostStatus;
  title?: string;
  text?: string;
  create?: Date;
  update?: Date;
  seo?: any;
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
