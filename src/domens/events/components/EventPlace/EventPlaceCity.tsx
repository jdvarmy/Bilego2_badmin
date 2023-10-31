import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { IconButton, MenuItem, TextField } from '@mui/material';
import React, { memo } from 'react';

import { City, PostType } from '../../../../typings/enum';
import { cityMap } from '../../../../utils/helpers/mappers/cityMap';
import { ChangePostFieldType, useChangeFnFieldPostField } from '../../../post/hooks/useChangeFnFieldPostField';
import { useDeleteFnPostField } from '../../../post/hooks/useDeleteFnPostField';
import { IEvent } from '../../types';

type Props = {
  city?: City;
  item?: IEvent['item'];
};

export const EventPlaceCity = memo(function EventPlaceCity({ city, item }: Props) {
  const handleChangeCity = useChangeFnFieldPostField({ field: 'city', type: PostType.event });

  const handleDeleteCity = useDeleteFnPostField({ field: 'city', type: PostType.event });
  const handleDeleteItem = useDeleteFnPostField({ field: 'item', type: PostType.event });

  const handleChangeCityLocal = (event: ChangePostFieldType) => {
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
        {Object.entries(cityMap).map(([key, value]) => (
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
