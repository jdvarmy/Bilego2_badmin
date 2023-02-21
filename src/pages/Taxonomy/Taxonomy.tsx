import { Grid } from '@mui/material';
import React, { memo, useEffect, useMemo } from 'react';

import ContentContainer from '../../components/ContentContainer/ContentContainer';
import { PageHelmet } from '../../components/PageHelmet/PageHelmet';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useAppDispatch } from '../../domens/store';
import TableBody from '../../domens/taxonomy/components/TableBody';
import TableHeader from '../../domens/taxonomy/components/TableHeader';
import { getTaxonomyAsync } from '../../domens/taxonomy/store/taxonomyThunk';
import { TermType, TermTypeLink } from '../../typings/enum';
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
  const dispatch = useAppDispatch();
  const name = useMemo(() => nameMapTaxonomy[type], [type]);

  useEffect(() => {
    dispatch(getTaxonomyAsync({ type }));
  }, [dispatch, type]);

  return (
    <>
      <PageHelmet title={name} />
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
