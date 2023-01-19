import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { memo } from 'react';

import { useChangeFnFieldEventField } from '../../../domen/events/hooks/useChangeFnFieldEventField';
import { PostStatus } from '../../../typings/enum';
import { IEvent } from '../../../typings/types';

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

export const EventStatus = memo(function EventStatus({ status }: Props) {
  console.log('render EventStatus');

  let color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  switch (status) {
    case PostStatus.trash:
    case PostStatus.temp:
      color = 'error';
      break;
    case PostStatus.publish:
      color = 'success';
      break;
    case PostStatus.draft:
    case PostStatus.future:
    case PostStatus.private:
    case PostStatus.pending:
      color = 'warning';
      break;
    default:
      color = 'primary';
  }

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
