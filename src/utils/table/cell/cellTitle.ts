import { ColDef } from 'ag-grid-community';

import { RenderTitle } from '../renderCell/RenderTitle';

export function cellTitle<T>(props?: ColDef<T>): ColDef<T> {
  return {
    cellRenderer: RenderTitle,
    width: 282,
    headerName: 'Заголовок',
    field: 'title',
    sortable: true,
    editable: false,
    filter: true,
    ...props,
  };
}
