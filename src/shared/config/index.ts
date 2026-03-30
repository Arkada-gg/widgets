export type WidgetTheme = "light" | "dark";
export type WidgetSize = "s" | "m" | "l";
export type WidgetVariant = "vertical" | "horizontal";

export const DEFAULT_THEME: WidgetTheme = "dark";
export const DEFAULT_SIZE: WidgetSize = "m";
export const DEFAULT_VARIANT: WidgetVariant = "vertical";

export const SIZE_CONFIG = {
  s: { width: 400, scale: 0.667 },
  m: { width: 600, scale: 1 },
  l: { width: 800, scale: 1.333 },
} as const;
