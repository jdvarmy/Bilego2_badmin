import React, { ForwardedRef, forwardRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { GridOptions } from 'ag-grid-community/dist/lib/entities/gridOptions'; // Optional theme CSS

type Props = GridOptions;

const DataTable = forwardRef(
  ({ rowData, columnDefs, defaultColDef, onCellClicked }: Props, ref: ForwardedRef<AgGridReact>) => {
    return (
      <div className='ag-theme-alpine-dark' style={{ height: '100%', width: '100%' }}>
        <AgGridReact
          ref={ref} // Ref for accessing Grid's API
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection='multiple' // Options - allows click selection of rows
          onCellClicked={onCellClicked} // Optional - registering for Grid Event
        />
      </div>
    );
  },
);

DataTable.displayName = 'DataTable';

export default DataTable;
