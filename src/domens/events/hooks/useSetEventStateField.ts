import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { IEvent } from '../../../typings/types';
import { AppDispatch } from '../../store';
import { eventsActions } from '../store/eventsSlice';

export function useSetEventStateField(field: keyof IEvent) {
  const dispatch: AppDispatch = useDispatch();

  return useCallback((value: any) => dispatch(eventsActions.setEventStateField({ [field]: value })), [dispatch, field]);
}
