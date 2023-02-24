import { useCallback } from 'react';

import { PostFieldTypeProps } from './useChangeFnFieldPostField';
import { useSetPostStateField } from './useSetPostStateField';

export function useDeleteFnPostField(props: PostFieldTypeProps): () => void {
  const dispatchFn = useSetPostStateField(props);

  return useCallback(() => dispatchFn(undefined), [dispatchFn]);
}
