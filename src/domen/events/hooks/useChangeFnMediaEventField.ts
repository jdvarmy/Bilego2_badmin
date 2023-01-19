import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { IEvent, MediaSelectData } from '../../../typings/types';
import { AppDispatch } from '../../store';
import { setEventStateField } from '../eventsSlice';

export function useChangeFnMediaEventField<T extends MediaSelectData>(field: keyof IEvent): (image: T) => void {
  const dispatch: AppDispatch = useDispatch();

  return useCallback(
    (image: T) => {
      dispatch(setEventStateField({ [field]: image }));
    },
    [dispatch, field],
  );
}
