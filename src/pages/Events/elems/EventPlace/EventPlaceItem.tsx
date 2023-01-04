import React, { useState } from 'react';
import { Event } from '../../../../typings/types';
import { useDispatch } from 'react-redux';
import { MenuItem } from '@mui/material';
import SelectWithSearch from '../../../../components/SelectWithSearch/SelectWithSearch';
import { ChangeEventType, useChangeFnEventField } from '../../../../hooks/useChangeFnEventField';
import { EventStateFieldType, setEventStateField } from '../../../../domen/events/eventsSlice';
import { getItemListForEventAsync } from '../../../../domen/itemsSlice/itemsSlice';
import { City } from '../../../../typings/enum';
import { AppDispatch } from '../../../../domen/store';

type Props = {
  item?: Event['item'];
  city?: City;
  handleDelete: (field: keyof Event) => () => void;
};

const EventPlaceItem = ({ item, city, handleDelete }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [items, setItems] = useState<Event['item'][]>([]);

  const handleChangeItem = useChangeFnEventField('item');
  const handleChangeItemLocal = (event: ChangeEventType) => {
    const eventCity = event.target.value as Event['item'];
    if (eventCity?.city && eventCity.city !== city) {
      dispatch(setEventStateField({ city: eventCity.city } as EventStateFieldType));
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
      onDelete={handleDelete('item')}
    >
      {Array.isArray(items) &&
        items
          .filter((i) => i?.uid)
          .map((i: Event['item']) => (
            <MenuItem key={i?.uid} value={i as any}>
              {i?.title}
            </MenuItem>
          ))}
    </SelectWithSearch>
  );
};

export default EventPlaceItem;
