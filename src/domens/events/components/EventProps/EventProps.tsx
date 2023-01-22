import { Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import React, { memo } from 'react';

import { IEvent } from '../../../../typings/types';
import { useChangeFnFieldEventField } from '../../hooks/useChangeFnFieldEventField';

type Props = { fragment: IEvent['fragment']; words: IEvent['searchWords'] };

export const EventProps = memo(function EventProps({ fragment, words }: Props) {
  const handleChangeFragment = useChangeFnFieldEventField('fragment');
  const handleChangeSearchWords = useChangeFnFieldEventField('searchWords');

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
