import React, { useEffect, useMemo } from 'react';
import { TermLink, TermType } from '../../typings/enum';
import { Helmet } from 'react-helmet-async';
import { Container, Grid } from '@mui/material';
import TaxonomyEditor from './elems/TaxonomyEditor';
import TaxonomyTable from './elems/TaxonomyTable';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getTaxonomyAsync, setSelectedTaxonomy, setTaxonomy } from '../../store/taxonomySlice/taxonomySlice';

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
  const name = useMemo(() => nameMap[type], []);

  useEffect(() => {
    dispatch(getTaxonomyAsync(type));

    return () => {
      dispatch(setSelectedTaxonomy(null));
      dispatch(setTaxonomy(null));
    };
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
            <TaxonomyEditor type={type} link={TermLink.event} />
          </Grid>
          <Grid item xs={12}>
            <TaxonomyTable />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Taxonomy;
