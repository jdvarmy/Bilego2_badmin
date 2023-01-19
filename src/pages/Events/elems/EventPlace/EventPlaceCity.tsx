import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { IconButton, MenuItem, TextField } from '@mui/material';
import React, { memo } from 'react';

import {
  ChangeEventFieldType,
  useChangeFnFieldEventField,
} from '../../../../domen/events/hooks/useChangeFnFieldEventField';
import { useDeleteFnEventField } from '../../../../domen/events/hooks/useDeleteFnEventField';
import { City } from '../../../../typings/enum';
import { IEvent } from '../../../../typings/types';

type Props = {
  city?: City;
  item?: IEvent['item'];
};

const cityMapNames: Record<City, string> = {
  [City.moscow]: 'Москва',
  [City.petersburg]: 'Санкт-Петербург',
};

export const EventPlaceCity = memo(function EventPlaceCity({ city, item }: Props) {
  const handleChangeCity = useChangeFnFieldEventField('city');

  const handleDeleteCity = useDeleteFnEventField('city');
  const handleDeleteItem = useDeleteFnEventField('item');

  const handleChangeCityLocal = (event: ChangeEventFieldType) => {
    if (item && item.city !== event.target.value) {
      handleDeleteItem();
    }
    handleChangeCity(event);
  };

  return (
    <>
      <TextField
        select
        value={city || ''}
        label='Выберите город'
        fullWidth
        focused={!!city}
        onChange={handleChangeCityLocal}
      >
        {Object.entries(cityMapNames).map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </TextField>
      {city && (
        <IconButton color='error' onClick={handleDeleteCity}>
          <DeleteForeverTwoToneIcon />
        </IconButton>
      )}
    </>
  );
});
