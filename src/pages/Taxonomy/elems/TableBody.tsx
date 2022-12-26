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

type Props = {
  columns?: (keyof Taxonomy)[];
};

const TableBody = ({ columns }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const taxonomy = useSelector(selectTaxonomy, isEqual);
  const gridRef = useRef<AgGridReact | null>(null);

  const [data, setData] = useState<{ columnDefs: ColDef[]; rowData: object[] }>({ columnDefs: [], rowData: [] });

  const onCellValueChanged = useCallback(
    (event: CellValueChangedEvent) => {
      // удаляем картинки и иконки, тк по ним данные сохраняются в другой функции
      const data = Object.fromEntries(
        Object.entries(event.data as Taxonomy).filter(([key]) => !['image', 'icon'].includes(key)),
      );
      dispatch(editTaxonomyAsync(data as Taxonomy));
    },
    [dispatch],
  );

  useEffect(() => {
    if (Array.isArray(taxonomy) && taxonomy.length > 0) {
      const columnDefs = createColumnDefs(columns || (Object.keys(taxonomy[0]) as (keyof Taxonomy)[]));

      setData({ columnDefs, rowData: cloneDeep(taxonomy) as Taxonomy[] });
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
      animateRows={true}
      rowSelection='multiple'
      onCellValueChanged={onCellValueChanged}
    />
  );
};

export default TableBody;
