import { MenuItem } from '@mui/material';
import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';

import SelectWithSearch from '../../../../components/SelectWithSearch/SelectWithSearch';
import { getArtistListForEventAsync } from '../../../../domen/artistsSlice/artistsSlice';
import { useChangeFnFieldEventField } from '../../../../domen/events/hooks/useChangeFnFieldEventField';
import { useDeleteFnEventField } from '../../../../domen/events/hooks/useDeleteFnEventField';
import { AppDispatch } from '../../../../domen/store';
import { IEvent } from '../../../../typings/types';

type Props = {
  artist?: IEvent['artist'];
};

export const EventPlaceArtist = memo(function EventPlaceArtist({ artist }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const [artists, setArtists] = useState<IEvent['artist']>([]);

  const handleChangeArtist = useChangeFnFieldEventField('artist');

  const handleDeleteArtist = useDeleteFnEventField('artist');

  const fetchFnArtists = (search: string) => {
    // todo: добавить прерывание запроса
    dispatch(getArtistListForEventAsync(search, setArtists));
  };

  return (
    <SelectWithSearch
      value={artist || []}
      label='Выступающий артист (артисты)'
      fullWidth
      multiple
      onChange={handleChangeArtist}
      fetchFn={fetchFnArtists}
      onDelete={handleDeleteArtist}
    >
      {Array.isArray(artists) &&
        artists
          .filter((i) => i?.uid)
          .map((i) => (
            // todo: при смене массива с данными можно выбрать повторно одну и туже запись
            // todo: нужно сделать пункты меню выделяемыми в зависимости от стейта артистов, сейчас это не работает
            <MenuItem selected={artist?.map((a) => a?.uid).includes(i?.uid)} key={i?.uid} value={i as any}>
              {i?.title}
            </MenuItem>
          ))}
    </SelectWithSearch>
  );
});
