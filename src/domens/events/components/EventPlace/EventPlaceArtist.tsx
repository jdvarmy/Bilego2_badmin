import { MenuItem } from '@mui/material';
import React, { memo, useState } from 'react';

import SelectWithSearch from '../../../../components/SelectWithSearch/SelectWithSearch';
import { PostType } from '../../../../typings/enum';
import { useChangeFnFieldPostField } from '../../../post/hooks/useChangeFnFieldPostField';
import { useDeleteFnPostField } from '../../../post/hooks/useDeleteFnPostField';
import { useAppDispatch } from '../../../store';
import { workerGetArtistListForEvent } from '../../store/worckers';
import { IEvent } from '../../types/types';

type Props = {
  artist?: IEvent['artist'];
};

export const EventPlaceArtist = memo(function EventPlaceArtist({ artist }: Props) {
  const dispatch = useAppDispatch();
  const [artists, setArtists] = useState<IEvent['artist']>([]);

  const handleChangeArtist = useChangeFnFieldPostField({ field: 'artist', type: PostType.event });

  const handleDeleteArtist = useDeleteFnPostField({ field: 'artist', type: PostType.event });

  const fetchFnArtists = (search: string) => {
    // todo: добавить прерывание запроса
    dispatch(workerGetArtistListForEvent({ search }))
      .unwrap()
      .then((artists) => {
        setArtists(artists);
      });
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
