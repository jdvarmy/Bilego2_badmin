import { Link as MULink, Typography } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

export const RenderTitle = (scope: string) =>
  // eslint-disable-next-line react/prop-types
  memo(function RenderTitle({ data }: ICellRendererParams) {
    let returnComponent;

    // eslint-disable-next-line react/prop-types
    if (data?.title && data?.uid && data?.slug) {
      returnComponent = (
        <MULink variant='h6' underline='hover' component={Link} to={`/${scope}/edit?uid=${data.uid}&slug=${data.slug}`}>
          {data.title}
        </MULink>
      );
    } else if (data?.uid && data?.slug) {
      returnComponent = (
        <MULink variant='h6' underline='hover' component={Link} to={`/${scope}/edit?uid=${data.uid}&slug=${data.slug}`}>
          Нет заголовка
        </MULink>
      );
    } else if (data?.title) {
      returnComponent = <Typography variant='h6'>{data.title}</Typography>;
    } else {
      returnComponent = null;
    }

    return returnComponent;
  });
