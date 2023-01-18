import { MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import SelectWithSearch from '../../../../components/SelectWithSearch/SelectWithSearch';
import { AppDispatch } from '../../../../domen/store';
import { getManagerListForEventAsync } from '../../../../domen/users/usersThuk';
import { useChangeFnEventField } from '../../../../hooks/useChangeFnEventField';
import { Event } from '../../../../typings/types';

type Props = {
  manager?: Event['eventManager'];
  handleDelete: (field: keyof Event) => () => void;
};

export const EventInfoManager = ({ manager, handleDelete }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [managers, setManagers] = useState<Event['eventManager'][]>([]);

  const handleChangeManager = useChangeFnEventField('eventManager');
  const fetchFnManagers = (search: string) => {
    // todo: добавить прерывание запроса
    dispatch(getManagerListForEventAsync(search, setManagers));
  };

  return (
    <SelectWithSearch
      value={manager || ''}
      label='Менеджер события'
      fullWidth
      onChange={handleChangeManager}
      fetchFn={fetchFnManagers}
      onDelete={handleDelete('eventManager')}
    >
      {Array.isArray(managers) &&
        managers
          .filter((i) => i?.uid)
          .map((i: Event['eventManager']) => (
            <MenuItem key={i?.uid} value={i as any}>
              {i?.title}
            </MenuItem>
          ))}
    </SelectWithSearch>
  );
};
