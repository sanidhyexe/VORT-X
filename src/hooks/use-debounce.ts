
"use client";

import { useState, useEffect } from 'react';

/**
 * A custom hook that debounces a value. The debounced value will only reflect the
 * latest value when the useDebounce hook has not been called for the specified delay.
 * @template T - The type of the value to be debounced.
 * @param {T} value - The value to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {T} The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
