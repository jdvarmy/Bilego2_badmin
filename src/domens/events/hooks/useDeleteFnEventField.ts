import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { IEvent } from '../../../typings/types';
import { AppDispatch } from '../../store';
import { setEventStateField } from '../store/eventsSlice';

export function useDeleteFnEventField(field: keyof IEvent): () => void {
  const dispatch: AppDispatch = useDispatch();

  return useCallback(() => {
    dispatch(setEventStateField({ [field]: undefined }));
  }, [dispatch, field]);
}
