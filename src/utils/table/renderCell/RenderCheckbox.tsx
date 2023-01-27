import { Checkbox } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

export const RenderCheckbox = (props: ICellRendererParams) => {
  return <Checkbox size='small' checked={props.data.isShowOnSlider} color='default' />;
};
