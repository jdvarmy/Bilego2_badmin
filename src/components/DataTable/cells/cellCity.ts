import { ColDef } from 'ag-grid-community';

import { CityColumnFilter } from '../filters/CityColumnFilter';
import { RenderCity } from '../renderCell/RenderCity';

export function cellCity<T>(props?: ColDef<T>): ColDef<T> {
  return {
    cellRenderer: RenderCity,
    width: 182,
    headerName: 'Город',
    field: 'city',
    sortable: true,
    editable: false,
    filter: CityColumnFilter,
    ...props,
  };
}
