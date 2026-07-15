import { useEffect } from "react";

// Closes the mega menu and mobile drawer when the Escape key is pressed.
export function useEscapeToClose(
  setOpenMenu: (value: string | null) => void,
  setMobileOpen: (value: boolean) => void
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setOpenMenu, setMobileOpen]);
}