import { Key } from 'react';

import requests from '../../../utils/api/api';
import { PagePostProps, PagePostPropsResponseType } from '../../post/types';
import { ITaxonomy } from '../types';

export const fetchTaxonomyRequest = <TAXONOMY extends ITaxonomy>(props: PagePostProps<TAXONOMY>) =>
  requests.get<PagePostPropsResponseType<TAXONOMY>>(
    `taxonomy/${props.filter?.link}${props.filter?.type ? `/${props.filter.type}` : ''}`,
    props,
  );

export const saveTaxonomyRequest = (data: ITaxonomy) => requests.post<ITaxonomy[]>(`taxonomy`, data);

export const deleteTaxonomyRequest = (id: Key) => requests.delete<ITaxonomy>(`taxonomy/${id}`);

export const putTaxonomyRequest = ({ uid, ...data }: ITaxonomy) => requests.put<ITaxonomy>(`taxonomy/${uid}`, data);
