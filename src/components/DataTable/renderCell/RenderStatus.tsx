import { ICellRendererParams } from 'ag-grid-community';
import React, { memo } from 'react';

import { StatusLabel } from '../../../ui/StatusLabel';
import { PostStatus } from '../../../typings/enum';
import { getPostStatusColor } from '../../../utils/helpers/getPostStatusColor';
import { postStatusMap } from '../../../utils/helpers/mappers/postStatusMap';

export const RenderStatus = memo((props: ICellRendererParams) => {
  const color = getPostStatusColor(props?.data?.status);

  return <StatusLabel color={color}>{postStatusMap[props?.data?.status as PostStatus]}</StatusLabel>;
});

RenderStatus.displayName = 'RenderStatus';
