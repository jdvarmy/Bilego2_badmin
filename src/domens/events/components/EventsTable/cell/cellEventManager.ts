import { ColDef } from 'ag-grid-community';

import { RenderEventManager } from '../renderCell/RenderEventManager';

export function cellEventManager<T>(props?: ColDef<T>): ColDef<T> {
  return {
    cellRenderer: RenderEventManager,
    width: 132,
    headerName: 'Менеджер',
    field: 'eventManager',
    sortable: true,
    editable: false,
    filter: false,
    ...props,
  };
}
