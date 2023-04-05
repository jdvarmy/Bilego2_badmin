import { ColDef } from 'ag-grid-community';

import { RenderEventDates } from '../renderCell/RenderEventDates';

export function cellEventDates<T>(props?: ColDef<T>): ColDef<T> {
  return {
    cellRenderer: RenderEventDates,
    width: 282,
    headerName: 'Даты',
    field: 'eventDates',
    sortable: true,
    editable: false,
    filter: false,
    ...props,
  };
}
