import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import EventTaxonomyElement from './EventTaxonomyElement';
import { Event, Taxonomy } from '../../../../typings/types';
import { TermType } from '../../../../typings/enum';
import { getTaxonomyAsyncReq } from '../../../../domen/taxonomy/taxonomyThunk';
import { isEqual } from '../../../../utils/functions/isEqual';

const EventTaxonomy = ({ uid, selected }: { uid: Event['uid']; selected: Event['taxonomy'] }) => {
  const [taxonomies, setTaxonomies] = useState<Event['taxonomy']>([]);

  console.log('render EventTaxonomy');

  const getTax = useCallback(
    (type: TermType, taxes: Event['taxonomy'] | Taxonomy[]): Event['taxonomy'] =>
      taxes ? taxes.filter((tax) => tax.type === type) : [],
    [],
  );
  const eventCategorySelected = useMemo(() => getTax(TermType.eventCategory, selected), [getTax, selected]);
  const eventCategoryTaxonomies = useMemo(() => getTax(TermType.eventCategory, taxonomies), [getTax, taxonomies]);

  const eventGenreSelected = useMemo(() => getTax(TermType.eventGenre, selected), [getTax, selected]);
  const eventGenreTaxonomies = useMemo(() => getTax(TermType.eventGenre, taxonomies), [getTax, taxonomies]);

  const eventSelectionSelected = useMemo(() => getTax(TermType.eventSelection, selected), [getTax, selected]);
  const eventSelectionTaxonomies = useMemo(() => getTax(TermType.eventSelection, taxonomies), [getTax, taxonomies]);

  const eventFeelingSelected = useMemo(() => getTax(TermType.eventFeeling, selected), [getTax, selected]);
  const eventFeelingTaxonomies = useMemo(() => getTax(TermType.eventFeeling, taxonomies), [getTax, taxonomies]);

  useEffect(() => {
    getTaxonomyAsyncReq().then((res) => {
      const localRes = res.map((tax) => ({ id: tax.id, name: tax.name, type: tax.type }));
      setTaxonomies(localRes);
    });
  }, []);

  return (
    <Card>
      <CardHeader title='Классификация' />
      <Divider />
      <CardContent>
        <Box>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={3}>
              <EventTaxonomyElement
                eventUid={uid}
                selected={eventCategorySelected}
                taxonomies={eventCategoryTaxonomies}
                type={TermType.eventCategory}
              />
            </Grid>
            <Grid item xs={3}>
              <EventTaxonomyElement
                eventUid={uid}
                selected={eventGenreSelected}
                taxonomies={eventGenreTaxonomies}
                type={TermType.eventGenre}
              />
            </Grid>
            <Grid item xs={3}>
              <EventTaxonomyElement
                eventUid={uid}
                selected={eventSelectionSelected}
                taxonomies={eventSelectionTaxonomies}
                type={TermType.eventSelection}
              />
            </Grid>
            <Grid item xs={3}>
              <EventTaxonomyElement
                eventUid={uid}
                selected={eventFeelingSelected}
                taxonomies={eventFeelingTaxonomies}
                type={TermType.eventFeeling}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default memo(EventTaxonomy, isEqual);
