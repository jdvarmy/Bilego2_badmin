import { ColDef } from 'ag-grid-community';

import { RenderTitle } from '../renderCell/RenderTitle';

export function cellTitle<T>(props?: ColDef<T>): ColDef<T> {
  return {
    cellRenderer: RenderTitle,
    flex: 1,
    minWidth: 282,
    headerName: 'Заголовок',
    field: 'title',
    sortable: true,
    editable: false,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    filterParams: { filterOptions: ['contains'], defaultOption: 'contains' },
    ...props,
  };
}
