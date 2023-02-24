import { Container, Grid } from '@mui/material';
import React from 'react';

import { PostStatus, PostType } from '../../../../typings/enum';
import { DeleteButton } from './DeleteButton';
import { SaveButtons } from './SaveButtons';
import { SlugCreator } from './SlugCreator';
import { Status } from './Status';

type Props = {
  uid: string;
  slug: string;
  type: PostType;
  status: PostStatus;
};

export const Controls = ({ uid, slug, type, status }: Props) => {
  return (
    <Container maxWidth='lg'>
      <Grid container sx={{ my: 3 }} justifyContent='space-between' alignItems='center'>
        <Grid item xs={4}>
          <SlugCreator {...{ uid, slug, type }} />
        </Grid>
        <Grid item xs container justifyContent='flex-end' alignItems='center'>
          <DeleteButton {...{ uid, type }} />
          <Status {...{ status, type }} />
          <SaveButtons type={type} />
        </Grid>
      </Grid>
    </Container>
  );
};
