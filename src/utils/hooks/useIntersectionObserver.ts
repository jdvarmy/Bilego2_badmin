import { RefObject, useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(element: RefObject<HTMLElement> | null | undefined): boolean {
  const observerRef = useRef<IntersectionObserver>(undefined);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (element?.current) {
      const callback: IntersectionObserverCallback = (entries) => {
        entries.forEach((entity) => {
          if (entity.isIntersecting) {
            setShow(true);
          } else {
            setShow(false);
          }
        });
      };

      observerRef.current = new IntersectionObserver(callback);
      observerRef.current.observe(element.current);
    }

    return () => {
      if (observerRef?.current && element?.current) {
        observerRef.current.unobserve(element.current);
      }
    };
  }, [element]);

  return show;
}
