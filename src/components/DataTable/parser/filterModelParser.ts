import { IGetRowsParams } from 'ag-grid-community';

import { IEvent } from '../../../domens/events/types/types';
import { IItem } from '../../../domens/items/type/types';
import { PagePostProps } from '../../../domens/post/types/types';
import { ITaxonomy } from '../../../domens/taxonomy/types/types';

export function filterModelParser<POST extends IItem | IEvent | ITaxonomy>(filterModel: IGetRowsParams['filterModel']) {
  return Object.fromEntries(
    Object.entries(filterModel).map(([key, filter]) => {
      let value: string | string[] | undefined = undefined;
      if (typeof filter === 'object' && 'filterType' in filter) {
        if (filter.filterType === 'text' && 'filter' in filter) {
          value = filter.filter as string;
        } else if (filter.filterType === 'set' && 'values' in filter) {
          value = filter.values as string[];
        }
      }
      return [key, value];
    }),
  ) as unknown as PagePostProps<POST>['filter'];
}
