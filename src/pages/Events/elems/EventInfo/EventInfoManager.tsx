import { MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import SelectWithSearch from '../../../../components/SelectWithSearch/SelectWithSearch';
import { useChangeFnFieldEventField } from '../../../../domen/events/hooks/useChangeFnFieldEventField';
import { useDeleteFnEventField } from '../../../../domen/events/hooks/useDeleteFnEventField';
import { AppDispatch } from '../../../../domen/store';
import { getManagerListForEventAsync } from '../../../../domen/users/usersThuk';
import { IEvent } from '../../../../typings/types';

type Props = {
  manager?: IEvent['eventManager'];
};

export const EventInfoManager = ({ manager }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [managers, setManagers] = useState<IEvent['eventManager'][]>([]);

  const handleChange = useChangeFnFieldEventField('eventManager');
  const handleDelete = useDeleteFnEventField('eventManager');

  const fetchFnManagers = (search: string) => {
    // todo: добавить прерывание запроса
    dispatch(getManagerListForEventAsync(search, setManagers));
  };

  return (
    <SelectWithSearch
      value={manager || ''}
      label='Менеджер события'
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
