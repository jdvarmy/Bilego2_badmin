import { Box, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { TermType, TermTypeLink } from '../../../../typings/enum';
import { isEqual } from '../../../../utils/helpers/isEqual';
import { addAlertErrorAsync } from '../../../alert/store/alertThunk';
import { ServerErrorStatus } from '../../../alert/types/types';
import { useAppDispatch } from '../../../store';
import { fetchTaxonomyRequest } from '../../../taxonomy/api/taxonomyRequest';
import { ITaxonomy } from '../../../taxonomy/types/types';
import { IItem } from '../../type/types';
import { ItemTaxonomyElement } from './ItemTaxonomyElement';

type Props<T> = { uid: IItem['uid']; stateTaxonomy: T };

export const ItemTaxonomy = memo(function EventTaxonomy<T extends IItem['taxonomy']>({ uid, stateTaxonomy }: Props<T>) {
  const dispatch = useAppDispatch();
  const [taxonomies, setTaxonomies] = useState<IItem['taxonomy']>([]);

  console.log('render ItemTaxonomy');

  const getTax = useCallback(
    (type: TermType, taxes: IItem['taxonomy'] | ITaxonomy[]): IItem['taxonomy'] =>
      taxes ? taxes.filter((tax) => tax?.type === type) : [],
    [],
  );
  const eventCategorySelected = useMemo(() => getTax(TermType.itemType, stateTaxonomy), [getTax, stateTaxonomy]);
  const eventCategoryTaxonomies = useMemo(() => getTax(TermType.itemType, taxonomies), [getTax, taxonomies]);

  useEffect(() => {
    fetchTaxonomyRequest({ filter: { link: TermTypeLink.event } })
      .then(({ data }) => {
        const localRes = data?.items.map((tax) => ({ uid: tax.uid, name: tax.name, type: tax.type })) ?? [];
        setTaxonomies(localRes);
      })
      .catch((reject) => {
        dispatch(addAlertErrorAsync(reject as ServerErrorStatus));
      });
  }, [dispatch]);

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
