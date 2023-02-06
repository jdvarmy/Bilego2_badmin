import { ColDef } from 'ag-grid-community';

import { RenderTicketDates } from '../renderCell/RenderTicketDates';

export function cellTicketDates<T>(props?: ColDef<T>): ColDef<T> {
  return {
    cellRenderer: RenderTicketDates,
    width: 302,
    headerName: 'Даты',
    field: 'ticketDates',
    sortable: true,
    editable: false,
    filter: true,
    ...props,
  };
}
