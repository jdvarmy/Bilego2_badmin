import { Box, Card, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import { selectEventStateImageData } from '../../../../domen/events/eventsSelectors';
import { HTTP_URL } from '../../../../typings/env';
import { isEqual } from '../../../../utils/functions/isEqual';

export const EventInfoMediaDisplay = () => {
  const { image, title } = useSelector(selectEventStateImageData, isEqual);

  console.log('render EventInfoMediaDisplay');

  return (
    <Card sx={{ width: '100%', height: 298, display: 'inline-block', position: 'relative' }}>
      {image && <CardMedia sx={{ height: 298 }} image={`${HTTP_URL}${image.path}`} title={image.name} />}
      <Box sx={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>
        <Typography variant='h3'>{title}</Typography>
      </Box>
    </Card>
  );
};
