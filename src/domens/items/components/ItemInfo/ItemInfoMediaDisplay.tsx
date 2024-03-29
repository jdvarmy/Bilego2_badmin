import React, { memo } from 'react';
import {
  StyledBox,
  StyledCard,
  StyledCardMedia,
  StyledTypography,
} from 'src/domens/post/components/PostInfo/styledComponent';

import { isEqual } from '../../../../utils/helpers/isEqual';
import { getImageSrc } from '../../../medialibrary/helpers/getImageSrc';
import { ImageSizes } from '../../../medialibrary/types';
import { useStateSelector } from '../../../../store/store';
import { selectItemStateImageData } from '../../store/itemsSelector';

export const ItemInfoMediaDisplay = memo(function ItemInfoMediaDisplay() {
  const { image, title } = useStateSelector(selectItemStateImageData, isEqual);

  return (
    <StyledCard>
      {image && <StyledCardMedia image={getImageSrc(image.path, ImageSizes.m)} title={image.name} />}
      <StyledBox>
        <StyledTypography>{title}</StyledTypography>
      </StyledBox>
    </StyledCard>
  );
});
