import { cn } from "@/shared/utils/cn";
import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold font-sans whitespace-nowrap",
        "transition-colors duration-200 ease-in-out",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        size === "sm" && "h-7 px-2.5 text-xs rounded-md",
        size === "md" && "h-8 px-2.5 text-sm rounded-md",
        variant === "primary" &&
          "bg-accent text-white hover:bg-accent-hover active:brightness-90",
        variant === "ghost" &&
          "bg-transparent text-[var(--arkada-text-primary)] hover:bg-[var(--arkada-bg-card)]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
