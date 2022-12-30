import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useDispatch, useSelector } from 'react-redux';
import { CellValueChangedEvent, ColDef } from 'ag-grid-community';
import DataTable from '../../../components/DataTable/DataTable';
import { selectTaxonomy } from '../../../store/selectors';
import { AppDispatch } from '../../../store/store';
import { Taxonomy } from '../../../typings/types';
import cloneDeep from '../../../utils/functions/cloneDeep';
import { editTaxonomyAsync } from '../../../store/taxonomySlice/taxonomyThunk';
import { isEqual } from '../../../utils/functions/isEqual';
import { createColumnDefs } from '../helpers/createColumnDefs';
import { RowDragEvent } from 'ag-grid-community/dist/lib/events';

type Props = {
  columns?: (keyof Taxonomy)[];
};

const TableBody = ({ columns }: Props) => {
  const dispatch: AppDispatch = useDispatch();
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
