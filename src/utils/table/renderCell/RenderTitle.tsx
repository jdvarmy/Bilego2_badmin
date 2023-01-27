import { Link as MULink, Typography } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';
import { Link } from 'react-router-dom';

export const RenderTitle = ({ data: { title, uid, slug } }: ICellRendererParams) => {
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
};
