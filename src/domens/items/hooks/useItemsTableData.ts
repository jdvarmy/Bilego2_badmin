import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { IDatasource } from 'ag-grid-community/dist/lib/interfaces/iDatasource';

import { cellCity } from '../../../components/DataTable/cells/cellCity';
import { cellDelete } from '../../../components/DataTable/cells/cellDelete';
import { cellStatus } from '../../../components/DataTable/cells/cellStatus';
import { cellTitle } from '../../../components/DataTable/cells/cellTitle';
import { filterModelParser } from '../../../components/DataTable/parser/filterModelParser';
import { RenderDelete } from '../../../components/DataTable/renderCell/RenderDelete';
import { isPagePostPropsResponseTypeGuard } from '../../../typings/types';
import { defaultCountPost } from '../../post/types/types';
import { useAppDispatch } from '../../store';
import { deleteItemAsync, fetchItemsAsync } from '../store/itemsThunk';
import { IItem, itemsScope } from '../type/types';

type ItemColumns = Pick<IItem, 'title' | 'status' | 'city'>;

const columns: Record<keyof ItemColumns, string> = {
  title: 'Заголовок',
  status: 'Статус',
  city: 'Город',
};

export function useItemsTableData(): { columnDefs: ColDef<IItem>[]; onGridReady: (event: GridReadyEvent) => void } {
  const dispatch = useAppDispatch();
  const columnDefs = columnDefsCreator();

  const dataSource: IDatasource = {
    getRows: ({ startRow, filterModel, successCallback }) => {
      dispatch(
        fetchItemsAsync({
          count: defaultCountPost,
          offset: startRow,
          filter: filterModelParser(filterModel),
        }),
      )
        .unwrap()
        .then((data) => {
          if (isPagePostPropsResponseTypeGuard<IItem>(data)) {
            successCallback(data.items, data.props?.total ?? 0);
          }
        });
    },
  };

  const onGridReady = (params: GridReadyEvent) => {
    params.api.setDatasource(dataSource);
  };

  return { columnDefs, onGridReady };
}

function columnDefsCreator(): ColDef<IItem>[] {
  const columnDefs = Object.entries(columns).map(([column, name]) => {
    const columns: ColDef<IItem> = {
      field: column,
      headerName: name,
      editable: false,
      sortable: false,
    };

    if (['title'].includes(column)) {
      return cellTitle(itemsScope, columns);
    }
    if (['status'].includes(column)) {
      return cellStatus(columns);
    }
    if (['city'].includes(column)) {
      return cellCity(columns);
    }

    return columns;
  });

  columnDefs.push(cellDelete({ cellRenderer: RenderDelete<IItem>(deleteItemAsync) }));

  return columnDefs;
}
