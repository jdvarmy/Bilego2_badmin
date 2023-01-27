import { ColDef } from 'ag-grid-community';

export function cellDelete<T>(props?: ColDef<T>): ColDef<T> {
  return {
    width: 64,
    headerName: 'Del',
    field: 'delete',
    sortable: false,
    editable: false,
    filter: false,
    ...props,
  };
}
