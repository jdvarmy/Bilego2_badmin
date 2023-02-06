import { ColDef } from 'ag-grid-community';

import { RenderCheckbox } from '../renderCell/RenderCheckbox';

export function cellIsSlider<T>(props?: ColDef<T>): ColDef<T> {
  return {
    cellRenderer: RenderCheckbox,
    width: 76,
    headerName: 'Слайдер',
    field: 'isShowOnSlider',
    sortable: true,
    editable: false,
    filter: false,
    ...props,
  };
}
