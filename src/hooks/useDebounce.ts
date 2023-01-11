import { debounce } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { useLatest } from './useLatest';

const defMs = 290;

export function useDebounce<T extends (...args: any[]) => any>(func: T, ms = defMs) {
  const latestFunc = useLatest(func);

  const debounceFunc = useMemo(
    () =>
      debounce((...args) => {
        latestFunc.current(...args);
      }, ms),
    [latestFunc, ms],
  );

  useEffect(() => () => debounceFunc.clear(), [debounceFunc]);

  return debounceFunc;
}

export function useDebounceOld<T>(value: T, ms = defMs): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, ms);

    return () => clearTimeout(handler);
  }, [value, ms]);

  return debouncedValue;
}
