import { AgGridReact } from 'ag-grid-react';
import React, { memo, useRef } from 'react';

import DataTable from '../../../../components/DataTable/DataTable';
import { defaultCountPost } from '../../../post/types/types';
import { useEventsTableData } from '../../hooks/useEventsTableData';

export const EventsTable = memo(function EventsTable() {
  const gridRef = useRef<AgGridReact | null>(null);

  const { columnDefs, onGridReady } = useEventsTableData();

  return (
    <DataTable
      ref={gridRef}
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
