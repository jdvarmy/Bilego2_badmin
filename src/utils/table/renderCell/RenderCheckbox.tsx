import { Checkbox } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';
import React, { memo } from 'react';

export const RenderCheckbox = memo((props: ICellRendererParams) => {
  return <Checkbox size='small' checked={props.data.isShowOnSlider} color='default' />;
});

RenderCheckbox.displayName = 'RenderCheckbox';
