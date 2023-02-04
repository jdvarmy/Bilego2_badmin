import { MenuItem } from '@mui/material';
import React, { memo, useState } from 'react';

import SelectWithSearch from '../../../../components/SelectWithSearch/SelectWithSearch';
import { City } from '../../../../typings/enum';
import { IEvent } from '../../../../typings/types';
import { useActionCreators } from '../../../../utils/hooks/useActionCreators';
import { getItemListForEventAsync } from '../../../itemsSlice/itemsSlice';
import { useAppDispatch } from '../../../store';
import { ChangeEventFieldType, useChangeFnFieldEventField } from '../../hooks/useChangeFnFieldEventField';
import { useDeleteFnEventField } from '../../hooks/useDeleteFnEventField';
import { eventsActions } from '../../store/eventsSlice';

type Props = {
  item?: IEvent['item'];
  city?: City;
};

export const EventPlaceItem = memo(function EventPlaceItem({ item, city }: Props) {
  const dispatch = useAppDispatch();
  const actionsEvents = useActionCreators(eventsActions);
  const [items, setItems] = useState<IEvent['item'][]>([]);

  const handleChangeItem = useChangeFnFieldEventField('item');
  const handleDeleteItem = useDeleteFnEventField('item');

  const handleChangeItemLocal = (event: ChangeEventFieldType) => {
    const eventCity = event.target.value as IEvent['item'];
    if (eventCity?.city && eventCity.city !== city) {
      actionsEvents.setEventStateField({ city: eventCity.city });
    }
    handleChangeItem(event);
  };

  const fetchFnItems = (search: string) => {
    // todo: добавить прерывание запроса
    dispatch(getItemListForEventAsync(search, setItems, { city }));
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