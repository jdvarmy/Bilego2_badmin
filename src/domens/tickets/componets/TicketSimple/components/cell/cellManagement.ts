import { ColDef } from 'ag-grid-community';

import { RenderTicketManagement } from '../renderCell/RenderTicketManagement';

export function cellManagement<T>(props?: ColDef<T>): ColDef<T> {
  return {
    cellRenderer: RenderTicketManagement,
    width: 110,
    headerName: 'Управление',
    field: 'management',
    sortable: false,
    editable: false,
    filter: false,
    ...props,
  };
}
