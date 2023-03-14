import { CellValueChangedEvent } from 'ag-grid-community';
import { RowDragEvent } from 'ag-grid-community/dist/lib/events';
import { AgGridReact } from 'ag-grid-react';
import React, { forwardRef, useCallback } from 'react';

import DataTable from '../../../../../components/DataTable/DataTable';
import { TermType, TermTypeLink } from '../../../../../typings/enum';
import { defaultCountPost } from '../../../../post/types/types';
import { useAppDispatch } from '../../../../store';
import { useTaxonomyTableData } from '../../../hooks/useTaxonomyTableData';
import { editTaxonomyAsync } from '../../../store/taxonomyThunk';
import { ITaxonomy } from '../../../types/types';

type Props = {
  type: TermType;
  link: TermTypeLink;
  columns: (keyof ITaxonomy)[];
};

export const TableBody = forwardRef<AgGridReact, Props>(function TableBody(props, gridRef) {
  const dispatch = useAppDispatch();

  const { columnDefs, onGridReady } = useTaxonomyTableData(props);

  const reqEditTaxonomy = useCallback(
    (data: ITaxonomy) => {
      dispatch(editTaxonomyAsync(data));
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

  return (
    <DataTable
      ref={gridRef}
      columnDefs={columnDefs}
      rowModelType='infinite'
      onGridReady={onGridReady}
      // todo: добавить функционал перетаскивания строк и изменения индекса строк
      rowDragManaged
      onCellValueChanged={onCellValueChanged}
      onRowDragEnd={onRowDragEnd}
      cacheBlockSize={defaultCountPost}
      cacheOverflowSize={2}
      maxConcurrentDatasourceRequests={1}
      infiniteInitialRowCount={1}
      maxBlocksInCache={10}
    />
  );
});
