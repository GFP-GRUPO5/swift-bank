import { useEffect, useState } from "react";

/**
 * Returns a debounced value that only updates after `delay` ms
 * have passed without the input changing.
 *
 * @param value The input value (of any type)
 * @param delay Delay in milliseconds
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    // Cleanup if value or delay changes (or on unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounced;
}
