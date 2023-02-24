import { MenuItem } from '@mui/material';
import React, { memo, useState } from 'react';

import SelectWithSearch from '../../../../components/SelectWithSearch/SelectWithSearch';
import { City, PostType } from '../../../../typings/enum';
import { useActionCreators } from '../../../../utils/hooks/useActionCreators';
import { ChangePostFieldType, useChangeFnFieldPostField } from '../../../post/hooks/useChangeFnFieldPostField';
import { useDeleteFnPostField } from '../../../post/hooks/useDeleteFnPostField';
import { useAppDispatch } from '../../../store';
import { eventsActions } from '../../store/eventsSlice';
import { workerGetItemListForEvent } from '../../store/worckers';
import { IEvent } from '../../types/types';

type Props = {
  item?: IEvent['item'];
  city?: City;
};

export const EventPlaceItem = memo(function EventPlaceItem({ item, city }: Props) {
  const dispatch = useAppDispatch();
  const actions = useActionCreators(eventsActions);
  const [items, setItems] = useState<IEvent['item'][]>([]);

  const handleChangeItem = useChangeFnFieldPostField({ field: 'item', type: PostType.event });
  const handleDeleteItem = useDeleteFnPostField({ field: 'item', type: PostType.event });

  const handleChangeItemLocal = (event: ChangePostFieldType) => {
    const eventCity = event.target.value as IEvent['item'];
    if (eventCity?.city && eventCity.city !== city) {
      actions.setEventStateField({ city: eventCity.city });
    }
    handleChangeItem(event);
  };

  const fetchFnItems = (search: string) => {
    // todo: добавить прерывание запроса
    dispatch(workerGetItemListForEvent({ search, params: { city } }))
      .unwrap()
      .then((items) => {
        setItems(items);
      });
  };

  return (
    <SelectWithSearch
      value={item || ''}
      label='Место проведения'
      fullWidth
      onChange={handleChangeItemLocal}
      fetchFn={fetchFnItems}
      onDelete={handleDeleteItem}
    >
      {Array.isArray(items) &&
        items
          .filter((i) => i?.uid)
          .map((i: IEvent['item']) => (
            <MenuItem key={i?.uid} value={i as any}>
              {i?.title}
            </MenuItem>
          ))}
    </SelectWithSearch>
  );
});
