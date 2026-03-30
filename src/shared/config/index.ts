export type WidgetTheme = "light" | "dark";
export type WidgetSize = "s" | "m" | "l";

export const DEFAULT_THEME: WidgetTheme = "dark";
export const DEFAULT_SIZE: WidgetSize = "m";

export const SIZE_CONFIG = {
  s: { scale: 0.667 },
  m: { scale: 1 },
  l: { scale: 1.333 },
} as const;
