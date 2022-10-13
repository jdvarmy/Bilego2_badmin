import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import DataTable from '../../../components/DataTable/DataTable';
import { useSelector } from 'react-redux';
import { selectTaxonomyStore } from '../../../store/selectors';

const columnDefs = [
  { field: 'Название' },
  { field: 'Описание' },
  { field: 'Ярлык' },
  { field: 'Иконка' },
  { field: 'Картинка' },
  { field: 'Записи' },
  { field: 'Действия' },
];

const defaultColDef = {
  editable: true,
  filter: 'agTextColumnFilter',
};

const TaxonomyTable = () => {
  const { taxonomy } = useSelector(selectTaxonomyStore);
  const gridRef = useRef<AgGridReact | null>(null);
  const [rowData, setRowData] = useState([]);

  console.log(taxonomy);

  return (
    <DataTable
      ref={gridRef}
      rowData={rowData}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      animateRows={true}
      rowSelection='multiple'
    />
  );
};

export default TaxonomyTable;
