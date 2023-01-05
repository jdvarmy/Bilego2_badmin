import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { IconButton, MenuItem, TextField } from '@mui/material';
import React from 'react';

import { ChangeEventType, useChangeFnEventField } from '../../../../hooks/useChangeFnEventField';
import { City } from '../../../../typings/enum';
import { Event } from '../../../../typings/types';

const cityMapNames: Record<City, string> = {
  [City.moscow]: 'Москва',
  [City.petersburg]: 'Санкт-Петербург',
};

type Props = {
  city?: City;
  item?: Event['item'];
  handleDelete: (field: keyof Event) => () => void;
};

const EventPlaceCity = ({ city, item, handleDelete }: Props) => {
  const handleChangeCity = useChangeFnEventField('city');

  const handleChangeCityLocal = (event: ChangeEventType) => {
    if (item && item.city !== event.target.value) {
      handleDelete('item')();
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
        <IconButton color='error' onClick={handleDelete('city')}>
          <DeleteForeverTwoToneIcon />
        </IconButton>
      )}
    </>
  );
};

export default EventPlaceCity;
