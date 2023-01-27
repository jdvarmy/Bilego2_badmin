import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { memo } from 'react';

import { PostStatus } from '../../../../typings/enum';
import { IEvent } from '../../../../typings/types';
import { getPostStatusColor } from '../../../../utils/helpers/getPostStatusColor';
import { useChangeFnFieldEventField } from '../../hooks/useChangeFnFieldEventField';

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
  status: IEvent['status'];
};

export const Status = memo(function EventStatus({ status }: Props) {
  console.log('render EventStatus');

  const color = getPostStatusColor(status);

  const handleChange = useChangeFnFieldEventField('status');

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
