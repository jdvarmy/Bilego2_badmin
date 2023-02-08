import { ColDef } from 'ag-grid-community';

import { RenderTicketColor } from '../renderCell/RenderTicketColor';

export function cellTicketColor<T>(props: ColDef<T>): ColDef<T> {
  return {
    cellRenderer: RenderTicketColor,
    width: 82,
    headerName: 'Цвет',
    field: 'color',
    sortable: false,
    editable: false,
    filter: false,
    ...props,
  };
}
