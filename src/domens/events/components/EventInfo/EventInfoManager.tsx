import { MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';

import SelectWithSearch from '../../../../components/SelectWithSearch/SelectWithSearch';
import { PostType } from '../../../../typings/enum';
import { useChangeFnFieldPostField } from '../../../post/hooks/useChangeFnFieldPostField';
import { useDeleteFnPostField } from '../../../post/hooks/useDeleteFnPostField';
import { useAppDispatch } from '../../../store';
import { getManagerListForEventAsync } from '../../../users/store/usersThuk';
import { IEvent } from '../../types/types';

type Props = {
  manager?: IEvent['eventManager'];
};

export const EventInfoManager = ({ manager }: Props) => {
  const dispatch = useAppDispatch();
  const [managers, setManagers] = useState<IEvent['eventManager'][]>([]);

  const handleChange = useChangeFnFieldPostField({ field: 'eventManager', type: PostType.event });
  const handleDelete = useDeleteFnPostField({ field: 'eventManager', type: PostType.event });

  const fetchFnManagers = (search: string) => {
    // todo: добавить прерывание запроса
    dispatch(getManagerListForEventAsync({ search }))
      .unwrap()
      .then((users) => {
        setManagers(users);
      });
  };

  return (
    <SelectWithSearch
      value={manager || ''}
      label='Организатор'
      fullWidth
      onChange={handleChange}
      onDelete={handleDelete}
      fetchFn={fetchFnManagers}
    >
      {Array.isArray(managers) &&
        managers
          .filter((i) => i?.uid)
          .map((i: IEvent['eventManager']) => (
            <MenuItem key={i?.uid} value={i as any}>
              <Typography variant='subtitle1' color='text.primary'>
                {i?.surname} {i?.name}
              </Typography>
            </MenuItem>
          ))}
    </SelectWithSearch>
  );
};
