import { Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import React, { memo } from 'react';

import { PostType } from '../../../../typings/enum';
import { useChangeFnFieldPostField } from '../../../post/hooks/useChangeFnFieldPostField';
import { IEvent } from '../../types/types';

type Props = { fragment: IEvent['fragment']; words: IEvent['searchWords'] };

export const EventProps = memo(function EventProps({ fragment, words }: Props) {
  const handleChangeFragment = useChangeFnFieldPostField({ field: 'fragment', type: PostType.event });
  const handleChangeSearchWords = useChangeFnFieldPostField({ field: 'searchWords', type: PostType.event });

  return (
    <Card>
      <CardHeader title='Данные события' />
      <Divider />
      <CardContent>
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={12}>
            <TextField
              label='Отрывок'
              size='small'
              rows={2}
              multiline
              fullWidth
              focused={!!fragment}
              value={fragment || ''}
              onChange={handleChangeFragment}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Поисковые запросы события'
              rows={1}
              multiline
              fullWidth
              focused={!!words}
              value={words || ''}
              onChange={handleChangeSearchWords}
              helperText='Поисковые запросы разделяются символом "запятая" (,)'
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
});
