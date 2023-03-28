import { ICellRendererParams } from 'ag-grid-community';
import { memo } from 'react';

// eslint-disable-next-line react/prop-types
export const RenderItem = memo(({ data }: ICellRendererParams | undefined) => {
  // eslint-disable-next-line react/prop-types
  return data?.item?.title;
});

RenderItem.displayName = 'RenderItem';
