import React, { memo } from 'react';
import {
  StyledBox,
  StyledCard,
  StyledCardMedia,
  StyledTypography,
} from 'src/domens/post/components/PostInfo/styledComponent';

import { HTTP_URL } from '../../../../typings/env';
import { isEqual } from '../../../../utils/helpers/isEqual';
import { useStateSelector } from '../../../store';
import { selectItemStateImageData } from '../../store/itemsSelector';

export const ItemInfoMediaDisplay = memo(function ItemInfoMediaDisplay() {
  const { image, title } = useStateSelector(selectItemStateImageData, isEqual);

  console.log('render ItemInfoMediaDisplay');

  return (
    <StyledCard>
      {image && <StyledCardMedia image={`${HTTP_URL}${image.path}`} title={image.name} />}
      <StyledBox>
        <StyledTypography>{title}</StyledTypography>
      </StyledBox>
    </StyledCard>
  );
});
