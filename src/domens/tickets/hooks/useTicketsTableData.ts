import { ColDef } from 'ag-grid-community';
import { useSelector } from 'react-redux';

import { Ticket } from '../../../typings/types';
import cloneDeep from '../../../utils/helpers/cloneDeep';
import { cellManagement } from '../componets/TicketSimple/components/cell/cellManagement';
import { cellTicketColor } from '../componets/TicketSimple/components/cell/cellTicketColor';
import { cellTicketDates } from '../componets/TicketSimple/components/cell/cellTicketDates';
import { cellTicketPrice } from '../componets/TicketSimple/components/cell/cellTicketPrice';
import { selectTickets } from '../store/ticketsSelectors';

type TicketColumns = Pick<Ticket, 'uid' | 'name' | 'description' | 'stock'> & {
  ticketDates: string;
  color: 'string';
  price: string;
};

const columns: Record<keyof TicketColumns, string> = {
  uid: '',
  name: 'Имя',
  description: 'Описание',
  ticketDates: 'Даты',
  color: 'Цвет',
  stock: 'Кол-во',
  price: 'Цена',
};

export function useTicketsTableData(): { rowData: Ticket[]; columnDefs: ColDef<Ticket>[] } {
  const tickets = useSelector(selectTickets);

  const columnDefs: ColDef<Ticket>[] = Object.entries(columns).map(([column, name]) => {
    const columns: ColDef<Ticket> = {
      field: column,
      headerName: name,
      editable: false,
      filter: false,
      sortable: false,
    };

    if (['uid'].includes(column)) columns.hide = true;
    if (['name'].includes(column)) columns.width = 282;
    if (['description'].includes(column)) columns.flex = 1;
    if (['stock'].includes(column)) columns.width = 88;

    if (['color'].includes(column)) {
      return cellTicketColor(columns);
    }

    if (['ticketDates'].includes(column)) {
      return cellTicketDates(columns);
    }

    if (['price'].includes(column)) {
      return cellTicketPrice(columns);
    }

    return columns;
  });

  columnDefs.push(cellManagement());

  const rowData = cloneDeep(tickets) as Ticket[];

  return { rowData, columnDefs };
}
