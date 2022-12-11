import React, { useEffect, useMemo, useState } from 'react';
import { TermLink, TermType } from '../../typings/enum';
import { Helmet } from 'react-helmet-async';
import { Container, Grid } from '@mui/material';
import TableHeader from './elems/TableHeader';
import TableBody from './elems/TableBody';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getTaxonomyAsync, setSelectedTaxonomy, setTaxonomy } from '../../store/taxonomySlice/taxonomySlice';
import { AgGridReact } from 'ag-grid-react';

type Props = {
  type: TermType;
};

const nameMap = {
  [TermType.eventCategory]: 'Категории',
  [TermType.eventGenre]: 'Жанры',
  [TermType.eventFeeling]: 'Настроения',
  [TermType.eventSelection]: 'Подборки',
  [TermType.itemType]: 'Тип',
};

const Taxonomy = ({ type }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const name = useMemo(() => nameMap[type], [type]);

  useEffect(() => {
    dispatch(getTaxonomyAsync(type));

    return () => {
      dispatch(setSelectedTaxonomy(null));
      dispatch(setTaxonomy(null));
    };
  }, [dispatch, type]);

  const [rowData, setRowData] = useState([
    { athlete: '43', country: '43', year: '43', date: '43', sport: '43', gold: '43', silver: '43', bronze: '43' },
    { athlete: '57', country: '57', year: '57', date: '57', sport: '57', gold: '57', silver: '57', bronze: '57' },
  ]);
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', rowDrag: true },
    { field: 'country' },
    { field: 'year', width: 100 },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ]);
  const defaultColDef = useMemo(() => {
    return { width: 170, sortable: true, filter: true };
  }, []);

  return (
    <>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <PageTitle title={name} />
      <Container maxWidth='lg'>
        <Grid container spacing={3} sx={{ my: 3 }} justifyContent='space-between' alignItems='top'>
          <Grid item xs={12}>
            <TableHeader type={type} link={TermLink.event} />
          </Grid>
          <Grid item xs={12}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowDragManaged={true}
              animateRows={true}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Taxonomy;
