import { useEffect, useRef } from "react";

// Returns focus to a target element (e.g. the hamburger button)
// whenever `isOpen` transitions from true to false.
export function useFocusReturn(isOpen: boolean, targetRef: React.RefObject<HTMLElement>) {
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!isOpen && wasOpenRef.current) {
      targetRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, targetRef]);
}