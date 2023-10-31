import { Box, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import React, { memo, useCallback, useMemo, useState } from 'react';

import { TermType, TermTypeLink } from '../../../../typings/enum';
import { isEqual } from '../../../../utils/helpers/isEqual';
import { useTaxonomyRequest } from '../../../../utils/hooks/useTaxonomyRequest';
import { ITaxonomy } from '../../../taxonomy/types';
import { IEvent } from '../../types';
import { EventTaxonomyElement } from './EventTaxonomyElement';

type Props<T> = { uid: IEvent['uid']; stateTaxonomy: T };

export const EventTaxonomy = memo(function EventTaxonomy<T extends IEvent['taxonomy']>({
  uid,
  stateTaxonomy,
}: Props<T>) {
  const [taxonomies, setTaxonomies] = useState<IEvent['taxonomy']>([]);

  const getTax = useCallback(
    (type: TermType, taxes: IEvent['taxonomy'] | ITaxonomy[]): IEvent['taxonomy'] =>
      taxes ? taxes.filter((tax) => tax?.type === type) : [],
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

  useTaxonomyRequest<IEvent['taxonomy']>({ filter: { link: TermTypeLink.event } }, setTaxonomies);

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
