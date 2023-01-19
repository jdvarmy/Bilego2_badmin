import { SyntheticEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { IEvent } from '../../../typings/types';
import { AppDispatch } from '../../store';
import { setEventStateField } from '../eventsSlice';

export type ChangeEventCheckboxType = SyntheticEvent<Element, Event>;

export function useChangeFnCheckboxEventField<T extends ChangeEventCheckboxType>(
  field: keyof IEvent,
): (event: T, checked: boolean) => void {
  const dispatch: AppDispatch = useDispatch();

  return useCallback(
    (event: T, checked: boolean) => {
      dispatch(setEventStateField({ [field]: checked }));
    },
    [dispatch, field],
  );
}
