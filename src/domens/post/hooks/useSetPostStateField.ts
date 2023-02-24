import { useCallback, useMemo } from 'react';

import { PostType } from '../../../typings/enum';
import { useActionCreators } from '../../../utils/hooks/useActionCreators';
import { eventsActions } from '../../events/store/eventsSlice';
import { itemsActions } from '../../items/store/itemsSlice';
import { PostFieldTypeProps } from './useChangeFnFieldPostField';

export function useSetPostStateField({ field, type }: PostFieldTypeProps) {
  const eventActions = useActionCreators(eventsActions);
  const itemActions = useActionCreators(itemsActions);

  const workerHandler = useMemo(
    () => (value: any) => {
      switch (type) {
        case PostType.event:
          return eventActions.setEventStateField({ [field]: value });
        case PostType.item:
          return itemActions.setItemStateField({ [field]: value });
      }
    },
    [eventActions, field, itemActions, type],
  );

  return useCallback((value: any) => workerHandler(value), [workerHandler]);
}
