import { Grid } from '@mui/material';
import React from 'react';

import { PostStatus } from '../../../../typings/enum';
import { SaveButtons } from './SaveButtons';
import { SlugCreator } from './SlugCreator';
import { Status } from './Status';

type Props = {
  uid: string;
  slug: string;
  status: PostStatus;
};

export const Controls = (props: Props) => {
  return (
    <Grid container sx={{ my: 3 }} justifyContent='space-between' alignItems='center'>
      <Grid item xs>
        <SlugCreator {...{ uid: props.uid, slug: props.slug }} />
      </Grid>
      <Grid item xs container justifyContent='flex-end' alignItems='center'>
        <Status status={props.status} />
        <SaveButtons />
      </Grid>
    </Grid>
  );
};
