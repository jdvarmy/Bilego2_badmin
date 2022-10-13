import { RefObject, useEffect, useRef, useState } from 'react';

export function useResizeObserver(element: RefObject<HTMLElement> | null) {
  const observerRef = useRef<ResizeObserver>();
  const [size, setSize] = useState<DOMRectReadOnly>();

  useEffect(() => {
    if (element?.current) {
      const callback = (entries: ResizeObserverEntry[]) => {
        entries.forEach((entity) => {
          setSize(entity.contentRect);
        });
      };

      observerRef.current = new ResizeObserver(callback);
      observerRef.current.observe(element.current);
    }

    return () => {
      if (observerRef?.current && element?.current) {
        observerRef.current?.unobserve(element.current);
      }
    };
  }, [element]);

  return size;
}
