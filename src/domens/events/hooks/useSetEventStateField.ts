import { useCallback } from 'react';

import { IEvent } from '../../../typings/types';
import { useActionCreators } from '../../../utils/hooks/useActionCreators';
import { eventsActions } from '../store/eventsSlice';

export function useSetEventStateField(field: keyof IEvent) {
  const actionsEvents = useActionCreators(eventsActions);

  return useCallback((value: any) => actionsEvents.setEventStateField({ [field]: value }), [actionsEvents, field]);
}
