import { useCallback } from 'react';

import { IEvent, MediaSelectData } from '../../../typings/types';
import { useSetEventStateField } from './useSetEventStateField';

export function useChangeFnMediaEventField<T extends MediaSelectData>(field: keyof IEvent): (image: T) => void {
  const dispatchFn = useSetEventStateField(field);

  return useCallback((image: T) => dispatchFn(image), [dispatchFn]);
}
