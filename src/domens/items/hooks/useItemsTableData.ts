import { ColDef } from 'ag-grid-community';
import { useEffect } from 'react';

import cloneDeep from '../../../utils/helpers/cloneDeep';
import { useAppDispatch, useStateSelector } from '../../store';
import { RenderDeleteItem } from '../components/ItemsTable/RenderDeleteItem';
import { cellCity } from '../components/ItemsTable/cell/cellCity';
import { cellDelete } from '../components/ItemsTable/cell/cellDelete';
import { cellStatus } from '../components/ItemsTable/cell/cellStatus';
import { cellTitle } from '../components/ItemsTable/cell/cellTitle';
import { selectItems } from '../store/itemsSelector';
import { fetchItemsAsync } from '../store/itemsThunk';
import { IItem } from '../type/types';

type ItemColumns = Pick<IItem, 'title' | 'status' | 'city'>;

const columns: Record<keyof ItemColumns, string> = {
  title: 'Заголовок',
  status: 'Статус',
  city: 'Город',
};

export function useItemsTableData(): { rowData: IItem[]; columnDefs: ColDef<IItem>[] } {
  const dispatch = useAppDispatch();
  const items = useStateSelector(selectItems);

  const columnDefs: ColDef<IItem>[] = Object.entries(columns).map(([column, name]) => {
    const columns: ColDef<IItem> = {
      field: column,
      headerName: name,
      editable: false,
      filter: false,
      sortable: false,
    };

    if (['title'].includes(column)) {
      return cellTitle(columns);
    }
    if (['status'].includes(column)) {
      return cellStatus(columns);
    }
    if (['city'].includes(column)) {
      return cellCity(columns);
    }

    return columns;
  });

  columnDefs.push(cellDelete({ cellRenderer: RenderDeleteItem }));

  const rowData = (cloneDeep(items) as IItem[])?.map((item) => {
    return item;
  });

  useEffect(() => {
    dispatch(fetchItemsAsync());
  }, [dispatch]);

  return { rowData, columnDefs };
}
