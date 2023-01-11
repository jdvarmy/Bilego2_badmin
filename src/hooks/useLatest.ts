import { useLayoutEffect, useRef } from 'react';

export function useLatest<T extends (...args: any[]) => any>(func: T) {
  const eventRef = useRef<T>(func);

  useLayoutEffect(() => {
    eventRef.current = func;
  }, [func]);

  return eventRef;
}
