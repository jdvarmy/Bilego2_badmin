import { ColDef } from 'ag-grid-community';
import { GridOptions } from 'ag-grid-community/dist/lib/entities/gridOptions';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import React, { ForwardedRef, forwardRef } from 'react';

import './ag-theme-admin-bilego.css';

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
    <div className='ag-theme-alpine-dark ag-theme-alpine ag-theme-admin-bilego' style={containerStyle}>
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
