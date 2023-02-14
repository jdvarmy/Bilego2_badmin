import { useCallback } from 'react';

import { IEvent } from '../../../typings/types';
import { useActionCreators } from '../../../utils/hooks/useActionCreators';
import { eventsActions } from '../store/eventsSlice';

export function useSetEventStateField(field: keyof IEvent) {
  const actions = useActionCreators(eventsActions);

  return useCallback((value: any) => actions.setEventStateField({ [field]: value }), [actions, field]);
}
