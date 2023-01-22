import throttle from 'lodash.throttle';
import { useEffect, useMemo } from 'react';

import { useLatest } from './useLatest';

const defMs = 290;

export function useThrottle<T extends (...args: any[]) => any>(func: T, ms = defMs) {
  const latestFunc = useLatest(func);

  const throttleFunc = useMemo(
    () =>
      throttle((...args: any[]) => {
        latestFunc.current(...args);
      }, ms),
    [latestFunc, ms],
  );

  useEffect(() => () => throttleFunc.cancel(), [throttleFunc]);

  return throttleFunc;
}
