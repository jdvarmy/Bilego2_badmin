import { Box } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import React, { useRef } from 'react';

import DataTable from '../../../../components/DataTable/DataTable';
import { useTicketsTableData } from '../../hooks/useTicketsTableData';

const TicketSimple = () => {
  const gridRef = useRef<AgGridReact | null>(null);

  const { rowData, columnDefs } = useTicketsTableData();

  return (
    <Box sx={{ height: '438px' }}>
      <DataTable ref={gridRef} rowData={rowData} columnDefs={columnDefs} />
    </Box>
  );
};

export default TicketSimple;
