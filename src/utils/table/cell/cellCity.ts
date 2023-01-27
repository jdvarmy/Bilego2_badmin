import { ColDef } from 'ag-grid-community';

import { RenderCity } from '../renderCell/RenderCity';

export function cellCity<T>(props?: ColDef<T>): ColDef<T> {
  return {
    cellRenderer: RenderCity,
    width: 112,
    headerName: 'Город',
    field: 'city',
    sortable: true,
    editable: true,
    filter: true,
    ...props,
  };
}
