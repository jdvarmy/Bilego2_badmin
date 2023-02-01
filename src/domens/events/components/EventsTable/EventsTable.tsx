import { AgGridReact } from 'ag-grid-react';
import React, { memo, useRef } from 'react';

import DataTable from '../../../../components/DataTable/DataTable';
import { useEventsTableData } from '../../hooks/useEventsTableData';

export const EventsTable = memo(function EventsTable() {
  const gridRef = useRef<AgGridReact | null>(null);

  const { rowData, columnDefs } = useEventsTableData();

  return (
    <DataTable
      ref={gridRef}
      rowData={rowData}
      columnDefs={columnDefs}
      // rowBuffer={0}
      // rowModelType={'infinite'}
      // cacheBlockSize={100}
      // cacheOverflowSize={2}
      // maxConcurrentDatasourceRequests={1}
      // infiniteInitialRowCount={1000}
      // maxBlocksInCache={10}
      // pagination={true}
      // paginationPageSize={20}
      // cacheBlockSize={20}
    />
  );
});
