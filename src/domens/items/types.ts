import { City } from '../../typings/enum';
import { MediaSelectData, Post } from '../../typings/types';
import { ITaxonomy } from '../taxonomy/types';

export const itemsScope = 'items' as const;

export interface IItem extends Post {
  city?: City;
  taxonomy?: Pick<ITaxonomy, 'uid' | 'name' | 'type'>[];
  image?: MediaSelectData;
  headerImage?: MediaSelectData;
  address?: string;
  latitude?: string;
  longitude?: string;
}

export interface ItemRequest extends Omit<IItem, 'create' | 'update' | 'taxonomy' | 'image' | 'headerImage'> {
  taxonomy?: string[];
  image?: number;
  headerImage?: number;
}
