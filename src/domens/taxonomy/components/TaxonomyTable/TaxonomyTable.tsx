import { Grid } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import React, { memo, useRef } from 'react';

import { TermType, TermTypeLink } from '../../../../typings/enum';
import { ITaxonomy } from '../../types/types';
import { TableBody } from './components/TableBody';
import { TableHeader } from './components/TableHeader';

type Props = {
  type: TermType;
  columns: (keyof ITaxonomy)[];
};

export const TaxonomyTable = memo(function TaxonomyTable({ type, columns }: Props) {
  const gridRef = useRef<AgGridReact>();

  return (
    <Grid container spacing={3} sx={{ mb: 3 }} flexDirection='column' flexWrap='nowrap'>
      <Grid item>
        <TableHeader ref={gridRef} type={type} link={TermTypeLink.event} fields={columns} />
      </Grid>
      <Grid item xs={12} flex={1}>
        <TableBody ref={gridRef} type={type} link={TermTypeLink.event} columns={columns} />
      </Grid>
    </Grid>
  );
});
