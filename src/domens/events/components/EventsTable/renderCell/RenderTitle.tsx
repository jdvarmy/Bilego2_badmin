import { Link as MULink, Typography } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const RenderTitle = memo(function RenderTitle({ data: { uid, title, slug } }: ICellRendererParams) {
  let returnComponent;

  if (title && uid && slug) {
    returnComponent = (
      <MULink variant='h6' underline='hover' component={Link} to={`/events/edit?uid=${uid}&slug=${slug}`}>
        {title}
      </MULink>
    );
  } else if (uid && slug) {
    returnComponent = (
      <MULink variant='h6' underline='hover' component={Link} to={`/events/edit?uid=${uid}&slug=${slug}`}>
        Нет заголовка
      </MULink>
    );
  } else if (title) {
    returnComponent = <Typography variant='h6'>{title}</Typography>;
  } else {
    returnComponent = null;
  }

  return returnComponent;
});
