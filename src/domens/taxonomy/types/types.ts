import { TermType, TermTypeLink } from '../../../typings/enum';
import { MediaSelectData } from '../../../typings/types';

export const taxonomyScope = 'taxonomy' as const;

export interface ITaxonomy {
  uid?: string;
  name: string;
  type?: TermType;
  link?: TermTypeLink;
  slug?: string;
  description?: string;
  icon?: Partial<MediaSelectData> | number;
  image?: Partial<MediaSelectData> | number;
  overIndex?: number;
  showInMenu?: boolean;
  showInMainPage?: boolean;
}
