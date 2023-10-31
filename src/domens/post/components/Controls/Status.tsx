import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { memo } from 'react';

import { PostStatus, PostType } from '../../../../typings/enum';
import { getPostStatusColor } from '../../../../utils/helpers/getPostStatusColor';
import { useChangeFnFieldPostField } from '../../hooks/useChangeFnFieldPostField';

const postStatusMap: Record<PostStatus, string> = {
  [PostStatus.temp]: 'временный шаблон',
  [PostStatus.publish]: 'опубликованный',
  [PostStatus.pending]: 'на модерации',
  [PostStatus.draft]: 'черновик',
  [PostStatus.future]: 'запланированный',
  [PostStatus.private]: 'личный (приватный)',
  [PostStatus.trash]: 'удаленный (в корзине)',
};

type Props = {
  status: PostStatus;
  type: PostType;
};

export const Status = memo(function EventStatus({ status, type }: Props) {
  const color = getPostStatusColor(status);

  const handleChange = useChangeFnFieldPostField({ field: 'status', type });

  return (
    <FormControl focused={!!status} color={color} sx={{ width: 256 }} size='small' variant='outlined'>
      <InputLabel>Статус</InputLabel>
      <Select value={status || ''} label='Статус' autoWidth onChange={handleChange}>
        {Object.entries(postStatusMap).map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
