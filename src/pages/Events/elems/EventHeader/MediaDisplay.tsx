import { Box, Card, CardMedia, Typography } from '@mui/material';
import React from 'react';

import { HTTP_URL } from '../../../../typings/env';
import { Event } from '../../../../typings/types';

type Props = {
  image?: Event['headerImage'];
  text?: string;
  color?: string;
};

export const MediaDisplay = ({ image, text, color }: Props) => {
  const { title, subtitle, meta } = JSON.parse(text);
  const { title: titleColor, subtitle: subtitleColor, meta: metaColor } = JSON.parse(color);

  return (
    <Card sx={{ width: '100%', height: 298, display: 'inline-block', position: 'relative' }}>
      {image && <CardMedia sx={{ height: 298 }} image={`${HTTP_URL}${image.path}`} title={image.name} />}
      <Box sx={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>
        <Typography variant='h3' sx={{ textTransform: 'none', color: titleColor }}>
          {title}
        </Typography>
        <Typography variant='subtitle2' sx={{ textTransform: 'none', color: subtitleColor }}>
          {subtitle}
        </Typography>
        <Typography variant='body2' sx={{ textTransform: 'none', color: metaColor }}>
          {meta}
        </Typography>
      </Box>
    </Card>
  );
};
