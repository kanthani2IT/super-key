import { useEffect, useRef, useState } from "react";

export function addQueryParams(baseUrl, params = {}) {
  const filteredParams = Object.entries(params).filter(
    ([key, value]) => value !== "" && value != null && value !== undefined
  );

  const query = new URLSearchParams(filteredParams)?.toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
}

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value || "");
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useDebounceFn(fn, delay = 500) {
  const timer = useRef(null);

  return function (...args) {
    // Clear the previous timer if the function is invoked again
    if (timer.current) {
      clearTimeout(timer.current);
    }

    // Set the new timer to invoke the function after the specified delay
    timer.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
export const removeExtraSpaces = (input = "") => {
  return input.replace(/^\s+/, "").replace(/\s+/g, " ");
};

// Dollar formatting function
export const formatAsDollar = (number) => {
  return `${new Intl.NumberFormat("en-US").format(number)}`;
};

export const compareeJson = (a, b) => {
  return JSON.stringify(a) !== JSON.stringify(b);
};
