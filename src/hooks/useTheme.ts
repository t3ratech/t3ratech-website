import { useEffect, useState } from "react";
import {
  defaultThemePreference,
  getInitialThemePreference,
  resolveTheme,
  type ThemePreference,
} from "../data";

export function useTheme() {
  const [themePreference, setThemePreference] = useState<ThemePreference>(
    getInitialThemePreference,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const resolved = resolveTheme(themePreference, mediaQuery);
      document.documentElement.dataset.theme = resolved;
      document.documentElement.dataset.themePreference = themePreference;
      window.localStorage.setItem("t3ratech-theme", themePreference);
    };

    applyTheme();
    mediaQuery.addEventListener("change", applyTheme);

    return () => {
      mediaQuery.removeEventListener("change", applyTheme);
    };
  }, [themePreference]);

  return {
    themePreference,
    setThemePreference,
    defaultThemePreference,
  };
}
