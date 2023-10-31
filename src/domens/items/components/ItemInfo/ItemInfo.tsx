import { Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import React, { memo } from 'react';

import { PostType } from '../../../../typings/enum';
import { CardHeaderAvatar } from '../../../post/components/PostInfo/CardHeaderAvatar';
import { IItem } from '../../types';
import { ItemTaxonomy } from '../ItemTaxonomy/ItemTaxonomy';
import { ItemInfoCity } from './ItemInfoCity';
import { ItemInfoMediaDisplay } from './ItemInfoMediaDisplay';
import { ItemInfoMediaField } from './ItemInfoMediaField';
import { ItemInfoTitle } from './ItemInfoTitle';

type Props = {
  uid: IItem['uid'];
  title: IItem['title'];
  image: IItem['image'];
  city: IItem['city'];
  taxonomy: IItem['taxonomy'];
};

export const ItemInfo = memo(function ItemInfo({ uid, title, image, city, taxonomy }: Props) {
  return (
    <Card>
      <CardHeader title='Информация' avatar={<CardHeaderAvatar type={PostType.item} />} />
      <Divider />
      <CardContent>
        <ItemInfoTitle title={title} />
        <Grid spacing={3} container alignItems='center'>
          <Grid item xs={7}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ItemInfoMediaField image={image} />
              </Grid>
              <Grid item xs={12}>
                <ItemInfoCity city={city} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <ItemInfoMediaDisplay />
          </Grid>
          <Grid item xs={12}>
            <ItemTaxonomy {...{ uid, stateTaxonomy: taxonomy }} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
});
