import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { IEvent } from '../../../typings/types';
import { AppDispatch } from '../../store';
import { setEventStateField } from '../eventsSlice';

export type ChangeEventFieldType = SelectChangeEvent<unknown> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export function useChangeFnFieldEventField<T extends ChangeEventFieldType>(field: keyof IEvent): (event: T) => void {
  const dispatch: AppDispatch = useDispatch();
  const numberValues: (keyof IEvent)[] = useMemo(() => ['ageRestriction', 'concertManagerPercentage'], []);

  return useCallback(
    (event) => {
      const value = numberValues.includes(field) ? +event.target.value : event.target.value;
      dispatch(setEventStateField({ [field]: value }));
    },
    [dispatch, field, numberValues],
  );
}
