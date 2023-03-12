import { ColDef } from 'ag-grid-community';

import { StatusColumnFilter } from '../filters/StatusColumnFilter';
import { RenderStatus } from '../renderCell/RenderStatus';

export function cellStatus<T>(props?: ColDef<T>): ColDef<T> {
  return {
    cellRenderer: RenderStatus,
    width: 186,
    headerName: 'Статус',
    field: 'status',
    sortable: true,
    editable: false,
    filter: StatusColumnFilter,
    ...props,
  };
}
