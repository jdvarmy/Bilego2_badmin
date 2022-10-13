import { ChangeEvent } from 'react';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import { Event } from '../typings/types';
import { SelectChangeEvent } from '@mui/material';
import { EventStateFieldType, setEventStateField } from '../store/eventsSlice/eventsSlice';

export type ChangeEventType = SelectChangeEvent<unknown> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export function useChangeFnEventField(field: keyof Event): (event: ChangeEventType) => void {
  const dispatch: AppDispatch = useDispatch();

  return (event) => {
    dispatch(setEventStateField({ [field]: event.target.value } as EventStateFieldType));
  };
}
