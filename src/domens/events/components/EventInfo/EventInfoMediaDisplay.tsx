import { Box, Card, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { memo } from 'react';
import {
  StyledBox,
  StyledCard,
  StyledCardMedia,
  StyledTypography,
  StyledTypographyDate,
} from 'src/domens/post/components/PostInfo/styledComponent';

import { HTTP_URL } from '../../../../typings/env';
import dateTimeFormatDefault from '../../../../utils/helpers/dateTimeFormatDefault';
import { isEqual } from '../../../../utils/helpers/isEqual';
import { useStateSelector } from '../../../store';
import { selectEventStateImageData } from '../../store/eventsSelectors';

const formatter = new Intl.DateTimeFormat('ru', {
  ...dateTimeFormatDefault,
  month: 'short',
  hour: undefined,
  minute: undefined,
  timeZone: undefined,
  timeZoneName: undefined,
});

export const EventInfoMediaDisplay = memo(function EventInfoMediaDisplay() {
  const { image, title, date } = useStateSelector(selectEventStateImageData, isEqual);

  console.log('render EventInfoMediaDisplay');

  return (
    <StyledCard>
      {image && <StyledCardMedia image={`${HTTP_URL}${image.path}`} title={image.name} />}
      <StyledBox>
        {date && <StyledTypographyDate>{formatter.format(new Date(date))}</StyledTypographyDate>}
        <StyledTypography>{title}</StyledTypography>
      </StyledBox>
    </StyledCard>
  );
});
