import React, { ForwardedRef, forwardRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import './ag-theme-admin-bilego.css';
import { GridOptions } from 'ag-grid-community/dist/lib/entities/gridOptions';
import { ColDef } from 'ag-grid-community';

type Props = GridOptions;

const containerStyle = { width: '100%', height: '100%' };
const defaultColDef: ColDef = {
  filter: 'agTextColumnFilter',
  sortable: false,
  resizable: true,
  editable: true,
};

const DataTable = forwardRef(({ rowData, columnDefs, ...props }: Props, ref: ForwardedRef<AgGridReact>) => {
  return (
    <div className='ag-theme-alpine-dark ag-theme-admin-bilego' style={containerStyle}>
      <AgGridReact
        ref={ref}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows
        {...props}
      />
    </div>
  );
});

DataTable.displayName = 'DataTable';

export default DataTable;
