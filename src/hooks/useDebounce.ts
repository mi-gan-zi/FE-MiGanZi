import { useState, useEffect } from "react";

interface DebounceType {
  value: string;
  delay: number;
}
export default function useDebounce({ value, delay }: DebounceType) {
  const [debouncedValue, setDebouncedValue] = useState(value);

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
