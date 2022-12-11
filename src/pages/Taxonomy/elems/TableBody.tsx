import React, { useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import DataTable from '../../../components/DataTable/DataTable';
import { useSelector } from 'react-redux';
import { selectTaxonomyStore } from '../../../store/selectors';
import { ColDef } from 'ag-grid-community';
import { Taxonomy } from '../../../typings/types';

const columnDefs: ColDef<Taxonomy>[] = [
  { field: 'name' },
  { field: 'description' },
  { field: 'slug' },
  { field: 'icon' },
  { field: 'image' },
  { field: 'count' },
  { field: 'action' },
];

const defaultColDef = {
  editable: true,
  filter: 'agTextColumnFilter',
};

const TableBody = () => {
  const { taxonomy } = useSelector(selectTaxonomyStore);
  const gridRef = useRef<AgGridReact | null>(null);
  const [rowData, setRowData] = useState<Taxonomy[]>([]);

  useEffect(() => {
    if (Array.isArray(taxonomy) && taxonomy.length > 0) {
      setRowData(taxonomy.map((item) => item));
    }
  }, [taxonomy]);

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

export default TableBody;
