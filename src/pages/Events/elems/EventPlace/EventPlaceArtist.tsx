import React, { useState } from 'react';
import { MenuItem } from '@mui/material';
import SelectWithSearch from '../../../../components/SelectWithSearch/SelectWithSearch';
import { Event } from '../../../../typings/types';
import { useChangeFnEventField } from '../../../../hooks/useChangeFnEventField';
import { getArtistListForEventAsync } from '../../../../domen/artistsSlice/artistsSlice';
import { AppDispatch } from '../../../../domen/store';
import { useDispatch } from 'react-redux';

type Props = {
  artist?: Event['artist'];
  handleDelete: () => void;
};

const EventPlaceArtist = ({ artist, handleDelete }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [artists, setArtists] = useState<Event['artist']>([]);

  const handleChangeArtist = useChangeFnEventField('artist');
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
      onDelete={handleDelete}
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
};

export default EventPlaceArtist;
