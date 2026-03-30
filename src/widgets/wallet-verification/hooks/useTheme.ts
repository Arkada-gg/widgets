import { useEffect, useRef } from "react";
import type { WidgetTheme } from "@/shared/config";
import { DEFAULT_THEME } from "@/shared/config";

export function useTheme(theme: WidgetTheme = DEFAULT_THEME) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return ref;
}
