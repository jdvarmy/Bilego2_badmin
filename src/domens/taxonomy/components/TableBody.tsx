import { CellValueChangedEvent, ColDef } from 'ag-grid-community';
import { RowDragEvent } from 'ag-grid-community/dist/lib/events';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataTable from '../../../components/DataTable/DataTable';
import { Taxonomy } from '../../../typings/types';
import cloneDeep from '../../../utils/helpers/cloneDeep';
import { isEqual } from '../../../utils/helpers/isEqual';
import { AppDispatch } from '../../store';
import { createColumnDefs } from '../helpers/createColumnDefs';
import { selectTaxonomy } from '../store/taxonomySelectors';
import { editTaxonomyAsync } from '../store/taxonomyThunk';

type Props = {
  columns?: (keyof Taxonomy)[];
};

const TableBody = ({ columns }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  // todo: поменять на shallowEqual
  const taxonomy = useSelector(selectTaxonomy, isEqual);
  const gridRef = useRef<AgGridReact | null>(null);

  const [data, setData] = useState<{ columnDefs: ColDef[]; rowData: object[] }>({ columnDefs: [], rowData: [] });

  const reqEditTaxonomy = useCallback(
    (data: Taxonomy) => {
      // удаляем картинки и иконки, тк по ним данные сохраняются в другой функции
      const clearData = Object.fromEntries(Object.entries(data).filter(([key]) => !['image', 'icon'].includes(key)));
      dispatch(editTaxonomyAsync(clearData));
    },
    [dispatch],
  );
  const onCellValueChanged = useCallback(
    (event: CellValueChangedEvent) => reqEditTaxonomy(event.data),
    [reqEditTaxonomy],
  );
  const onRowDragEnd = useCallback(
    (event: RowDragEvent) => {
      if (event.overIndex !== -1 && event.node?.data?.id) {
        reqEditTaxonomy({ ...event.node.data, overIndex: event.overIndex });
      }
    },
    [reqEditTaxonomy],
  );

  useEffect(() => {
    if (Array.isArray(taxonomy) && taxonomy.length > 0) {
      const columnDefs = createColumnDefs(columns || (Object.keys(taxonomy[0]) as (keyof Taxonomy)[]));

      setData({ columnDefs, rowData: cloneDeep<Taxonomy[]>(taxonomy) as Taxonomy[] });
    }

    return () => {
      setData({ columnDefs: [], rowData: [] });
    };
  }, [columns, taxonomy]);

  return (
    <DataTable
      ref={gridRef}
      rowData={data.rowData}
      columnDefs={data.columnDefs}
      rowDragManaged={true}
      rowSelection='multiple'
      onCellValueChanged={onCellValueChanged}
      onRowDragEnd={onRowDragEnd}
    />
  );
};

export default TableBody;
