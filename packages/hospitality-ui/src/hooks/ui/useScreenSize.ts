import { useEffect, useState } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(window?.matchMedia(query)?.matches);
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    function handler(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

export function useScreenSize() {
  return {
    isXs: useMediaQuery("(min-width: 320px)"),
    isSm: useMediaQuery("(min-width: 640px)"),
    isMd: useMediaQuery("(min-width: 768px)"),
    isSmallScreen: useMediaQuery("(max-width: 1023px)"),
    isLg: useMediaQuery("(min-width: 1024px)"),
    isXl: useMediaQuery("(min-width: 1280px)"),
    is2Xl: useMediaQuery("(min-width: 1281px)"),
  };
}
