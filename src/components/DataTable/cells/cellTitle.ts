import { ColDef } from 'ag-grid-community';

import { RenderTitle } from '../renderCell/RenderTitle';

export function cellTitle<T>(scope: string, props?: ColDef<T>): ColDef<T> {
  return {
    cellRenderer: RenderTitle(scope),
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
