import { TextField } from '@mui/material';
import React, { memo } from 'react';

import { PostType } from '../../../../typings/enum';
import { useChangeFnFieldPostField } from '../../../post/hooks/useChangeFnFieldPostField';
import { IItem } from '../../type/types';

type Props = {
  title: IItem['title'];
};

export const ItemInfoTitle = memo(function ItemInfoTitle({ title }: Props) {
  const handleChangeTitle = useChangeFnFieldPostField({ field: 'title', type: PostType.item });

  return (
    <TextField
      label='Заголовок'
      type='text'
      fullWidth
      sx={{ mb: 2 }}
      value={title || ''}
      focused={!!title}
      onChange={handleChangeTitle}
    />
  );
});
