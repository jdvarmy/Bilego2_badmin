import { ColDef } from 'ag-grid-community';

import { RenderItem } from '../renderCell/RenderItem';

export function cellItem<T>(props?: ColDef<T>): ColDef<T> {
  return {
    cellRenderer: RenderItem,
    headerName: 'Место',
    field: 'item',
    sortable: false,
    editable: false,
    filter: false,
    ...props,
  };
}
