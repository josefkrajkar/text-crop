import { useCallback, useRef } from 'react';

export function useDebounce<T extends (...args: unknown[]) => void>(
  callback: T,
  wait: number
): T {
  const timeout = useRef<NodeJS.Timeout>();

  return useCallback(
    ((...args: Parameters<T>) => {
      const later = () => {
        timeout.current = undefined;
        callback(...args);
      };

      clearTimeout(timeout.current);
      timeout.current = setTimeout(later, wait);
    }) as T,
    [callback, wait]
  );
}
