import { useEffect } from "react";

// Closes the mega menu and mobile drawer whenever the route changes.
export function useCloseOnNavigation(
  pathname: string,
  setOpenMenu: (value: string | null) => void,
  setMobileOpen: (value: boolean) => void
) {
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);
}