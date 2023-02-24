import { SyntheticEvent, useCallback } from 'react';

import { PostFieldTypeProps } from './useChangeFnFieldPostField';
import { useSetPostStateField } from './useSetPostStateField';

export type ChangeEventCheckboxType = SyntheticEvent<Element, Event>;

export function useChangeFnCheckboxPostField<T extends ChangeEventCheckboxType>(
  props: PostFieldTypeProps,
): (event: T, checked: boolean) => void {
  const dispatchFn = useSetPostStateField(props);

  return useCallback((event: T, checked: boolean) => dispatchFn(checked), [dispatchFn]);
}
