import { Box, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TermType } from '../../../../typings/enum';
import { IEvent, Taxonomy } from '../../../../typings/types';
import { isEqual } from '../../../../utils/helpers/isEqual';
import { addErrorAlertWorker } from '../../../alert/store/workers';
import { ServerErrorStatus } from '../../../alert/types/types';
import { AppDispatch } from '../../../store';
import { getTaxonomyAsyncReq } from '../../../taxonomy/store/taxonomyThunk';
import { EventTaxonomyElement } from './EventTaxonomyElement';

type Props<T> = { uid: IEvent['uid']; stateTaxonomy: T };

export const EventTaxonomy = memo(function EventTaxonomy<T extends IEvent['taxonomy']>({
  uid,
  stateTaxonomy,
}: Props<T>) {
  const dispatch: AppDispatch = useDispatch();
  const [taxonomies, setTaxonomies] = useState<IEvent['taxonomy']>([]);

  console.log('render EventTaxonomy');

  const getTax = useCallback(
    (type: TermType, taxes: IEvent['taxonomy'] | Taxonomy[]): IEvent['taxonomy'] =>
      taxes ? taxes.filter((tax) => tax.type === type) : [],
    [],
  );
  const eventCategorySelected = useMemo(() => getTax(TermType.eventCategory, stateTaxonomy), [getTax, stateTaxonomy]);
  const eventCategoryTaxonomies = useMemo(() => getTax(TermType.eventCategory, taxonomies), [getTax, taxonomies]);

  const eventGenreSelected = useMemo(() => getTax(TermType.eventGenre, stateTaxonomy), [getTax, stateTaxonomy]);
  const eventGenreTaxonomies = useMemo(() => getTax(TermType.eventGenre, taxonomies), [getTax, taxonomies]);

  const eventSelectionSelected = useMemo(() => getTax(TermType.eventSelection, stateTaxonomy), [getTax, stateTaxonomy]);
  const eventSelectionTaxonomies = useMemo(() => getTax(TermType.eventSelection, taxonomies), [getTax, taxonomies]);

  const eventFeelingSelected = useMemo(() => getTax(TermType.eventFeeling, stateTaxonomy), [getTax, stateTaxonomy]);
  const eventFeelingTaxonomies = useMemo(() => getTax(TermType.eventFeeling, taxonomies), [getTax, taxonomies]);

  useEffect(() => {
    getTaxonomyAsyncReq()
      .then((res) => {
        const localRes = res.map((tax) => ({ id: tax.id, name: tax.name, type: tax.type }));
        setTaxonomies(localRes);
      })
      .catch((reject) => {
        dispatch(addErrorAlertWorker(reject as ServerErrorStatus));
      });
  }, [dispatch]);

  const taxonomyElement = [
    { selected: eventCategorySelected, taxonomies: eventCategoryTaxonomies, type: TermType.eventCategory },
    { selected: eventGenreSelected, taxonomies: eventGenreTaxonomies, type: TermType.eventGenre },
    { selected: eventSelectionSelected, taxonomies: eventSelectionTaxonomies, type: TermType.eventSelection },
    { selected: eventFeelingSelected, taxonomies: eventFeelingTaxonomies, type: TermType.eventFeeling },
  ];

  return (
    <Card>
      <CardHeader title='Классификация' />
      <Divider />
      <CardContent>
        <Box>
          <Grid container spacing={3} alignItems='center'>
            {taxonomyElement.map((element) => (
              <Grid key={element.type} item xs={3}>
                <EventTaxonomyElement
                  eventUid={uid}
                  selected={element.selected}
                  taxonomies={element.taxonomies}
                  type={element.type}
                  stateTaxonomy={stateTaxonomy}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
},
isEqual);
