import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { Box, IconButton, MenuItem, TextField } from '@mui/material';
import React, { memo } from 'react';

import { City, PostType } from '../../../../typings/enum';
import { cityMap } from '../../../../utils/helpers/cityMap';
import { useChangeFnFieldPostField } from '../../../post/hooks/useChangeFnFieldPostField';
import { useDeleteFnPostField } from '../../../post/hooks/useDeleteFnPostField';

type Props = {
  city?: City;
};

export const ItemInfoCity = memo(function ItemInfoCity({ city }: Props) {
  const handleChangeCity = useChangeFnFieldPostField({ field: 'city', type: PostType.item });
  const handleDeleteCity = useDeleteFnPostField({ field: 'city', type: PostType.item });

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        select
        fullWidth
        size='small'
        focused={!!city}
        value={city || ''}
        label='Выберите город'
        onChange={handleChangeCity}
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
    </Box>
  );
});
