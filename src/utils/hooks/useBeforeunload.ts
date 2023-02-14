import { useEffect, useRef } from 'react';

// todo: Пока не используется, доделать и проверить
export function useBeforeunload(handler: (event?: BeforeUnloadEvent) => string) {
  const eventListenerRef = useRef(null);

  useEffect(() => {
    eventListenerRef.current = (event: BeforeUnloadEvent) => {
      const returnValue = handler?.(event);
      // Handle legacy `event.returnValue` property
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
      if (typeof returnValue === 'string') {
        return (event.returnValue = returnValue);
      }
      // Chrome doesn't support `event.preventDefault()` on `BeforeUnloadEvent`,
      // instead it requires `event.returnValue` to be set
      // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload#browser_compatibility
      if (event.defaultPrevented) {
        return (event.returnValue = '');
      }
    };
  }, [handler]);

  useEffect(() => {
    window.addEventListener('beforeunload', eventListenerRef.current);

    return () => {
      window.removeEventListener('beforeunload', eventListenerRef.current);
    };
  }, []);
}
