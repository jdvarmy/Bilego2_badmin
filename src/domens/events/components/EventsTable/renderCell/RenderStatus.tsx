import { ICellRendererParams } from 'ag-grid-community';
import React, { memo } from 'react';

import { StatusLabel } from '../../../../../UI/StatusLabel';
import { PostStatus } from '../../../../../typings/enum';
import { getPostStatusColor } from '../../../../../utils/helpers/getPostStatusColor';

const postStatusMap: Record<PostStatus, string> = {
  [PostStatus.temp]: 'временный',
  [PostStatus.publish]: 'опубликовано',
  [PostStatus.pending]: 'на модерации',
  [PostStatus.draft]: 'черновик',
  [PostStatus.future]: 'запланировано',
  [PostStatus.private]: 'приватный',
  [PostStatus.trash]: 'в корзине',
};

export const RenderStatus = memo((props: ICellRendererParams) => {
  const color = getPostStatusColor(props.data.status);

  return <StatusLabel color={color}>{postStatusMap[props.data.status as PostStatus]}</StatusLabel>;
});

RenderStatus.displayName = 'RenderStatus';
