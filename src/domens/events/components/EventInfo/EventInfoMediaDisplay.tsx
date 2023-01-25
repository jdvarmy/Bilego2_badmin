import { Box, Card, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useSelector } from 'react-redux';

import { HTTP_URL } from '../../../../typings/env';
import dateTimeFormatDefault from '../../../../utils/helpers/dateTimeFormatDefault';
import { isEqual } from '../../../../utils/helpers/isEqual';
import { selectEventStateImageData } from '../../store/eventsSelectors';

const StyledCard = styled(Card)(
  () => `
    width: 470px;
    height: 396px;
    position: relative;
    box-shadow: none;
    border-radius: 28px;
`,
);

const StyledCardMedia = styled(CardMedia)(
  () => `
    height: 330px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(0deg, #111633 19%, rgba(0, 0, 3, 0.09) 32%);
    }
`,
);

const StyledBox = styled(Box)(
  () => `
    position: absolute;
    bottom: 1rem;
    left: 1rem;
`,
);

const StyledTypography = styled(Typography)(
  () => `
    font-weight: 400;
    font-size: 28px;
    line-height: 38px;
    color: #C7C7DE;
`,
);

const StyledTypographyDate = styled(Typography)(
  () => `
    position: relative;
    bottom: 1rem;
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 31px;
    color: #00E3B5;
    text-shadow: 0px 4px 14px rgba(0, 227, 181, 0.69);
    &:after {
      content: '';
      position: absolute;
      top: 0.3rem;
      left: -1rem;
      width: 9px;
      height: 22px;
      background: #00E3B5;
    }
`,
);

const formatter = new Intl.DateTimeFormat('ru', {
  ...dateTimeFormatDefault,
  month: 'short',
  hour: undefined,
  minute: undefined,
  timeZone: undefined,
  timeZoneName: undefined,
});

export const EventInfoMediaDisplay = () => {
  const { image, title, date } = useSelector(selectEventStateImageData, isEqual);

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
};
