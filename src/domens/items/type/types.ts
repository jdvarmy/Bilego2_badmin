import { City } from '../../../typings/enum';
import { MediaSelectData, Post, Taxonomy } from '../../../typings/types';

export const itemsScope = 'items' as const;

export interface IItem extends Post {
  city?: City;
  taxonomy?: Pick<Taxonomy, 'id' | 'name' | 'type'>[];
  image?: MediaSelectData;
  headerImage?: MediaSelectData;
  address?: string;
  latitude?: string;
  longitude?: string;
}

export interface ItemRequest extends Omit<IItem, 'create' | 'update' | 'taxonomy' | 'image' | 'headerImage'> {
  taxonomy?: number[];
  image?: number;
  headerImage?: number;
}
