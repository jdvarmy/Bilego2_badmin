import { ColDef } from 'ag-grid-community';

import { RenderTicketPrice } from '../renderCell/RenderTicketPrice';

export function cellTicketPrice<T>(props?: ColDef<T>): ColDef<T> {
  return {
    cellRenderer: RenderTicketPrice,
    width: 102,
    headerName: 'Цена',
    field: 'price',
    sortable: true,
    editable: false,
    filter: true,
    ...props,
  };
}
