import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import { setEventStateField } from '../domen/events/eventsSlice';
import { AppDispatch } from '../domen/store';
import { Event } from '../typings/types';

export type ChangeEventType = SelectChangeEvent<unknown> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export function useChangeFnEventField(field: keyof Event): (event: ChangeEventType) => void {
  const dispatch: AppDispatch = useDispatch();
  const numberValues: (keyof Event)[] = ['ageRestriction', 'concertManagerPercentage'];

  return (event) => {
    const value = numberValues.includes(field) ? +event.target.value : event.target.value;
    dispatch(setEventStateField({ [field]: value }));
  };
}
