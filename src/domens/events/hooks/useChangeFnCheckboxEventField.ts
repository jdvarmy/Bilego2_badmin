import { SyntheticEvent, useCallback } from 'react';

import { IEvent } from '../../../typings/types';
import { useSetEventStateField } from './useSetEventStateField';

export type ChangeEventCheckboxType = SyntheticEvent<Element, Event>;

export function useChangeFnCheckboxEventField<T extends ChangeEventCheckboxType>(
  field: keyof IEvent,
): (event: T, checked: boolean) => void {
  const dispatchFn = useSetEventStateField(field);

  return useCallback((event: T, checked: boolean) => dispatchFn(checked), [dispatchFn]);
}
