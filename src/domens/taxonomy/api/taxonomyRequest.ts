import { Key } from 'react';

import { TermType, TermTypeLink } from '../../../typings/enum';
import { Taxonomy } from '../../../typings/types';
import requests from '../../../utils/api/api';

export const fetchTaxonomyRequest = (link: TermTypeLink, type?: TermType) =>
  requests.get<Taxonomy[]>(`taxonomy/${link}${type ? `/${type}` : ''}`);

export const saveTaxonomyRequest = (data: Taxonomy) => requests.post<Taxonomy[]>(`taxonomy`, data);

export const deleteTaxonomyRequest = (id: Key) => requests.delete<Taxonomy[]>(`taxonomy/${id}`);

export const patchTaxonomyRequest = ({
  id,
  ...data
}: Omit<Taxonomy, 'image' | 'icon'> | Pick<Taxonomy, 'id' | 'image' | 'icon'>) =>
  requests.patch<Taxonomy>(`taxonomy/${id}`, data);
