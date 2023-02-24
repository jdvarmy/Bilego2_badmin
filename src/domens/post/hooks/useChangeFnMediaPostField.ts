import { useCallback } from 'react';

import { MediaSelectData } from '../../../typings/types';
import { PostFieldTypeProps } from './useChangeFnFieldPostField';
import { useSetPostStateField } from './useSetPostStateField';

export function useChangeFnMediaPostField<T extends MediaSelectData>(props: PostFieldTypeProps): (image: T) => void {
  const dispatchFn = useSetPostStateField(props);

  return useCallback((image: T) => dispatchFn(image), [dispatchFn]);
}
