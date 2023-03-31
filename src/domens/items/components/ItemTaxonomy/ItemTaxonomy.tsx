import { Box, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import React, { memo, useCallback, useMemo, useState } from 'react';

import { TermType, TermTypeLink } from '../../../../typings/enum';
import { isEqual } from '../../../../utils/helpers/isEqual';
import { useTaxonomyRequest } from '../../../../utils/hooks/useTaxonomyRequest';
import { ITaxonomy } from '../../../taxonomy/types/types';
import { IItem } from '../../type/types';
import { ItemTaxonomyElement } from './ItemTaxonomyElement';

type Props<T> = { uid: IItem['uid']; stateTaxonomy: T };

export const ItemTaxonomy = memo(function EventTaxonomy<T extends IItem['taxonomy']>({ uid, stateTaxonomy }: Props<T>) {
  const [taxonomies, setTaxonomies] = useState<IItem['taxonomy']>([]);

  console.log('render ItemTaxonomy');

  const getTax = useCallback(
    (type: TermType, taxes: IItem['taxonomy'] | ITaxonomy[]): IItem['taxonomy'] =>
      taxes ? taxes.filter((tax) => tax?.type === type) : [],
    [],
  );
  const eventCategorySelected = useMemo(() => getTax(TermType.itemType, stateTaxonomy), [getTax, stateTaxonomy]);
  const eventCategoryTaxonomies = useMemo(() => getTax(TermType.itemType, taxonomies), [getTax, taxonomies]);

  useTaxonomyRequest<IItem['taxonomy']>({ filter: { link: TermTypeLink.item } }, setTaxonomies);

  const taxonomyElement = [
    { selected: eventCategorySelected, taxonomies: eventCategoryTaxonomies, type: TermType.itemType },
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
                <ItemTaxonomyElement
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
}, isEqual);
