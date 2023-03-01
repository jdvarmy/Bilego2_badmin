import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { IDatasource } from 'ag-grid-community/dist/lib/interfaces/iDatasource';
import { CityColumnFilter } from 'src/components/TableGrid/filters/CityColumnFilter';

import { StatusColumnFilter } from '../../../components/TableGrid/filters/StatusColumnFilter';
import { filterModelParser } from '../../../components/TableGrid/parser/filterModelParser';
import { defaultCountPost } from '../../post/types/types';
import { useAppDispatch } from '../../store';
import { RenderDeleteItem } from '../components/ItemsTable/RenderDeleteItem';
import { cellCity } from '../components/ItemsTable/cell/cellCity';
import { cellDelete } from '../components/ItemsTable/cell/cellDelete';
import { cellStatus } from '../components/ItemsTable/cell/cellStatus';
import { cellTitle } from '../components/ItemsTable/cell/cellTitle';
import { fetchItemsAsync } from '../store/itemsThunk';
import { IItem } from '../type/types';

type ItemColumns = Pick<IItem, 'title' | 'status' | 'city'>;

const columns: Record<keyof ItemColumns, string> = {
  title: 'Заголовок',
  status: 'Статус',
  city: 'Город',
};

export function useItemsTableData(): {
  columnDefs: ColDef<IItem>[];
  onGridReady: (event: GridReadyEvent) => void;
} {
  const dispatch = useAppDispatch();
  const columnDefs: ColDef<IItem>[] = Object.entries(columns).map(([column, name]) => {
    const columns: ColDef<IItem> = {
      field: column,
      headerName: name,
      editable: false,
      filter: false,
      sortable: false,
    };

    if (['title'].includes(column)) {
      columns.filter = 'agTextColumnFilter';
      columns.floatingFilter = true;
      columns.filterParams = {
        filterOptions: ['contains'],
        defaultOption: 'contains',
      };
      return cellTitle(columns);
    }
    if (['status'].includes(column)) {
      columns.filter = StatusColumnFilter;
      return cellStatus(columns);
    }
    if (['city'].includes(column)) {
      columns.filter = CityColumnFilter;
      return cellCity(columns);
    }

    return columns;
  });

  columnDefs.push(cellDelete({ cellRenderer: RenderDeleteItem }));

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
          successCallback(data.items, data.props?.total ?? 0);
        });
    },
  };

  const onGridReady = (params: GridReadyEvent) => {
    params.api.setDatasource(dataSource);
  };

  return { columnDefs, onGridReady };
}
