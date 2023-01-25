import { useCallback } from 'react';

import { IEvent } from '../../../typings/types';
import { useSetEventStateField } from './useSetEventStateField';

export function useDeleteFnEventField(field: keyof IEvent): () => void {
  const dispatchFn = useSetEventStateField(field);

  return useCallback(() => dispatchFn(undefined), [dispatchFn]);
}
