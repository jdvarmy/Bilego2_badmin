import { AgGridReact } from 'ag-grid-react';
import React, { memo, useRef } from 'react';

import DataTable from '../../../../components/DataTable/DataTable';
import { defaultCountPost } from '../../../post/types/types';
import { useItemsTableData } from '../../hooks/useItemsTableData';

export const ItemsTable = memo(function EventsTable() {
  const gridRef = useRef<AgGridReact | null>(null);

  const { columnDefs, onGridReady } = useItemsTableData();

  return (
    <DataTable
      ref={gridRef}
      rowData={[]}
      columnDefs={columnDefs}
      rowModelType='infinite'
      onGridReady={onGridReady}
      cacheBlockSize={defaultCountPost}
      cacheOverflowSize={2}
      maxConcurrentDatasourceRequests={1}
      infiniteInitialRowCount={1}
      maxBlocksInCache={10}
    />
  );
});
