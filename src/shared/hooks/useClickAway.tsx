import { useRef, useLayoutEffect, useEffect } from "react";

export const useClickOutside = <T extends HTMLElement>(handler: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handler]);

  return ref;
};
