import React, { memo, useEffect, useMemo } from 'react';
import { TermTypeLink, TermType } from '../../typings/enum';
import { Helmet } from 'react-helmet-async';
import { Grid } from '@mui/material';
import TableHeader from './elems/TableHeader';
import TableBody from './elems/TableBody';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../domen/store';
import ContentContainer from '../../components/ContentContainer/ContentContainer';
import { getTaxonomyAsync } from '../../domen/taxonomy/taxonomyThunk';
import { Taxonomy as ITaxonomy } from '../../typings/types';

type Props = {
  type: TermType;
  columns: (keyof ITaxonomy)[];
};

export const nameMapTaxonomy = {
  [TermType.eventCategory]: 'Категории',
  [TermType.eventGenre]: 'Жанры',
  [TermType.eventFeeling]: 'Настроения',
  [TermType.eventSelection]: 'Подборки',
  [TermType.itemType]: 'Тип',
};

const Taxonomy = ({ type, columns }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const name = useMemo(() => nameMapTaxonomy[type], [type]);

  useEffect(() => {
    dispatch(getTaxonomyAsync(type));
  }, [dispatch, type]);

  return (
    <>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <PageTitle title={name} />
      <ContentContainer>
        <Grid container spacing={3} sx={{ mb: 3 }} flexDirection='column' flexWrap='nowrap'>
          <Grid item>
            <TableHeader type={type} link={TermTypeLink.event} fields={columns} />
          </Grid>
          <Grid item xs={12} flex={1}>
            <TableBody columns={columns} />
          </Grid>
        </Grid>
      </ContentContainer>
    </>
  );
};

export default memo(Taxonomy);
